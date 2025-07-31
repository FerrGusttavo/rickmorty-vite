import { isAxiosError } from 'axios'
import { api } from '@/lib/axios/api'
import type {
  GetLocationByIdParams,
  GetLocationByIdResponse,
} from '@/types/location'

export async function getLocationById({
  locationId,
}: GetLocationByIdParams): Promise<GetLocationByIdResponse> {
  try {
    const response = await api.get<GetLocationByIdResponse>(
      `/location/${locationId}`,
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
