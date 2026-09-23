import type { Response } from 'express'
import type { AuthenticatedRequest } from '../types/auth.js'
import {
  createProjectSchema,
  updateProjectSchema,
} from '../schemas/projectSchemas.js'
import {
  createProject,
  deleteProject,
  getProjectById,
  getProjects,
  updateProject,
} from '../services/projectService.js'

function getAuthenticatedUserId(
  req: AuthenticatedRequest,
  res: Response,
) {
  if (!req.user) {
    res.status(401).json({
      success: false,
      message: 'Authentication required',
    })

    return null
  }

  return req.user.id
}

function getProjectId(
  req: AuthenticatedRequest,
  res: Response,
) {
  const projectId = Array.isArray(req.params.id)
    ? req.params.id[0]
    : req.params.id

  if (!projectId) {
    res.status(400).json({
      success: false,
      message: 'Project ID is required',
    })

    return null
  }

  return projectId
}

export async function createProjectController(
  req: AuthenticatedRequest,
  res: Response,
) {
  const userId = getAuthenticatedUserId(req, res)

  if (!userId) {
    return
  }

  const parsed = createProjectSchema.safeParse(req.body)

  if (!parsed.success) {
    res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: parsed.error.flatten().fieldErrors,
    })

    return
  }

  try {
    const project = await createProject(
      userId,
      parsed.data,
    )

    res.status(201).json({
      success: true,
      project,
    })
  } catch (error) {
    console.error('Project creation error:', error)

    res.status(500).json({
      success: false,
      message: 'Unable to create project',
    })
  }
}

export async function getProjectsController(
  req: AuthenticatedRequest,
  res: Response,
) {
  const userId = getAuthenticatedUserId(req, res)

  if (!userId) {
    return
  }

  try {
    const projects = await getProjects(userId)

    res.status(200).json({
      success: true,
      projects,
    })
  } catch (error) {
    console.error('Project retrieval error:', error)

    res.status(500).json({
      success: false,
      message: 'Unable to retrieve projects',
    })
  }
}

export async function getProjectByIdController(
  req: AuthenticatedRequest,
  res: Response,
) {
  const userId = getAuthenticatedUserId(req, res)

  if (!userId) {
    return
  }

  const projectId = getProjectId(req, res)

  if (!projectId) {
    return
  }

  try {
    const project = await getProjectById(
      userId,
      projectId,
    )

    if (!project) {
      res.status(404).json({
        success: false,
        message: 'Project not found',
      })

      return
    }

    res.status(200).json({
      success: true,
      project,
    })
  } catch (error) {
    console.error('Project retrieval error:', error)

    res.status(500).json({
      success: false,
      message: 'Unable to retrieve project',
    })
  }
}

export async function updateProjectController(
  req: AuthenticatedRequest,
  res: Response,
) {
  const userId = getAuthenticatedUserId(req, res)

  if (!userId) {
    return
  }

  const projectId = getProjectId(req, res)

  if (!projectId) {
    return
  }

  const parsed = updateProjectSchema.safeParse(req.body)

  if (!parsed.success) {
    res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: parsed.error.flatten().fieldErrors,
    })

    return
  }

  try {
    const project = await updateProject(
      userId,
      projectId,
      parsed.data,
    )

    if (!project) {
      res.status(404).json({
        success: false,
        message: 'Project not found',
      })

      return
    }

    res.status(200).json({
      success: true,
      project,
    })
  } catch (error) {
    console.error('Project update error:', error)

    res.status(500).json({
      success: false,
      message: 'Unable to update project',
    })
  }
}

export async function deleteProjectController(
  req: AuthenticatedRequest,
  res: Response,
) {
  const userId = getAuthenticatedUserId(req, res)

  if (!userId) {
    return
  }

  const projectId = getProjectId(req, res)

  if (!projectId) {
    return
  }

  try {
    const project = await deleteProject(
      userId,
      projectId,
    )

    if (!project) {
      res.status(404).json({
        success: false,
        message: 'Project not found',
      })

      return
    }

    res.status(204).send()
  } catch (error) {
    console.error('Project deletion error:', error)

    res.status(500).json({
      success: false,
      message: 'Unable to delete project',
    })
  }
}