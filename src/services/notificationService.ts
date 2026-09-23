import apiRequest from './api'

export type NotificationType =
  | 'INFO'
  | 'SUCCESS'
  | 'WARNING'
  | 'ERROR'

export type Notification = {
  id: string
  title: string
  message: string
  type: NotificationType
  isRead: boolean
  createdAt: string
}

type NotificationsResponse = {
  success: boolean
  notifications: Notification[]
}

type NotificationResponse = {
  success: boolean
  notification: Notification
}

type MarkAllResponse = {
  success: boolean
  count: number
}

export async function getNotifications() {
  return apiRequest<NotificationsResponse>(
    '/notifications',
    {
      method: 'GET',
    },
  )
}

export async function markNotificationAsRead(
  id: string,
) {
  return apiRequest<NotificationResponse>(
    `/notifications/${id}/read`,
    {
      method: 'PATCH',
    },
  )
}

export async function markAllNotificationsAsRead() {
  return apiRequest<MarkAllResponse>(
    '/notifications/read-all',
    {
      method: 'PATCH',
    },
  )
}

export async function deleteNotification(
  id: string,
) {
  return apiRequest<void>(
    `/notifications/${id}`,
    {
      method: 'DELETE',
    },
  )
}