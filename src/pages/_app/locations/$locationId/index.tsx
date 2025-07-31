import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { useMemo } from 'react'
import { getCharacterById } from '@/services/get-character-by-id'
import { getLocationById } from '@/services/get-location-by-id'
import { Loading } from '@/shared/components/loading'
import { LoadingMini } from '@/shared/components/loading-mini'
import { CharacterCard } from '../../_index/-components/character-card'

export const Route = createFileRoute('/_app/locations/$locationId/')({
  component: LocationDetailsPage,
})

function LocationDetailsPage() {
  const { locationId } = Route.useParams()

  const {
    data: location,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['location', locationId],
    queryFn: () => getLocationById({ locationId }),
  })

  const charactersIds = useMemo(() => {
    return (
      location?.residents.map((character) =>
        Number(character.split('/').pop()),
      ) ?? []
    )
  }, [location])

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

  if (isError || !location) {
    return (
      <h1 className="text-center text-red-500 font-semibold">
        Não foi possível carregar o personagem.
      </h1>
    )
  }

  return (
    <>
      <h2 className="text-xl text-orange-500 font-semibold text-center mb-4">
        Detalhes da localização
      </h2>
      <div className="w-2xs mx-auto bg-gray-100 p-4 space-y-2 rounded-md flex items-center h-40 justify-center">
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-center font-semibold">{location.name}</h2>
          <div className="flex text-sm text-center gap-1">
            <span className="text-gray-600">Tipo:</span>
            <span>{location.type}</span>
          </div>
          <div className="flex flex-col text-sm text-center">
            <span className="text-gray-600">Dimensão:</span>
            <span>{location.dimension}</span>
          </div>
        </div>
      </div>
      <h2 className="text-xl text-gray-800 font-semibold text-center my-6">
        Personagens dessa localização
      </h2>
      {isErrorCharacters ? (
        <div className="text-center text-red-500 font-semibold">
          Erro ao carregar personagens.
        </div>
      ) : isLoadingCharacters ? (
        <LoadingMini />
      ) : charactersIds?.length === 0 ? (
        <div className="text-center text-gray-500 font-medium">
          Nenhum personagem encontrado nessa localização.
        </div>
      ) : (
        <div className="bg-gray-50 p-4 grid grid-cols-4 gap-4">
          {characters?.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))}
        </div>
      )}
    </>
  )
}
