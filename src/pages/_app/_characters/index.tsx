import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import { Loading } from '@/components/loading'
import { Pagination } from '@/components/pagination'
import { getAllCharacters } from '@/services/get-all-characters'
import { validatePageParam } from '@/utils/validate-page'
import { CharacterCard } from './-components/character-card'

export const Route = createFileRoute('/_app/_characters/')({
  validateSearch: (search) => {
    return {
      page: validatePageParam(search.page),
    }
  },
  component: Home,
})

function Home() {
  const { page } = Route.useSearch()
  const navigate = useNavigate()

  const {
    data: characters,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['characters', page],
    queryFn: () => getAllCharacters({ page }),
    retry: false,
    placeholderData: keepPreviousData,
  })

  useEffect(() => {
    if (isError) {
      navigate({ search: { page: 1 }, from: Route.fullPath })
    }
  }, [isError, navigate])

  if (isLoading || !characters) {
    return <Loading />
  }

  return (
    <>
      <h2 className="text-xl text-orange-500 font-semibold text-center mb-4">
        Personagens
      </h2>
      {characters.info.pages > 1 && (
        <Pagination
          currentPage={page}
          numberPages={characters.info.pages}
          numberItems={characters.info.count}
        />
      )}
      <div className="w-full bg-gray-50 p-4 grid grid-cols-2 md:grid-cols-4 gap-4">
        {characters.results.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>
    </>
  )
}
