export interface ILoginResponse {
  accessToken: string
  refreshToken: string
  tokenType: string
  expiresIn: number
  createdAt: number
}

export interface IUser {
  id: string
  email: string
  createdAt: string
  updatedAt: string
}
