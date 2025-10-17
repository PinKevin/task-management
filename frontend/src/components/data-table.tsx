import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { Task } from '@/interfaces/task.interface';
import { Link, useLoaderData, useSubmit } from 'react-router';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { getStatusLabel } from '@/helper/get-status-label';
import { useState } from 'react';
import { DeleteDialog } from './delete-dialog';

interface TasksData {
  tasks: Task[];
}

interface DataTableProps {
  onSort: () => void;
  currentDeadlineOrder: string | null;
}

export function DataTable({ onSort, currentDeadlineOrder }: DataTableProps) {
  const { tasks } = useLoaderData() as TasksData;
  const submit = useSubmit();

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  const handleOpenDeleteDialog = (task: Task) => {
    setTaskToDelete(task);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (taskToDelete) {
      const formData = new FormData();
      submit(formData, {
        method: 'DELETE',
        action: `/tasks/${taskToDelete.taskId}/delete`,
      });
    }
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">No</TableHead>
            <TableHead>Judul</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>
              <div className="flex items-center space-x-2">
                <span>Deadline</span>
                <Button variant="ghost" size="sm" onClick={onSort} className="p-0 h-auto">
                  <ChevronUp
                    className={cn(
                      'w-4 h-4 transition-colors',
                      currentDeadlineOrder === 'ASC'
                        ? 'text-blue-600'
                        : 'text-gray-400 hover:text-gray-700',
                    )}
                  />
                  <ChevronDown
                    className={cn(
                      'w-4 h-4 transition-colors',
                      currentDeadlineOrder === 'DESC'
                        ? 'text-blue-600'
                        : 'text-gray-400 hover:text-gray-700',
                    )}
                  />
                </Button>
              </div>
            </TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.length > 0 ? (
            tasks.map((task, index) => (
              <TableRow key={task.taskId}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>
                  <Link to={`/tasks/${task.taskId}`}>{task.title}</Link>
                </TableCell>
                <TableCell>
                  <span
                    className={cn(
                      'font-semibold px-2 py-0.5 rounded-full text-xs',
                      task.status === 'TODO' && 'bg-red-100 text-red-700',
                      task.status === 'IN_PROGRESS' && 'bg-yellow-100 text-yellow-700',
                      task.status === 'DONE' && 'bg-green-100 text-green-700',
                    )}
                  >
                    {getStatusLabel(task.status)}
                  </span>
                </TableCell>
                <TableCell>
                  {task.deadline
                    ? format(new Date(task.deadline), 'dd MMMM yyyy', { locale: id })
                    : '-'}
                </TableCell>
                <TableCell>
                  <div className="flex flex-row gap-2">
                    <Button asChild variant={'secondary'}>
                      <Link to={`/tasks/${task.taskId}/edit`}>Ubah</Link>
                    </Button>

                    <Button
                      type="button"
                      variant={'destructive'}
                      onClick={() => handleOpenDeleteDialog(task)}
                    >
                      Hapus
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                Belum ada data task.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <DeleteDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title="Konfirmasi Penghapusan Task"
        description={`Yakin ingin menghapus tugas "${taskToDelete?.title}"? Aksi ini tidak dapat dibatalkan.`}
        confirmLabel="Ya, Hapus"
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}
