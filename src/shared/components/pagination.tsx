import { useNavigate } from '@tanstack/react-router'
import { Route } from '@/pages/__root'

interface PaginationProps {
  currentPage: number
  numberPages: number
  numberItems: number
}

export function Pagination({
  currentPage,
  numberPages,
  numberItems,
}: PaginationProps) {
  const navigate = useNavigate()

  function changePage(newPage: number) {
    navigate({
      search: (old: { page: number }) => ({ ...old, page: newPage }),
      from: Route.fullPath,
    })
  }

  return (
    <ul className="flex justify-center items-center gap-3 text-gray-900 my-4">
      <li>
        <button
          type="button"
          className="grid size-8 place-content-center rounded border border-gray-200 transition-colors cursor-pointer hover:bg-gray-50 rtl:rotate-180 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Previous page"
          disabled={currentPage <= 1}
          onClick={() => changePage(currentPage - 1)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <title>Back icon</title>
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </li>

      <li className="text-sm/8 font-medium tracking-widest">
        {currentPage}/{numberPages}
      </li>

      <li>
        <button
          type="button"
          className="grid size-8 place-content-center rounded border border-gray-200 transition-colors cursor-pointer hover:bg-gray-50 rtl:rotate-180 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Next page"
          disabled={currentPage === numberPages}
          onClick={() => changePage(currentPage + 1)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <title>Next icon</title>
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </li>
      <span>{numberItems} resultados</span>
    </ul>
  )
}
