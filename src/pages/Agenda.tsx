import { AppLayout } from '@/components/layout/AppLayout';
import { appointments, statusColors, statusLabels, levaTrazLabels } from '@/data/mockData';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, Plus, Clock, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const hours = Array.from({ length: 12 }, (_, i) => `${(i + 8).toString().padStart(2, '0')}:00`);

export default function Agenda() {
  const [view, setView] = useState<'day' | 'week'>('day');
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today);

  const dateStr = selectedDate.toISOString().split('T')[0];
  const dayAppointments = appointments.filter(a => a.date === dateStr);

  const formatDate = (d: Date) =>
    d.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });

  const changeDay = (offset: number) => {
    const next = new Date(selectedDate);
    next.setDate(next.getDate() + offset);
    setSelectedDate(next);
  };

  return (
    <AppLayout
      title="Agenda"
      subtitle={formatDate(selectedDate)}
      actions={
        <Button className="gold-gradient text-primary-foreground font-semibold text-sm gap-2 hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4" />
          Novo Agendamento
        </Button>
      }
    >
      {/* Controls */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <button onClick={() => changeDay(-1)} className="w-8 h-8 rounded-lg bg-secondary hover:bg-muted flex items-center justify-center transition-colors">
            <ChevronLeft className="w-4 h-4 text-foreground" />
          </button>
          <button
            onClick={() => setSelectedDate(new Date())}
            className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-semibold hover:bg-primary/20 transition-colors"
          >
            Hoje
          </button>
          <button onClick={() => changeDay(1)} className="w-8 h-8 rounded-lg bg-secondary hover:bg-muted flex items-center justify-center transition-colors">
            <ChevronRight className="w-4 h-4 text-foreground" />
          </button>
        </div>

        <div className="flex bg-secondary rounded-lg p-0.5">
          {(['day', 'week'] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={cn(
                'px-4 py-1.5 rounded-md text-xs font-medium transition-all',
                view === v ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {v === 'day' ? 'Dia' : 'Semana'}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="glass-card rounded-xl overflow-hidden">
        <div className="divide-y divide-border">
          {hours.map((hour) => {
            const slotAppts = dayAppointments.filter(a => a.time.startsWith(hour.split(':')[0]));
            return (
              <div key={hour} className="flex min-h-[72px]">
                <div className="w-16 lg:w-20 flex-shrink-0 py-3 px-3 text-xs text-muted-foreground font-medium border-r border-border flex items-start">
                  {hour}
                </div>
                <div className="flex-1 p-2 flex flex-wrap gap-2">
                  {slotAppts.map((appt) => (
                    <motion.div
                      key={appt.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className={cn(
                        'flex-1 min-w-[200px] max-w-md rounded-lg p-3 border transition-all cursor-pointer hover:scale-[1.01]',
                        appt.status === 'finalizado' && 'bg-success/5 border-success/20',
                        appt.status === 'em_andamento' && 'bg-warning/5 border-warning/20 animate-pulse-gold',
                        appt.status === 'agendado' && 'bg-info/5 border-info/20',
                        appt.status === 'cancelado' && 'bg-destructive/5 border-destructive/20 opacity-50',
                      )}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-sm text-foreground">{appt.petName}</span>
                        <span className={cn('text-[10px] font-medium px-2 py-0.5 rounded-full', statusColors[appt.status])}>
                          {statusLabels[appt.status]}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">{appt.clientName} • {appt.serviceName}</p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          {appt.time}
                        </div>
                        <span className="text-xs font-semibold text-primary">R$ {appt.price.toFixed(2)}</span>
                      </div>
                      {appt.levaTraz && (
                        <div className="mt-2 flex items-center gap-2">
                          <span className="text-[10px] bg-info/15 text-info px-2 py-0.5 rounded-full">
                            🚗 {levaTrazLabels[appt.levaTrazStatus || 'a_buscar']}
                          </span>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
}
