exports.up = function (knex) {
  return knex.schema.createTable('Saves', function (table) {
    table.increments().primary()
    table.string('name')
    table.string('description')
    table.string('fieldData')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('Saves')
}
