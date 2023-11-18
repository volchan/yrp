import { useState } from "react";

import reactLogo from "@/src/assets/react.svg";
import "@/src/App.scss";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <div className="App">
        <div className="App-header">
          <img src={reactLogo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <button onClick={() => setCount(count + 1)}>Count is {count}</button>
        </div>
      </div>
    </div>
  );
}

export default App;
