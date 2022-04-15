import log4js, { getLogger } from 'log4js'
import {log4jsConfig} from './config'

log4js.configure(log4jsConfig)
export const logger = getLogger()
