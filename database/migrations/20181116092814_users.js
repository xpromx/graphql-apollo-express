exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', (table) => {
      table.increments('id').primary().unsigned()
      table.string('first_name')
      table.string('last_name')
      table.string('email').unique()
      table.string('password').nullable()
      table.string('token')
      table.timestamps()
    })
  ])
}

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users')
  ])
}
