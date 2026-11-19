import { pool } from "../lib/db";
import { Task, TaskRow } from "../types/task";

export async function createTask(userId: string, title: string): Promise<Task> {
  const result = pool.query<TaskRow>(
    `INSERT INTO support_tasks (title, user_id)
        VALUES ($1, $2)
        RETURNING id, title, status, user_id, created_at, updated_at`,
    [title, userId],
  );

  return (await result).rows[0];
}

export async function getTasksByUserId(userId: string): Promise<Task[] | null> {
  const result = await pool.query<TaskRow>(
    `SELECT * FROM support_tasks WHERE user_id = $1 ORDER BY created_at DESC`,
    [userId],
  );

  return result.rows ?? null;
}

export async function findTaskById(
  taskId: string,
  userId: string,
): Promise<Task> {
  const result = await pool.query<TaskRow>(
    `SELECT * FROM support_tasks WHERE id = $1 AND user_id = $2`,
    [taskId, userId],
  );

  return result.rows[0] ?? null;
}

export async function updateTaskById(
  taskId: string,
  userId: string,
  taskTitle: string,
): Promise<Task | null> {
  const result = await pool.query<TaskRow>(
    `UPDATE support_tasks 
    SET title = $1
    WHERE id = $2 AND user_id =$3
    RETURNING id, title, status, user_id, created_at, updated_at`,
    [taskTitle, taskId, userId],
  );

  return result.rows[0] ?? null;
}

export async function deleteTaskById(
  taskId: string,
  userId: string
): Promise<boolean>{

  const result = await pool.query<TaskRow>(
    `DELETE FROM support_tasks
    WHERE id = $1 AND user_id = $2
    `,
    [taskId, userId]
  )

  return (result.rowCount ?? 0) > 0;
}
