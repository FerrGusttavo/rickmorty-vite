import { useQuery } from '@tanstack/react-query'
import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect, useMemo, useState } from 'react'
import { BackButton } from '@/components/back-button'
import { EpisodeCard } from '@/components/episode-card'
import { Loading } from '@/components/loading'
import { LoadingMini } from '@/components/loading-mini'
import { getCharacterById } from '@/services/get-character-by-id'
import { getEpisodeById } from '@/services/get-episode-by-id'
import { getIdFromUrl } from '@/utils/get-id-from-url'

export const Route = createFileRoute('/_app/characters/$characterId/')({
  head: () => ({
    meta: [
      {
        title: 'Detalhes do Personagem — Rick and Morty',
      },
    ],
  }),
  component: CharacterDetailsPage,
})

function CharacterDetailsPage() {
  const { characterId } = Route.useParams()
  const [showImage, setShowImage] = useState(false)

  const {
    data: characters,
    isError,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ['character', characterId],
    queryFn: () => getCharacterById({ charactersIds: characterId }),
  })

  const character = characters?.[0]

  const episodesIds = useMemo(() => {
    return (
      character?.episode.map((episode) => Number(episode.split('/').pop())) ??
      []
    )
  }, [character])

  const {
    data: episodes,
    isError: isErrorEpisodes,
    isLoading: isLoadingEpisodes,
  } = useQuery({
    queryKey: ['episodes', episodesIds],
    queryFn: () => getEpisodeById({ episodesIds: episodesIds ?? [] }),
    enabled: !!episodesIds.length,
  })

  useEffect(() => {
    if (isSuccess) {
      const timeout = setTimeout(() => {
        setShowImage(true)
      }, 300) // delay pós-carregamento dos dados

      return () => clearTimeout(timeout)
    }
  }, [isSuccess])

  if (isLoading) {
    return <Loading />
  }

  if (isError || !character) {
    return (
      <h1 className="text-center text-red-500 font-semibold">
        Não foi possível carregar o personagem.
      </h1>
    )
  }

  return (
    <>
      <BackButton />
      <h2 className="text-xl font-semibold text-center mb-4">
        Detalhes do Personagem
      </h2>
      <div className="bg-gray-200 rounded-md max-w-2xl p-4 mx-auto h-64 flex items-center gap-4 justify-center shadow-lg">
        <img
          src={character.image}
          alt={character.name}
          className={`h-full object-cover rounded-md transition-opacity shadow duration-300 ${
            showImage ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <div className="flex flex-col gap-2 justify-around h-full">
          <div>
            <h3 className="text-xl font-semibold">{character.name}</h3>
            <div className="flex items-center space-x-1">
              <span className="font-medium text-gray-600">Espécie:</span>
              <span className="font-light">{character.species}</span>
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-1">
              <span className="font-medium text-gray-600">Origem:</span>
              {character.origin.name === 'unknown' ? (
                <span className="font-light">{character.origin.name}</span>
              ) : (
                <Link
                  from="/characters"
                  to={`/locations/${getIdFromUrl(character.origin.url)}`}
                  className="underline"
                >
                  {character.origin.name}
                </Link>
              )}
            </div>
            <div className="flex items-center space-x-1">
              <span className="font-medium text-gray-600">Condição:</span>
              <span
                className={`font-medium ${
                  character.status === 'Alive'
                    ? 'text-green-600'
                    : character.status === 'Dead'
                      ? 'text-red-600'
                      : 'font-normal'
                }`}
              >
                {character.status}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-left space-x-2">
            <span className="font-medium whitespace-nowrap text-gray-600">
              Última localização:
            </span>
            {character.location.name === 'unknown' ? (
              <span className="font-light">{character.location.name}</span>
            ) : (
              <Link
                from="/characters"
                to={`/locations/${getIdFromUrl(character.location.url)}`}
                className="underline"
              >
                {character.location.name}
              </Link>
            )}
          </div>
        </div>
      </div>
      <h2 className="text-xl font-semibold text-center my-6">
        Episódios com participação de {character.name}
      </h2>
      {isErrorEpisodes ? (
        <div className="text-center text-red-500 font-semibold">
          Erro ao carregar episódios.
        </div>
      ) : isLoadingEpisodes ? (
        <LoadingMini />
      ) : (
        <div className="bg-gray-100 rounded p-4 grid grid-cols-4 gap-4">
          {episodes?.map((episode) => (
            <EpisodeCard key={episode.id} episode={episode} />
          ))}
        </div>
      )}
    </>
  )
}
