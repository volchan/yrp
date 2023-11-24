import { Navigate, useLocation } from 'react-router-dom'

import { currentUser } from '../signals/authSignals'

function RequireAuth({ children }: { children: JSX.Element }) {
  const location = useLocation()

  if (!currentUser.value) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

export default RequireAuth
