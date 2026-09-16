import apiRequest from './api'

export type ProjectStatus =
  | 'PLANNING'
  | 'ACTIVE'
  | 'COMPLETED'
  | 'ON_HOLD'

export type Project = {
  id: string
  name: string
  description: string | null
  status: ProjectStatus
  progress: number
  ownerId: string
  createdAt: string
  updatedAt: string
}

type ProjectsResponse = {
  success: boolean
  projects: Project[]
}

type ProjectResponse = {
  success: boolean
  project: Project
}

export type CreateProjectPayload = {
  name: string
  description?: string
  status?: ProjectStatus
  progress?: number
}

export type UpdateProjectPayload = {
  name?: string
  description?: string | null
  status?: ProjectStatus
  progress?: number
}

export async function getProjects() {
  const response = await apiRequest<ProjectsResponse>(
    '/projects',
    {
      method: 'GET',
    },
  )

  return response.projects
}

export async function getProjectById(id: string) {
  const response = await apiRequest<ProjectResponse>(
    `/projects/${id}`,
    {
      method: 'GET',
    },
  )

  return response.project
}

export async function createProject(
  payload: CreateProjectPayload,
) {
  const response = await apiRequest<ProjectResponse>(
    '/projects',
    {
      method: 'POST',
      body: JSON.stringify(payload),
    },
  )

  return response.project
}

export async function updateProject(
  id: string,
  payload: UpdateProjectPayload,
) {
  const response = await apiRequest<ProjectResponse>(
    `/projects/${id}`,
    {
      method: 'PATCH',
      body: JSON.stringify(payload),
    },
  )

  return response.project
}

export async function deleteProject(id: string) {
  await apiRequest<void>(`/projects/${id}`, {
    method: 'DELETE',
  })
}