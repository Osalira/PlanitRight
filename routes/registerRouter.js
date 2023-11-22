import express from 'express';
import passport from 'passport';
import userInfo from '../database/models/User.js';

const router = express.Router();

router.post('/signUp', (req, res) => {
  const { username, password } = req.body;

  // Check if the user already exists
  userInfo.findOne({ username: username }, (err, existingUser) => {
    if (err) {
      console.error(err);
      return res.redirect('/'); // Replace '/signup' with your signup page
    }

    if (existingUser) {
      // User already exists
      console.log('User already exists with this username.');
      return res.redirect('/'); // User exists, redirect back to signup
    }

    // If user does not exist, register a new one
    userInfo.register({ username: username }, password, (err, user) => {
      if (err) {
        console.error(err);
        return res.redirect('/');
      }

      // Authenticate the user after successful registration
      passport.authenticate('local')(req, res, () => {
        res.redirect('/home'); // Redirect to home after signup
      });
    });
  });
});  

export default router;
