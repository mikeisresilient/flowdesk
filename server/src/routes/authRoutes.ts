import { Router } from 'express'
import {
  loginController,
  logoutController,
  registerController,
} from '../controllers/authController.js'
import { requireAuth } from '../middleware/authMiddleware.js'
import { requireRole } from '../middleware/roleMiddleware.js'
import type { AuthenticatedRequest } from '../types/auth.js'

const router = Router()

router.post('/register', registerController)

router.post('/login', loginController)

router.get('/me', requireAuth, async (req, res) => {
  const authenticatedRequest = req as AuthenticatedRequest

  res.status(200).json({
    success: true,
    user: authenticatedRequest.user,
  })
})

router.post('/logout', requireAuth, logoutController)

router.get(
  '/admin-test',
  requireAuth,
  requireRole('ADMIN'),
  (_req, res) => {
    res.status(200).json({
      success: true,
      message: 'Admin authorization successful',
    })
  },
)

export default router