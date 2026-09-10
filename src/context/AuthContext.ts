import { createContext } from 'react'

export type User = {
  name: string
  email: string
}

export type AuthContextType = {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => boolean
  logout: () => void
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
)