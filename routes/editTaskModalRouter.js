import { Express } from "express";
import listTasks from "../database/models/ListTasks";
const router = express.Router();

router.get('/editTaskModal/:id', (req, res) => {
    const taskId = req.params.id;
    listTasks.findById(taskId)
        .then(task => {
            res.render('editTask', { task });
        })
        .catch(err => console.log(err));
});

export default router;