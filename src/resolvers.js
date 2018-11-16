import JSON from './scalars/JsonScalar'
import Authenticate from './resolvers/Authenticate'

const resolvers = {
  Query: {
    hello: () => 'Hello world!'
  },

  Mutation: {
    Authenticate
  },

  JSON
}

export default resolvers
