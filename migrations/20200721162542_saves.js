exports.up = function (knex) {
  return knex.schema.createTable('Saves', function (table) {
    table.increments().primary()
    table.text('name')
    table.text('description')
    table.text('fieldData', 'longtext')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('Saves')
}
