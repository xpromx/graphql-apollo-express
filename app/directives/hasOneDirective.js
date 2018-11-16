import { SchemaDirectiveVisitor } from 'apollo-server-express'

export default class hasOneDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition (field) {
    const { field: defaultField } = this.args

    field.resolve = async function (root, args, { models }, info) {
      const key = defaultField || field.name + '_id'
      return models[field.type].query().findById(root[key])
    }
  }
}
