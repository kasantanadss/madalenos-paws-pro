import { LayoutDashboard, Calendar, Users, PawPrint, Scissors, Package, DollarSign, BarChart3 } from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import { cn } from '@/lib/utils';
import { useLocation } from 'react-router-dom';

const items = [
  { title: 'Home', url: '/', icon: LayoutDashboard },
  { title: 'Agenda', url: '/agenda', icon: Calendar },
  { title: 'Clientes', url: '/clientes', icon: Users },
  { title: 'Pets', url: '/pets', icon: PawPrint },
  { title: 'Serviços', url: '/servicos', icon: Scissors },
  { title: 'Produtos', url: '/produtos', icon: Package },
  { title: 'Finanças', url: '/financeiro', icon: DollarSign },
  { title: 'Relatórios', url: '/relatorios', icon: BarChart3 },
];

export function MobileNav() {
  const location = useLocation();
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-sidebar/95 backdrop-blur-xl border-t border-border">
      <div className="flex overflow-x-auto scrollbar-thin">
        {items.map((item) => {
          const isActive = location.pathname === item.url;
          return (
            <NavLink
              key={item.url}
              to={item.url}
              end={item.url === '/'}
              className={cn(
                'flex flex-col items-center gap-0.5 py-2 px-3 min-w-[64px] text-[10px] font-medium transition-colors',
                'text-muted-foreground'
              )}
              activeClassName="text-primary"
            >
              <item.icon className={cn('w-5 h-5', isActive && 'text-primary')} />
              <span>{item.title}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
