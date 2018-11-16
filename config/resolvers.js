import JSON from '../app/scalars/JsonScalar'
import Authenticate from '../app/resolvers/Authenticate'

const resolvers = {
  Query: {
    hello: (_, __, { t }) => t('hello'),
    locale: (_, __, { lang }) => lang
  },

  Mutation: {
    Authenticate
  },

  JSON
}

export default resolvers
