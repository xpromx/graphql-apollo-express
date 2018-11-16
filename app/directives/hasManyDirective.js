import { SchemaDirectiveVisitor } from 'apollo-server-express'
import ApplySearch from './search/applySearch'

export default class hasManyDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition (field) {
    const { field: defaultField } = this.args

    field.resolve = async function (root, args, { models }, info) {
      const modelType = models[root.constructor.name].tableName.slice(0, -1)
      const foreignKey = defaultField || modelType + '_id'
      const foreignModel = String(field.type).replace(/\[|\]/g, '')
      const builder = models[foreignModel]
        .query()
        .where(foreignKey, '=', root.id)

      const { QueryBuilder } = ApplySearch(builder, args.query)

      const res = await QueryBuilder
      return res.results
    }
  }
}
