import type { Response } from 'express'
import type { AuthenticatedRequest } from '../types/auth.js'
import { getDashboardStats } from '../services/dashboardService.js'

export async function getDashboardController(
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
    const stats = await getDashboardStats(req.user.id)

    res.status(200).json({
      success: true,
      stats,
    })
  } catch (error) {
    console.error('Dashboard retrieval error:', error)

    res.status(500).json({
      success: false,
      message: 'Unable to retrieve dashboard data',
    })
  }
}