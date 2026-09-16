import apiRequest from './api'

export type TaskStatus =
  | 'TODO'
  | 'IN_PROGRESS'
  | 'COMPLETED'

export type TaskPriority =
  | 'HIGH'
  | 'MEDIUM'
  | 'LOW'

export type Task = {
  id: string
  title: string
  description: string | null
  status: TaskStatus
  priority: TaskPriority
  dueDate: string | null
  ownerId: string
  projectId: string | null
  createdAt: string
  updatedAt: string
}

export type CreateTaskPayload = {
  title: string
  description?: string
  status?: TaskStatus
  priority?: TaskPriority
  dueDate?: string
  projectId?: string
}

export type UpdateTaskPayload = {
  title?: string
  description?: string | null
  status?: TaskStatus
  priority?: TaskPriority
  dueDate?: string | null
  projectId?: string | null
}

type TasksResponse = {
  success: boolean
  tasks: Task[]
}

type TaskResponse = {
  success: boolean
  task: Task
}

export async function getTasks() {
  const response = await apiRequest<TasksResponse>(
    '/tasks',
    {
      method: 'GET',
    },
  )

  return response.tasks
}

export async function getTaskById(id: string) {
  const response = await apiRequest<TaskResponse>(
    `/tasks/${id}`,
    {
      method: 'GET',
    },
  )

  return response.task
}

export async function createTask(
  payload: CreateTaskPayload,
) {
  const response = await apiRequest<TaskResponse>(
    '/tasks',
    {
      method: 'POST',
      body: JSON.stringify(payload),
    },
  )

  return response.task
}

export async function updateTask(
  id: string,
  payload: UpdateTaskPayload,
) {
  const response = await apiRequest<TaskResponse>(
    `/tasks/${id}`,
    {
      method: 'PATCH',
      body: JSON.stringify(payload),
    },
  )

  return response.task
}

export async function deleteTask(id: string) {
  await apiRequest<void>(`/tasks/${id}`, {
    method: 'DELETE',
  })
}