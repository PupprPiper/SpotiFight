const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const db = require('./../database/config');
const helpers = require('./../rest-server/components/Auth/authSQLHelper');

passport.serializeUser((user, done) => {});

passport.use(
  new GoogleStrategy(
    {
      // options for strategy
      callbackURL: '/auth/google/redirect',
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret
    },
    (accessToken, refreshToken, profile, done) => {

      db
        .query(`SELECT * FROM users WHERE email = '${profile.emails[0].value}';` )
        .then(data => console.log('!!!!query!!!!', data))
        .catch(err => {
          console.error('!!!!err!!!!', err);
        });

      // console.log('!!!!query!!!!', query);
      // db
      //   .query(`SELECT * FROM users WHERE email = ${profile.emails[0].value}`)
      //   .then(data => {
      //     if (data) {
      //       console.log('data exits!!!');
      //       const queryStr = helpers.googleLoginHelper(
      //         profile.emails[0].value,
      //         profile.displayName
      //       );
      //     } else {
      //       console.log('data does not exist. saving to database!!!');
      //       db.queryAsync(queryStr);
      //     }
      //   });
    }
  )
);
