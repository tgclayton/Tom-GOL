exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('saves').del()
    .then(function () {
      // Inserts seed entries
      return knex('saves').insert([
        { id: 1, fieldData: 'testytest', name: 'a test', description: 'this is a test' }
      ])
    })
}
