import { Link } from '@tanstack/react-router'
import type { Character } from '@/services/get-characters'

interface CharacterCardProps {
  character: Character
}

export function CharacterCard({ character }: CharacterCardProps) {
  return (
    <Link
      to={`character/${character.id}`}
      className="bg-gray-200 p-4 space-y-2"
    >
      <div>
        <img className="rounded" src={character.image} alt={character.name} />
      </div>
      <div className="flex flex-col items-center">
        <h2 className="text-center">{character.name}</h2>
        <span className="text-sm font-light">{character.species}</span>
      </div>
      <div className="text-sm space-x-1 text-center">
        <span className="text-gray-600">Status:</span>
        <span
          className={`font-medium ${character.status === 'Alive' ? 'text-green-500' : character.status === 'Dead' ? 'text-red-500' : 'text-black'}`}
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
