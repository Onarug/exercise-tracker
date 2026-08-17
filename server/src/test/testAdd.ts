import { prisma } from '../utils/prisma.js'
// API calls have been tested with requestly will add once I figure out how to 
async function main() {
  const user = await prisma.user.create({
    data: {
      email: 'test@example.com',
      password: 'test',
      name: 'Test User',
    },
  })
  console.log('Created test user:', user)
}

main()
  .catch((err) => {
    console.error('Error creating test user:', err)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })