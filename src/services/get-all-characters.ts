import { isAxiosError } from 'axios'
import type {
  GetAllCharactersParams,
  GetAllCharactersResponse,
} from '@/@types/character'
import { api } from '@/lib/axios/api'

export async function getAllCharacters({
  page,
  name,
}: GetAllCharactersParams): Promise<GetAllCharactersResponse> {
  try {
    const params = new URLSearchParams()
    params.append('page', String(page))

    if (name && name.trim() !== '') {
      params.append('name', name.trim())
    }

    const response = await api.get<GetAllCharactersResponse>(
      `/character?${params.toString()}`,
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
