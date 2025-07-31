export interface EpisodeListItem {
  id: number
  name: string
  air_date: string
  episode: string
}

interface Info {
  count: number
  pages: number
}

export interface GetAllEpisodesParams {
  page: number
}

export interface GetAllEpisodesResponse {
  info: Info
  results: EpisodeListItem[]
}

export interface GetEpisodesByIdsParams {
  episodesIds: number[]
}
