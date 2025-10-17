import { getTask } from '@/services/tasks.service';
import { getAllUsers } from '@/services/users.service'; // Asumsikan ada fungsi ini
import type { LoaderFunctionArgs } from 'react-router';

export async function getOneAndUsersLoader({ params }: LoaderFunctionArgs) {
  const taskId = params.taskId;
  const numericTaskId = Number(taskId!.toString());

  if (!taskId) {
    throw new Response('ID tugas tidak ditemukan dalam URL.', { status: 400 });
  }

  try {
    const [task, users] = await Promise.all([getTask(numericTaskId), getAllUsers()]);

    return { task, users };
  } catch (error) {
    if (error instanceof Response && error.status === 404) {
      throw error;
    }

    return { error: 'Terjadi kesalahan tidak terduga.' };
  }
}
