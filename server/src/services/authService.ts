import argon2 from 'argon2'
import { createHmac, randomBytes } from 'node:crypto'
import { prisma } from '../config/prisma.js'
import type {
  LoginInput,
  RegisterInput,
} from '../schemas/authSchemas.js'

const SESSION_DURATION_MS =
  1000 * 60 * 60 * 24 * 7

function hashSessionToken(token: string) {
  const sessionSecret = process.env.SESSION_SECRET

  if (!sessionSecret) {
    throw new Error(
      'SESSION_SECRET is not configured',
    )
  }

  return createHmac('sha256', sessionSecret)
    .update(token)
    .digest('hex')
}

function createSessionToken() {
  return randomBytes(32).toString('hex')
}

export async function registerUser(
  input: RegisterInput,
) {
  const existingUser =
    await prisma.user.findUnique({
      where: {
        email: input.email,
      },
    })

  if (existingUser) {
    throw new Error('EMAIL_ALREADY_EXISTS')
  }

  const passwordHash = await argon2.hash(
    input.password,
  )

  const user = await prisma.user.create({
    data: {
      name: input.name,
      email: input.email,
      passwordHash,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  })

  const sessionToken = createSessionToken()
  const tokenHash = hashSessionToken(
    sessionToken,
  )
  const expiresAt = new Date(
    Date.now() + SESSION_DURATION_MS,
  )

  const session = await prisma.session.create({
    data: {
      tokenHash,
      userId: user.id,
      expiresAt,
    },
  })

  return {
    user,
    sessionToken,
    sessionId: session.id,
  }
}

export async function loginUser(
  input: LoginInput,
) {
  const user = await prisma.user.findUnique({
    where: {
      email: input.email,
    },
  })

  if (!user) {
    throw new Error('INVALID_CREDENTIALS')
  }

  const passwordValid = await argon2.verify(
    user.passwordHash,
    input.password,
  )

  if (!passwordValid) {
    throw new Error('INVALID_CREDENTIALS')
  }

  const sessionToken = createSessionToken()
  const tokenHash = hashSessionToken(
    sessionToken,
  )
  const expiresAt = new Date(
    Date.now() + SESSION_DURATION_MS,
  )

  const session = await prisma.session.create({
    data: {
      tokenHash,
      userId: user.id,
      expiresAt,
    },
  })

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    sessionToken,
    sessionId: session.id,
  }
}

export async function deleteSession(
  sessionId: string,
) {
  await prisma.session.deleteMany({
    where: {
      id: sessionId,
    },
  })
}