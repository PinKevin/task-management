export interface Task {
  taskId: number;
  title: string;
  description: string;
  status: string;
  deadline: string;
}

export interface TaskDto {
  title: string;
  description: string;
  deadline: string;
  userId: number;
}

export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE';
