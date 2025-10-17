export interface Task {
  taskId: number;
  user?: {
    userId: number;
    name: string;
    username: string;
  };
  title: string;
  description: string;
  status: string;
  deadline: string;
  creator?: {
    userId: number;
    name: string;
    username: string;
  };
}

export interface TaskDto {
  title: string;
  description: string;
  deadline: string;
  userId: number;
  status?: TaskStatus;
}

export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE';
