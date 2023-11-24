import { createBrowserRouter } from 'react-router-dom'

import App from '../App'
import IndexPage from '../pages/index.page'
import authRoutes from './auth.routes'
import RequireAuth from '../components/RequireAuth'

const router = createBrowserRouter([
  {
    path: '',
    element: <App />,
    children: [
      {
        path: '/',
        element: (
          <RequireAuth>
            <IndexPage />
          </RequireAuth>
        ),
      },
      ...authRoutes,
    ],
  },
])

export default router
