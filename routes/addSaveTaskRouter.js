import express from "express";
import listTasks from "../database/models/ListTasks.js";
import Task from "../database/models/Task.js";

const router = express.Router();

router.post('/submit', async (req, res) => {
  const actionH = req.body.action;

  // Check if the user is authenticated
  if (!req.isAuthenticated()) {
    // Redirect to the login page if the user is not authenticated
    return res.redirect('/'); // Make sure to redirect to your login route
  }

  // Get the authenticated user's ID
  const userId = req.user._id;
  
  if (actionH === 'addToList') {
    try {
      // Create a new task with the provided title and description
      const mytask = new Task({
        taskTitle: req.body.titleI,
        taskDescription: req.body.iDescription,
      });

      // Find the last list of the authenticated user
      const lastList = await listTasks.findOne({ user: userId }).sort({ _id: -1 }).exec();

      if (lastList) {
        // Add the new task to the list's tasks array
        lastList.listOfTasks.push(mytask);

        // Update the list title if provided
        const titleOfList = req.body.titleListT;
        if (titleOfList) {
          lastList.listTitle = titleOfList;
        }

        // Save the updated list
        await lastList.save();
      }

      // Redirect to the home page after adding the task
      res.redirect('/home');
    } catch (error) {
      console.error('Error saving task:', error);
      res.status(500).send('Error saving task.');
    }
  } else if (actionH === 'saveList') {
    try {
      // Create a new list with the provided title and empty tasks array
      const newList = new listTasks({
        listTitle: req.body.titleListT,
        listOfTasks: [],
        user: userId, // Associate the list with the authenticated user
      });

      // Save the new list
      await newList.save();

      // Redirect to the menu page after saving the list
      res.redirect('/menu');
    } catch (error) {
      console.error('Error saving list:', error);
      res.status(500).send('Error saving list.');
    }
  } else {
    // Handle invalid actions
    res.status(400).send('Invalid action.');
  }
});

export default router;
