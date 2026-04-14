import axios from 'axios'
import config from '../../config'

const axiosInstance = axios.create({
  baseURL: config.API_BK,
  timeout: 60000,
  headers: { 'Content-Type': 'application/json' },
})

// Injecte le token JWT automatiquement dans chaque requête
axiosInstance.interceptors.request.use((reqconfig) => {
  const token = localStorage.getItem('token')
  if (token) reqconfig.headers.Authorization = `Bearer ${token}`
  return reqconfig
})

export default axiosInstance