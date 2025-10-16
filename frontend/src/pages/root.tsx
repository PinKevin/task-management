import FullSidebar from '@/components/full-sidebar';
import { Outlet } from 'react-router';

export default function RootLayout() {
  return (
    <FullSidebar>
      <Outlet />
    </FullSidebar>
  );
}
