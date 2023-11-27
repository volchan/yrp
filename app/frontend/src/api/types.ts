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

export interface ILoginInput {
  email: string
  password: string
}

export interface ILogoutResponse {}
