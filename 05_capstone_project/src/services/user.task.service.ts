import { AppError } from "../errors/AppError";
import { createTask, findTaskById, getTasksByUserId } from "../repository/user.task.repository";
import { Task } from "../types/task";

function validateTitle(title: unknown): string{

    if(typeof title !== 'string' || !title.trim()){
        throw new AppError(400, "Title is required");
    }

    const trimmedTitle = title.trim();

    if(trimmedTitle.length > 100){
        throw new AppError(400, "Title must be 100 charecter or less");
    }

    return trimmedTitle;
}

export async function createUserTask(userId: string, title: unknown): Promise<Task>{

    const validTitle = validateTitle(title);
    return createTask(userId, validTitle);
}

export async function getUserTasks(userId: string): Promise<Task[] | null>{

    return getTasksByUserId(userId);
}

export async function getUserTask(taskId:string, userId: string): Promise<Task> {

    if (!/^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i.test(taskId)) {
        throw new AppError(400, "Invalid task ID");
    }

    const task = await findTaskById(taskId, userId);
    if(!task){
        throw new AppError(404, "Task not found");
    }

    return task;
}