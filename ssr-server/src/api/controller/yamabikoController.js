import express from 'express'
import Yamabiko from '../../domain/yamabiko'
import { logger } from '../../log/logger'
const router = express.Router()

router.get('/', (req, res, next) => {
  try{
    const yamabiko = new Yamabiko(req.query.message)
    if (req.session.messages){
      req.session.messages.push(yamabiko.message)
    } else {
      req.session.messages = [yamabiko.message]
    }
    res.redirect('/yamabiko-res?message='+ yamabiko.message)
  }catch (e){
    logger.warn(e.message)
    res.redirect('/error?message='+e.message)
  }
})

router.get('/history', (req, res, next) => {
  try{
    if (!req.session.messages){
      req.session.messages = []
    }
    res.json({history:req.session.messages} )
  }catch (e){
    logger.warn(e.message)
    res.redirect('/error?message='+e.message)
  }
})

router.post('/', (req, res, next) => {
  logger.info(req.body)
  res.json(req.body)
})

export default router
