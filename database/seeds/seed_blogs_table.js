const casual = require('casual')

exports.seed = (knex, Promise) => {
  return knex('users').del().then(() => {
    const promises = Array(10).fill().map((_, i) => {
      const data = {
        id: i + 1,
        user_id: Math.floor(Math.random() * 10) + 1,
        title: casual.title,
        content: casual.description,
        active: 1,
        created_at: casual.date('YYYY-MM-DD HH:mm:ss'),
        updated_at: casual.date('YYYY-MM-DD HH:mm:ss')
      }

      return knex('blogs').insert(data)
    })

    return Promise.all(promises)
  })
}
