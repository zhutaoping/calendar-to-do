import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { Token } from '@prisma/client'

export const useToken = (token: string) => {
  async function fetchToken() {
    const res = await axios(`/token/api/${token}`)
    return res.data
  }

  return useQuery<Token, Error>({
    queryKey: ['tokens', token],
    queryFn: fetchToken,
    onSuccess: data => {},
    onError: error => {
      console.log('🚀 ~ error:', error)
    },
  })
}
