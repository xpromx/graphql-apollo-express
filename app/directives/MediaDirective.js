import { SchemaDirectiveVisitor } from 'apollo-server-express'

export default class MediaDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition (field) {
    const { collection } = this.args

    field.resolve = async function (root, args, { models }, info) {
      const model = root.constructor.name
      const modelType = models[model].tableName
      const result = await models.Media
        .query()
        .where('model_id', '=', root.id)
        .where('model_type', '=', modelType)
        .where('collection', '=', collection)
        .orderByRaw('position ASC, id ASC')

      if (!result[0]) {
        return null
      }

      if (field.astNode.type.kind === 'ListType') {
        return result
      }

      return result[0]
    }
  }
}
