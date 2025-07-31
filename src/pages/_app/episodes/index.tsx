import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import { getAllEpisodes } from '@/services/get-all-episodes'
import { Loading } from '@/shared/components/loading'
import { Pagination } from '@/shared/components/pagination'
import { validatePageParam } from '@/shared/utils/validate-page'
import { EpisodeCard } from './-components/episode-card'

export const Route = createFileRoute('/_app/episodes/')({
  validateSearch: (search) => {
    return {
      page: validatePageParam(search.page),
    }
  },
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
      <h2 className="text-xl text-orange-500 font-semibold text-center mb-4">
        Episódios
      </h2>
      <Pagination
        currentPage={page}
        numberPages={episodes.info.pages}
        numberItems={episodes.info.count}
      />
      <div className="w-full bg-gray-50 p-4 grid grid-cols-2 md:grid-cols-4 gap-4">
        {episodes.results.map((episode) => (
          <EpisodeCard key={episode.id} episode={episode} />
        ))}
      </div>
    </>
  )
}
