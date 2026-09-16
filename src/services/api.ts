const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:4000/api'

type ApiRequestOptions = RequestInit & {
  body?: BodyInit | null
}

async function apiRequest<T>(
  endpoint: string,
  options: ApiRequestOptions = {},
): Promise<T> {
  const response = await fetch(
    `${API_BASE_URL}${endpoint}`,
    {
      ...options,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    },
  )

  const contentType = response.headers.get('content-type')

  const data = contentType?.includes('application/json')
    ? await response.json()
    : null

  if (!response.ok) {
    const message =
      data?.message || 'Something went wrong'

    throw new Error(message)
  }

  return data as T
}

export default apiRequest