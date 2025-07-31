import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useMemo, useState } from 'react'
import { getCharacterDetails } from '@/services/get-character-details'
import { getEpisodesByIds } from '@/services/get-episodes-by-ids'
import { Loading } from '@/shared/components/loading'
import { LoadingMini } from '@/shared/components/loading-mini'
import { EpisodeCard } from '../../../episodes/-components/episode-card'

export const Route = createFileRoute(
  '/_app/_index/character/$characterId/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const { characterId } = Route.useParams()
  const [showImage, setShowImage] = useState(false)

  const {
    data: character,
    isError,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ['character', characterId],
    queryFn: () => getCharacterDetails({ characterId }),
  })

  const episodesIds = useMemo(() => {
    return character?.episode.map((ep) => Number(ep.split('/').pop())) ?? []
  }, [character])

  const {
    data: episodes,
    isError: isErrorEpisodes,
    isLoading: isLoadingEpisodes,
  } = useQuery({
    queryKey: ['episodes', episodesIds],
    queryFn: () => getEpisodesByIds({ episodesIds: episodesIds ?? [] }),
    enabled: !!episodesIds?.length,
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
      <h2 className="text-xl text-orange-500 font-semibold text-center mb-4">
        Detalhes do personagem
      </h2>
      <div className="bg-gray-100 max-w-2xl p-4 mx-auto h-64 flex items-center gap-4 justify-center shadow-lg">
        <img
          src={character?.image}
          alt={character?.name}
          className={`h-full object-cover rounded-md transition-opacity shadow duration-300 ${
            showImage ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <div className="flex flex-col gap-2 justify-around h-full">
          <div>
            <h3 className="text-xl font-semibold">{character?.name}</h3>
            <div className="flex items-center space-x-1">
              <span className="font-medium text-gray-600">Espécie:</span>
              <span className="font-light">{character?.species}</span>
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-1">
              <span className="font-medium text-gray-600">Origem:</span>
              <span className="font-light">{character?.origin.name}</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="font-medium text-gray-600">Condição:</span>
              <span
                className={`font-medium ${
                  character?.status === 'Alive'
                    ? 'text-green-500'
                    : character?.status === 'Dead'
                      ? 'text-red-500'
                      : 'font-normal'
                }`}
              >
                {character?.status}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-left space-x-2">
            <span className="font-medium whitespace-nowrap text-gray-600">
              Última localização:
            </span>
            <span className="font-light whitespace-nowrap">
              {character?.location.name}
            </span>
          </div>
        </div>
      </div>
      <h2 className="text-xl text-gray-800 font-semibold text-center my-6">
        Episódios com participação de {character.name}
      </h2>
      {isErrorEpisodes ? (
        <div className="text-center text-red-500 font-semibold">
          Erro ao carregar episódios.
        </div>
      ) : isLoadingEpisodes ? (
        <LoadingMini />
      ) : (
        <div className="bg-gray-50 p-4 grid grid-cols-4 gap-4">
          {episodes?.map((episode) => (
            <EpisodeCard key={episode.id} episode={episode} />
          ))}
        </div>
      )}
    </>
  )
}
