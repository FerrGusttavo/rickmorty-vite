import { api } from '@/lib/axios/api'

interface Info {
  count: number
  pages: number
  next: string
  prev: string
}

export interface Character {
  id: number
  name: string
  status: string
  species: string
  type: string
  gender: string
  origin: {
    name: string
    url: string
  }
  location: {
    name: string
    url: string
  }
  image: string
  episodes: string[]
  url: string
  created: string
}

interface GetCharactersResponse {
  info: Info
  results: Character[]
}

export async function getCharacters() {
  const response = await api.get<GetCharactersResponse>('/character')

  return response.data
}
