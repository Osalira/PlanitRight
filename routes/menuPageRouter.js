import express from "express";
import listTasks from "../database/models/ListTasks.js";

const router = express.Router();
const currentYear = new Date().getFullYear();

router.get('/menu', async (req, res) => {
    try {
      // Ensure you have user authentication in place
      // req.user should contain the currently authenticated user's information
      if (!req.user) {
        return res.redirect('/');
        // return res.status(401).send('User not authenticated');
      }

      const userId = req.user._id; // Assuming you have the user's ID available here
      const myLists = await listTasks.find({ user: userId }); // Retrieves only the documents belonging to the logged-in user

      if (myLists) {
        return res.render('newMenuPage', {
          listOfLists: myLists,
          curYear: currentYear,
        });
      } else {
        return res.status(404).send('No task lists found for the user');
      }
    } catch (error) {
      console.error(error);
      return res.status(500).send('Error retrieving task lists');
    }
});

export default router;

