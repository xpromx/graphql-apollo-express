import { validations } from 'indicative'
import knex from '../../database'

validations.unique = (data, field, message, args, get) => {
  return new Promise((resolve, reject) => {
    const fieldValue = get(data, field)
    let query = knex.select('id').from(args[0]).where(field, fieldValue)

    if (args[1]) {
      query = query.where('id', '!=', args[1])
    }

    return query.then((res) => {
      if (!res[0]) {
        return resolve('validation passed')
      }

      return reject(message)
    })
  })
}

validations.exists = (data, field, message, args, get) => {
  return new Promise((resolve, reject) => {
    const fieldValue = get(data, field)

    return knex
      .select('id')
      .from(args[0])
      .where(field, fieldValue)
      .then((res) => {
        if (res[0]) {
          return resolve('validation passed')
        }

        return reject(message)
      })
  })
}
