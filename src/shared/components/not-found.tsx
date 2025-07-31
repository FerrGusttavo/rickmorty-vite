import { useRouter } from '@tanstack/react-router'

export function NotFound() {
  const router = useRouter()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-blue-500 font-bold text-6xl">
        Página não encontrada!
      </h1>
      <span className="text-gray-900 mb-4">Volte para a página anterior.</span>
      <button
        type="button"
        className="w-min p-4 grid size-8 place-content-center rounded border border-gray-200 transition-colors cursor-pointer hover:bg-gray-50 rtl:rotate-180 disabled:opacity-50"
        aria-label="Back to previous page"
        onClick={() => router.history.back()}
      >
        Voltar
      </button>
    </div>
  )
}
