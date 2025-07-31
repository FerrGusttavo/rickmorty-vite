import { createFileRoute, useParams } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_app/_characters/character/$characterId',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const { characterId } = Route.useParams()
  return <div>Hello "/_app/character/" {characterId}!</div>
}
