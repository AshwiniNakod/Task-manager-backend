import TaskModel from "../model/taskModel.js";

class TaskController {
  static addTask = async (req, res) => {
    try {
      const { title, description, status } = req.body;
      if (!title || !description || !status) {
         return res.status(400).json({
        status: "fail",
        message: "All fields are required.",
      });
      }
      const newTask = new TaskModel({
        title: title,
        description: description,
        status: status,
        userId: req.user._id,
      });
      await newTask.save();
      return res.status(201).json({
        status: "success",
        message: "New task submitted successfully!",
      });
    } catch (error) {
      console.log(error);
    }
  };
  static getAllTask = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;

      const totalTasks = await TaskModel.countDocuments();
      const tasks = await TaskModel.find().skip(skip).limit(limit);
      const totalPages = Math.ceil(totalTasks / limit);

      res.status(200).json({
        message: tasks,
        totalPages,
        currentPage: page,
      });
    } catch (error) {
      console.log(error);
    }
  };
  static getTask = async (req, res) => {
    try {
        const task = await TaskModel.findOne({_id: req.params.id})
      res.status(200).json({
        status:'success',
        message: task,
      });
    } catch (error) {
      console.log(error);
    }
  };
  static getLoggedInUserTask = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;
      const totalTasks = await TaskModel.countDocuments();

      const tasks = await TaskModel.find({ userId: req.user.id }).skip(skip).limit(limit)
       const totalPages = Math.ceil(totalTasks / limit);
      return res.status(201).json({
        total: tasks.length,
        message: tasks,
        totalPages,
        currentPage: page,

      });
    } catch (error) {
      console.log(error);
    }
  };
  static updateTask = async (req, res) => {
    try {
      const { title, description, status } = req.body;
      const taskId = req.params.id;
      const post = await TaskModel.findByIdAndUpdate(
        { _id: taskId },
        {
          $set: {
            title: title,
            description: description,
            status: status,
          },
        },
        {
          new: true,
        }
      );
      return res.status(200).json({
        status: "success",
        message: "Task updated successfully.",
      });
    } catch (error) {
      console.log(error);
    }
  };
  static deleteTask = async (req, res) => {
    try {
      const isTaskExits = await TaskModel.findById({ _id: req.params.id });
      if (!isTaskExits) {
        return res.status(200).json({
          status: "success",
          message: "Task not found.",
        });
      }

      await TaskModel.findByIdAndDelete({ _id: req.params.id });
      return res.status(200).json({
        status: "success",
        message: "Task deleted successfully.",
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export default TaskController;
