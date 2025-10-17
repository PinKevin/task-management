import { Separator } from '@radix-ui/react-separator';
import { AppSidebar } from './sidebar';
import { SidebarInset, SidebarProvider, SidebarTrigger } from './ui/sidebar';

export default function FullSidebar({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
          <div className="flex items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <p>Task Management</p>
          </div>
        </header>
        <div className="flex flex-col p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
