import { isAxiosError } from 'axios'
import { api } from '@/lib/axios/api'
import type {
  GetAllLocationsParams,
  GetAllLocationsResponse,
} from '@/types/location'

export async function getAllLocations({
  page,
}: GetAllLocationsParams): Promise<GetAllLocationsResponse> {
  try {
    const response = await api.get<GetAllLocationsResponse>(
      `/location?page=${page}`,
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
