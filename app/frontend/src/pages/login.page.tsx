import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import Container from '../components/Container'
import LoginForm from '../components/LoginForm'
import { useAuth } from '../provider/auth.provider'

const LoginPage = () => {
  const { accessToken } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (accessToken) {
      return navigate('/', { replace: true })
    }
  }, [])

  return (
    <Container>
      <h1>Login</h1>
      <LoginForm />
    </Container>
  )
}

export default LoginPage
