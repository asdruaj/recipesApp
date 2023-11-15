import { createContext, useContext, useEffect, useState } from 'react'
import { logOutRequest, loginRequest, registerRequest, verifyTokenRquest } from '../api/auth'
import Spinner from '../components/Spinner'

export const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) return new Error('useAuth must be within an AuthProvider')

  return context
}

export function AuthProvider ({ children }) {
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [errors, setErrors] = useState([{ signup: [null], login: [null] }])

  useEffect(() => {
    verifyToken()
  }, [])

  const signup = async (user) => {
    try {
      const res = await registerRequest(user)
      setUser(res.data)
      console.log(user)
    } catch (error) {
      setErrors(prev => ({ ...prev, signup: error.response.data }))
      setUser(null)
      console.log(error.response.data)
    }

    setIsLoading(false)
  }

  const signout = async () => {
    const res = await logOutRequest()
    console.log(res)
    setUser(null)
  }

  const login = async (user) => {
    try {
      const res = await loginRequest(user)
      setUser(res.data)
      console.log(user)
    } catch (error) {
      setErrors(prev => ({ ...prev, login: error.response.data }))
      setUser(null)
      console.log(error.response.data)
    }

    setIsLoading(false)
  }

  const verifyToken = async () => {
    try {
      const res = await verifyTokenRquest()
      setUser(res.data)
    } catch (error) {
      console.log(error.response.data)
    }

    setIsLoading(false)
  }

  return (
    <AuthContext.Provider value={{
      signup,
      login,
      signout,
      setErrors,
      user,
      errors
    }}
    >
      {isLoading ? <Spinner /> : children}
    </AuthContext.Provider>
  )
}
