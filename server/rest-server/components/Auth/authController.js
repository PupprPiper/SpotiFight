const passport = require('passport');
const passportSetup = require('./../../../environment/passport-setup');
<<<<<<< HEAD
const jwt = require('jsonwebtoken');


const LocalStrategy = require('passport-local').Strategy


=======
const LocalStrategy = require('passport-local').Strategy
>>>>>>> 91bbb6edb419d2a90c0e3b9b869c0f8c1f4e3cfc
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

const vanillaLoginCtrl = (req, res) => {
<<<<<<< HEAD

}

=======
  
}



>>>>>>> 91bbb6edb419d2a90c0e3b9b869c0f8c1f4e3cfc




<<<<<<< HEAD


=======
>>>>>>> 91bbb6edb419d2a90c0e3b9b869c0f8c1f4e3cfc
module.exports = { googleLoginCtrl, googleRedirectCtrl, logoutCtrl };
