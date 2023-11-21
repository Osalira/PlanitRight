import mongoose, { Schema, model, Types } from 'mongoose';


const taskSchema = new Schema({
  taskTitle:  {
    type: String,
    required: true
  },
  taskDescription: String,
})

const TasklistSchema = new Schema({
    listTitle: String,
    listOfTasks: [taskSchema],
  });

const listTasks = model('listsOfTask', TasklistSchema);


export default listTasks;