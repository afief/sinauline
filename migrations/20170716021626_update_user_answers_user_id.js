
exports.up = function (knex, Promise) {
  return knex.schema.table('user_answers', function (t) {
    t.string('user_id').after('id')
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.table('user_answers', function (t) {
    t.dropColumn('user_id')
  })
}
