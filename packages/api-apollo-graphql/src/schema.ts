import { gql } from 'apollo-server'

export const typeDefs = gql`
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
