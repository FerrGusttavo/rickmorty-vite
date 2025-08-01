import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { CharacterCard } from '@/components/character-card'
import { InputSearch } from '@/components/input-search'
import { Loading } from '@/components/loading'
import { Pagination } from '@/components/pagination'
import { getAllCharacters } from '@/services/get-all-characters'
import { validatePageParam } from '@/utils/validate-page'

const searchSchema = z.object({
  name: z.string().optional(),
})

type SearchSchema = z.infer<typeof searchSchema>

export const Route = createFileRoute('/_app/characters/')({
  validateSearch: (search) => {
    return {
      page: validatePageParam(search.page),
    }
  },
  head: () => ({
    meta: [
      {
        title: 'Personagens - Rick and Morty',
      },
    ],
  }),
  component: HomePage,
})

function HomePage() {
  const { page, name } = Route.useSearch()
  const navigate = useNavigate({ from: Route.fullPath })

  const {
    data: characters,
    isError,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ['characters', page, name],
    queryFn: () => getAllCharacters({ page, name }),
    retry: false,
    placeholderData: keepPreviousData,
  })

  const { register, handleSubmit, reset, watch } = useForm<SearchSchema>()

  const nameValue = watch('name', '')

  function onSubmit(data: SearchSchema) {
    if (data.name?.length === 0) {
      return navigate({
        search: () => ({
          page: 1,
        }),
      })
    }

    navigate({
      search: () => ({
        page: 1,
        name: data.name?.trim(),
      }),
    })
  }

  function resetFilters() {
    reset()
    navigate({
      search: () => ({
        page: 1,
      }),
    })
  }

  useEffect(() => {
    if (isError) {
      navigate({ search: { page: 1 }, from: Route.fullPath })
    }
  }, [isError, navigate])

  if (isLoading || !characters) {
    return <Loading />
  }

  if (isFetching) {
    return <Loading />
  }

  return (
    <>
      <h2 className="text-xl text-black font-semibold text-center mb-4">
        Personagens
      </h2>
      <div className="flex items-center justify-between mb-1">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex items-center gap-2 "
        >
          <InputSearch {...register('name')} />
          {nameValue?.trim() !== '' && (
            <button
              type="button"
              className="flex size-8 p-4 w-min items-center rounded border border-gray-200 transition-colors cursor-pointer hover:bg-gray-50 rtl:rotate-180 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={resetFilters}
            >
              Limpar
            </button>
          )}
        </form>

        <Pagination
          currentPage={page}
          numberPages={characters.info.pages}
          numberItems={characters.info.count}
        />
      </div>

      <div className="w-full bg-gray-100 rounded p-4 grid grid-cols-2 md:grid-cols-4 gap-4">
        {characters.results.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>
    </>
  )
}
