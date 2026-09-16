import { prisma } from '../config/prisma.js'
import type { CreateProjectInput, UpdateProjectInput, } from '../schemas/projectSchemas.js'

export async function createProject(
  ownerId: string,
  input: CreateProjectInput,
) {
  return prisma.project.create({
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
  })

  if (!existingProject) {
    return null
  }

  return prisma.project.update({
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