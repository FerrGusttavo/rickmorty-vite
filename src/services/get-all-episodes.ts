import { isAxiosError } from 'axios'
import type {
  GetAllEpisodesParams,
  GetAllEpisodesResponse,
} from '@/@types/episode'
import { api } from '@/lib/axios/api'

export async function getAllEpisodes({
  page,
}: GetAllEpisodesParams): Promise<GetAllEpisodesResponse> {
  try {
    const response = await api.get<GetAllEpisodesResponse>(
      `/episode?page=${page}`,
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
