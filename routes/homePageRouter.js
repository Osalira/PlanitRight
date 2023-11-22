import express from "express";
import listTasks from "../database/models/ListTasks.js";

const router = express.Router();
const currentYear = new Date().getFullYear();

router.get('/home', async (req, res) => {
  if (req.isAuthenticated()) {
    try {
      // Fetch the last document for the current user
      const userId = req.user._id; // Get the logged-in user's ID
      //console.log(userId);
      const lastSavedDoc = await listTasks.findOne({ user: userId }).sort({ _id: -1 }).exec();

      // Check if lastSavedDoc is not null
      if (lastSavedDoc && lastSavedDoc.listOfTasks) {
        res.render('homePage', {
          title: lastSavedDoc.listTitle,
          arr: lastSavedDoc.listOfTasks,
          curUserId: lastSavedDoc.user,
          curYear: currentYear,
        });
      } else {
        // Render homePage without tasks if no document is found
        res.render('homePage', {
          curYear: currentYear,
        });
      }
    } catch (error) {
      res.status(500).send({ message: 'Error retrieving data' });
      console.log(error);
    }
  } else {
    res.redirect('/');
  }
});

export default router;
