import express from "express";
import mongoose from "mongoose";
import listTasks from "../database/models/ListTasks.js";

const router = express.Router();

router.post('/addTaskToSavedList', async (req, res) => {
    try {
        const { listId, newTaskTitle, newTaskDescription } = req.body;
        
        if (!mongoose.isValidObjectId(listId)) {
            return res.status(400).send('Invalid list ID');
        }

        // Check if the title and description are not empty
        if (!newTaskTitle.trim() || !newTaskDescription.trim()) {
            // Handle the error, you can redirect or send a message
            return res.status(400).send('Task title and description cannot be empty');
        }

        const taskList = await listTasks.findById(listId);
        if (!taskList) {
            return res.status(404).send('Task list not found');
        }

        // Add the new task to the list
        taskList.listOfTasks.push({
            taskTitle: newTaskTitle,
            taskDescription: newTaskDescription
        });

        await taskList.save();
        res.redirect('/menu'); // Adjust the redirect as needed
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

export default router;
