import express from "express";

const router =  express.Router();

const currentYear = new Date().getFullYear();

router.get('/home', async (req, res) => {
    if (req.isAuthenticated()) {
      try {
        
          res.render('homePage', {
            curYear: currentYear,
          });
        
      } catch (error) {
        res.status(500).send({ message: 'Error retrieving data' });
        console.log(error);
      }
    } else {
      res.redirect('/');
    }
  });

  export default router;