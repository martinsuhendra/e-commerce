const router = require('express').Router()
const cartController = require('../controllers/cart-controller')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')
const cartAuth = require('../middlewares/cartAuth')

router.get('/', authentication, cartController.showAll)
router.post(`/`, authentication, cartController.create)
router.delete(`/:cartId`,authentication, cartAuth, cartController.delete)

module.exports = router