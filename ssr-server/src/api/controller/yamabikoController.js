const express = require('express')
const Yamabiko = require('../../domain/yamabiko')
const router = express.Router()

router.get('/', (req, res, next) => {
  try{
    const yamabiko = new Yamabiko(req.query.message)
    res.redirect('/yamabiko-res?message='+ yamabiko.message)
  }catch (e){
    console.warn(e.message)
    res.redirect('/error?message='+e.message)
  }
  
})
router.post('/', (req, res, next) => {
  console.log(req.body)
  res.json(req.body)
})
module.exports = router
