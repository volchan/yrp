import apiClient from '../api/client'
import { IUser } from '../api/types'

export default async function meQuery() {
  const { data } = await apiClient.get<IUser>('/users/me')
  return data
}
