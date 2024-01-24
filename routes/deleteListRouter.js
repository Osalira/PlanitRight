import express from "express";
import listTasks from "../database/models/ListTasks.js";

const router = express.Router();

// here i'm deleting a list that is already saved into our work menu
router.post('/deleteList', async (req, res) => {
    try {
      const listId = req.body.ListItemId;
      // const curList = await listTasks.findOne().sort({ _id: -1 }).exec();
  
      listTasks.deleteOne({ _id: listId }).exec();
  
      return res.redirect('/menu');
    } catch (error) {
      return res.status(500).send(`Error deleting task. ${req.body.ListItemId}`);
      
    }
  });

export default router;