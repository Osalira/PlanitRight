import express from "express";
import listTasks from "../database/models/ListTasks.js";

const router = express.Router();
const currentYear = new Date().getFullYear();

router.get('/home', async (req, res) => {
  if (req.isAuthenticated()) {
    // Create a new list instance for the current user
    const userId = req.user._id;
    const newList = new listTasks({
      listTitle: "", // Initially empty title
      listOfTasks: [], // Initially empty task list
      user: userId,
    });

    return res.render('homePage', {
      title: newList.listTitle,
      arr: newList.listOfTasks,
      curUserId: userId,
      curYear: currentYear,
    });
  } else {
    return res.redirect('/');
  }
});

export default router;
