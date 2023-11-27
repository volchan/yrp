import apiClient from '../api/client'
import { ILogoutResponse } from '../api/types'

export default async function logoutMutation() {
  const basicToken = btoa(`${import.meta.env.VITE_CLIENT_ID}:${import.meta.env.VITE_CLIENT_SECRET}`)

  const { data } = await apiClient.post<ILogoutResponse>(
    '/oauth/revoke',
    {
      token: localStorage.getItem('accessToken'),
      clientId: import.meta.env.VITE_CLIENT_ID,
      clientSecret: import.meta.env.VITE_CLIENT_SECRET,
    },
    {
      headers: {
        Authorization: `Basic ${basicToken}`,
      },
    },
  )

  return data
}
