const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const resolvers = {
  Query: {
    hello: () => '¡Hola desde GraphQL!',
    findUsers: async () => await prisma.user.findMany(),
    findOneUser: async (_: any, args: { id: any; }) => await prisma.user.findUnique({ where: { id: Number(args.id) } })
  },
  Mutation: {
    createUser: async (_: any, args: { email: any; name: any; }) => {
      return await prisma.user.create(
        { data: { email: args.email, name: args.name } }
      );
    }
  }
};

export default resolvers;