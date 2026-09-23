import { z } from 'zod'

const taskStatusSchema = z.enum([
  'TODO',
  'IN_PROGRESS',
  'COMPLETED',
])

const taskPrioritySchema = z.enum([
  'LOW',
  'MEDIUM',
  'HIGH',
])

export const createTaskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, 'Task title must be at least 2 characters')
    .max(150, 'Task title must not exceed 150 characters'),

  description: z
    .string()
    .trim()
    .max(2000, 'Description must not exceed 2000 characters')
    .optional(),

  status: taskStatusSchema.default('TODO'),

  priority: taskPrioritySchema.default('MEDIUM'),

  dueDate: z
    .string()
    .datetime({
      offset: true,
    })
    .optional(),

  projectId: z
    .string()
    .trim()
    .min(1, 'Project ID is invalid')
    .optional(),
})

export const updateTaskSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(2, 'Task title must be at least 2 characters')
      .max(150, 'Task title must not exceed 150 characters')
      .optional(),

    description: z
      .string()
      .trim()
      .max(2000, 'Description must not exceed 2000 characters')
      .nullable()
      .optional(),

    status: taskStatusSchema.optional(),

    priority: taskPrioritySchema.optional(),

    dueDate: z
      .string()
      .datetime({
        offset: true,
      })
      .nullable()
      .optional(),

    projectId: z
      .string()
      .trim()
      .min(1, 'Project ID is invalid')
      .nullable()
      .optional(),
  })
  .refine(
    (data) => Object.keys(data).length > 0,
    {
      message: 'At least one field must be provided',
    },
  )

export type CreateTaskInput = z.infer<typeof createTaskSchema>
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>