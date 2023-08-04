const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

async function main() {
  const prisma = new PrismaClient();

  const password = await bcrypt.hash('12345678', 10);

  await prisma.user.update({
    where: {
      username: 'admin',
    },
    data: {
      password,
    },
  });

  prisma.$disconnect();
}

main().catch(() => {
  process.exit(1);
});
