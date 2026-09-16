import { prisma } from '../config/prisma.js'
import type {
  CreateTaskInput,
  UpdateTaskInput,
} from '../schemas/taskSchemas.js'

export async function createTask(
  ownerId: string,
  input: CreateTaskInput,
) {
  if (input.projectId) {
    const project = await prisma.project.findFirst({
      where: {
        id: input.projectId,
        ownerId,
      },
      select: {
        id: true,
      },
    })

    if (!project) {
      return null
    }
  }

  return prisma.task.create({
    data: {
      title: input.title,
      description: input.description,
      status: input.status,
      priority: input.priority,
      dueDate: input.dueDate
        ? new Date(input.dueDate)
        : undefined,
      projectId: input.projectId,
      ownerId,
    },
    select: {
      id: true,
      title: true,
      description: true,
      status: true,
      priority: true,
      dueDate: true,
      ownerId: true,
      projectId: true,
      createdAt: true,
      updatedAt: true,
    },
  })
}

export async function getTasks(ownerId: string) {
  return prisma.task.findMany({
    where: {
      ownerId,
    },
    select: {
      id: true,
      title: true,
      description: true,
      status: true,
      priority: true,
      dueDate: true,
      ownerId: true,
      projectId: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
}

export async function getTaskById(
  ownerId: string,
  taskId: string,
) {
  return prisma.task.findFirst({
    where: {
      id: taskId,
      ownerId,
    },
    select: {
      id: true,
      title: true,
      description: true,
      status: true,
      priority: true,
      dueDate: true,
      ownerId: true,
      projectId: true,
      createdAt: true,
      updatedAt: true,
    },
  })
}

export async function updateTask(
  ownerId: string,
  taskId: string,
  input: UpdateTaskInput,
) {
  const existingTask = await prisma.task.findFirst({
    where: {
      id: taskId,
      ownerId,
    },
    select: {
      id: true,
    },
  })

  if (!existingTask) {
    return null
  }

  if (input.projectId) {
    const project = await prisma.project.findFirst({
      where: {
        id: input.projectId,
        ownerId,
      },
      select: {
        id: true,
      },
    })

    if (!project) {
      return null
    }
  }

  return prisma.task.update({
    where: {
      id: existingTask.id,
    },
    data: {
      ...(input.title !== undefined && {
        title: input.title,
      }),
      ...(input.description !== undefined && {
        description: input.description,
      }),
      ...(input.status !== undefined && {
        status: input.status,
      }),
      ...(input.priority !== undefined && {
        priority: input.priority,
      }),
      ...(input.dueDate !== undefined && {
        dueDate: input.dueDate
          ? new Date(input.dueDate)
          : null,
      }),
      ...(input.projectId !== undefined && {
        projectId: input.projectId,
      }),
    },
    select: {
      id: true,
      title: true,
      description: true,
      status: true,
      priority: true,
      dueDate: true,
      ownerId: true,
      projectId: true,
      createdAt: true,
      updatedAt: true,
    },
  })
}

export async function deleteTask(
  ownerId: string,
  taskId: string,
) {
  const existingTask = await prisma.task.findFirst({
    where: {
      id: taskId,
      ownerId,
    },
    select: {
      id: true,
    },
  })

  if (!existingTask) {
    return null
  }

  await prisma.task.delete({
    where: {
      id: existingTask.id,
    },
  })

  return existingTask
}