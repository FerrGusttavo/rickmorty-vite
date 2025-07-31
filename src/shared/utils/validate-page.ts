export function validatePageParam(param: unknown): number {
  const page = Number(param ?? 1)

  if (Number.isInteger(page) && page > 0) {
    return page
  }

  return 1
}
