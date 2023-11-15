import express from 'express';
import passport from 'passport';
import session from 'express-session';
import passportLocalMongoose from 'passport-local-mongoose';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import findOrCreate from 'mongoose-findorcreate';
import userInfo from '../database/models/User.js';

const router = express.Router();

router.post('/signUp', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  userInfo.register({ username: username }, password, function (err, user) {
    if (err) {
      console.log(err);
      res.redirect('/');
    } else {
      passport.authenticate('local')(req, res, function () {
        res.redirect('/home');
      });
    }
  });
});  

export default router;
