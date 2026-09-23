import { prisma } from '../config/prisma.js'

export async function getDashboardStats(ownerId: string) {
  const [
    totalProjects,
    planningProjects,
    activeProjects,
    completedProjects,
    onHoldProjects,
    totalTasks,
    todoTasks,
    inProgressTasks,
    completedTasks,
  ] = await Promise.all([
    prisma.project.count({
      where: {
        ownerId,
      },
    }),

    prisma.project.count({
      where: {
        ownerId,
        status: 'PLANNING',
      },
    }),

    prisma.project.count({
      where: {
        ownerId,
        status: 'ACTIVE',
      },
    }),

    prisma.project.count({
      where: {
        ownerId,
        status: 'COMPLETED',
      },
    }),

    prisma.project.count({
      where: {
        ownerId,
        status: 'ON_HOLD',
      },
    }),

    prisma.task.count({
      where: {
        ownerId,
      },
    }),

    prisma.task.count({
      where: {
        ownerId,
        status: 'TODO',
      },
    }),

    prisma.task.count({
      where: {
        ownerId,
        status: 'IN_PROGRESS',
      },
    }),

    prisma.task.count({
      where: {
        ownerId,
        status: 'COMPLETED',
      },
    }),
  ])

  return {
    projects: {
      total: totalProjects,
      planning: planningProjects,
      active: activeProjects,
      completed: completedProjects,
      onHold: onHoldProjects,
    },

    tasks: {
      total: totalTasks,
      todo: todoTasks,
      inProgress: inProgressTasks,
      completed: completedTasks,
    },
  }
}