export interface CharacterListItem {
  id: number
  name: string
  status: string
  species: string
  image: string
  location: {
    name: string
  }
}

interface Info {
  count: number
  pages: number
}

export interface GetAllCharactersParams {
  page: number
}

export interface GetAllCharactersResponse {
  info: Info
  results: CharacterListItem[]
}
