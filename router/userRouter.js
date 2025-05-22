
import  express  from 'express';
import userAuthMiddleware from '../middleware/authMiddleware.js';
import UserController from '../controller/UserController.js';


const userRouter = express.Router();
userRouter.post('/createUser',UserController.createUser)
userRouter.get('/getAllUser',userAuthMiddleware, UserController.getAllUser)
userRouter.get('/getOneUser/:id',UserController.getOneUser)
userRouter.put('/editUser/:id',UserController.editUser)
userRouter.delete('/deleteUser/id',UserController.deleteUser)

userRouter.post('/login',UserController.login)

export default userRouter;