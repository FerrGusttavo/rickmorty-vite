import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { getCharacters } from '@/services/get-characters'
import { CharacterCard } from './-components/character-card'

export const Route = createFileRoute('/_app/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data: characters } = useQuery({
    queryKey: ['characters'],
    queryFn: getCharacters,
  })

  return (
    <>
      <h2 className="text-xl text-orange-500 font-semibold text-center mb-4">
        Personagens
      </h2>
      <div className="w-full bg-gray-50 p-4 grid grid-cols-2 md:grid-cols-4 gap-4">
        {characters?.results.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>
    </>
  )
}
