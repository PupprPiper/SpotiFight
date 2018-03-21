const passport = require('passport');
const passportSetup = require('./../../../environment/passport-setup');

// google oauth
const googleLoginCtrl = passport.authenticate('google', {
  scope: ['profile', 'email']
});

const googleRedirectCtrl = (req, res) => {
  console.log('user!!!---->', req.user)
  res.status(200).send('you have reached the callback uri');
};

// logout
const logoutCtrl = (req, res) => {
  console.log('logging out');
  res.status(200).send('logging out');
};

module.exports = { googleLoginCtrl, googleRedirectCtrl, logoutCtrl };

