import { Router } from 'express'
import {
  getUsersController,
  updateUserRoleController,
} from '../controllers/adminController.js'
import { requireAuth } from '../middleware/authMiddleware.js'
import { requireRole } from '../middleware/roleMiddleware.js'

const router = Router()

router.get(
  '/users',
  requireAuth,
  requireRole('ADMIN'),
  getUsersController,
)

router.patch(
  '/users/:id/role',
  requireAuth,
  requireRole('ADMIN'),
  updateUserRoleController,
)

export default router