import { getToken } from '@/helper/access-token-helper';
import type { Task, TaskDto } from '@/interfaces/task.interface';
import { BASE_URL } from '@/lib/api';

export interface TaskQueryFilters {
  status?: 'TODO' | 'IN_PROGRESS' | 'DONE';
  deadlineOrder?: 'ASC' | 'DESC';
}

export async function getAllTasks(query: TaskQueryFilters): Promise<Task[]> {
  const token = getToken();
  if (!token) {
    throw new Error('Not authenticated');
  }

  const queryParams = new URLSearchParams();

  if (query.status) {
    queryParams.append('status', query.status);
  }
  if (query.deadlineOrder) {
    queryParams.append('deadlineOrder', query.deadlineOrder);
  }
  const queryString = queryParams.toString();
  const url = `${BASE_URL}/tasks${queryString ? `?${queryString}` : ''}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw response;
  }

  return response.json() as Promise<Task[]>;
}

export async function updateTask(updateDto: TaskDto, taskId: number) {
  const token = getToken();
  if (!token) {
    throw new Error('Not authenticated');
  }

  const response = await fetch(`${BASE_URL}/tasks/${taskId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(updateDto),
  });

  if (!response.ok) {
    throw response;
  }

  return response.json();
}

export async function getTask(id: string): Promise<Task> {
  const token = getToken();
  if (!token) {
    throw new Error('Not authenticated');
  }

  const url = `${BASE_URL}/tasks/${id}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw response;
  }

  return response.json() as Promise<Task>;
}

export async function createTask(createDto: TaskDto) {
  const token = getToken();
  if (!token) {
    throw new Error('Not authenticated');
  }

  const response = await fetch(`${BASE_URL}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(createDto),
  });

  if (!response.ok) {
    throw response;
  }

  return response.json();
}
