import type { Response } from 'express'
import type { AuthenticatedRequest } from '../types/auth.js'
import {
  getAllUsers,
  updateUserRole,
} from '../services/adminService.js'
import type { UserRole } from '../types/auth.js'

function getUserId(
  req: AuthenticatedRequest,
) {
  return Array.isArray(req.params.id)
    ? req.params.id[0]
    : req.params.id
}

function isValidRole(
  value: unknown,
): value is UserRole {
  return value === 'USER' || value === 'ADMIN'
}

export async function getUsersController(
  _req: AuthenticatedRequest,
  res: Response,
) {
  try {
    const users = await getAllUsers()

    res.status(200).json({
      success: true,
      users,
    })
  } catch (error) {
    console.error(
      'Admin user retrieval error:',
      error,
    )

    res.status(500).json({
      success: false,
      message: 'Unable to retrieve users',
    })
  }
}

export async function updateUserRoleController(
  req: AuthenticatedRequest,
  res: Response,
) {
  const userId = getUserId(req)
  const { role } = req.body as {
    role?: unknown
  }

  if (!userId) {
    res.status(400).json({
      success: false,
      message: 'User ID is required',
    })
    return
  }

  if (!isValidRole(role)) {
    res.status(400).json({
      success: false,
      message: 'Role must be USER or ADMIN',
    })
    return
  }

  try {
    const user = await updateUserRole(
      userId,
      role,
    )

    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found',
      })
      return
    }

    res.status(200).json({
      success: true,
      user,
    })
  } catch (error) {
    console.error(
      'Admin user role update error:',
      error,
    )

    res.status(500).json({
      success: false,
      message: 'Unable to update user role',
    })
  }
}