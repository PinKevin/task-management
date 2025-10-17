import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { Task } from '@/interfaces/task.interface';
import { useLoaderData } from 'react-router';

interface TasksData {
  tasks: Task[];
}

export function DataTable() {
  const { tasks } = useLoaderData() as TasksData;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">No</TableHead>
          <TableHead>Judul</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Deadline</TableHead>
          <TableHead>Aksi</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TableRow key={task.taskId}>
              <TableCell className="font-medium">{task.taskId}</TableCell>
              <TableCell>{task.title}</TableCell>
              <TableCell>{task.status}</TableCell>
              <TableCell>{task.deadline}</TableCell>
              <TableCell>Halo</TableCell>
            </TableRow>
          ))
        ) : (
          <p>Belum ada data</p>
        )}
      </TableBody>
    </Table>
  );
}
