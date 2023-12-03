import express from "express";
import listTasks from "../database/models/ListTasks.js";
const router = express.Router();

router.post('/editTaskOfSavedList', async (req, res) => {
    const actionE = req.body.editAction;
    if (actionE === 'editButton') {
      // res.redirect('/listModal.ejs');
    } else if (actionE === 'deleteButton') {
      try {
        const listID = req.body.docID;
        const taskID = req.body.listID;
  
        // const curList = await listTasks.findOne().sort({ _id: listID }).exec();
  
        listTasks
          .updateOne({ _id: listID }, { $pull: { listOfTasks: { _id: taskID } } })
          .exec();
        res.redirect('/menu');
      } catch (error) {
        console.error('Error:', error);
        // Send an error JSON response
        res.status(500).json({ message: 'An error occurred.' });
      }
    } else {
      res.status(400).send('Invalid action.');
    }
  });

export default router;