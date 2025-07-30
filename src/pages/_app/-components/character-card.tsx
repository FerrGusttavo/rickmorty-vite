import { Link } from '@tanstack/react-router'
import { useState } from 'react'
import type { Character } from '@/services/get-all-characters'

interface CharacterCardProps {
  character: Character
}

export function CharacterCard({ character }: CharacterCardProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true)

  return (
    <Link
      to={`character/${character.id}`}
      className="bg-gray-100 p-4 space-y-2 rounded-md"
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
        <span className="text-gray-600">Condição:</span>
        <span
          className={`font-medium ${
            character.status === 'Alive'
              ? 'text-green-500'
              : character.status === 'Dead'
                ? 'text-red-500'
                : 'text-gray-800'
          }`}
        >
          {character.status}
        </span>
      </div>

      <div className="flex flex-col text-sm text-center">
        <span className="text-gray-600">Última localização:</span>
        <span>{character.location.name}</span>
      </div>
    </Link>
  )
}
