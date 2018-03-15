const router = require('express').Router()
const userController = require('./userController')

router.route('/').post(userController.addUserController)

module.exports = router