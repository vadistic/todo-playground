import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  scalar DateTime

  enum SortDirection {
    ASC
    DESC
  }

  type Task {
    id: ID
    name: String!
    content: String
    finished: Boolean!
  }

  type Query {
    task(where: WhereUniqueIDInput!): Task
    tasks(
      where: TaskWhereFilterInput
      limit: Int
      after: ID
      before: ID
      order: SortDirection
    ): [Task!]!
  }

  type Mutation {
    createTask(data: TaskCreateInput!): Task!
    deleteTask(where: WhereUniqueIDInput!): Task!
    updateTask(where: WhereUniqueIDInput!, data: TaskUpdateInput!): Task!
  }

  input TaskCreateInput {
    name: String!
    content: String
    finished: Boolean
  }

  input TaskUpdateInput {
    content: String
    finished: Boolean
    name: String
  }

  input WhereUniqueIDInput {
    id: ID!
  }

  input TaskWhereFilterInput {
    ids: IDSetFilterInput
    createdAt: DateTimeRangeFilterInput
    updatedAt: DateTimeRangeFilterInput
    name: StringFilterInput
    content: StringFilterInput
    finished: BooleanFilterInput
  }

  input IDSetFilterInput {
    in: [ID!]
  }

  input DateTimeRangeFilterInput {
    before: DateTime
    after: DateTime
  }

  input StringFilterInput {
    eq: String
    in: [String!]
    like: String
  }

  input BooleanFilterInput {
    eq: Boolean
  }
`
