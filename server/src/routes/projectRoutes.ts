import { Router } from 'express'

import {
  createProjectController,
  getProjectsController,
  getProjectByIdController,
  updateProjectController,
  deleteProjectController,
} from '../controllers/projectController.js'

import { requireAuth } from '../middleware/authMiddleware.js'

const router = Router()

router.post('/', requireAuth, createProjectController)

router.get('/', requireAuth, getProjectsController)

router.get('/:id', requireAuth, getProjectByIdController)

router.patch('/:id', requireAuth, updateProjectController)

router.delete('/:id', requireAuth, deleteProjectController)

export default router