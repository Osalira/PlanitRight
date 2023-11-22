import express from 'express';
import session from 'express-session';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import passport from 'passport';
import passportLocalMongoose from 'passport-local-mongoose';
import findOrCreate from 'mongoose-findorcreate';
import userInfo from '../database/models/User.js';

const router = express.Router();

passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: 'http://localhost:3000/auth/google/list',
        userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo',
      },
      function (accessToken, refreshToken, profile, cb) {
        // console.log(profile);
        userInfo.findOrCreate({ googleId: profile.id }, function (err, user) {
          return cb(err, user);
        });
      }
    )
  );

  router.get(
    '/auth/google',
    passport.authenticate('google', { scope: ['profile'] })
  );

  router.get(
    '/auth/google/list',
    passport.authenticate('google', { failureRedirect: '/' }),
    function (req, res) {
      // Successful authentication, redirect home.
      res.redirect('/home');
    }
  );

  export default router;