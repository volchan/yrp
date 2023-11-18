import { useState } from 'react'

import reactLogo from './assets/react.svg'
import { Button } from './components/Button'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
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
