const router = require('express').Router();
const userController = require('./userController');

router.route('/addUser').post(userController.addUser);
router.route('/fetchAllUsers').get(userController.fetchAllUsers);
router.route('/email/:email').get(userController.getOneUser);
router.route('/addWinLoss').put(userController.addWinLoss);
router.route('/updateInfo').put(userController.updateInfo)

module.exports = router;
