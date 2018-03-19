const router = require('express').Router()
const userController = require('./userController')

router.route('/addUser').post(userController.addUser)
router.route('/fetchAllUsers').get(userController.fetchAllUsers)

module.exports = router