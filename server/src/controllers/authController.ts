import type { Response } from 'express'
import type { AuthenticatedRequest } from '../types/auth.js'
import {
  loginSchema,
  registerSchema,
} from '../schemas/authSchemas.js'
import {
  deleteSession,
  loginUser,
  registerUser,
} from '../services/authService.js'

const SESSION_COOKIE_NAME = 'flowdesk_session'

const isProduction = process.env.NODE_ENV === 'production'

const cookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: 'lax' as const,
  path: '/',
  maxAge: 1000 * 60 * 60 * 24 * 7,
}

export async function registerController(
  req: AuthenticatedRequest,
  res: Response,
) {
  const parsed = registerSchema.safeParse(req.body)

  if (!parsed.success) {
    res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: parsed.error.flatten().fieldErrors,
    })
    return
  }

  try {
    const result = await registerUser(parsed.data)

    res.cookie(
      SESSION_COOKIE_NAME,
      result.sessionToken,
      cookieOptions,
    )

    res.status(201).json({
      success: true,
      user: result.user,
    })
  } catch (error) {
    if (error instanceof Error && error.message === 'EMAIL_ALREADY_EXISTS') {
      res.status(409).json({
        success: false,
        message: 'An account with this email already exists',
      })
      return
    }

    console.error('Registration error:', error)

    res.status(500).json({
      success: false,
      message: 'Unable to create account',
    })
  }
}

export async function loginController(
  req: AuthenticatedRequest,
  res: Response,
) {
  const parsed = loginSchema.safeParse(req.body)

  if (!parsed.success) {
    res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: parsed.error.flatten().fieldErrors,
    })
    return
  }

  try {
    const result = await loginUser(parsed.data)

    res.cookie(
      SESSION_COOKIE_NAME,
      result.sessionToken,
      cookieOptions,
    )

    res.status(200).json({
      success: true,
      user: result.user,
    })
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === 'INVALID_CREDENTIALS'
    ) {
      res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      })
      return
    }

    console.error('Login error:', error)

    res.status(500).json({
      success: false,
      message: 'Unable to sign in',
    })
  }
}

export async function logoutController(
  req: AuthenticatedRequest,
  res: Response,
) {
  if (req.sessionId) {
    await deleteSession(req.sessionId)
  }

  res.clearCookie(SESSION_COOKIE_NAME, {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'lax',
    path: '/',
  })

  res.status(204).send()
}