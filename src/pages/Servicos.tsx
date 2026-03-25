import { AppLayout } from '@/components/layout/AppLayout';
import { services } from '@/data/mockData';
import { motion } from 'framer-motion';
import { Plus, Clock, DollarSign, Edit2, Trash2, Scissors } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const categoryColors: Record<string, string> = {
  Higiene: 'bg-info/15 text-info',
  Tosa: 'bg-primary/15 text-primary',
  Combo: 'bg-success/15 text-success',
  Transporte: 'bg-warning/15 text-warning',
};

export default function Servicos() {
  return (
    <AppLayout
      title="Serviços"
      subtitle="Gerencie os serviços do petshop"
      actions={
        <Button className="gold-gradient text-primary-foreground font-semibold text-sm gap-2 hover:opacity-90">
          <Plus className="w-4 h-4" />
          Novo Serviço
        </Button>
      }
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service, i) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className="glass-card-hover rounded-xl p-5 group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Scissors className="w-5 h-5 text-primary" />
              </div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="w-7 h-7 rounded-md bg-secondary hover:bg-muted flex items-center justify-center">
                  <Edit2 className="w-3.5 h-3.5 text-muted-foreground" />
                </button>
                <button className="w-7 h-7 rounded-md bg-secondary hover:bg-destructive/20 flex items-center justify-center">
                  <Trash2 className="w-3.5 h-3.5 text-muted-foreground hover:text-destructive" />
                </button>
              </div>
            </div>

            <h3 className="font-semibold text-foreground mb-1">{service.name}</h3>
            <span className={cn('text-[10px] font-medium px-2 py-0.5 rounded-full', categoryColors[service.category] || 'bg-muted text-muted-foreground')}>
              {service.category}
            </span>

            <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="w-3.5 h-3.5" />
                {service.duration > 0 ? `${service.duration} min` : '—'}
              </div>
              <div className="flex items-center gap-1 text-sm font-bold text-primary">
                <DollarSign className="w-3.5 h-3.5" />
                R$ {service.price.toFixed(2)}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </AppLayout>
  );
}
