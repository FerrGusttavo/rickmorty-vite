import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { useMemo } from 'react'
import { Loading } from '@/components/loading'
import { LoadingMini } from '@/components/loading-mini'
import { getCharacterById } from '@/services/get-character-by-id'
import { getEpisodeById } from '@/services/get-episode-by-id'
import { CharacterCard } from '../../../../components/character-card'

export const Route = createFileRoute('/_app/episodes/$episodeId/')({
  head: () => ({
    meta: [
      {
        title: 'Detalhes do Episódio — Rick and Morty',
      },
    ],
  }),
  component: EpisodeDetailsPage,
})

function EpisodeDetailsPage() {
  const { episodeId } = Route.useParams()

  const {
    data: episodes,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['episode', episodeId],
    queryFn: () => getEpisodeById({ episodesIds: [Number(episodeId)] }),
  })

  const episode = episodes?.[0]

  const charactersIds = useMemo(() => {
    return (
      episode?.characters.map((character) =>
        Number(character.split('/').pop()),
      ) ?? []
    )
  }, [episode])

  const {
    data: characters,
    isError: isErrorCharacters,
    isLoading: isLoadingCharacters,
  } = useQuery({
    queryKey: ['characters', charactersIds],
    queryFn: () => getCharacterById({ charactersIds: charactersIds ?? [] }),
    enabled: !!charactersIds?.length,
  })

  if (isLoading) {
    return <Loading />
  }

  if (isError || !episode) {
    return (
      <h1 className="text-center text-red-500 font-semibold">
        Não foi possível carregar o personagem.
      </h1>
    )
  }

  return (
    <>
      <h2 className="text-xl font-semibold text-center mb-4">
        Detalhes do Episódio
      </h2>
      <div className="w-2xs mx-auto bg-gray-200 p-4 space-y-2 rounded-md flex items-center h-40 justify-center">
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-center font-semibold">{episode.name}</h2>
          <div className="flex text-sm text-center gap-1">
            <span className="text-gray-800">Episódio:</span>
            <span>{episode.episode}</span>
          </div>
          <div className="flex flex-col text-sm text-center">
            <span className="text-gray-800">Data de exibição:</span>
            <span>{episode.air_date}</span>
          </div>
        </div>
      </div>
      <h2 className="text-xl font-semibold text-center my-6">
        Participações neste episódio
      </h2>
      {isErrorCharacters ? (
        <div className="text-center text-red-500 font-semibold">
          Erro ao carregar episódios.
        </div>
      ) : isLoadingCharacters ? (
        <LoadingMini />
      ) : (
        <div className="bg-gray-100 rounded p-4 grid grid-cols-4 gap-4">
          {characters?.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))}
        </div>
      )}
    </>
  )
}
