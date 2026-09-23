import apiRequest from './api'

export type AdminUserRole = 'USER' | 'ADMIN'

export type AdminUser = {
  id: string
  name: string
  email: string
  role: AdminUserRole
  createdAt: string
}

type UsersResponse = {
  success: boolean
  users: AdminUser[]
}

type UpdateUserRoleResponse = {
  success: boolean
  user: AdminUser
}

export async function getAdminUsers() {
  return apiRequest<UsersResponse>(
    '/admin/users',
    {
      method: 'GET',
    },
  )
}

export async function updateAdminUserRole(
  userId: string,
  role: AdminUserRole,
) {
  return apiRequest<UpdateUserRoleResponse>(
    `/admin/users/${userId}/role`,
    {
      method: 'PATCH',
      body: JSON.stringify({ role }),
    },
  )
}