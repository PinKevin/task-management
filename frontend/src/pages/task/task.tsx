import { DataTable } from '@/components/data-table';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Link, useSearchParams } from 'react-router';

const statusOptions = ['TODO', 'IN_PROGRESS', 'DONE'];

export default function TaskPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleStatusChange = (status: string) => {
    const newSearchParams = new URLSearchParams(searchParams);

    if (status === 'ALL') {
      newSearchParams.delete('status');
    } else {
      newSearchParams.set('status', status);
    }

    setSearchParams(newSearchParams);
  };

  const handleSort = () => {
    const currentOrder = searchParams.get('deadlineOrder');
    const newSearchParams = new URLSearchParams(searchParams);
    let newOrder: string | undefined;

    if (currentOrder === 'ASC') {
      newOrder = 'DESC';
    } else if (currentOrder === 'DESC') {
      newOrder = undefined;
    } else {
      newOrder = 'ASC';
    }

    if (newOrder) {
      newSearchParams.set('deadlineOrder', newOrder);
    } else {
      newSearchParams.delete('deadlineOrder');
    }

    setSearchParams(newSearchParams);
  };

  const currentOrder = searchParams.get('deadlineOrder');

  return (
    <>
      <div className="flex flex-row justify-between items-center">
        <h1 className="mb-4 text-2xl font-bold">Review your task</h1>

        <div className="flex flex-row gap-2">
          <Select
            onValueChange={handleStatusChange}
            defaultValue={searchParams.get('status') || 'ALL'}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Status</SelectItem>
              {statusOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button asChild>
            <Link to={'/tasks/create'}>Tambah</Link>
          </Button>
        </div>
      </div>
      <DataTable onSort={handleSort} currentDeadlineOrder={currentOrder} />
    </>
  );
}
