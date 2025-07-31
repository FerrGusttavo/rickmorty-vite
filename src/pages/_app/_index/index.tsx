import { createFileRoute, Navigate, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import { Loading } from '@/shared/components/loading'

export const Route = createFileRoute('/_app/_index/')({
  head: () => ({
    meta: [
      {
        title: 'Rick and Morty',
      },
    ],
  }),
  component: Index,
})

function Index() {
  const navigate = useNavigate()

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate({ to: '/characters', replace: true })
    }, 1000)

    return () => clearTimeout(timeout)
  }, [navigate])

  return <Loading />
}
