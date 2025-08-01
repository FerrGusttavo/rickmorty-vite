import { createFileRoute, Navigate, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import { Loading } from '@/components/loading'

export const Route = createFileRoute('/_app/')({
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
    }, 1500)
    return () => clearTimeout(timeout)
  }, [navigate])

  return (
    <div className="fixed inset-0 h-screen w-screen bg-[#0bff9a] flex bg-surface items-center justify-center z-50">
      <h1 className="text-4xl md:text-5xl font-black drop-shadow-[0_0_15px_#00ffcc] animate-bounce">
        Rick and Morty
      </h1>
    </div>
  )
}
