const router = require('express').Router();
const passport = require('passport');
const {
  googleLoginCtrl,
  googleRedirectCtrl,
  logoutCtrl,
  isLoggedIn,
  createNewUser
} = require('./authController');

// google auth
router.route('/google').get(googleLoginCtrl);

// callback route for google to redirect to
router.get(
  '/google/redirect',
  passport.authenticate('google'),
  googleRedirectCtrl
);

router.post('/isLoggedIn', isLoggedIn)
router.post('/signUp', createNewUser)


// logout
router.route('/logout').get(logoutCtrl);

module.exports = router;
