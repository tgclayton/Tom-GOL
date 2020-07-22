const express = require('express')
const db = require('../db/db')

const router = express.Router()

// GET /saves
router.get('/', (req, res) => {
  db.getSaves()
    .then(saves => {
      res.json({ saves: saves })
    })
    .catch(err => {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
})

// POST /saves
router.post('/', (req, res) => {
  console.log(req.body)
  db.saveMap(req.body)
    .catch(err => {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
})

module.exports = router
