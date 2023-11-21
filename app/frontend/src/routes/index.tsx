import { RootRoute, Route, Router } from '@tanstack/react-router'
import App from '../App'
import IndexPage from '../pages/index.pages'

const rootRoute = new RootRoute({
  component: () => <App />,
})

const indexRoute = new Route({
  path: '/',
  component: () => <IndexPage />,
  getParentRoute: () => rootRoute,
})

const routeTree = rootRoute.addChildren([indexRoute])

const router = new Router({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export default router
