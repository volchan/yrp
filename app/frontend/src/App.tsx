import React from 'react'
import { Outlet } from '@tanstack/react-router'
import Sidebar from './components/Sidebar'

import './styles/app.scss'

const TanStackRouterDevtools =
  import.meta.env.NODE_ENV === 'production'
    ? () => null // Render nothing in production
    : React.lazy(() =>
        // Lazy load in development
        import('@tanstack/router-devtools').then(res => ({
          default: res.TanStackRouterDevtools,
          // For Embedded Mode
          // default: res.TanStackRouterDevtoolsPanel
        })),
      )

function App() {
  return (
    <div className="wrapper">
      <Sidebar />
      <Outlet />
      <TanStackRouterDevtools initialIsOpen={false} />
    </div>
  )
}

export default App
