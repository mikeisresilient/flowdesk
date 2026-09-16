import apiRequest from './api'

export type User = {
  id: string
  name: string
  email: string
}

type AuthResponse = {
  success: boolean
  user: User
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
  return apiRequest<AuthResponse>('/auth/login', {
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
  return apiRequest<AuthResponse>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export async function getCurrentUser() {
  return apiRequest<AuthResponse>('/auth/me', {
    method: 'GET',
  })
}

export async function logoutUser() {
  return apiRequest<void>('/auth/logout', {
    method: 'POST',
  })
}