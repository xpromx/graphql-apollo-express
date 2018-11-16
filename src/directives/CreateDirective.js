import { SchemaDirectiveVisitor, ApolloError } from 'apollo-server-express'
import { validate } from 'indicative'

export default class CreateDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition (field) {
    field.resolve = async function (root, args, { models }, info) {
      const Model = models[field.type]
      const data = Object.assign({}, args.data)

      return validate(
        data,
        Model.getValidation({
          mutation: field.name,
          fieldName: field.args[0].type,
          rules: Model.validation,
          args: data,
          directive: 'create'
        })
      )
        .then(() => Model.query().insert(data))
        .catch((errors) => {
          throw new ApolloError(errors[0].message, 'VALIDATION')
        })
    }
  }
}
