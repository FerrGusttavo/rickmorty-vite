import { createFileRoute, Outlet } from '@tanstack/react-router'
import { Header } from '@/components/header'

export const Route = createFileRoute('/_app')({
  component: AppLayout,
})

function AppLayout() {
  return (
    <>
      <Header />
      <div className="w-full max-w-4xl mx-auto px-4">
        <Outlet />
      </div>
    </>
  )
}
