// const environment = process.env.NODE_ENV || 'development'
// const config = require('../../knexfile').development
// const connection = require('knex')(config)

export function getStarts (db = connection) {
  return db('starts').select()
}

export function saveMap (arr, db = connection) {
  const data = {
    id: null,
    name: 'test 1',
    description: 'a test',
    field: arr
  }
  return db.insert(data).into('starts')
}
