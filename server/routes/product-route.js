const router = require('express').Router()
const productController = require('../controllers/product-controller')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

//users
router.get(`/`, productController.showAll)
router.get('/:productId', productController.showOne)

router.use('', authentication)
//admin
router.post(`/`, productController.create)
router.delete('/:productId', productController.delete)

module.exports = router
