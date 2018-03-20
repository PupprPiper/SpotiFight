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
router.route('/google/redirect').get(passport.authenticate('google'));
// .get(googleRedirectCtrl, passport.authenticate('google'));
// .get(passport.authenticate('google'));
// logout
router.route('/logout').get(logoutCtrl);

module.exports = router;
