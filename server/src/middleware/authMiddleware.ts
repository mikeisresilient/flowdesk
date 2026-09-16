import { createHmac } from 'node:crypto'
import type { NextFunction, Response } from 'express'
import { prisma } from '../config/prisma.js'
import type { AuthenticatedRequest } from '../types/auth.js'

const SESSION_COOKIE_NAME = 'flowdesk_session'

function hashSessionToken(token: string) {
  const sessionSecret = process.env.SESSION_SECRET

  if (!sessionSecret) {
    throw new Error('SESSION_SECRET is not configured')
  }

  return createHmac('sha256', sessionSecret)
    .update(token)
    .digest('hex')
}

export async function requireAuth(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const sessionToken = req.cookies?.[SESSION_COOKIE_NAME]

    if (!sessionToken) {
      res.status(401).json({
        success: false,
        message: 'Authentication required',
      })
      return
    }

    const tokenHash = hashSessionToken(sessionToken)

    const session = await prisma.session.findUnique({
      where: {
        tokenHash,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    })

    if (!session) {
      res.status(401).json({
        success: false,
        message: 'Invalid session',
      })
      return
    }

    if (session.expiresAt <= new Date()) {
      await prisma.session.delete({
        where: {
          id: session.id,
        },
      })

      res.status(401).json({
        success: false,
        message: 'Session expired',
      })
      return
    }

    req.user = session.user
    req.sessionId = session.id

    next()
  } catch (error) {
    console.error('Authentication error:', error)

    res.status(500).json({
      success: false,
      message: 'Unable to authenticate request',
    })
  }
}