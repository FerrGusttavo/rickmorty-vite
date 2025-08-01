import { isAxiosError } from 'axios'
import type {
  GetCharacterDetailsRequestParams,
  GetCharacterDetailsResponse,
} from '@/@types/character'
import { api } from '@/lib/axios/api'

export async function getCharacterById({
  charactersIds,
}: GetCharacterDetailsRequestParams): Promise<GetCharacterDetailsResponse[]> {
  try {
    const response = await api.get<
      GetCharacterDetailsResponse | GetCharacterDetailsResponse[]
    >(`/character/${charactersIds}`)
    const data = response.data
    return Array.isArray(data) ? data : [data]
  } catch (err) {
    if (isAxiosError(err)) {
      if (err.response?.status === 404) {
        throw err
      }
    }

    throw err
  }
}
