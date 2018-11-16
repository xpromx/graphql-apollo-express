import { SchemaDirectiveVisitor, ApolloError } from 'apollo-server-express'
import { validate } from 'indicative'

export default class CreateDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition (field) {
    field.resolve = async function (root, args, { models }, info) {
      const Model = models[field.type]
      return validate(
        { id: args.id },
        { id: 'required|exists:' + Model.tableName }
      )
        .then(async () => {
          const user = await Model.query().findById(args.id)
          await Model.query().deleteById(args.id)
          return user
        })
        .catch((errors) => {
          throw new ApolloError(errors[0].message, 'VALIDATION')
        })
    }
  }
}
