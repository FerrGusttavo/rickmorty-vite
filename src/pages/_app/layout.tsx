import { createFileRoute, Outlet } from '@tanstack/react-router'
import { Header } from '@/components/header'

export const Route = createFileRoute('/_app')({
  component: AppLayout,
})

function AppLayout() {
  return (
    <>
      <Header />
      <div className="w-full max-w-4xl mx-auto my-4 px-4 md:px-0">
        <Outlet />
      </div>
    </>
  )
}
