const config = require('../../knexfile').development
const connection = require('knex')(config)

module.exports = {
  getSaves,
  saveMap
}

function getSaves (db = connection) {
  return db('saves').select()
}

function saveMap (data, db = connection) {
  const save = {
    id: null,
    name: 'test 1',
    description: 'a test',
    field: arr
  }
  return db('saves').insert(save)
}
