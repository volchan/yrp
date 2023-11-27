import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from 'react'

import { IUser } from '../api/types'

export type AuthContextType = {
  accessToken: string | null
  refreshToken: string | null
  currentUser: IUser | null
  isLoggedIn: boolean
  setAccessToken: (token: string | null) => void
  setRefreshToken: (token: string | null) => void
  setCurrentUser: (user: IUser | null) => void
}

const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  refreshToken: null,
  currentUser: null,
  isLoggedIn: false,
  setAccessToken: () => {},
  setRefreshToken: () => {},
  setCurrentUser: () => {},
})

const AuthProvider = ({ children }: { children: ReactNode }) => {
  // State to hold the authentication token
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'))
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refreshToken'))
  const [currentUser, setCurrentUser] = useState<IUser | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken)
    } else {
      localStorage.removeItem('accessToken')
    }
  }, [accessToken])

  useEffect(() => {
    if (refreshToken) {
      localStorage.setItem('refreshToken', refreshToken)
    } else {
      localStorage.removeItem('refreshToken')
    }
  }, [refreshToken])

  useEffect(() => {
    if (accessToken && refreshToken && currentUser) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }, [accessToken, refreshToken, currentUser])

  // Memoized value of the authentication context
  const contextValue = useMemo(
    () => ({
      accessToken,
      refreshToken,
      currentUser: currentUser ?? null,
      isLoggedIn: isLoggedIn,
      setAccessToken,
      setRefreshToken,
      setCurrentUser,
    }),
    [accessToken, currentUser, isLoggedIn],
  )

  // Provide the authentication context to the children components
  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  return useContext(AuthContext)
}

export default AuthProvider
