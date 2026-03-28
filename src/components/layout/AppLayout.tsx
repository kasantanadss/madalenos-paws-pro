import { AppSidebar } from './AppSidebar';
import { MobileNav } from './MobileNav';
import { useSidebar } from '@/contexts/SidebarContext';
import { cn } from '@/lib/utils';

interface AppLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export function AppLayout({ children, title, subtitle, actions }: AppLayoutProps) {
  const { collapsed } = useSidebar();

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop sidebar */}
      <div className="hidden lg:block">
        <AppSidebar />
      </div>

      {/* Mobile nav */}
      <MobileNav />

      {/* Main content */}
      <main className={cn('pb-20 lg:pb-0 transition-all duration-300', collapsed ? 'lg:pl-[72px]' : 'lg:pl-[250px]')}>
        <header className="sticky top-0 z-30 backdrop-blur-xl bg-background/80 border-b border-border">
          <div className="flex items-center justify-between px-6 py-4">
            <div>
              <h1 className="text-xl font-display font-bold text-foreground">{title}</h1>
              {subtitle && <p className="text-sm text-muted-foreground mt-0.5">{subtitle}</p>}
            </div>
            {actions && <div className="flex items-center gap-2">{actions}</div>}
          </div>
        </header>
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
