import 'dotenv/config'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import cors from 'cors'
import resolvers from './src/resolvers'
import context from './src/context'
import * as schemaDirectives from './src/directives'
import typeDefs from './src/schema'
import formatError from './src/errors'
import './src/helpers/validation'

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  schemaDirectives,
  formatError
})

const app = express()
app.use(cors())
server.applyMiddleware({ app })

const port = process.env.PORT
app.listen({ port: port }, () =>
  console.log(
    `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
  )
)
