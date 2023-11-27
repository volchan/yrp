import { Navigate, Outlet } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import meQuery from '../queries/me.query'
import { useAuth } from '../provider/auth.provider'
import { useEffect } from 'react'

export const ProtectedRoute = () => {
  const { accessToken, setCurrentUser } = useAuth()

  // Check if the user is authenticated
  if (!accessToken) {
    // If not authenticated, redirect to the login page
    return <Navigate to={'/login'} state={{ from: location.pathname }} />
  }

  const query = useQuery({
    queryKey: ['me'],
    queryFn: meQuery,
    retry: false,
    enabled: true,
  })

  if (query.isError) {
    return <Navigate to={'/login'} state={{ from: location.pathname }} />
  }

  useEffect(() => {
    setCurrentUser((query.isSuccess && query.data) || null)
  }, [query.isSuccess, query.data])

  // If authenticated, render the child routes
  return <Outlet />
}
