const router = require('express').Router()
const productController = require('../controllers/product-controller')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')
const Multer = require('multer')

const gcsMidddlewares = require('../middlewares/googleCloudStorage')

const multer = Multer({
    storage: Multer.MemoryStorage,
    limits: {
        fileSize: 10 * 1024 * 1024,
    },
});

//users
router.get(`/`, productController.showAll)
router.get('/:productId', productController.showOne)

router.use('', authentication)
//admin
router.post(`/`, multer.single('image'), authentication, authorization, gcsMidddlewares.sendUploadToGCS  , productController.create)
router.patch('/:productId',authentication, authorization, productController.edit)
router.delete('/:productId', authentication, authorization,productController.delete)

module.exports = router
