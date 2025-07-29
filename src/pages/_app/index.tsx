import { useQuery } from '@tanstack/react-query'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Pagination } from '@/components/pagination'
import { getCharacters } from '@/services/get-characters'
import { CharacterCard } from './-components/character-card'

export const Route = createFileRoute('/_app/')({
  validateSearch: (search) => ({
    page: Number(search.page ?? 1),
  }),
  component: Home,
})

function Home() {
  const { page } = Route.useSearch()
  const navigate = useNavigate({ from: Route.fullPath })

  const { data: characters } = useQuery({
    queryKey: ['characters', page],
    queryFn: () => getCharacters({ page }),
  })

  function changePage(newPage: number) {
    navigate({ search: (old) => ({ ...old, page: newPage }) })
  }

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
      <Pagination
        currentPage={page}
        maxPages={characters?.info.pages}
        onPageChange={changePage}
      />
    </>
  )
}
