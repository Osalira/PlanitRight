import express from "express";
import listTasks from "../database/models/ListTasks.js";
import Task from "../database/models/Task.js";

const router = express.Router();
//here is the function to add a task to the list and to save the list
// and bring the list to the card layout in the work page
router.post('/submit', async (req, res) => {
    const actionH = req.body.action;
  
    if (actionH === 'addToList') {
      try {
        const mytask = new Task({
          taskTitle: req.body.titleI,
          taskDescription: req.body.iDescription,
        });
        // await mytask.save();  // Assuming you don't want to save individual tasks
        //here i'm finding the current list that the user is interacting with
        const lastList = await listTasks.findOne().sort({ _id: -1 }).exec();
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
      //here we are saving the list and redirecting the user to the work menu
      //where there is a layout for every list that has been  saved
      try {
        const newList = new listTasks({
          listTitle: req.body.titleListT,
          listOfTasks: [],
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