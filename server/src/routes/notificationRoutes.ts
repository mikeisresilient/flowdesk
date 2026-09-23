import { Router } from 'express'
import {
  deleteNotificationController,
  getNotificationsController,
  markAllNotificationsAsReadController,
  markNotificationAsReadController,
} from '../controllers/notificationController.js'
import { requireAuth } from '../middleware/authMiddleware.js'

const router = Router()

router.get(
  '/',
  requireAuth,
  getNotificationsController,
)

router.patch(
  '/read-all',
  requireAuth,
  markAllNotificationsAsReadController,
)

router.patch(
  '/:id/read',
  requireAuth,
  markNotificationAsReadController,
)

router.delete(
  '/:id',
  requireAuth,
  deleteNotificationController,
)

export default router