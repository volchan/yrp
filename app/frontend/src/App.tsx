import { useState } from 'react'

import reactLogo from './assets/react.svg'
import { Button } from './components/Button'

function App() {
  const [count, setCount] = useState(0)

  console.log(import.meta.env) // eslint-disable-line no-console
  console.log(import.meta.env.CLIENT_SECRET) // eslint-disable-line no-console

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img src={reactLogo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Button label={`Count is ${count}`} onClick={() => setCount(count + 1)} />
      </div>
    </div>
  )
}

export default App
