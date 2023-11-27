import apiClient from '../api/client'
import { ILoginInput, ILoginResponse } from '../api/types'

export default async function loginMutation(input: ILoginInput) {
  const { data } = await apiClient.post<ILoginResponse>('/oauth/token', {
    grant_type: 'password',
    clientId: import.meta.env.VITE_CLIENT_ID,
    clientSecret: import.meta.env.VITE_CLIENT_SECRET,
    ...input,
  })

  return data
}
