import express from "express";

import listTasks from "../database/models/ListTasks.js";

const router = express.Router();

router.post('/deleteTask', async (req, res) => {
    try {
      const taskId = req.body.deleteTask;
      const curList = await listTasks.findOne().sort({ _id: -1 }).exec();
  
      listTasks
        .updateOne(
          { _id: curList._id },
          { $pull: { listOfTasks: { _id: taskId } } }
        )
        .exec();
  
      res.redirect('/home');
    } catch (error) {
      res.status(500).send(`Error deleting task. ${req.body.deleteTask}`);
      console.log(error);
    }
  });

export default router;