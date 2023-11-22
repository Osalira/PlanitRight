import mongoose, { Schema, model, Types } from 'mongoose';


const taskSchema = new Schema({
  taskTitle:  {
    type: String,
    required: true
  },
  taskDescription: String,
})


const TasklistSchema = new mongoose.Schema({
    listTitle: String,
    listOfTasks: [taskSchema],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  });
const listTasks = model('listsOfTask', TasklistSchema);


export default listTasks;