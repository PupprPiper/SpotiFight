const passport = require('passport');
const passportSetup = require('./../../../environment/passport-setup');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const db = require('../../../database/config/index')
const q = require('./authSQLHelper');
const bcrypt = require('bcrypt');

const LocalStrategy = require('passport-local').Strategy

const isLoggedIn = async (req, res) => {
  try {
    const token = req.body.token;
    if (token) {
      const user = await jwt.verify(token, 'spotifight');
      let email = user.user;
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

const createNewUser = async (req, res) => {
  console.log(req.body, 'req.body in new user maker')
  const password = req.body.password;
  const email = req.body.email;
  const username = req.body.username;
  const response = '';

  bcrypt.hash(password, 9, async (err, hash) => {
    try {
      if (err) {
        console.log(err, 'here the error is sign up')
      } else {
        console.log(hash, 'here the has, dog, we up in sign up')
        const data = await db.query(q.vanillaSignUpHelper(email, hash, username))
        response = data;
      }
    } catch(error)  {
      console.log(error.constraint, 'rejected, baby! Im in create new user')
      res.json(error);
    } finally {
      res.json(response);
    }

  });

}
// logout
const logoutCtrl = (req, res) => {

  // res.status(200).send(req.logout);
  // req.logout();
};

module.exports = {
  googleLoginCtrl,
  googleRedirectCtrl,
  logoutCtrl,
  isLoggedIn,
  createNewUser
};
