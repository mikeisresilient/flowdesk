import { z } from 'zod'

export const createProjectSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Project name must be at least 2 characters')
    .max(100, 'Project name must not exceed 100 characters'),

  description: z
    .string()
    .trim()
    .max(1000, 'Description must not exceed 1000 characters')
    .optional(),

  status: z
    .enum(['PLANNING', 'ACTIVE', 'COMPLETED', 'ON_HOLD'])
    .default('PLANNING'),

  progress: z
    .number()
    .int('Progress must be a whole number')
    .min(0, 'Progress cannot be below 0')
    .max(100, 'Progress cannot exceed 100')
    .default(0),
})

export type CreateProjectInput = z.infer<typeof createProjectSchema>

export const updateProjectSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, 'Project name must be at least 2 characters')
      .max(100, 'Project name must not exceed 100 characters')
      .optional(),

    description: z
      .string()
      .trim()
      .max(1000, 'Description must not exceed 1000 characters')
      .nullable()
      .optional(),

    status: z
      .enum(['PLANNING', 'ACTIVE', 'COMPLETED', 'ON_HOLD'])
      .optional(),

    progress: z
      .number()
      .int('Progress must be a whole number')
      .min(0, 'Progress cannot be below 0')
      .max(100, 'Progress cannot exceed 100')
      .optional(),
  })
  .refine(
    (data) => Object.keys(data).length > 0,
    {
      message: 'At least one field must be provided',
    },
  )

export type UpdateProjectInput = z.infer<typeof updateProjectSchema>