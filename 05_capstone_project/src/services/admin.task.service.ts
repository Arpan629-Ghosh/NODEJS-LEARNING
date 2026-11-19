import { AppError } from "../errors/AppError";
import { findAllTasks } from "../repository/admin.task.repository";
import { AdminTaskListQuery, AdminTaskListResponse } from "../types/admin";

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