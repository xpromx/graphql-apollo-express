import 'dotenv/config'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import cors from 'cors'
import config from './config/graphql'
import * as middlewares from './config/middlewares'
import './app/helpers/validation'

const server = new ApolloServer(config)

const app = express()
app.use(express.static('storage'))

// middlewares
Object.keys(middlewares).map((key) => {
  middlewares[key](app)
})

// GraphQL server
server.applyMiddleware({ app })
const port = process.env.PORT || 4000
module.exports = app.listen({ port: port }, () =>
  console.log(
    `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
  )
)
