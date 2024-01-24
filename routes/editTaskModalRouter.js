import express from "express";
import mongoose from "mongoose";
import listTasks from "../database/models/ListTasks.js";
const router = express.Router();


router.post('/saveEditedTasks', async (req, res) => {
    try {
        const listId = req.body.listId;
        const editedListTitle = req.body.editedListTitle; // Retrieve the edited list title

        if (!mongoose.isValidObjectId(listId)) {
            return res.status(400).send('Invalid list ID');
        }

        const taskList = await listTasks.findById(listId);
        if (!taskList) {
            return res.status(404).send('Task list not found');
        }

        // Update the list title if it has been edited
        if (editedListTitle !== undefined) {
            taskList.listTitle = editedListTitle;
        }

        // Update each task in the list
        taskList.listOfTasks.forEach(task => {
            const editedTitle = req.body[`editedTitle_${task._id}`];
            const editedDesc = req.body[`editedDesc_${task._id}`];

            if (editedTitle !== undefined) {
                task.taskTitle = editedTitle;
            }
            if (editedDesc !== undefined) {
                task.taskDescription = editedDesc;
            }
        });

        await taskList.save();
        return res.redirect('/menu'); // Redirect to a success page or back to the list
    } catch (error) {
        console.error(error);
        return res.status(500).send('Server error');
    }
});


export default router;
