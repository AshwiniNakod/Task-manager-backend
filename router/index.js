import express from "express";
import userRouter from "./userRouter.js";
import taskRouter from "./taskRouter.js";


export const mainRoute = express.Router();
// setup the all routes
mainRoute.use('/tasks', taskRouter);
mainRoute.use('/user', userRouter);