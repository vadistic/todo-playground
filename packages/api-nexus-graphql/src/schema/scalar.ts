import { scalarType } from 'nexus'
import { Kind } from 'graphql'

export const DateTime = scalarType({
  name: 'Date',
  asNexusMethod: 'date',
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
