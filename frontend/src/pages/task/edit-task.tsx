import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import type { User } from '@/interfaces/user.interface';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import { Form, useActionData, useLoaderData, useParams } from 'react-router';
import type { Task, TaskStatus } from '@/interfaces/task.interface';
import { getStatusLabel } from '@/helper/get-status-label';

const statusOptions: TaskStatus[] = ['TODO', 'IN_PROGRESS', 'DONE'];

interface EditData {
  task: Task;
  users: User[];
}

interface ActionData {
  errors?: {
    userId?: string;
    title?: string;
    description?: string;
    deadline?: string;
    status?: string;
  };
}

export default function EditTaskPage() {
  const { task, users } = useLoaderData() as EditData;
  const actionData = useActionData() as ActionData;
  const errors = actionData?.errors;

  const { taskId } = useParams();

  const [selectedUserId, setSelectedUserId] = useState<string | null>(
    task.user?.userId.toString() ?? null,
  );

  const [status, setStatus] = useState<TaskStatus>(task.status as TaskStatus);

  const initialDeadline = task.deadline ? new Date(task.deadline) : undefined;
  const [date, setDate] = useState<Date | undefined>(initialDeadline);

  const handleUserChange = (value: string) => {
    setSelectedUserId(value);
  };

  const handleStatusChange = (value: string) => {
    setStatus(value as TaskStatus);
  };

  return (
    <>
      <h2 className="mx-auto text-2xl font-bold">Ubah Task</h2>
      <Form method="post">
        <FieldGroup className="max-w-[800px] mx-auto">
          <Input type="hidden" name="taskId" value={taskId} />

          <Field>
            <FieldLabel htmlFor="title">Judul</FieldLabel>
            <Input
              id="title"
              name="title"
              type="text"
              placeholder="Judul"
              defaultValue={task.title}
            />
            {errors?.title && <p className="text-sm text-red-500 mt-1">{errors?.title}</p>}
          </Field>

          <Field>
            <FieldLabel htmlFor="description">Deskripsi</FieldLabel>
            <Textarea
              id="description"
              name="description"
              placeholder="Deskripsi"
              defaultValue={task.description}
            />
            {errors?.description && (
              <p className="text-sm text-red-500 mt-1">{errors?.description}</p>
            )}
          </Field>

          <Field>
            <FieldLabel htmlFor="deadline">Deadline</FieldLabel>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={'outline'}
                  className={cn(
                    'w-[280px] justify-start text-left font-normal',
                    !date && 'text-muted-foreground',
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? (
                    format(date, 'PPPP', { locale: id })
                  ) : (
                    <span>Pilih tanggal deadline</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  locale={id}
                  startMonth={new Date()}
                />
              </PopoverContent>
            </Popover>

            <Input type="hidden" name="deadline" value={date ? date.toISOString() : ''} />
            {errors?.deadline && <p className="text-sm text-red-500 mt-1">{errors?.deadline}</p>}
          </Field>

          <Field>
            <FieldLabel htmlFor="user">Petugas</FieldLabel>
            <Select onValueChange={handleUserChange} defaultValue={task.user?.userId.toString()}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Pilih petugas" />
              </SelectTrigger>
              <SelectContent>
                {users.map((user) => (
                  <SelectItem key={user.userId} value={user.userId.toString()}>
                    {user.name} - {user.username}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input type="hidden" name="userId" value={selectedUserId || ''} />

            {errors?.userId && <p className="text-sm text-red-500 mt-1">{errors?.userId}</p>}
          </Field>

          <Field>
            <FieldLabel htmlFor="status">Status</FieldLabel>
            <Select onValueChange={handleStatusChange} defaultValue={task.status}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Pilih status" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {getStatusLabel(option)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input type="hidden" name="status" value={status || ''} />{' '}
            {errors?.status && <p className="text-sm text-red-500 mt-1">{errors?.status}</p>}{' '}
          </Field>

          <Field>
            <Button type="submit">Ubah</Button>
          </Field>
        </FieldGroup>
      </Form>
    </>
  );
}
