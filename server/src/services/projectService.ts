import { prisma } from '../config/prisma.js'
import type {
  CreateProjectInput,
  UpdateProjectInput,
} from '../schemas/projectSchemas.js'
import { createNotification } from './notificationService.js'

type ProjectStatus =
  | 'PLANNING'
  | 'ACTIVE'
  | 'COMPLETED'
  | 'ON_HOLD'

export async function createProject(
  ownerId: string,
  input: CreateProjectInput,
) {
  const project = await prisma.project.create({
    data: {
      name: input.name,
      description: input.description,
      status: input.status,
      progress: input.progress,
      ownerId,
    },
    select: {
      id: true,
      name: true,
      description: true,
      status: true,
      progress: true,
      ownerId: true,
      createdAt: true,
      updatedAt: true,
    },
  })

  await createNotification(
    ownerId,
    'Project created',
    `The project "${project.name}" has been created successfully.`,
    'INFO',
  )

  return project
}

export async function getProjects(ownerId: string) {
  return prisma.project.findMany({
    where: {
      ownerId,
    },
    select: {
      id: true,
      name: true,
      description: true,
      status: true,
      progress: true,
      ownerId: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
}

export async function getProjectById(
  ownerId: string,
  projectId: string,
) {
  return prisma.project.findFirst({
    where: {
      id: projectId,
      ownerId,
    },
    select: {
      id: true,
      name: true,
      description: true,
      status: true,
      progress: true,
      ownerId: true,
      createdAt: true,
      updatedAt: true,
    },
  })
}

export async function updateProject(
  ownerId: string,
  projectId: string,
  input: UpdateProjectInput,
) {
  const existingProject = await prisma.project.findFirst({
    where: {
      id: projectId,
      ownerId,
    },
    select: {
      id: true,
      name: true,
      status: true,
    },
  })

  if (!existingProject) {
    return null
  }

  const statusChanged =
    input.status !== undefined &&
    input.status !== existingProject.status

  const updatedProject = await prisma.project.update({
    where: {
      id: existingProject.id,
    },
    data: {
      ...(input.name !== undefined && {
        name: input.name,
      }),

      ...(input.description !== undefined && {
        description: input.description,
      }),

      ...(input.status !== undefined && {
        status: input.status,
      }),

      ...(input.progress !== undefined && {
        progress: input.progress,
      }),
    },
    select: {
      id: true,
      name: true,
      description: true,
      status: true,
      progress: true,
      ownerId: true,
      createdAt: true,
      updatedAt: true,
    },
  })

  if (statusChanged && input.status !== undefined) {
    const statusNotifications: Record<
      ProjectStatus,
      {
        title: string
        message: string
        type: 'INFO' | 'SUCCESS' | 'WARNING'
      }
    > = {
      PLANNING: {
        title: 'Project moved to planning',
        message: `The project "${updatedProject.name}" is now in planning.`,
        type: 'INFO',
      },

      ACTIVE: {
        title: 'Project active',
        message: `The project "${updatedProject.name}" is now active.`,
        type: 'INFO',
      },

      COMPLETED: {
        title: 'Project completed',
        message: `The project "${updatedProject.name}" has been marked as completed.`,
        type: 'SUCCESS',
      },

      ON_HOLD: {
        title: 'Project on hold',
        message: `The project "${updatedProject.name}" has been put on hold.`,
        type: 'WARNING',
      },
    }

    const notification =
      statusNotifications[input.status]

    await createNotification(
      ownerId,
      notification.title,
      notification.message,
      notification.type,
    )
  }

  return updatedProject
}

export async function deleteProject(
  ownerId: string,
  projectId: string,
) {
  const existingProject = await prisma.project.findFirst({
    where: {
      id: projectId,
      ownerId,
    },
    select: {
      id: true,
    },
  })

  if (!existingProject) {
    return null
  }

  await prisma.project.delete({
    where: {
      id: existingProject.id,
    },
  })

  return existingProject
}