import { Link } from '@tanstack/react-router'
import { useState } from 'react'
import type { CharacterListItem } from '@/@types/character'

interface CharacterCardProps {
  character: CharacterListItem
}

export function CharacterCard({ character }: CharacterCardProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true)

  return (
    <Link
      to={'/characters/$characterId'}
      params={{ characterId: character.id }}
      className="bg-gray-200 p-4 space-y-2 rounded-md border border-gray-300 shadow-md"
    >
      <div className="relative w-full h-40">
        {isLoading && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-md" />
        )}
        <img
          src={character.image}
          alt={character.name}
          onLoad={() => setIsLoading(false)}
          className={`w-full h-full object-cover rounded-md transition-opacity duration-300 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
        />
      </div>
      <div className="flex flex-col items-center">
        <h2 className="text-center font-semibold">{character.name}</h2>
        <span className="text-sm font-light">{character.species}</span>
      </div>

      <div className="text-sm space-x-1 text-center">
        <span className="text-gray-800">Condição:</span>
        <span
          className={`font-medium ${
            character.status === 'Alive'
              ? 'text-green-600'
              : character.status === 'Dead'
                ? 'text-red-600'
                : 'text-black'
          }`}
        >
          {character.status}
        </span>
      </div>

      <div className="flex flex-col text-sm text-center">
        <span className="text-gray-800">Última localização:</span>
        <span>{character.location.name}</span>
      </div>
    </Link>
  )
}
