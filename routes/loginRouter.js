import express from 'express';
import passport from 'passport';

const router = express.Router();

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (!user) {
      // No user found, or wrong credentials
      req.flash('error', 'Invalid username or password');
      return res.redirect('/'); // Redirect to the login page
    }
    req.logIn(user, (err) => {
      if (err) {
        console.error(err);
        return next(err);
      }
      // Successful login, redirect to the home page or user-specific dashboard
      return res.redirect('/home');
    });
  })(req, res, next);
});

export default router;
