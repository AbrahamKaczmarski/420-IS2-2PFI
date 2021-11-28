const { Router } = require('express')
const controller = require('./api.controller')

const router = Router()

router.get('/', controller.welcome)

module.exports = router
