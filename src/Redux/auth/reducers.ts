import type { AuthUserDto } from '../../helpers/dto/auth/AuthUserDto'
import type { LoginResponseDto } from '../../helpers/dto/auth/LoginResponseDto'
import { AUTH_ACTIONS, AUTH_STORAGE_KEYS } from './constants'
import { jwtDecode } from 'jwt-decode'
// ─── Auth State ───────────────────────────────────────────────
interface AuthState {
  user:      AuthUserDto | null
  token:     string      | null
  expiresAt: string      | null
  loading:   boolean
  error:     string      | null
}

// ─── Récupération depuis localStorage ─────────────────────────
const storedToken     = localStorage.getItem(AUTH_STORAGE_KEYS.TOKEN)
const storedExpiresAt = localStorage.getItem(AUTH_STORAGE_KEYS.EXPIRES_AT)

let storedUser:     AuthUserDto | null = null
let validToken:     string      | null = null
let validExpiresAt: string      | null = null

if (storedToken && storedExpiresAt && new Date(storedExpiresAt).getTime() > Date.now()) {
  try {
    storedUser     = jwtDecode<AuthUserDto>(storedToken)
    validToken     = storedToken
    validExpiresAt = storedExpiresAt
  } catch {
    localStorage.removeItem(AUTH_STORAGE_KEYS.TOKEN)
    localStorage.removeItem(AUTH_STORAGE_KEYS.EXPIRES_AT)
  }
}

// ─── Initial State ─────────────────────────────────────────────
const initialState: AuthState = {
  user:      storedUser,
  token:     validToken,
  expiresAt: validExpiresAt,
  loading:   false,
  error:     null,
}

// ─── Reducer ───────────────────────────────────────────────────
export default function authReducer(state = initialState, action: any): AuthState {
  switch (action.type) {

    case AUTH_ACTIONS.LOGIN_REQUEST:
      return { ...state, loading: true, error: null }

    case AUTH_ACTIONS.LOGIN_SUCCESS: {
      const { token, expiresAt } = action.payload as LoginResponseDto
      let user: AuthUserDto | null = null
      try { user = jwtDecode<AuthUserDto>(token) } catch { /* ignore */ }
      return { ...state, token, expiresAt, user, loading: false, error: null }
    }

    case AUTH_ACTIONS.LOGIN_FAILURE:
      return { ...state, loading: false, error: action.payload }

    case AUTH_ACTIONS.LOGOUT:
      localStorage.removeItem(AUTH_STORAGE_KEYS.TOKEN)
      localStorage.removeItem(AUTH_STORAGE_KEYS.EXPIRES_AT)
      return { ...state, user: null, token: null, expiresAt: null }

    default:
      return state
  }
}