import db from '../database'
import * as models from './models'

const context = async ({ req }) => {
  const auth = await models.User.Authenticate(req.headers.authorization)
  return { models, db, auth }
}

export default context
