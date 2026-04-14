import { lazy, Suspense } from 'react'
import { Navigate, useRoutes } from 'react-router-dom'
import Root from './Root'

// pages
const Login = lazy(() => import('../pages/auth/LoginCover'))

const Load = ({ component: Component }: any) => (
  <Suspense fallback={<div />}>
    <Component />
  </Suspense>
)

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <Root />,
    },
    {
      path: '/auth/login',
      element: <Load component={Login} />,
    },
    {
      path: '*',
      element: <Navigate to="/" replace />,
    },
  ])
}