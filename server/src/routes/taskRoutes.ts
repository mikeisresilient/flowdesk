import { Router } from 'express'
import {
  createTaskController,
  getTasksController,
  getTaskByIdController,
  updateTaskController,
  deleteTaskController,
} from '../controllers/taskController.js'
import { requireAuth } from '../middleware/authMiddleware.js'

const router = Router()

router.post('/', requireAuth, createTaskController)
router.get('/', requireAuth, getTasksController)
router.get('/:id', requireAuth, getTaskByIdController)
router.patch('/:id', requireAuth, updateTaskController)
router.delete('/:id', requireAuth, deleteTaskController)

export default router