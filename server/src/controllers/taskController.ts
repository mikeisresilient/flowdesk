import type { Response } from 'express'
import type { AuthenticatedRequest } from '../types/auth.js'
import {
  createTaskSchema,
  updateTaskSchema,
} from '../schemas/taskSchemas.js'
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from '../services/taskService.js'

function getTaskId(req: AuthenticatedRequest) {
  return Array.isArray(req.params.id)
    ? req.params.id[0]
    : req.params.id
}

export async function createTaskController(
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

  const parsed = createTaskSchema.safeParse(req.body)

  if (!parsed.success) {
    res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: parsed.error.flatten().fieldErrors,
    })
    return
  }

  try {
    const task = await createTask(
      req.user.id,
      parsed.data,
    )

    if (!task) {
      res.status(404).json({
        success: false,
        message: 'Project not found',
      })
      return
    }

    res.status(201).json({
      success: true,
      task,
    })
  } catch (error) {
    console.error('Task creation error:', error)

    res.status(500).json({
      success: false,
      message: 'Unable to create task',
    })
  }
}

export async function getTasksController(
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
    const tasks = await getTasks(req.user.id)

    res.status(200).json({
      success: true,
      tasks,
    })
  } catch (error) {
    console.error('Task retrieval error:', error)

    res.status(500).json({
      success: false,
      message: 'Unable to retrieve tasks',
    })
  }
}

export async function getTaskByIdController(
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

  const taskId = getTaskId(req)

  if (!taskId) {
    res.status(400).json({
      success: false,
      message: 'Task ID is required',
    })
    return
  }

  try {
    const task = await getTaskById(
      req.user.id,
      taskId,
    )

    if (!task) {
      res.status(404).json({
        success: false,
        message: 'Task not found',
      })
      return
    }

    res.status(200).json({
      success: true,
      task,
    })
  } catch (error) {
    console.error('Task retrieval error:', error)

    res.status(500).json({
      success: false,
      message: 'Unable to retrieve task',
    })
  }
}

export async function updateTaskController(
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

  const taskId = getTaskId(req)

  if (!taskId) {
    res.status(400).json({
      success: false,
      message: 'Task ID is required',
    })
    return
  }

  const parsed = updateTaskSchema.safeParse(req.body)

  if (!parsed.success) {
    res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: parsed.error.flatten().fieldErrors,
    })
    return
  }

  try {
    const task = await updateTask(
      req.user.id,
      taskId,
      parsed.data,
    )

    if (!task) {
      res.status(404).json({
        success: false,
        message: 'Task or project not found',
      })
      return
    }

    res.status(200).json({
      success: true,
      task,
    })
  } catch (error) {
    console.error('Task update error:', error)

    res.status(500).json({
      success: false,
      message: 'Unable to update task',
    })
  }
}

export async function deleteTaskController(
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

  const taskId = getTaskId(req)

  if (!taskId) {
    res.status(400).json({
      success: false,
      message: 'Task ID is required',
    })
    return
  }

  try {
    const task = await deleteTask(
      req.user.id,
      taskId,
    )

    if (!task) {
      res.status(404).json({
        success: false,
        message: 'Task not found',
      })
      return
    }

    res.status(204).send()
  } catch (error) {
    console.error('Task deletion error:', error)

    res.status(500).json({
      success: false,
      message: 'Unable to delete task',
    })
  }
}