import { Model } from 'objection'
import config from './knexfile'
import knex from 'knex'

const connection = knex(config.development)
Model.knex(connection)

export default connection
