import { createBrowserRouter } from 'react-router-dom'

import App from '../App'
import IndexPage from '../pages/index.page'
import authRoutes from './auth.routes'

const router = createBrowserRouter([
  {
    path: '',
    element: <App />,
    children: [
      {
        path: '/',
        element: <IndexPage />,
      },
      ...authRoutes,
    ],
  },
])

export default router
