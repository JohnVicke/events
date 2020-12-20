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

  type AuthPayload {
    token: String!
  }

  type Location {
    name: String!
    countryCode: String!
    city: String!
    venue: String!
  }

  type Event {
    name: String!
    date: String!
    image: String!
    type: String!
    location: Location!
  }

  type ForumUser {
    username: String!
    image: String!
  }

  type Message {
    content: String!
    time: String!
    sender: ForumUser!
  }

  type Room {
    name: String!
    image: String!
    users: [ForumUser]
    chat: [Message]
  }

  type EventForum {
    name: String!
    image: String!
    users: [ForumUser]
    rooms: [Room]
    chat: [Message]
  }

  type EventsResponse {
    events: [Event]
    errors: [Error]
  }

  input UserLoginInput {
    usernameOrEmail: String!
    password: String!
  }

  type Query {
    hello: String!
    users: [User!]!
    personalizedEvents: EventsResponse
  }

  type Mutation {
    register(username: String!, password: String!, email: String!): UserResponse!
    login(usernameOrEmail: String!, password: String!): UserResponse!
    loginPersistTest(data: UserLoginInput!): AuthPayload!
  }
`;
