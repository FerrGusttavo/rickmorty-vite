import { useRouter } from '@tanstack/react-router'

export function BackButton() {
  const router = useRouter()
  return (
    <button
      type="button"
      className="flex items-center p-1 w-min transition-color cursor-pointer"
      aria-label="Return to previous page"
      onClick={() => router.history.back()}
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
      <span>Voltar</span>
    </button>
  )
}
