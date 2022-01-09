import { Router } from 'express'
import auth from '../middleware/auth'
import * as controller from './routes.controller'

const router = Router()

// # == Authentication

router.post('/token', controller.generateToken)

// # == Public

router.get('/test', controller.test)
router.get('/gladiators', controller.gladiators)
router.get('/gladiators/:id', controller.gladiatorById)
router.get('/fights', controller.fights)


// # == Private

router.get('/secret', auth, (req, res) => res.send('Top secret'))

router.post('/gladiators',auth,controller.addGladiator)
router.put('/gladiators/:id',auth,controller.updateGladiator)
router.delete('/gladiators/:id',auth,controller.deleteGladiator)

router.post('/fights',auth,controller.addFight)
router.put('/fights/:id',auth,controller.updateFight)
router.delete('/fights/:id',auth,controller.deleteFight)

export default router
