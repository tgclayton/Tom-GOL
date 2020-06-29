exports.up = function (knex) {
  return knex.schema.createTable('starts', function (table) {
    table.integer('id')
    table.string('name')
    table.specificType('field', 'INT[]')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('starts')
}
