exports.up = function (knex) {
  return knex.schema.createTable('Saves', function (table) {
    table.increments().primary()
    table.text('name')
    table.text('description')
    table.text('fieldData')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('Saves')
}
