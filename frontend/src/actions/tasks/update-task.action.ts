import { formatErrors } from '@/helper/format-errors';
import type { TaskDto, TaskStatus } from '@/interfaces/task.interface';
import { updateTask } from '@/services/tasks.service';
import { redirect, type ActionFunctionArgs } from 'react-router';

export async function updateTaskAction({ request }: ActionFunctionArgs) {
  try {
    const formData = await request.formData();
    const taskId = formData.get('taskId');

    const title = formData.get('title');
    const description = formData.get('description');
    const deadline = formData.get('deadline');
    const status = formData.get('status');

    const assignedToUserIdRaw = formData.get('userId');
    const assignedToUserId =
      assignedToUserIdRaw && assignedToUserIdRaw !== '' ? Number(assignedToUserIdRaw) : 0;

    const taskDto: TaskDto = {
      title: title!.toString(),
      description: description!.toString(),
      deadline: deadline!.toString(),
      userId: assignedToUserId,
      status: status!.toString() as TaskStatus,
    };

    const numericTaskId = Number(taskId!.toString());

    await updateTask(taskDto, numericTaskId);

    return redirect('/tasks');
  } catch (error) {
    if (error instanceof Response && error.status === 400) {
      const errorData = await error.json();
      return { errors: formatErrors(errorData.message) };
    }
    if (error instanceof Response && error.status === 401) {
      const errorData = await error.json();
      return { checkUserError: errorData.message };
    }
    return { error: 'Terjadi kesalahan tidak terduga.' };
  }
}
