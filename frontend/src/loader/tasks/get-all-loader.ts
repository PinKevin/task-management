import { getAllTasks } from '@/services/tasks.service';
import type { LoaderFunctionArgs } from 'react-router';

import type { TaskQueryFilters } from '@/services/tasks.service';
import type { TaskStatus } from '@/interfaces/task.interface';

function isValidTaskStatus(status: string): status is TaskStatus {
  return ['TODO', 'IN_PROGRESS', 'DONE'].includes(status);
}

export async function getAllTaskLoader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const status = url.searchParams.get('status');
  const deadlineOrder = url.searchParams.get('deadlineOrder');

  const filters: TaskQueryFilters = {};

  if (status && isValidTaskStatus(status)) {
    filters.status = status;
  }

  if (deadlineOrder === 'ASC' || deadlineOrder === 'DESC') {
    filters.deadlineOrder = deadlineOrder;
  }

  try {
    const tasks = await getAllTasks(filters);
    return { tasks };
  } catch {
    return { tasks: [] };
  }
}
