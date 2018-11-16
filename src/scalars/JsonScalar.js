import { GraphQLScalarType } from 'graphql'
import { Kind } from 'graphql/language'

function parseValue (value) {
  return value
}

function serialize (value) {
  if (typeof value === 'object') {
    return value
  }
  return JSON.parse(value)
}

function parseLiteral (ast, variables) {
  switch (ast.kind) {
    case Kind.STRING:
      return ast.value
    case Kind.BOOLEAN:
      return ast.value
    case Kind.INT:
    case Kind.FLOAT:
      return parseFloat(ast.value)
    case Kind.OBJECT: {
      const value = Object.create(null)
      ast.fields.forEach((field) => {
        value[field.name.value] = parseLiteral(field.value, variables)
      })

      return value
    }
    case Kind.LIST:
      return ast.values.map((n) => parseLiteral(n, variables))
    case Kind.NULL:
      return null
    case Kind.VARIABLE: {
      const name = ast.name.value
      return variables ? variables[name] : undefined
    }
    default:
      return undefined
  }
}

const GraphQLJSON = new GraphQLScalarType({
  name: 'JSON',
  description: 'Return JSON fields',
  serialize: serialize,
  parseValue: parseValue,
  parseLiteral: parseLiteral
})

export default GraphQLJSON
