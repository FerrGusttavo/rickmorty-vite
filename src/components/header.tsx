import { Link, linkOptions } from '@tanstack/react-router'

const options = linkOptions([
  {
    to: '/',
    label: 'Personagens',
    activeOptions: { exact: true, includeSearch: false },
  },
  {
    to: '/episodes',
    label: 'Episódios',
  },
  {
    to: '/locations',
    label: 'Localizações',
  },
])

export function Header() {
  return (
    <header className="flex items-center px-4 h-16 bg-gray-50 shadow-md mb-8">
      <nav className="w-full max-w-4xl mx-auto flex justify-between">
        <h1 className="text-blue-500 font-bold text-2xl">Rick and Morty</h1>
        <div className="flex flex-wrap">
          {options.map((option) => {
            return (
              <Link
                {...option}
                key={option.to}
                activeProps={{ className: `font-semibold text-blue-500` }}
                className="p-2"
              >
                {option.label}
              </Link>
            )
          })}
        </div>
      </nav>
    </header>
  )
}
