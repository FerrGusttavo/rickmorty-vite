export interface LocationListItem {
  id: number
  name: string
  type: string
  dimension: string
}

interface Info {
  count: number
  pages: number
}

export interface GetAllLocationsParams {
  page: number
}

export interface GetAllLocationsResponse {
  info: Info
  results: LocationListItem[]
}
