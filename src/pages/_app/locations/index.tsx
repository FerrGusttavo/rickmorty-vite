import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import { Loading } from '@/components/loading'
import { Pagination } from '@/components/pagination'
import { getAllLocations } from '@/services/get-all-locations'
import { validatePageParam } from '@/utils/validate-page'
import { LocationCard } from '../../../components/location-card'

export const Route = createFileRoute('/_app/locations/')({
  validateSearch: (search) => {
    return {
      page: validatePageParam(search.page),
    }
  },
  head: () => ({
    meta: [
      {
        title: 'Localizações - Rick and Morty',
      },
    ],
  }),
  component: LocationsPage,
})

function LocationsPage() {
  const { page } = Route.useSearch()
  const navigate = useNavigate()

  const {
    data: locations,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['locations', page],
    queryFn: () => getAllLocations({ page }),
    retry: false,
    placeholderData: keepPreviousData,
  })

  useEffect(() => {
    if (isError) {
      navigate({ search: { page: 1 }, from: Route.fullPath })
    }
  }, [isError, navigate])

  if (isLoading || !locations) {
    return <Loading />
  }

  return (
    <>
      <h2 className="text-xl font-semibold text-center mb-4">Localizações</h2>
      <Pagination
        currentPage={page}
        numberPages={locations.info.pages}
        numberItems={locations.info.count}
      />
      <div className="w-full bg-gray-100 p-4 grid grid-cols-2 md:grid-cols-4 gap-4 rounded">
        {locations.results.map((location) => (
          <LocationCard key={location.id} location={location} />
        ))}
      </div>
    </>
  )
}
