exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('starts').del()
    .then(function () {
      // Inserts seed entries
      return knex('starts').insert([
        { id: 1, field: [], name: '' },
        { id: 2, field: [], name: '' },
        { id: 3, field: [], name: '' }
      ])
    })
}
