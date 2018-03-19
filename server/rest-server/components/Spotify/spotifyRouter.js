const router = require('express').Router()
const spotifyController = require('./spotifyController')

router.route('/').get(spotifyController.getAccessToken)

module.exports = router