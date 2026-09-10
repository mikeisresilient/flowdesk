import apiRequest from './api'

type LoginResponse = {
  token: string
  user: {
    name: string
    email: string
  }
}

type RegisterPayload = {
  name: string
  email: string
  password: string
}

export async function loginUser(
  email: string,
  password: string,
) {
  return apiRequest<LoginResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
    }),
  })
}

export async function registerUser(
  payload: RegisterPayload,
) {
  return apiRequest<LoginResponse>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export async function requestPasswordReset(email: string) {
  return apiRequest<{ message: string }>('/auth/forgot-password', {
    method: 'POST',
    body: JSON.stringify({ email }),
  })
}