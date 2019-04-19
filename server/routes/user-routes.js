const router = require('express').Router()
const userController = require('../controllers/user-controller.js')


//users
router.post('/signUp', userController.signUp)
router.post('/signIn',userController.signIn)


//admin
router.post('/signUpAdmin',userController.signUpAdmin)
router.post('/signInAdmin',userController.signInAdmin)
module.exports = router