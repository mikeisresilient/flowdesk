import { useState, type ReactNode } from 'react'
import { AuthContext, type User } from './AuthContext'

type AuthProviderProps = {
  children: ReactNode
}

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('flowdesk_user')

    if (!storedUser) {
      return null
    }

    try {
      return JSON.parse(storedUser) as User
    } catch {
      localStorage.removeItem('flowdesk_user')
      return null
    }
  })

  const login = (email: string, password: string) => {
    if (!email || !password) {
      return false
    }

    const loggedInUser: User = {
      name: email.split('@')[0] || 'FlowDesk User',
      email,
    }

    localStorage.setItem(
      'flowdesk_user',
      JSON.stringify(loggedInUser),
    )

    setUser(loggedInUser)

    return true
  }

  const logout = () => {
    localStorage.removeItem('flowdesk_user')
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider