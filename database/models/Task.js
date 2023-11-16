import mongoose, { Schema, model, Types } from 'mongoose';

const taskSchema = new Schema({
    taskTitle: String,
    taskDescription: String,
  });

const Task = model('Task', taskSchema);


export default Task;