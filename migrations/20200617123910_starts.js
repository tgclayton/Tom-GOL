exports.up = function (knex) {
  return knex.schema.createTable('starts', function (table) {
    table.increments('id')
    table.string('name')
    table.string('description')
    table.specificType('field', 'INT[]')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('starts')
}
