import express from 'express'
import Yamabiko from '../../domain/yamabiko'
import { logger } from '../../log/logger'
const router = express.Router()

router.get('/', (req, res, next) => {
  try{
    const yamabiko = new Yamabiko(req.query.message)
    res.redirect('/yamabiko-res?message='+ yamabiko.message)
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
