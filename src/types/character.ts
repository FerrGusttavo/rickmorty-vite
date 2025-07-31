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

interface CharacterDetails extends CharacterListItem {
  origin: {
    name: string
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
  characterId: number
}

export type GetCharacterDetailsResponse = CharacterDetails
