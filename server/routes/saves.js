const express = require('express')
const db = require('../db/db')

const router = express.Router()

// GET saves
router.get('/', (req, res) => {
  db.getUsers()
    .then(users => {
      res.json({ users: users })
    })
    .catch(err => {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
})

module.exports = router
