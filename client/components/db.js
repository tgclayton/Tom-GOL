const environment = process.env.NODE_ENV || 'development'
const config = require('./knexfile')[environment]
const connection = require('knex')(config)

export function getStarts (db = connection) {
  return db('starts').select()
}

function getUser (id, db = connection) {
  return db('users').where('id', id).first()
}

function getProfile (id, db = connection) {
  return db('users')
    .join('profiles', 'users.id', 'profiles.user_id')
    .where('users.id', id)
    .select('favourite_food as favouriteFood', 'name', 'picture', 'email')
    .then()
}
