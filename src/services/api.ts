const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || '/api'

type RequestOptions = RequestInit & {
  token?: string
}

async function apiRequest<T>(
  endpoint: string,
  options: RequestOptions = {},
): Promise<T> {
  const { token, headers, ...requestOptions } = options

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...requestOptions,
    headers: {
      'Content-Type': 'application/json',
      ...(token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {}),
      ...headers,
    },
  })

  if (!response.ok) {
    throw new Error(
      `API request failed with status ${response.status}`,
    )
  }

  if (response.status === 204) {
    return undefined as T
  }

  return response.json() as Promise<T>
}

export default apiRequest