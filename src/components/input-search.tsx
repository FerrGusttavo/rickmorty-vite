import type React from 'react'

export function InputSearch({ ...props }: React.ComponentProps<'input'>) {
  return (
    <label htmlFor="Search" className="relative">
      <input
        type="search"
        id="Search"
        placeholder=""
        className="peer mt-0.5 w-2xs rounded py-1.5 px-2 border border-gray-300 shadow-sm sm:text-sm focus:border-gray-700 transition-colors focus:outline-none"
        {...props}
      />

      <span className="absolute inset-y-2 start-3 -translate-y-5 bg-white px-0.5 text-sm font-medium text-gray-700 transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-5">
        Buscar por nome
      </span>
    </label>
  )
}
