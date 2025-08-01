import { isAxiosError } from 'axios'
import type {
  GetEpisodeByIdParams,
  GetEpisodeByIdResponse,
} from '@/@types/episode'
import { api } from '@/lib/axios/api'

export async function getEpisodeById({
  episodesIds,
}: GetEpisodeByIdParams): Promise<GetEpisodeByIdResponse[]> {
  try {
    const response = await api.get<
      GetEpisodeByIdResponse | GetEpisodeByIdResponse[]
    >(`/episode/${episodesIds.join(',')}`)
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
