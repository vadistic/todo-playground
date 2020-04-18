import { scalarType } from '@nexus/schema'
import { Kind } from 'graphql'

export const DateTime = scalarType({
  name: 'DateTime',
  asNexusMethod: 'date',
  rootTyping: 'Date',
  description: 'Date scalar type',
  parseValue(value) {
    return new Date(value)
  },
  serialize(value) {
    return value.getTime()
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(ast.value)
    }
    return null
  },
})
