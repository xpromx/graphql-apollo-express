import locales from '../../config/locales'

export const getLang = (defaultLang) => {
  let lang = process.env.LANGUAGE || 'en'
  if (defaultLang in locales) {
    lang = defaultLang
  }

  return lang
}

const t = (key = '', params = {}, defaultLang) => {
  const lang = getLang(defaultLang)
  const trans = locales[lang]

  const ObjectDot = (obj, desc) => {
    var arr = desc.split('.')
    while (arr.length && (obj = obj[arr.shift()]));
    return obj
  }

  let text = ObjectDot(trans, key)

  Object.keys(params).forEach(
    (key) => (text = text.replace(`:${key}`, params[key]))
  )

  return text
}

export default t
