exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('Saves').del()
    .then(function () {
      // Inserts seed entries
      return knex('Saves').insert([
        { fieldData: null,
          name: 'a test',
          description: 'this is a test' }
      ])
    })
}
