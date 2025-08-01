import { isAxiosError } from 'axios'
import type {
  GetAllCharactersParams,
  GetAllCharactersResponse,
} from '@/@types/character'
import { api } from '@/lib/axios/api'

export async function getAllCharacters({
  page,
}: GetAllCharactersParams): Promise<GetAllCharactersResponse> {
  try {
    const response = await api.get<GetAllCharactersResponse>(
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
