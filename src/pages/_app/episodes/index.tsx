import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import { Loading } from '@/components/loading'
import { Pagination } from '@/components/pagination'
import { getAllEpisodes } from '@/services/get-all-episodes'
import { validatePageParam } from '@/utils/validate-page'
import { EpisodeCard } from '../../../components/episode-card'

export const Route = createFileRoute('/_app/episodes/')({
  validateSearch: (search) => {
    return {
      page: validatePageParam(search.page),
    }
  },
  head: () => ({
    meta: [
      {
        title: 'Episódios - Rick and Morty',
      },
    ],
  }),
  component: EpisodesPage,
})

function EpisodesPage() {
  const { page } = Route.useSearch()
  const navigate = useNavigate()

  const {
    data: episodes,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['episodes', page],
    queryFn: () => getAllEpisodes({ page }),
    retry: false,
    placeholderData: keepPreviousData,
  })

  useEffect(() => {
    if (isError) {
      navigate({ search: { page: 1 }, from: Route.fullPath })
    }
  }, [isError, navigate])

  if (isLoading || !episodes) {
    return <Loading />
  }

  return (
    <>
      <h2 className="text-xl font-semibold text-center mb-4">Episódios</h2>
      <Pagination
        currentPage={page}
        numberPages={episodes.info.pages}
        numberItems={episodes.info.count}
      />
      <div className="w-full bg-gray-100 p-4 grid grid-cols-2 md:grid-cols-4 gap-4 rounded">
        {episodes.results.map((episode) => (
          <EpisodeCard key={episode.id} episode={episode} />
        ))}
      </div>
    </>
  )
}
