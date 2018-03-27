const passport = require('passport');
const passportSetup = require('./../../../environment/passport-setup');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const db = require('../../../database/config/index')
const q = require('./authSQLHelper');

const LocalStrategy = require('passport-local').Strategy

const isLoggedIn = async (req, res) => {
  try{



  console.log(res, 'here is the res')
  const token = req.body.token;
  console.log(token, 'token in authcontroller');

  if (token) {

    const user = await jwt.verify(token, 'spotifight');
    let email = user.user;
    console.log(user, 'here the user brah')
    const data = await db.query(`SELECT username from users WHERE email = '${email}'`)

    console.log('bool: this is a legit user <-----', data.rows[0].username)
    const name = data.rows[0].username;

    if (!name) {
      console.log('warning, not a legit user!')
      res.status(200).redirect(`redirect`);
    }

  } else {
    console.log('warning, not a legit user! No token!')
    res.status(200).send(`redirect`);
  }
} catch (error) {
  console.log(error, 'somethign is up with yo token');
  res.status(200).send(`redirect`);
  }
}
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

module.exports = {
  googleLoginCtrl,
  googleRedirectCtrl,
  logoutCtrl,
  isLoggedIn
};
