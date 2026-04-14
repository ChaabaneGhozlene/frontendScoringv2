import type { LoginRequestDto } from "../dto/auth/LoginRequestDto"
import type { LoginResponseDto } from "../dto/auth/LoginResponseDto"
import axiosInstance from "./axiosInstance"

// 🔐 LOGIN
export const loginApi = (credentials: LoginRequestDto) =>
  axiosInstance.post<LoginResponseDto>('/auth/login', credentials)

// 🚪 LOGOUT
export const logoutApi = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('expiresAt')

  return axiosInstance.post('/auth/logout')
}