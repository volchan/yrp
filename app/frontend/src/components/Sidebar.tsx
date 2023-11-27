import { useMutation } from '@tanstack/react-query'
import { Link, useNavigate } from 'react-router-dom'

import '../styles/components/sidebar.scss'
import Button from './Button'
import logoutMutation from '../mutations/logout.mutation'
import { useAuth } from '../provider/auth.provider'

const Sidebar = () => {
  const navigate = useNavigate()

  const { isLoggedIn, setAccessToken, setCurrentUser } = useAuth()

  const mutation = useMutation({
    mutationKey: ['logout'],
    mutationFn: logoutMutation,
    onSuccess: () => {
      setAccessToken(null)
      setCurrentUser(null)

      return navigate('/', { replace: true })
    },
  })

  const handleLogout = async () => {
    mutation.mutate()
  }

  return (
    <div className="sidebar">
      <Link to="/">YRP</Link>

      {isLoggedIn && (
        <>
          <Button onClick={handleLogout} type="danger" label="Logout" block />
        </>
      )}
    </div>
  )
}

export default Sidebar
