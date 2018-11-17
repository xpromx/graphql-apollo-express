import db from '../../database'
import * as models from '../models'
import trans, { getLang } from 'helpers/translations'

const context = async ({ req }) => {
  // Authentication
  const auth = await models.User.Authenticate(req.headers.authorization)

  // Language
  const lang = getLang(req.headers.lang || req.lang)

  // Translations
  const t = (key, params = {}, lang = req.headers.lang || req.lang) =>
    trans(key, params, lang)

  return { models, db, auth, lang, t }
}

export default context
