const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const db = require('./../database/config');
const helpers = require('./../rest-server/components/Auth/authSQLHelper');

passport.use(
  new GoogleStrategy(
    {
      // options for strategy
      callbackURL: '/auth/google/redirect',
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret
    },
    (accessToken, refreshToken, profile, done) => {
      // console.log('profile!!!', profile);
      let userInfo = {
        email: profile.email,
        wins: 0,
        losses: 0,
        image: profile.photos[0].value
      };
      // googleProfile = profile;
    }
  )
);
