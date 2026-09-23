import type { Request } from 'express'

export type UserRole = 'USER' | 'ADMIN'

export type AuthenticatedUser = {
  id: string
  name: string
  email: string
  role: UserRole
}

export type AuthenticatedRequest = Request & {
  user?: AuthenticatedUser
  sessionId?: string
}