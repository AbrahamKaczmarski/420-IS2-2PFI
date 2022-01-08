import { Router } from 'express'
import auth from '../middleware/auth'
import * as controller from './routes.controller'

const router = Router()

// # == Authentication

router.post('/token', controller.generateToken)

// # == Public

router.get('/test', controller.test)
router.get('/gladiators', controller.gladiators)

// # == Private

router.get('/secret', auth, (req, res) => res.send('Top secret'))

export default router
