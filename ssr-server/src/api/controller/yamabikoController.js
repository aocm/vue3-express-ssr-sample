const express = require('express')
const Yamabiko = require('../../domain/yamabiko')
const router = express.Router()

router.get('/', (req, res, next) => {
  const yamabiko = new Yamabiko(req.query.message)
  console.log(yamabiko)
  console.log(yamabiko._text)
  res.redirect('/yamabiko-res?message='+ req.query.message)
})
router.post('/', (req, res, next) => {
  console.log(req.body)
  res.json(req.body)
})
module.exports = router
