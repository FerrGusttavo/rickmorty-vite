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

export interface CharacterDetails extends CharacterListItem {
  origin: {
    name: string
    url: string
  }
  location: {
    name: string
    url: string
  }
  episode: string[]
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

export interface GetCharacterDetailsRequestParams {
  charactersIds: number[]
}

export type GetCharacterDetailsResponse = CharacterDetails
