import { Button } from '@/components/ui/button';
import { useRouteError, isRouteErrorResponse, Link } from 'react-router';

export default function NotFoundTask() {
  const error = useRouteError();

  if (isRouteErrorResponse(error) && error.status === 404) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] p-8 bg-white rounded-xl shadow-lg">
        <h2 className="text-4xl font-extrabold text-red-600 mb-4">404</h2>
        <h3 className="text-2xl font-semibold text-gray-800 mb-2">Task Tidak Ditemukan</h3>
        <p className="text-md text-gray-600">Maaf, task tersebut tidak tersedia.</p>
        <Button asChild>
          <Link to={'/tasks'} className="text-lg mt-3">
            Kembali
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-8 bg-yellow-50 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-yellow-700 mb-3">Error Tak Terduga</h2>
      <p className="text-gray-600">Terjadi kesalahan saat memuat halaman tugas.</p>
    </div>
  );
}
