const casual = require('casual')
const bcrypt = require('bcrypt')

exports.seed = (knex, Promise) => {
  return knex('users').del().then(() => {
    const promises = Array(10).fill().map(async (_, i) => {
      const email = casual.email
      const data = {
        id: i + 1,
        first_name: casual.first_name,
        last_name: casual.last_name,
        password: await bcrypt.hash('password', 10),
        email: email,
        token: await bcrypt.hash(email + Math.random(), 10),
        created_at: casual.date('YYYY-MM-DD HH:mm:ss'),
        updated_at: casual.date('YYYY-MM-DD HH:mm:ss')
      }

      return knex('users').insert(data)
    })

    return Promise.all(promises)
  })
}
