import { SchemaDirectiveVisitor } from 'apollo-server-express'
import applySearch from './search/applySearch'

const pageInfo = (res, page, limit) => {
  // pageInfo
  const pages = Math.ceil(res.total / limit)
  const prevPage = page - 1
  const nextPage = page + 1

  return {
    nodes: res.results,
    pageInfo: {
      total: res.total,
      current_page: page,
      per_page: limit,
      next_page: nextPage > pages ? 0 : nextPage,
      prev_page: prevPage < 1 ? 0 : prevPage,
      last_page: pages
    }
  }
}

export default class PaginateDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition (field) {
    const model = String(field.type).replace('Connection', '')
    field.resolve = async function (root, args, { models }, info) {
      const { QueryBuilder, query } = applySearch(
        models[model].query(),
        args.query
      )
      const res = await QueryBuilder
      const { page, limit } = query
      return pageInfo(res, page, limit)
    }
  }
}
