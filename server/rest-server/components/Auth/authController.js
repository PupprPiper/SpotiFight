const passport = require('passport');
const passportSetup = require('./../../../environment/passport-setup');
// const googleProfile = require('./../../../environment/passport-setup');

// google oauth
const googleLoginCtrl = passport.authenticate('google', {
  scope: ['profile', 'email']
});

// google redirect
// const googleRedirectCtrl = passport.authenticate('google', (req, res) => {
//   // console.log('profile!!@#!@#!#!@', googleProfile);
//   res.status(200).send('YOU HAVE REACHED THE CALLBACK URI');
// });

const googleRedirectCtrl = (req, res) => {
  res.status(200).send('you have reached the callback uri');
};
// const googleRedirectCtrl = (req, res) => {
//   console.log(req.user);
//   res.send('you have reached the callback uri');
// };

// logout
const logoutCtrl = (req, res) => {
  console.log('logging out');
  res.status(200).send('logging out');
};

module.exports = { googleLoginCtrl, googleRedirectCtrl, logoutCtrl };

// app.post('/login',
//   passport.authenticate('local'),
//   function(req, res) {
//     // If this function gets called, authentication was successful.
//     // `req.user` contains the authenticated user.
//     res.redirect('/users/' + req.user.username);
//   });
