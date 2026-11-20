import { AppError } from "../errors/AppError";
import { findAllTasks, updateTaskStatus } from "../repository/admin.task.repository";
import { AdminTaskListQuery, AdminTaskListResponse } from "../types/admin";
import { Task } from "../types/task";

const TASK_STATUSES = ["OPEN", "IN_PROGRESS", "RESOLVED"] as const;
type TaskStatus = (typeof TASK_STATUSES)[number];

export async function getAdminTask(
    query: AdminTaskListQuery
): Promise<AdminTaskListResponse>{

    const search = query.search?.trim() || undefined;
    const status = query.status?.trim() || undefined;

    if(status && !TASK_STATUSES.includes(status as TaskStatus)){
        throw new AppError(400, "status must be in open, inprogress or resolved");
    }

    const tasks = await findAllTasks({
        search, status
    });

    return {
        tasks
    };
}

export async function updateAdminTaskStatus(
    taskId: string,
    status: unknown
): Promise<Task>{

     if(typeof status !== 'string' || !TASK_STATUSES.includes(status as TaskStatus)){
        throw new AppError(400, "status must be in open, inprogress or resolved");
    }

    if (!/^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i.test(taskId)) {
        throw new AppError(400, "Invalid task ID");
    }

    const task = await updateTaskStatus(taskId, status);

    if(!task){
        throw new AppError(404, "Task not found!");
    }
    return task;
}