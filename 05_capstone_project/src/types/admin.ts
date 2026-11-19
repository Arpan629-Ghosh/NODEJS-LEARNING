import { Task } from "./task";



export type AdminTaskListQuery = {
  search?: string;
  status?: string;
};

export type AdminTaskListResponse = {
  tasks: Task[];
};
