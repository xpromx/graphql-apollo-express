const applyFilter = (QueryBuilder, field, condition, value) => {
  if (condition === 'GT') {
    return QueryBuilder.where(field, '>', value)
  }
  if (condition === 'GTE') {
    return QueryBuilder.where(field, '>=', value)
  }
  if (condition === 'LT') {
    return QueryBuilder.where(field, '<', value)
  }
  if (condition === 'LTE') {
    return QueryBuilder.where(field, '<=', value)
  }

  if (condition === 'EQUAL') {
    return QueryBuilder.where(field, '=', value)
  }

  if (condition === 'CONTAINS') {
    return QueryBuilder.where(field, 'LIKE', '%' + value + '%')
  }

  if (condition === 'NOT_CONTAINS') {
    return QueryBuilder.where(field, 'NOT LIKE', '%' + value + '%')
  }

  if (condition === 'STARTS_WITH') {
    return QueryBuilder.where(field, 'LIKE', value + '%')
  }

  if (condition === 'ENDS_WTIH') {
    return QueryBuilder.where(field, 'LIKE', '%' + value)
  }

  if (condition === 'IN') {
    return QueryBuilder.whereIn(field, value.split(','))
  }

  if (condition === 'NOT_IN') {
    return QueryBuilder.whereNotIn(field, value.split(','))
  }

  if (condition === 'NOT_EQUAL') {
    return QueryBuilder.where(field, '!=', value)
  }

  if (condition === 'NULL') {
    return QueryBuilder.whereNull(field)
  }

  if (condition === 'NOT_NULL') {
    return QueryBuilder.whereNotNull(field)
  }

  if (condition === 'BETWEEN') {
    return QueryBuilder.whereBetween(field, value.split(','))
  }

  if (condition === 'NOT_BETWEEN') {
    return QueryBuilder.whereNotBetween(field, value.split(','))
  }

  return QueryBuilder
}

export default applyFilter
