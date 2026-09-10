import apiRequest from './api'

export type Project = {
  id: number
  name: string
  description: string
  category: string
  progress: number
  status: 'On track' | 'At risk' | 'Completed'
  members: string[]
  dueDate: string
}

export async function getProjects(token?: string) {
  return apiRequest<Project[]>('/projects', {
    method: 'GET',
    token,
  })
}

export async function getProjectById(
  id: number,
  token?: string,
) {
  return apiRequest<Project>(`/projects/${id}`, {
    method: 'GET',
    token,
  })
}