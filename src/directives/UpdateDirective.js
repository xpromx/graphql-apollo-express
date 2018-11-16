import { SchemaDirectiveVisitor, ApolloError } from 'apollo-server-express'
import { validate } from 'indicative'

export default class UpdateDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition (field) {
    field.resolve = async function (root, args, { models }, info) {
      const Model = models[field.type]
      const data = Object.assign({ id: args.id }, args.data)

      return validate(
        data,
        Model.getValidation({
          mutation: field.name,
          fieldName: field.args[1].type,
          rules: Model.validation,
          args: data,
          directive: 'update'
        })
      )
        .then(() => Model.query().updateAndFetchById(args.id, data))
        .catch((errors) => {
          console.log(errors)
          throw new ApolloError(errors[0].message, 'VALIDATION')
        })
    }
  }
}
