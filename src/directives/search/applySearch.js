import applyFilter from './applyFilter'

const applySearch = (builder, query = {}) => {
  const { page = 1, limit = 100, orderBy = null, filters = null } = query

  let QueryBuilder = builder.page(page - 1, limit)

  if (orderBy) {
    QueryBuilder.orderBy(orderBy.field, orderBy.sort)
  }

  if (filters) {
    filters.map(({ field, condition, value }) => {
      QueryBuilder = applyFilter(QueryBuilder, field, condition, value)
    })
  }

  return { QueryBuilder, query: { page, limit, orderBy, filters } }
}

export default applySearch
