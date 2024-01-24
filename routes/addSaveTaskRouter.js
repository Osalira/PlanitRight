import express from "express";
import listTasks from "../database/models/ListTasks.js";
import Task from "../database/models/Task.js";

const router = express.Router();

router.post('/submit', async (req, res) => {
  const actionH = req.body.action;

  if (!req.isAuthenticated()) {
    return res.redirect('/'); // Redirect to login if not authenticated
  }

  const userId = req.user._id; // Get the authenticated user's ID

  if (actionH === 'addToList') {
    try {
      const mytask = new Task({
        taskTitle: req.body.titleI,
        taskDescription: req.body.iDescription,
      });

      // Find the last list or create a new one
      let lastList = await listTasks.findOne({ user: userId }).sort({ _id: -1 }).exec();
      if (!lastList || req.body.titleListT) {
        lastList = new listTasks({
          listTitle: req.body.titleListT || 'New List',
          listOfTasks: [],
          user: userId,
        });
      }

      // Add the new task to the list
      lastList.listOfTasks.push(mytask);
      await lastList.save();

      // Render the homePage with the updated list and title
      return res.render('homePage', {
        title: lastList.listTitle,
        arr: lastList.listOfTasks,
        curUserId: userId,
      });

    } catch (error) {
      console.error('Error adding task:', error);
      return res.status(500).send('Error adding task.');
    }
  } else if (actionH === 'saveList') {
    try {
      // Save the current list
      let lastList = await listTasks.findOne({ user: userId }).sort({ _id: -1 }).exec();
      if (lastList) {
        await lastList.save();
      }

      // Create a new list for future additions
      const newList = new listTasks({
        listTitle: 'New List',
        listOfTasks: [],
        user: userId,
      });
      await newList.save();

      return res.redirect('/menu');
    } catch (error) {
      console.error('Error saving list:', error);
      return res.status(500).send('Error saving list.');
    }
  } else {
    return res.status(400).send('Invalid action.');
  }
});

export default router;
