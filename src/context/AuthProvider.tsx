import {
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import {
  AuthContext,
  type User,
} from './AuthContext'
import {
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
} from '../services/authService'

type AuthProviderProps = {
  children: ReactNode
}

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function restoreSession() {
      try {
        const response = await getCurrentUser()
        setUser(response.user)
      } catch {
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }

    void restoreSession()
  }, [])

  const login = async (
    email: string,
    password: string,
  ) => {
    try {
      const response = await loginUser(email, password)
      setUser(response.user)
      return true
    } catch {
      return false
    }
  }

  const register = async (
    name: string,
    email: string,
    password: string,
  ) => {
    try {
      const response = await registerUser({
        name,
        email,
        password,
      })

      setUser(response.user)
      return true
    } catch {
      return false
    }
  }

  const logout = async () => {
    try {
      await logoutUser()
    } finally {
      setUser(null)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider