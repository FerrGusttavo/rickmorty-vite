import { isAxiosError } from 'axios'
import { api } from '@/lib/axios/api'

interface Info {
  count: number
  pages: number
}

export interface Character {
  id: number
  name: string
  status: string
  species: string
  location: {
    name: string
  }
  image: string
}

interface GetCharactersRequest {
  page: number
}

interface GetCharactersResponse {
  info: Info
  results: Character[]
}

export async function getAllCharacters({
  page,
}: GetCharactersRequest): Promise<GetCharactersResponse> {
  try {
    const response = await api.get<GetCharactersResponse>(
      `/character?page=${page}`,
    )
    return response.data
  } catch (err) {
    if (isAxiosError(err)) {
      if (err.response?.status === 404) {
        throw err
      }
    }

    throw err
  }
}
