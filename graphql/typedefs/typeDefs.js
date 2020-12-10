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
    loginPersistTest(data: UserLoginInput!): AuthPayload!
  }

  input UserLoginInput {
    usernameOrEmail: String!
    password: String!
  }

  type AuthPayload {
    token: String!
  }

  type Query {
    hello: String!
    users: [User!]!
  }
`;
