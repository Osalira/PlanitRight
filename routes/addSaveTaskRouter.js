import express from "express";
import listTasks from "../database/models/ListTasks.js";
import Task from "../database/models/Task.js";

const router = express.Router();

router.post('/submit', async (req, res) => {
  const actionH = req.body.action;
  const curUserID = req.body.userId;

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

      // Find the current list that the user is interacting with
      const lastList = await listTasks.findOne({ user: userId }).sort({ _id: -1 }).exec();

      if (lastList) {
        lastList.listOfTasks.push(mytask);

        const titleOfList = req.body.titleListT;
        if (typeof titleOfList !== 'undefined' && titleOfList) {
          lastList.listTitle = titleOfList;
        }

        await lastList.save();
      }

      res.redirect('/home');
    } catch (error) {
      res.status(500).send('Error saving task.');
      console.error(error);
    }
  } else if (actionH === 'saveList') {
    try {
      const newList = new listTasks({
        listTitle: req.body.titleListT,
        listOfTasks: [],
        user: userId, // Link this list to the current user
      });
      await newList.save();

      res.redirect('/menu');
    } catch (error) {
      res.status(500).send('Error saving list.');
    }
  } else {
    res.status(400).send('Invalid action.');
  }
});

export default router;
