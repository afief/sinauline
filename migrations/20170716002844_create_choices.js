
exports.up = function (knex, Promise) {
  return knex.schema.createTable('choices', function (table) {
    table.increments('id')
    table.integer('question_id').unsigned()

    table.text('text')
    table.boolean('correct').defaultTo(false)

    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').nullable()
    table.timestamp('deleted_at').nullable()
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('choices')
}
