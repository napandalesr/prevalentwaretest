const typeDefs = `#graphql
  type User {
    id: ID!
    email: String!
    name: String
    role: Role!
  }

  enum Role {
    USER
    ADMIN
  }


  type Query {
    hello: String
    findUsers: [User!]!
    findOneUser(id: ID!): User!
  }

  type Mutation {
    createUser(email: String!, name: String!, role:Role! ): User!
  }
`;

export default typeDefs;