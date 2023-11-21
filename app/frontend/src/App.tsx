import reactLogo from './assets/react.svg'
import { Button } from './components/Button'
import { effect, useSignal } from '@preact/signals-react'

function App() {
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

  console.log(import.meta.env) // eslint-disable-line no-console
  console.log(import.meta.env.CLIENT_SECRET) // eslint-disable-line no-console

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img src={reactLogo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        Time is {time.value}
        <Button label={`Count is ${count.value}`} onClick={() => count.value++} />
      </div>
    </div>
  )
}

export default App
