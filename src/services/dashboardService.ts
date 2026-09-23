import apiRequest from './api'

export type DashboardStats = {
  projects: {
    total: number
    planning: number
    active: number
    completed: number
    onHold: number
  }
  tasks: {
    total: number
    todo: number
    inProgress: number
    completed: number
  }
}

type DashboardResponse = {
  success: boolean
  stats: DashboardStats
}

export async function getDashboardStats() {
  return apiRequest<DashboardResponse>(
    '/dashboard',
    {
      method: 'GET',
    },
  )
}