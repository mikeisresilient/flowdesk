import { prisma } from '../config/prisma.js'
import type {
  CreateTaskInput,
  UpdateTaskInput,
} from '../schemas/taskSchemas.js'
import { createNotification } from './notificationService.js'

type TaskStatus =
  | 'TODO'
  | 'IN_PROGRESS'
  | 'COMPLETED'

const allowedTaskTransitions: Record<
  TaskStatus,
  TaskStatus[]
> = {
  TODO: ['IN_PROGRESS'],
  IN_PROGRESS: ['TODO', 'COMPLETED'],
  COMPLETED: ['IN_PROGRESS'],
}

function isValidTaskStatusTransition(
  currentStatus: TaskStatus,
  nextStatus: TaskStatus,
) {
  return allowedTaskTransitions[
    currentStatus
  ].includes(nextStatus)
}

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

  const task = await prisma.task.create({
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

  await createNotification(
    ownerId,
    'Task created',
    `The task "${task.title}" has been created successfully.`,
    'INFO',
  )

  return task
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
      title: true,
      status: true,
    },
  })

  if (!existingTask) {
    return null
  }

  if (input.status !== undefined) {
    if (
      input.status !== existingTask.status &&
      !isValidTaskStatusTransition(
        existingTask.status,
        input.status,
      )
    ) {
      throw new Error(
        'INVALID_TASK_STATUS_TRANSITION',
      )
    }
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

  const updatedTask = await prisma.task.update({
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

  if (
    input.status !== undefined &&
    input.status !== existingTask.status
  ) {
    const statusNotifications: Record<
      TaskStatus,
      {
        title: string
        message: string
        type: 'INFO' | 'SUCCESS'
      }
    > = {
      TODO: {
        title: 'Task moved back to to do',
        message: `The task "${updatedTask.title}" has been moved back to to do.`,
        type: 'INFO',
      },

      IN_PROGRESS: {
        title: 'Task in progress',
        message: `The task "${updatedTask.title}" is now in progress.`,
        type: 'INFO',
      },

      COMPLETED: {
        title: 'Task completed',
        message: `The task "${updatedTask.title}" has been completed successfully.`,
        type: 'SUCCESS',
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

  return updatedTask
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