const router = require('express').Router()
const cartController = require('../controllers/cart-controller')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.post(`/`,authentication, cartController.create)
router.delete(`/:cartId`, authentication, cartController.delete)

module.exports = router