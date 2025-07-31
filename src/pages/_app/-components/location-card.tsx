import { Link } from '@tanstack/react-router'
import type { LocationListItem } from '@/types/location'

interface LocationCardProps {
  location: LocationListItem
}

export function LocationCard({ location }: LocationCardProps) {
  return (
    <Link
      to={`location/${location.id}`}
      className="bg-gray-100 p-4 space-y-2 rounded-md flex items-center h-40 justify-center"
    >
      <div className="flex flex-col items-center gap-2">
        <h2 className="text-center font-semibold">{location.name}</h2>
        <div className="flex text-sm text-center gap-1">
          <span className="text-gray-600">Tipo:</span>
          <span>{location.type}</span>
        </div>
        <div className="flex flex-col text-sm text-center">
          <span className="text-gray-600">Dimensão:</span>
          <span>{location.dimension}</span>
        </div>
      </div>
    </Link>
  )
}
