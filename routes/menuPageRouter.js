import express from "express";
import Task from "../database/models/Task.js";
import listTasks from "../database/models/ListTasks.js";

const router = express.Router();
const currentYear = new Date().getFullYear();

router.get('/menu', async (req, res) => {
    try {
      const myLists = await listTasks.find(); //this retrieves all the documents
      if (myLists) {
        res.render('menuPage', {
          listOfLists: myLists,
          curYear: currentYear,
        });
      }
    } catch (error) {
      res.status(500).send('Error retrieving lis task. and showing work page');
      console.error(error);
    }
  });

export default router;