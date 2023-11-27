import { useEffect, useState } from 'react'
import Button from '../components/Button'
import Container from '../components/Container'
import { useAuth } from '../provider/auth.provider'

const IndexPage = () => {
  const [count, setCount] = useState(0)
  const [time, setTime] = useState(new Date().toLocaleTimeString())

  const { currentUser } = useAuth()

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString())
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  })

  return (
    <Container style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <p>Hello {currentUser?.email}</p>
      Time is {time}
      <Button label={`Count is ${count}`} onClick={() => setCount(count + 1)} />
    </Container>
  )
}

export default IndexPage
