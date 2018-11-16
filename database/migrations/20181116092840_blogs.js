exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('blogs', (table) => {
      table.increments('id').primary().unsigned()
      table.integer('user_id')
      table.string('title')
      table.text('content', 'longtext')
      table.boolean('active').defaultTo(false)
      table.timestamps()
    })
  ])
}

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('blogs')
  ])
}
