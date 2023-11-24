import { Outlet } from 'react-router-dom'

import Sidebar from './components/Sidebar'

import './styles/app.scss'

function App() {
  return (
    <div className="wrapper">
      <Sidebar />
      <Outlet />
    </div>
  )
}

export default App
