const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const db = require('./../database/config');
const helpers = require('./../rest-server/components/Auth/authSQLHelper');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  db
    .query(`SELECT * FROM users WHERE id = '${id}';`)
    .then(user => {
      done(null, user);
    })
    .catch(err => console.error(err));
});

passport.use(
  new GoogleStrategy(
    {
      // options for strategy
      callbackURL: '/auth/google/redirect',
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret
    },
    (accessToken, refreshToken, profile, done) => {
      handleGoogleProfile(profile, done);
    }
  )
);

let handleGoogleProfile = (profile, doneCb) => {
  db
    .query(`SELECT * FROM users WHERE email = '${profile.emails[0].value}';`)
    .then(data => {
      if (data.rows[0]) {
        doneCb(null, data.rows[0]);
      } else {
        const queryStr = helpers.googleLoginHelper(
          profile.emails[0].value,
          profile.displayName,
          profile.photos[0].value
        );
        // TODO: done needs to be called here to get profile from database
        console.log('data does not exist!!! saving to database!!!');
        let profileObj = {
          displayName: profile.displayName,
          emails: [{ value: profile.emails[0].value }],
          photos: [{ value: profile.photos[0].value }]
        };

        db.queryAsync(queryStr);
        handleGoogleProfile(profileObj, doneCb);
      }
    })
    .catch(err => console.error(err));
};
