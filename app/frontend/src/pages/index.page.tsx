import { effect, useSignal } from '@preact/signals-react'

import reactLogo from '../assets/react.svg'
import { Button } from '../components/Button'
import Container from '../components/Container'

const IndexPage = () => {
  const count = useSignal(0)
  const time = useSignal(new Date().toLocaleTimeString())

  effect(() => {
    const interval = setInterval(() => {
      time.value = new Date().toLocaleTimeString()
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
      Time is {time.value}
      <Button label={`Count is ${count.value}`} onClick={() => count.value++} />
    </Container>
  )
}

export default IndexPage
