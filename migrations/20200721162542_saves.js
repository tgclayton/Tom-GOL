exports.up = function (knex) {
  return knex.schema.createTable('Saves', function (table) {
    table.increments().primary()
    table.string('name', 10000)
    table.string('description', 10000)
    table.string('fieldData', 100000)
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('Saves')
}
