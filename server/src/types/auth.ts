import type { Request } from 'express'

export type AuthenticatedUser = {
  id: string
  name: string
  email: string
}

export type AuthenticatedRequest = Request & {
  user?: AuthenticatedUser
  sessionId?: string
}