const passport = require('passport');
const passportSetup = require('./../../../environment/passport-setup');
<<<<<<< HEAD
const jwt = require('jsonwebtoken');

<<<<<<< HEAD
=======
const LocalStrategy = require('passport-local').Strategy
>>>>>>> git commit pre ryan rebase - auth
=======

const LocalStrategy = require('passport-local').Strategy


>>>>>>> git commit pre ryan rebase - auth
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

<<<<<<< HEAD
=======
const vanillaLoginCtrl = (req, res) => {
<<<<<<< HEAD
  
=======

>>>>>>> git commit pre ryan rebase - auth
}







>>>>>>> git commit pre ryan rebase - auth
module.exports = { googleLoginCtrl, googleRedirectCtrl, logoutCtrl };
