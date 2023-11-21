import express from "express";
import mongoose from "mongoose";
import listTasks from "../database/models/ListTasks.js";
const router = express.Router();


router.post('/saveEditedTasks', async (req, res) => {
    try {
        const listId = req.body.listId;

        console.log("Used ID: ", listId);
        console.log(req.body);

        if (!mongoose.isValidObjectId(listId)) {
            return res.status(400).send('Invalid list ID');
        }

        const taskList = await listTasks.findById(listId);
        if (!taskList) {
            return res.status(404).send('Task list not found');
        }

        // Update each task in the list
        taskList.listOfTasks.forEach(task => {
            const editedTitle = req.body[`editedTitle_${task._id}`];
            const editedDesc = req.body[`editedDesc_${task._id}`];
            console.log(editedTitle);
            if (editedTitle !== undefined) {
                task.taskTitle = editedTitle;
            }
            if (editedDesc !== undefined) {
                task.taskDescription = editedDesc;
            }
        });

        await taskList.save();
        res.redirect('/menu'); // Redirect to a success page or back to the list
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

export default router;
