import express from 'express';
const router = express.Router();

// Define a route
router.post('/login', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
  
    const user = new userInfo({
      username: username,
      password: password,
    });
  
    req.login(user, function (err) {
      if (err) {
        console.log(err);
      } else {
        passport.authenticate('local')(req, res, function () {
          res.redirect('/app.js');
        });
      }
    });
  });

export default router;