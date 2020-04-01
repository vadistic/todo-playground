import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  scalar DateTime

  type Task {
    id: ID
    name: String!
    content: String
    finished: Boolean!
  }

  type Query {
    task(id: ID!): Task
    tasks: [Task!]!
  }
`
