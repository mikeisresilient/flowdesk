import { createContext } from 'react'

export type UserRole = 'USER' | 'ADMIN'

export type User = {
  id: string
  name: string
  email: string
  role: UserRole
}

export type AuthContextType = {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (
    email: string,
    password: string,
  ) => Promise<boolean>
  register: (
    name: string,
    email: string,
    password: string,
  ) => Promise<boolean>
  logout: () => Promise<void>
}

export const AuthContext = createContext<
  AuthContextType | undefined
>(undefined)