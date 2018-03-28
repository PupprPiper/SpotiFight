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
      const user = await jwt.verify(token, 'spotifight')
      let email = user.user;
        console.log(email, user.user, token, 'back up in isLoggedIn' )
      const data = await db.query(`SELECT username from users WHERE email = '${email}'`)
      const name = data.rows[0].username;
      console.log(name)
      if (!name) {
        res.status(200).json(`redirect`);
      } else {
        res.status(200).json(`granted`);
      }
    } else {
      res.status(200).json(`redirect`);
    }
  } catch (error) {
    res.status(200).json(`redirect`);
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

const login = async (req, res) => {
  try {
    const email = req.body.email;
    const plainPass = req.body.password;
    const userCheck = await db.query(`SELECT username, password from users WHERE email = '${email}'`)
    const dbPass = (userCheck.rows[0] && userCheck.rows[0].password) || 'no';
    const dbUser = (userCheck.rows[0] && userCheck.rows[0].username) || 'no';
    const authorized = await bcrypt.compare(plainPass, dbPass)

    if (!authorized) {
      res.send({access: false, message: 'bad username or password'})
    } else {
      const token = await jwt.sign({
        user: email
      }, 'spotifight')
      const response = {
        email: email,
        username: dbUser,
        token: token,
        access: true,
        message: 'access granted, token signed'
      };
      res.send(response);
    }
  } catch (error) {
    res.status(200);
  }
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
  createNewUser,
  login
};
