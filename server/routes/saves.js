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
  db.saveMap(req.body)
    .then(x => {
      res.send('Ok')
    })
    .catch(err => {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
})

// DEL /saves

router.delete('/', (req, res) => {
  db.delSave(req.params.id)
    .then(x => {
      res.send('Deleted')
    })
    .catch(err => {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
})

module.exports = router
