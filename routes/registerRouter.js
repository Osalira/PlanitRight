import express from 'express';
import passport from 'passport';
import userInfo from '../database/models/User.js';

const router = express.Router();

router.post('/signUp', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await userInfo.findOne({ username: username });

    if (existingUser) {
      // User already exists
      console.log('User already exists with this username.');
      req.flash('error', 'USERNAME ALREADY TAKEN');
      return res.redirect('/'); // User exists, redirect back to signup
    }

    // If user does not exist, register a new one
    userInfo.register(new userInfo({ username: username }), password, (err, user) => {
      if (err) {
        console.error(err);
        
        return res.redirect('/');
      }

      // Authenticate the user after successful registration
      passport.authenticate('local')(req, res, () => {
        
        res.redirect('/home'); // Redirect to home after signup
      });
    });
  } catch (err) {
    console.error(err);
    return res.redirect('/'); // Replace with your error page or signup page
  }
});  

export default router;
