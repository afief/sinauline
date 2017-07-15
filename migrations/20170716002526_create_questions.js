
exports.up = function (knex, Promise) {
  return knex.schema.createTable('questions', function (table) {
    table.increments('id')

    table.text('question')

    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').nullable()
    table.timestamp('deleted_at').nullable()
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('questions')
}
