import 'dotenv/config'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import cors from 'cors'
import resolvers from './config/resolvers'
import context from './config/context'
import * as schemaDirectives from './config/directives'
import typeDefs from './config/schema'
import formatError from './config/errors'
import detectLanguage from 'detect-language'
import locales from './config/locales'
import './app/helpers/validation'

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  schemaDirectives,
  formatError
})

const app = express()

// middlewares
app.use(cors())
app.use(
  detectLanguage({
    supportedLanguages: Object.keys(locales),
    defaultLanguage: process.env.LOCALE || 'en'
  })
)

// GraphQL server
server.applyMiddleware({ app })

const port = process.env.PORT || 4000
app.listen({ port: port }, () =>
  console.log(
    `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
  )
)
