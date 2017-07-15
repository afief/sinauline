
exports.up = function (knex, Promise) {
  return knex.schema.createTable('user_answers', function (table) {
    table.increments('id')
    table.integer('question_id').unsigned()
    table.integer('choice_id').unsigned().nullable()
    table.boolean('correct').nullable()

    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').nullable()
    table.timestamp('deleted_at').nullable()
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('user_answers')
}
