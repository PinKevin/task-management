export interface Task {
  taskId: number;
  title: string;
  description: string;
  status: string;
  deadline: string;
}

export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE';
