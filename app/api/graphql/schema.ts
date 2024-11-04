const typeDefs = `#graphql
  type User {
    id: ID!
    email: String!
    name: String
    phone: String
    role: Role!
  }

  enum Role {
    USER
    ADMIN
  }

  type Movement {
    id: ID!
    concept: String!
    amount: Float!
    date: String
    user: User!
    type: MovementType!
  }

  input CreateMovementInput {
    concept: String!
    amount: Float!
    date: String
    userId: ID!
    type: MovementType!
  }

  enum MovementType {
    INCOME
    EXPENSE
  }

  type Query {
    hello: String
    findUsers: [User!]!
    findOneUser(id: ID!): User!
    findOneEmail(email: String!): User!
    findMovement: [Movement!]!
  }

  type Mutation {
    createUser(email: String!, name: String!, role:Role! ): User!,
    updateUser(id: String!, name: String!, role: Role, phone: String ): User!,
    createMovement(input: CreateMovementInput!): Movement!
  }
`;

export default typeDefs;