import { createFileRoute, Outlet } from '@tanstack/react-router'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'

export const Route = createFileRoute('/_app')({
  component: AppLayout,
})

function AppLayout() {
  return (
    <>
      <Header />
      <main className="w-full max-w-4xl mx-auto my-4 px-4 mb-20 md:px-0">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
