const environment = process.env.NODE_ENV || 'development'
const config = require('../../knexfile')[environment]
const connection = require('knex')(config)

module.exports = {
  getSaves,
  saveMap,
  delSave
}

function getSaves (db = connection) {
  return db('Saves').select()
}

function saveMap (data, db = connection) {
  const { name, description, fieldData } = data
  const save = {
    name: name,
    description: description,
    fieldData: JSON.stringify(fieldData)
  }
  return db('Saves')
    .insert(save)
}

function delSave (id, db = connection) {
  return db('Saves')
    .where('id', id)
    .delete()
}
