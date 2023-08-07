const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

async function main() {
  const prisma = new PrismaClient();

  const password = await bcrypt.hash('12345678', 10);

  // Create a user
  const user = await prisma.user.create({
    data: {
      username: 'admin',
      email: 'admin@example.com',
      password,
      role: 'ADMIN',
    },
  });

  console.log('User created:', user);

  // Create a client
  const client = await prisma.cliente.create({
    data: {
      nombreCompleto: 'John Doe',
      documento: 12345678,
      email: 'johndoe@example.com',
      condicionIva: 'SomeValue', // Replace with actual value
      cuit: 'SomeCUIT', // Replace with actual value
      telefono: '1234567890',
      esCuentaCorriente: true,
    },
  });

  console.log('Client created:', client);

  prisma.$disconnect();
}

main().catch((error) => {
  console.error('Error:', error);
  process.exit(1);
});
