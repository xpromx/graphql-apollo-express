import { SchemaDirectiveVisitor } from 'apollo-server-express'
import { defaultFieldResolver, GraphQLString } from 'graphql'
import moment from 'moment'

class DateDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition (field) {
    const { resolve = defaultFieldResolver } = field
    const { format: defaultFormat } = this.args
    field.args.push({
      name: 'format',
      type: GraphQLString
    })

    field.resolve = async function (root, args, context, info) {
      const result = await resolve.apply(this, root, args, context, info)

      return moment(result).format(args.format || defaultFormat)
    }
  }
}

export default DateDirective
