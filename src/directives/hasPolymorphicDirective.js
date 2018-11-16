import { SchemaDirectiveVisitor } from 'apollo-server-express'

const toCamelCase = (text) => {
  return text
    .split('_')
    .map((item) => {
      let textSingular = item.slice(0, -1)
      return item[0].toUpperCase() + textSingular.substr(1)
    })
    .join('')
}

export default class hasPolymorphicDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition (field) {
    field.resolve = async function (root, args, { models }, info) {
      // root model
      if ('model_type' in root) {
        return models[toCamelCase(root.model_type)]
          .query()
          .findById(root.model_id)
      }

      const modelType = models[root.constructor.name].tableName
      const foreignModel = String(field.type).replace(/\[|\]/g, '')

      const QueryBuilder = models[foreignModel]
        .query()
        .where('model_id', '=', root.id)
        .where('model_type', '=', modelType)

      if (field.astNode.type.kind === 'ListType') {
        return QueryBuilder
      }

      const res = await QueryBuilder
      return res[0]
    }
  }
}
