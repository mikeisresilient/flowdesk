import 'dotenv/config'
import { prisma } from '../config/prisma.js'

async function promoteToAdmin() {
  const email = process.argv[2]?.trim().toLowerCase()

  if (!email) {
    console.error(
      'Usage: npm run promote:admin -- user@example.com',
    )
    process.exitCode = 1
    return
  }

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  })

  if (!user) {
    console.error(`No user found with email: ${email}`)
    process.exitCode = 1
    return
  }

  if (user.role === 'ADMIN') {
    console.log(`${user.email} is already an ADMIN`)
    return
  }

  const updatedUser = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      role: 'ADMIN',
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  })

  console.log('User promoted successfully:')
  console.log(updatedUser)
}

try {
  await promoteToAdmin()
} catch (error) {
  console.error('Failed to promote user:', error)
  process.exitCode = 1
} finally {
  await prisma.$disconnect()
}