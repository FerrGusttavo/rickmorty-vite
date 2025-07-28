import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/locations')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_app/locations"!</div>
}
