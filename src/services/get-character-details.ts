import { isAxiosError } from 'axios'
import { api } from '@/lib/axios/api'
import type {
  GetCharacterDetailsRequestParams,
  GetCharacterDetailsResponse,
} from '@/types/character'

export async function getCharacterDetails({
  characterId,
}: GetCharacterDetailsRequestParams): Promise<GetCharacterDetailsResponse> {
  try {
    const response = await api.get<GetCharacterDetailsResponse>(
      `/character/${characterId}`,
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
