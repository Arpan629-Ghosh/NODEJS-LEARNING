import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { createUserTask, deleteUserTask, getUserTask, getUserTasks, updateUserTask } from "../services/user.task.service";

export const userTaskRouter = Router();
userTaskRouter.use(authenticate); // all the routes below are protected

userTaskRouter.post("/", async (req, res, next) => {
  try {
    const task = await createUserTask(req.user!.userId, req.body.title);
    res.status(201).json({
      success: true,
      message: "Task created successfully!",
      data: {
        task,
      },
    });
  } catch (error) {
    next(error);
  }
});

userTaskRouter.get("/", async (req, res, next) => {
  try {
    const tasks = await getUserTasks(req.user!.userId);
    res.status(200).json({
      success: true,
      message: "Tasks retreived successfully!",
      data: {
        tasks,
      },
    });
  } catch (error) {
    next(error);
  }
});

userTaskRouter.get("/:taskId", async(req, res, next) => {
    try {

        const task = await getUserTask(req.params.taskId, req.user!.userId);

        res.status(200).json({
            success: true,
            message: "Task retreived successfully!",
            data: {
                task
            }
        })
        
    } catch (error) {
        next(error)
    }
})

userTaskRouter.patch("/:taskId", async(req, res, next) => {
  try {
    
    const taskId = req.params.taskId;
    const userId = req.user!.userId;
    const taskTitle = req.body.title;
    const task = await updateUserTask(taskId, userId, taskTitle);

    res.status(200).json({
      success: true,
      message: "Task updated successfully!",
      data: {
        task
      }
    })
  } catch (error) {
    next(error);
  }
})

userTaskRouter.delete("/:taskId", async(req, res, next) => {

  try {
    
    const taskId = req.params.taskId;
    const userId = req.user!.userId;

    await deleteUserTask(taskId, userId);

    res.status(200).json({
      success: true,
      message: "Task deleted successfully"
    })

  } catch (error) {
    next(error)
  }
})
