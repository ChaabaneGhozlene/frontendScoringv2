import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../Redux/store'

export default function Root() {
  const user = useSelector((state: RootState) => state.auth?.user)

  // Si pas connecté → page de login
  // Si connecté → (à définir plus tard)
  return user ? <div>Connecté</div> : <Navigate to="/auth/login" replace />
}