import { Router } from 'express'
import auth from '../middleware/auth'
import * as controller from './routes.controller'

const router = Router()

// # == Authentication

router.post('/token', controller.generateToken)

// # == Public

router.get('/', controller.welcome)
router.get('/echo/:text', controller.writeText)
router.post('/blog', controller.addBlog)
router.get('/blog', controller.showBlog)

// # == Private

router.get('/secret', auth, (req, res) => res.send('Top secret'))

export default router
