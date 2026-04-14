import type { LoginRequestDto } from '../../helpers/dto/auth/LoginRequestDto'
import type { LoginResponseDto } from '../../helpers/dto/auth/LoginResponseDto'
import { AUTH_ACTIONS } from './constants'

export const loginRequest = (payload: LoginRequestDto) => ({
  type: AUTH_ACTIONS.LOGIN_REQUEST,
  payload,
})

export const loginSuccess = (payload: LoginResponseDto) => ({
  type: AUTH_ACTIONS.LOGIN_SUCCESS,
  payload,
})

export const loginFailure = (message: string) => ({
  type: AUTH_ACTIONS.LOGIN_FAILURE,
  payload: message,
})

export const logout = () => ({
  type: AUTH_ACTIONS.LOGOUT,
})