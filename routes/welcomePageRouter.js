import express from "express";

const router = express.Router();

// welcome page route
router.get('/', (req, res) => {
    res.render('welcomePage', { 
      messages: {
        error: req.flash('error'),  // Retrieves error messages from the session
      }
    });
  });
  

export default router;