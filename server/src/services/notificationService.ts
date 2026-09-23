import { prisma } from '../config/prisma.js'
import type { NotificationType } from '../generated/prisma/enums.js'

export async function createNotification(
  userId: string,
  title: string,
  message: string,
  type: NotificationType = 'INFO',
) {
  return prisma.notification.create({
    data: {
      userId,
      title,
      message,
      type,
    },
    select: {
      id: true,
      title: true,
      message: true,
      type: true,
      isRead: true,
      createdAt: true,
    },
  })
}

export async function getNotifications(
  userId: string,
) {
  return prisma.notification.findMany({
    where: {
      userId,
    },
    select: {
      id: true,
      title: true,
      message: true,
      type: true,
      isRead: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
}

export async function markNotificationAsRead(
  userId: string,
  notificationId: string,
) {
  const notification =
    await prisma.notification.findFirst({
      where: {
        id: notificationId,
        userId,
      },
      select: {
        id: true,
      },
    })

  if (!notification) {
    return null
  }

  return prisma.notification.update({
    where: {
      id: notification.id,
    },
    data: {
      isRead: true,
    },
    select: {
      id: true,
      title: true,
      message: true,
      type: true,
      isRead: true,
      createdAt: true,
    },
  })
}

export async function markAllNotificationsAsRead(
  userId: string,
) {
  const result =
    await prisma.notification.updateMany({
      where: {
        userId,
        isRead: false,
      },
      data: {
        isRead: true,
      },
    })

  return result.count
}

export async function deleteNotification(
  userId: string,
  notificationId: string,
) {
  const notification =
    await prisma.notification.findFirst({
      where: {
        id: notificationId,
        userId,
      },
      select: {
        id: true,
      },
    })

  if (!notification) {
    return null
  }

  await prisma.notification.delete({
    where: {
      id: notification.id,
    },
  })

  return notification
}