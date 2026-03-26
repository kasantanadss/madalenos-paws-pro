import {
  LayoutDashboard,
  Calendar,
  Users,
  PawPrint,
  Scissors,
  Package,
  DollarSign,
  BarChart3,
  LogOut,
  ChevronLeft,
  Sun,
  Moon,
} from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import { useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

const navItems = [
  { title: 'Dashboard', url: '/', icon: LayoutDashboard },
  { title: 'Agenda', url: '/agenda', icon: Calendar },
  { title: 'Clientes', url: '/clientes', icon: Users },
  { title: 'Pets', url: '/pets', icon: PawPrint },
  { title: 'Serviços', url: '/servicos', icon: Scissors },
  { title: 'Produtos', url: '/produtos', icon: Package },
  { title: 'Financeiro', url: '/financeiro', icon: DollarSign },
  { title: 'Relatórios', url: '/relatorios', icon: BarChart3 },
];

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 h-screen flex flex-col border-r border-border transition-all duration-300',
        collapsed ? 'w-[72px]' : 'w-[250px]',
        'bg-sidebar'
      )}
    >
      {/* Brand */}
      <div className="flex items-center gap-3 px-4 h-16 border-b border-border flex-shrink-0">
        <div className="w-9 h-9 rounded-lg gold-gradient flex items-center justify-center flex-shrink-0">
          <PawPrint className="w-5 h-5 text-primary-foreground" />
        </div>
        {!collapsed && (
          <div className="animate-fade-in">
            <h1 className="text-sm font-display font-bold text-foreground leading-tight">
              Madaleno's
            </h1>
            <span className="text-[10px] uppercase tracking-[0.2em] text-gold-muted font-medium">
              Petshop
            </span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 overflow-y-auto scrollbar-thin">
        <div className="space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.url;
            return (
              <NavLink
                key={item.url}
                to={item.url}
                end={item.url === '/'}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                  'text-muted-foreground hover:text-foreground hover:bg-secondary',
                  collapsed && 'justify-center px-0'
                )}
                activeClassName="bg-primary/10 text-primary hover:bg-primary/15 hover:text-primary"
              >
                <item.icon className={cn('w-[18px] h-[18px] flex-shrink-0', isActive && 'text-primary')} />
                {!collapsed && <span>{item.title}</span>}
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* Collapse toggle + logout */}
      <div className="p-3 border-t border-border space-y-1">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary w-full transition-all"
        >
          <ChevronLeft className={cn('w-[18px] h-[18px] transition-transform', collapsed && 'rotate-180')} />
          {!collapsed && <span>Recolher</span>}
        </button>
        <button className={cn(
          'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/10 w-full transition-all',
          collapsed && 'justify-center px-0'
        )}>
          <LogOut className="w-[18px] h-[18px]" />
          {!collapsed && <span>Sair</span>}
        </button>
      </div>
    </aside>
  );
}
