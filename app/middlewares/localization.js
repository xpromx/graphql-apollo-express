import detectLanguage from 'detect-language'
import locales from '../../config/locales'

export default (app) => {
  app.use(
    detectLanguage({
      supportedLanguages: Object.keys(locales),
      defaultLanguage: process.env.LOCALE || 'en'
    })
  )
}
