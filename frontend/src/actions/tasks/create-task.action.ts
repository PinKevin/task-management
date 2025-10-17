import { formatErrors } from '@/helper/format-errors';
import type { TaskDto } from '@/interfaces/task.interface';
import { createTask } from '@/services/tasks.service';
import { redirect, type ActionFunctionArgs } from 'react-router';

export async function createTaskAction({ request }: ActionFunctionArgs) {
  try {
    const formData = await request.formData();

    const title = formData.get('title');
    const description = formData.get('description');
    const deadline = formData.get('deadline');

    const assignedToUserIdRaw = formData.get('userId');
    const assignedToUserId =
      assignedToUserIdRaw && assignedToUserIdRaw !== '' ? Number(assignedToUserIdRaw) : 0;

    const taskDto: TaskDto = {
      title: title!.toString(),
      description: description!.toString(),
      deadline: deadline!.toString(),
      userId: assignedToUserId,
    };

    await createTask(taskDto);

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
