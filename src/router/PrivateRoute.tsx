import { Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import type { IRootState } from '../Redux/store'

const PrivateRoute = ({ component: Component, roles }: any) => {
  const location = useLocation()

  const { token, user } = useSelector((state: IRootState) => state.auth)

  if (!token) {
    return <Navigate to="/auth/login" state={{ from: location }} />
  }

  const userRoles = user?.roles || []

  if (roles && !roles.some((r: string) => userRoles.includes(r))) {
    return <Navigate to="/home" />
  }

  return <Component />
}

export default PrivateRoute