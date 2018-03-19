const passport = require('passport');
const passportSetup = require('./../../../environment/passport-setup');

// google oauth
const googleLoginCtrl = passport.authenticate('google', {
  scope: ['profile']
});

// google redirect
const googleRedirectCtrl = (req, res) => {
  res.send('you reached the callback URI');
};

// logout
const logoutCtrl = (req, res) => {
  console.log('logging out');
  res.status(200).send('logging out');
};

module.exports = { googleLoginCtrl, googleRedirectCtrl, logoutCtrl };
