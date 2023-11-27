import { useEffect, useState } from 'react'
import reactLogo from '../assets/react.svg'
import Button from '../components/Button'
import Container from '../components/Container'

const IndexPage = () => {
  const [count, setCount] = useState(0)
  const [time, setTime] = useState(new Date().toLocaleTimeString())

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
      <img src={reactLogo} className="App-logo" alt="logo" />
      <p>
        Edit <code>src/App.tsx</code> and save to reload.
      </p>
      Time is {time}
      <Button label={`Count is ${count}`} onClick={() => setCount(count + 1)} />
    </Container>
  )
}

export default IndexPage
