import { getTask } from '@/services/tasks.service';
import type { LoaderFunctionArgs } from 'react-router';

export async function getOneLoader({ params }: LoaderFunctionArgs) {
  const taskId = params.taskId!;

  try {
    const task = await getTask(taskId);
    return { task };
  } catch (error) {
    if (error instanceof Response && error.status === 404) {
      throw error;
    }

    return { error: 'Terjadi kesalahan tidak terduga.' };
  }
}
