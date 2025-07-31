import { isAxiosError } from 'axios'
import { api } from '@/lib/axios/api'
import type { EpisodeListItem, GetEpisodesByIdsParams } from '@/types/episode'

export async function getEpisodesByIds({
  episodesIds,
}: GetEpisodesByIdsParams): Promise<EpisodeListItem[]> {
  try {
    const response = await api.get<EpisodeListItem[]>(
      `/episode/${episodesIds.join(',')}`,
    )
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
