import { AUTH_ACTIONS, AUTH_STORAGE_KEYS } from './constants'
import { loginSuccess, loginFailure, logout } from './actions'
import { loginApi, logoutApi } from '../../helpers/api/authapi'
import type { AxiosResponse } from 'axios'
import type { LoginResponseDto } from '../../helpers/dto/auth/LoginResponseDto'
import { call, put, takeLatest } from 'redux-saga/effects'


function* handleLogin(action: any): Generator {
  try {
    const response = (yield call(loginApi, action.payload)) as AxiosResponse<LoginResponseDto>
    const { token, expiresAt } = response.data

    localStorage.setItem(AUTH_STORAGE_KEYS.TOKEN,      token)
    localStorage.setItem(AUTH_STORAGE_KEYS.EXPIRES_AT, expiresAt)

    yield put(loginSuccess({ token, expiresAt }))

  } catch (error: any) {
    const message =
      error.response?.data?.message ||
      error.response?.data         ||
      'Erreur de connexion'
    yield put(loginFailure(message))
  }
}

function* handleLogout(): Generator {
  try { yield call(logoutApi) } catch { /* ignore */ }
}

export function* authSaga() {
  yield takeLatest(AUTH_ACTIONS.LOGIN_REQUEST, handleLogin)
  yield takeLatest(AUTH_ACTIONS.LOGOUT,        handleLogout)
}