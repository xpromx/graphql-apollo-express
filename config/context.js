import db from '../database'
import * as models from './models'
import trans, { getLang } from '../app/helpers/translations'

const context = async ({ req }) => {
  const auth = await models.User.Authenticate(req.headers.authorization)
  const lang = getLang(req.headers.lang || req.lang)

  const t = (key, params = {}, lang = req.headers.lang || req.lang) =>
    trans(key, params, lang)

  return { models, db, auth, lang, t }
}

export default context
