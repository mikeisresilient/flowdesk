import type { Response } from 'express'
import type { AuthenticatedRequest } from '../types/auth.js'
import {
  deleteNotification,
  getNotifications,
  markAllNotificationsAsRead,
  markNotificationAsRead,
} from '../services/notificationService.js'

function getNotificationId(
  req: AuthenticatedRequest,
) {
  return Array.isArray(req.params.id)
    ? req.params.id[0]
    : req.params.id
}

export async function getNotificationsController(
  req: AuthenticatedRequest,
  res: Response,
) {
  if (!req.user) {
    res.status(401).json({
      success: false,
      message: 'Authentication required',
    })
    return
  }

  try {
    const notifications =
      await getNotifications(req.user.id)

    res.status(200).json({
      success: true,
      notifications,
    })
  } catch (error) {
    console.error(
      'Notification retrieval error:',
      error,
    )

    res.status(500).json({
      success: false,
      message: 'Unable to retrieve notifications',
    })
  }
}

export async function markNotificationAsReadController(
  req: AuthenticatedRequest,
  res: Response,
) {
  if (!req.user) {
    res.status(401).json({
      success: false,
      message: 'Authentication required',
    })
    return
  }

  const notificationId =
    getNotificationId(req)

  if (!notificationId) {
    res.status(400).json({
      success: false,
      message: 'Notification ID is required',
    })
    return
  }

  try {
    const notification =
      await markNotificationAsRead(
        req.user.id,
        notificationId,
      )

    if (!notification) {
      res.status(404).json({
        success: false,
        message: 'Notification not found',
      })
      return
    }

    res.status(200).json({
      success: true,
      notification,
    })
  } catch (error) {
    console.error(
      'Notification update error:',
      error,
    )

    res.status(500).json({
      success: false,
      message: 'Unable to update notification',
    })
  }
}

export async function markAllNotificationsAsReadController(
  req: AuthenticatedRequest,
  res: Response,
) {
  if (!req.user) {
    res.status(401).json({
      success: false,
      message: 'Authentication required',
    })
    return
  }

  try {
    const count =
      await markAllNotificationsAsRead(
        req.user.id,
      )

    res.status(200).json({
      success: true,
      count,
    })
  } catch (error) {
    console.error(
      'Mark all notifications error:',
      error,
    )

    res.status(500).json({
      success: false,
      message:
        'Unable to mark notifications as read',
    })
  }
}

export async function deleteNotificationController(
  req: AuthenticatedRequest,
  res: Response,
) {
  if (!req.user) {
    res.status(401).json({
      success: false,
      message: 'Authentication required',
    })
    return
  }

  const notificationId =
    getNotificationId(req)

  if (!notificationId) {
    res.status(400).json({
      success: false,
      message: 'Notification ID is required',
    })
    return
  }

  try {
    const notification =
      await deleteNotification(
        req.user.id,
        notificationId,
      )

    if (!notification) {
      res.status(404).json({
        success: false,
        message: 'Notification not found',
      })
      return
    }

    res.status(204).send()
  } catch (error) {
    console.error(
      'Notification deletion error:',
      error,
    )

    res.status(500).json({
      success: false,
      message: 'Unable to delete notification',
    })
  }
}