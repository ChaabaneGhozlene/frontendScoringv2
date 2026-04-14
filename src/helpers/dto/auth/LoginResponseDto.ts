// Correspond à la réponse de POST /api/Auth/login
export interface LoginResponseDto {
  token:     string
  expiresAt: string
}