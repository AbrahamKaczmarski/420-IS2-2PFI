const { Router } = require('express')
const controller = require('./api.controller')

const router = Router()

router.get('/', controller.welcome)
router.get('/echo/:text', controller.writeText)
router.post('/blog', controller.addBlog)
router.get('/blog', controller.showBlog)
router.get('/test', controller.test)



module.exports = router
