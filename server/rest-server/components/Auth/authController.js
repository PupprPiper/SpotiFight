const passport = require('passport');
const passportSetup = require('./../../../environment/passport-setup');
const LocalStrategy = require('passport-local').Strategy
// google oauth
const googleLoginCtrl = passport.authenticate('google', {
  scope: ['profile', 'email']
});

const googleRedirectCtrl = (req, res) => {
  res.status(200).redirect(`/user-profile/${req.user.email}`);
};

// logout
const logoutCtrl = (req, res) => {
  console.log('logging out');
  res.status(200).send('logging out');
};

const vanillaLoginCtrl = (req, res) => {
  
}







module.exports = { googleLoginCtrl, googleRedirectCtrl, logoutCtrl };
