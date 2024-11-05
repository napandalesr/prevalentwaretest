const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const resolvers = {
  Query: {
    hello: () => '¡Hola desde GraphQL!',
    findUsers: async () => await prisma.user.findMany(),
    findOneUser: async (_: any, args: { id: string; }) => await prisma.user.findUnique({ where: { id: Number(args.id) } }),
    findOneEmail: async (_: any, args: { email: string; }) => await prisma.user.findUnique({ where: { email: args.email } }),
    findMovement: async () => await prisma.movement.findMany({
      include: {
        user: true,
      }
    }),
    getLastMovements: async (_: any, args: { limit: number }) => await prisma.movement.findMany({
      take: args.limit,
        orderBy: {
          date: 'desc',
        },
    })
  },
  Mutation: {
    createUser: async (_: any, args: { email: string; name: string; phone: string, role: 'ADMIN' | "USER" }) => {
      return await prisma.user.create(
        { data: { email: args.email, name: args.name,  phone: args.phone,  role: args.role} }
      );
    },
    createMovement: async (_: any, { input }: { input: any}) => {
      const { concept, amount, date, userId, type } = input;
      return await prisma.movement.create(
        { data: 
          { amount: amount, concept: concept, type: type, date, user: {connect : {id: parseInt(userId)} } } }
      );
    },
    updateUser: async (_: any, args: { id: string, name: string, role: 'ADMIN' | "USER", phone: string }) => await prisma.user.update({
      where: {
        id: parseInt(args.id)
      },
      data: {
        name: args.name,
        role: args.role,
        phone: args.phone
      }
    })
  }
};

export default resolvers;