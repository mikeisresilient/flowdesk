import apiRequest from './api'

export type TaskStatus = 'To do' | 'In progress' | 'Completed'
export type TaskPriority = 'High' | 'Medium' | 'Low'

export type Task = {
  id: number
  title: string
  project: string
  status: TaskStatus
  priority: TaskPriority
  dueDate: string
  assignee: string
}

export async function getTasks(token?: string) {
  return apiRequest<Task[]>('/tasks', {
    method: 'GET',
    token,
  })
}

export async function getTaskById(
  id: number,
  token?: string,
) {
  return apiRequest<Task>(`/tasks/${id}`, {
    method: 'GET',
    token,
  })
}