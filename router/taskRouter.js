
import  express  from 'express';
import userAuthMiddleware from '../middleware/authMiddleware.js';
import TaskController from '../controller/TaskController.js';


const taskRouter = express.Router();
taskRouter.post('/addTask',userAuthMiddleware, TaskController.addTask)
taskRouter.get('/getAllLoggedInUserTask',userAuthMiddleware, TaskController.getLoggedInUserTask)
taskRouter.get('/getTask/:id',userAuthMiddleware, TaskController.getTask)
taskRouter.put('/updateTask/:id',TaskController.updateTask)
taskRouter.delete('/deleteTask/:id',TaskController.deleteTask)


export default taskRouter;