const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const resolvers = {
  Query: {
    hello: () => '¡Hola desde GraphQL!',
    findUsers: async () => await prisma.user.findMany(),
    findOneUser: async (_: any, args: { id: string; }) => await prisma.user.findUnique({ where: { id: Number(args.id) } }),
    findOneEmail: async (_: any, args: { email: string; }) => await prisma.user.findUnique({ where: { email: args.email } })
  },
  Mutation: {
    createUser: async (_: any, args: { email: string; name: string; }) => {
      return await prisma.user.create(
        { data: { email: args.email, name: args.name } }
      );
    }
  }
};

export default resolvers;