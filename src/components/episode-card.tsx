import { Link } from '@tanstack/react-router'
import type { EpisodeListItem } from '@/@types/episode'

interface EpisodeCardProps {
  episode: EpisodeListItem
}

export function EpisodeCard({ episode }: EpisodeCardProps) {
  return (
    <Link
      to={'/episodes/$episodeId'}
      params={{ episodeId: episode.id }}
      className="bg-gray-200 p-4 space-y-2 rounded-md flex items-center h-40 justify-center border border-gray-300 shadow-md"
    >
      <div className="flex flex-col items-center gap-2">
        <h2 className="text-center font-semibold">{episode.name}</h2>
        <div className="flex text-sm text-center gap-1">
          <span className="text-gray-800">Episódio:</span>
          <span>{episode.episode}</span>
        </div>
        <div className="flex flex-col text-sm text-center">
          <span className="text-gray-800">Data de exibição:</span>
          <span>{episode.air_date}</span>
        </div>
      </div>
    </Link>
  )
}
