import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const id = 'cc947b06-826e-47dd-8d1a-7ed04b95a69f';
  console.log('Searching for teacher with ID:', id);
  const teacher = await prisma.teacher.findUnique({
    where: { id }
  });
  console.log('Teacher:', teacher);
}

main().finally(() => prisma.$disconnect());
