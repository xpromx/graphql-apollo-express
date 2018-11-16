import { SchemaDirectiveVisitor } from 'apollo-server-express'

export default class findByIdDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition (field) {
    field.resolve = async function (root, args, { models }, info) {
      return models[field.type].query().findById(args.id)
    }
  }
}
