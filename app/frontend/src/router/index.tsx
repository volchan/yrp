import { createBrowserRouter } from 'react-router-dom'

import App from '../App'
import IndexPage from '../pages/index.page'
import authRoutes from './auth.routes'
import { ProtectedRoute } from './ProtectedRoute'

const router = createBrowserRouter([
  {
    path: '',
    element: <App />,
    children: [
      ...authRoutes,
      {
        path: '/',
        element: <ProtectedRoute />,
        children: [
          {
            path: '',
            element: <IndexPage />,
          },
        ],
      },
    ],
  },
])

export default router
