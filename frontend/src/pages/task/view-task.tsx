import { Button } from '@/components/ui/button';
import { getStatusLabel } from '@/helper/get-status-label';
import type { Task } from '@/interfaces/task.interface';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { Link, useLoaderData } from 'react-router';

interface TaskData {
  task: Task;
}

export default function ViewTaskPage() {
  const { task } = useLoaderData() as TaskData;

  return (
    <div className="flex flex-col gap-2">
      <h2 className="mx-auto text-2xl font-bold">Lihat Task</h2>

      <h3 className="text-lg font-bold">Judul</h3>
      <p className="text-base">{task.title}</p>

      <h3 className="text-lg font-bold">Deskripsi</h3>
      <p className="text-base">{task.description}</p>

      <h3 className="text-lg font-bold">Status</h3>
      <p className="text-sm">
        <span
          className={cn(
            'font-semibold px-2 py-0.5 rounded-full',
            task.status === 'TODO' && 'bg-red-100 text-red-700',
            task.status === 'IN_PROGRESS' && 'bg-yellow-100 text-yellow-700',
            task.status === 'DONE' && 'bg-green-100 text-green-700',
          )}
        >
          {getStatusLabel(task.status)}
        </span>
      </p>

      <h3 className="text-lg font-bold">Deadline</h3>
      <p className="text-base">
        {task.deadline ? format(new Date(task.deadline), 'dd MMMM yyyy', { locale: id }) : '-'}
      </p>

      <h3 className="text-lg font-bold">Petugas</h3>
      <p className="text-base">{task.user?.name}</p>

      <h3 className="text-lg font-bold">Pembuat</h3>
      <p className="text-base">{task.creator?.name}</p>

      <Button asChild>
        <Link to={'/tasks'} className="text-lg mt-3 max-w-20">
          Kembali
        </Link>
      </Button>
    </div>
  );
}
