const config = require('../../knexfile').development
const connection = require('knex')(config)

module.exports = {
  getSaves
}

function getSaves (db = connection) {
  return db('saves').select()
}

// export function saveMap (arr, db = connection) {
//   const data = {
//     id: null,
//     name: 'test 1',
//     description: 'a test',
//     field: arr
//   }
//   return db.insert(data).into('starts')
// }
