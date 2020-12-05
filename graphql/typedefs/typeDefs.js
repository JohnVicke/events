import { gql } from "apollo-server";

export const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
  }

  type Error {
    field: String!
    message: String!
  }

  type UserResponse {
    user: User
    errors: [Error]
  }

  type Mutation {
    register(username: String!, password: String!, email: String!): UserResponse!
    login(usernameOrEmail: String!, password: String!): UserResponse!
  }

  type Query {
    hello: String!
    users: [User!]!
  }
`;
