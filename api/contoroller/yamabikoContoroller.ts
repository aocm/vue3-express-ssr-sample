const express = require('express')
const router = express.Router()

router.get('/test', (req, res, next) => {
  res.status(200);
  res.json({ message: []});
})

router.post('/', (req, res, next) => {
  console.log(req.body)
  res.json(req.body)
})
module.exports = router;
