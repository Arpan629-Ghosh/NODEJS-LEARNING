import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { createUserTask, getUserTask, getUserTasks } from "../services/user.task.service";

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
