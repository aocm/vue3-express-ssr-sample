const express = require('express')
// const Yamabiko = require('../../domain/yamabiko.ts')
const router = express.Router()

router.get('/', (req, res, next) => {
  // const yamabiko = new Yamabiko(req.query.message)
  res.redirect('/yamabiko-res?message='+ req.query.message)
})
router.post('/', (req, res, next) => {
  console.log(req.body)
  res.json(req.body)
})
module.exports = router
