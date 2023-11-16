import express from 'express';
import userInfo from '../database/models/User.js';
import passport from 'passport';
const router = express.Router();

// Define a route

router.post('/login', passport.authenticate('local', {
  successRedirect: '/home',
  failureRedirect: '/',
  failureFlash: 'Enter a correct password or username'  // Enable flash messages for failures
}));

export default router;