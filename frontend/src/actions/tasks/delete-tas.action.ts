import { deleteTask } from '@/services/tasks.service';
import { redirect, type ActionFunctionArgs } from 'react-router';

export async function deleteTaskAction({ params }: ActionFunctionArgs) {
  try {
    const taskId = params.taskId;

    const numericTaskId = Number(taskId!.toString());

    await deleteTask(numericTaskId);

    return redirect('/tasks');
  } catch (error) {
    if (error instanceof Response && error.status === 401) {
      const errorData = await error.json();
      return { checkUserError: errorData.message };
    }
    return { error: 'Terjadi kesalahan tidak terduga.' };
  }
}
