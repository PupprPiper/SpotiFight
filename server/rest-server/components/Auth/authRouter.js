const router = require('express').Router();
const passport = require('passport');
const {
  googleLoginCtrl,
  googleRedirectCtrl,
  logoutCtrl
} = require('./authController');

// google auth
router.route('/google').get(googleLoginCtrl);

// callback route for google to redirect to
router.get(
  '/google/redirect',
  passport.authenticate('google'),
  googleRedirectCtrl
);

// logout
router.route('/logout').get(logoutCtrl);

module.exports = router;
