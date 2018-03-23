const passport = require('passport');
const passportSetup = require('./../../../environment/passport-setup');

const jwt = require('jsonwebtoken');


const LocalStrategy = require('passport-local').Strategy

//just a change


// google oauth
const googleLoginCtrl = passport.authenticate('google', {
  scope: ['profile', 'email']
});

const googleRedirectCtrl = (req, res) => {
  // const token = jwt.sign({user: req.user}, 'spotifight');
  // res.json({ token: token }).redirect(`/user-profile/${req.user.email}`);
  res.status(200).redirect(`/user-profile/${req.user.email}`);
};

// logout
const logoutCtrl = (req, res) => {
  // res.status(200).send(req.logout);
  // req.logout();
};

module.exports = { googleLoginCtrl, googleRedirectCtrl, logoutCtrl };
