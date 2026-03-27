import { AppLayout } from '@/components/layout/AppLayout';
import { usePetshop } from '@/contexts/PetshopContext';
import { statusColors, statusLabels, levaTrazLabels } from '@/data/mockData';
import { useState, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, Plus, MessageCircle, Truck, Calendar as CalendarIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { NovoAgendamentoDialog } from '@/components/dialogs/PetshopDialogs';
import { format, addDays, startOfWeek, isSameDay, isSameMonth, startOfMonth, endOfMonth, eachDayOfInterval, getDay, addMonths } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function Agenda() {
  const { appointments, updateAppointmentStatus } = usePetshop();
  const [view, setView] = useState<'day' | 'week' | 'month'>('day');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showNew, setShowNew] = useState(false);

  const dateStr = selectedDate.toISOString().split('T')[0];

  const changeDay = (offset: number) => {
    const next = new Date(selectedDate);
    if (view === 'month') {
      const newDate = addMonths(next, offset);
      setSelectedDate(newDate);
    } else {
      next.setDate(next.getDate() + (view === 'week' ? offset * 7 : offset));
      setSelectedDate(next);
    }
  };

  const nextStatus = (current: string) => {
    const flow: Record<string, string> = { agendado: 'em_andamento', em_andamento: 'finalizado' };
    return flow[current] || current;
  };

  const weekDays = useMemo(() => {
    const start = startOfWeek(selectedDate, { weekStartsOn: 1 });
    return Array.from({ length: 7 }, (_, i) => addDays(start, i));
  }, [selectedDate]);

  const dayAppointments = appointments
    .filter(a => a.date === dateStr)
    .sort((a, b) => a.time.localeCompare(b.time));

  const headerSubtitle = view === 'day'
    ? format(selectedDate, "EEEE, d 'de' MMMM", { locale: ptBR })
    : view === 'week'
      ? `${format(weekDays[0], "d MMM", { locale: ptBR })} — ${format(weekDays[6], "d MMM yyyy", { locale: ptBR })}`
      : format(selectedDate, "MMMM 'de' yyyy", { locale: ptBR });

  return (
    <AppLayout title="Agenda" subtitle={headerSubtitle}
      actions={
        <Button onClick={() => setShowNew(true)} className="gold-gradient text-primary-foreground font-semibold text-sm gap-2 hover:opacity-90">
          <Plus className="w-4 h-4" /> Novo Agendamento
        </Button>
      }>
      <NovoAgendamentoDialog open={showNew} onOpenChange={setShowNew} />

      {/* Controls */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <button onClick={() => changeDay(-1)} className="w-8 h-8 rounded-lg bg-secondary hover:bg-muted flex items-center justify-center transition-colors">
            <ChevronLeft className="w-4 h-4 text-foreground" />
          </button>
          <button onClick={() => setSelectedDate(new Date())} className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-semibold hover:bg-primary/20 transition-colors">Hoje</button>
          <button onClick={() => changeDay(1)} className="w-8 h-8 rounded-lg bg-secondary hover:bg-muted flex items-center justify-center transition-colors">
            <ChevronRight className="w-4 h-4 text-foreground" />
          </button>
        </div>
        <div className="flex bg-secondary rounded-lg p-0.5">
          {(['day', 'week', 'month'] as const).map((v) => (
            <button key={v} onClick={() => setView(v)}
              className={cn('px-3 py-1.5 rounded-md text-xs font-medium transition-all',
                view === v ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground')}>
              {v === 'day' ? 'Dia' : v === 'week' ? 'Semana' : 'Mês'}
            </button>
          ))}
        </div>
      </div>

      {view === 'day' ? (
        <DayView
          appointments={dayAppointments}
          updateStatus={updateAppointmentStatus}
          nextStatus={nextStatus}
        />
      ) : view === 'week' ? (
        <WeekView
          weekDays={weekDays}
          appointments={appointments}
          selectedDate={selectedDate}
          onSelectDate={(d) => { setSelectedDate(d); setView('day'); }}
        />
      ) : (
        <MonthView
          selectedDate={selectedDate}
          appointments={appointments}
          onSelectDate={(d) => { setSelectedDate(d); setView('day'); }}
        />
      )}
    </AppLayout>
  );
}

/* ── Day View ── */
function DayView({ appointments, updateStatus, nextStatus }: {
  appointments: import('@/types/petshop').Appointment[];
  updateStatus: (id: string, status: any) => void;
  nextStatus: (s: string) => string;
}) {
  const whatsappLink = (phone: string, name: string) =>
    `https://wa.me/${phone}?text=${encodeURIComponent(`Olá ${name}! Confirmando seu agendamento no Madaleno's Petshop 🐾`)}`;

  return (
    <div className="space-y-0">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-display font-semibold text-foreground">Agenda de Hoje</h2>
        <span className="text-xs text-muted-foreground bg-secondary px-3 py-1 rounded-full">
          {appointments.length} agendamento{appointments.length !== 1 ? 's' : ''}
        </span>
      </div>

      {appointments.length === 0 ? (
        <div className="glass-card rounded-xl p-12 text-center">
          <p className="text-muted-foreground text-sm">Nenhum agendamento para este dia</p>
        </div>
      ) : (
        <div className="space-y-3">
          {appointments.map((appt, i) => (
            <motion.div
              key={appt.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass-card rounded-xl overflow-hidden"
            >
              <div className="flex items-center gap-4 lg:gap-6 p-4 lg:p-5">
                <div className="flex-shrink-0 w-14 lg:w-16">
                  <span className="text-lg lg:text-xl font-display font-bold text-foreground">{appt.time}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium text-sm text-foreground">{appt.petName}</span>
                    <span className="text-xs text-muted-foreground">({appt.petBreed})</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5 truncate">{appt.clientName} • {appt.serviceName}</p>
                </div>
                {appt.levaTraz && (
                  <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-medium bg-info/15 text-info px-2.5 py-1 rounded-full flex-shrink-0">
                    <Truck className="w-3 h-3" />
                    {levaTrazLabels[appt.levaTrazStatus || 'a_buscar']}
                  </span>
                )}
                <span className={cn('text-[11px] font-semibold px-2.5 py-1 rounded-full flex-shrink-0', statusColors[appt.status])}>
                  {statusLabels[appt.status]}
                </span>
                <span className="text-sm font-bold text-primary flex-shrink-0 hidden sm:block">
                  R$ {appt.price.toFixed(2)}
                </span>
                <a href={whatsappLink('', appt.clientName)} target="_blank" rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-success/10 hover:bg-success/20 flex items-center justify-center transition-colors flex-shrink-0">
                  <MessageCircle className="w-4 h-4 text-success" />
                </a>
              </div>
              {(appt.levaTraz || true) && (
                <div className="sm:hidden flex items-center justify-between px-4 pb-3 -mt-1">
                  <span className="text-sm font-bold text-primary">R$ {appt.price.toFixed(2)}</span>
                  {appt.levaTraz && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-medium bg-info/15 text-info px-2.5 py-1 rounded-full">
                      <Truck className="w-3 h-3" />
                      {levaTrazLabels[appt.levaTrazStatus || 'a_buscar']}
                    </span>
                  )}
                </div>
              )}
              {appt.status !== 'finalizado' && appt.status !== 'cancelado' && (
                <div className="flex gap-2 px-4 lg:px-5 pb-4 lg:pb-5">
                  <button onClick={() => updateStatus(appt.id, nextStatus(appt.status) as any)}
                    className="flex-1 text-xs font-semibold py-2 rounded-lg bg-success/10 text-success hover:bg-success/20 transition-colors">
                    {appt.status === 'agendado' ? 'Iniciar Atendimento' : 'Finalizar'}
                  </button>
                  <button onClick={() => updateStatus(appt.id, 'cancelado')}
                    className="text-xs font-semibold px-4 py-2 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors">
                    Cancelar
                  </button>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Week View ── */
function WeekView({ weekDays, appointments, selectedDate, onSelectDate }: {
  weekDays: Date[];
  appointments: import('@/types/petshop').Appointment[];
  selectedDate: Date;
  onSelectDate: (d: Date) => void;
}) {
  const today = new Date();

  return (
    <div>
      <h2 className="text-lg font-display font-semibold text-foreground mb-4">Visão Semanal</h2>

      <div className="hidden lg:grid grid-cols-7 gap-3 mb-3">
        {weekDays.map((day) => {
          const isToday = isSameDay(day, today);
          const dayStr = day.toISOString().split('T')[0];
          const count = appointments.filter(a => a.date === dayStr).length;

          return (
            <button key={dayStr} onClick={() => onSelectDate(day)}
              className={cn(
                'rounded-xl p-3 text-center transition-all border',
                isToday
                  ? 'border-primary/40 bg-primary/5'
                  : 'border-border bg-card hover:border-primary/20',
                isSameDay(day, selectedDate) && 'ring-2 ring-primary/30'
              )}>
              <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">
                {format(day, 'EEE', { locale: ptBR })}
              </p>
              <p className={cn('text-xl font-display font-bold mt-1', isToday ? 'text-primary' : 'text-foreground')}>
                {format(day, 'd')}
              </p>
              <p className="text-[10px] text-muted-foreground mt-1">
                {count > 0 ? `${count} agend.` : '—'}
              </p>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-7 gap-3">
        {weekDays.map((day) => {
          const isToday = isSameDay(day, today);
          const dayStr = day.toISOString().split('T')[0];
          const dayAppts = appointments.filter(a => a.date === dayStr).sort((a, b) => a.time.localeCompare(b.time));

          return (
            <motion.div key={dayStr}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                'glass-card rounded-xl overflow-hidden',
                isToday && 'ring-1 ring-primary/30'
              )}>
              <button onClick={() => onSelectDate(day)}
                className="lg:hidden w-full flex items-center justify-between p-3 border-b border-border hover:bg-muted/30 transition-colors">
                <div className="flex items-center gap-2">
                  <span className={cn('text-sm font-display font-bold', isToday ? 'text-primary' : 'text-foreground')}>
                    {format(day, "EEE, d 'de' MMM", { locale: ptBR })}
                  </span>
                  {isToday && <span className="text-[9px] bg-primary/20 text-primary px-1.5 py-0.5 rounded-full font-semibold">HOJE</span>}
                </div>
                <span className="text-[11px] text-muted-foreground">{dayAppts.length} agend.</span>
              </button>
              <div className="hidden lg:block p-2 border-b border-border text-center">
                {isToday && <span className="text-[9px] bg-primary/20 text-primary px-1.5 py-0.5 rounded-full font-semibold">HOJE</span>}
              </div>
              <div className="p-2 space-y-1.5 min-h-[60px]">
                {dayAppts.length === 0 ? (
                  <p className="text-[11px] text-muted-foreground text-center py-3">—</p>
                ) : (
                  dayAppts.map((appt) => (
                    <button key={appt.id} onClick={() => onSelectDate(day)}
                      className="w-full text-left p-2 rounded-lg hover:bg-muted/40 transition-colors group">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-semibold text-foreground">{appt.time}</span>
                        <span className={cn('text-[9px] font-medium px-1.5 py-0.5 rounded-full', statusColors[appt.status])}>
                          {statusLabels[appt.status]}
                        </span>
                      </div>
                      <p className="text-[11px] text-muted-foreground truncate mt-0.5">{appt.petName}</p>
                      {appt.levaTraz && (
                        <span className="inline-flex items-center gap-0.5 text-[9px] text-info mt-0.5">
                          <Truck className="w-2.5 h-2.5" /> L&T
                        </span>
                      )}
                    </button>
                  ))
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Month View ── */
function MonthView({ selectedDate, appointments, onSelectDate }: {
  selectedDate: Date;
  appointments: import('@/types/petshop').Appointment[];
  onSelectDate: (d: Date) => void;
}) {
  const today = new Date();
  const monthStart = startOfMonth(selectedDate);
  const monthEnd = endOfMonth(selectedDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Monday = 0, pad start
  const startDayOfWeek = (getDay(monthStart) + 6) % 7; // convert Sunday=0 to Monday=0
  const padDays = Array.from({ length: startDayOfWeek }, (_, i) => addDays(monthStart, -(startDayOfWeek - i)));

  const allDays = [...padDays, ...daysInMonth];
  // Pad end to fill last row
  const remaining = (7 - (allDays.length % 7)) % 7;
  for (let i = 1; i <= remaining; i++) {
    allDays.push(addDays(monthEnd, i));
  }

  const weekdayNames = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];

  return (
    <div>
      <h2 className="text-lg font-display font-semibold text-foreground mb-4">Visão Mensal</h2>

      <div className="grid grid-cols-7 gap-1 mb-1">
        {weekdayNames.map((d) => (
          <div key={d} className="text-center text-[11px] font-semibold text-muted-foreground uppercase tracking-wider py-2">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {allDays.map((day) => {
          const isToday = isSameDay(day, today);
          const isCurrentMonth = isSameMonth(day, selectedDate);
          const dayStr = day.toISOString().split('T')[0];
          const dayAppts = appointments.filter(a => a.date === dayStr);
          const hasAppts = dayAppts.length > 0;

          return (
            <button
              key={dayStr}
              onClick={() => onSelectDate(day)}
              className={cn(
                'rounded-lg p-2 min-h-[70px] lg:min-h-[90px] text-left transition-all border flex flex-col',
                isCurrentMonth ? 'bg-card border-border' : 'bg-muted/20 border-transparent',
                isToday && 'border-primary/40 bg-primary/5',
                'hover:border-primary/30 hover:bg-primary/5'
              )}
            >
              <span className={cn(
                'text-xs font-bold inline-flex items-center justify-center w-6 h-6 rounded-full',
                isToday ? 'bg-primary text-primary-foreground' : isCurrentMonth ? 'text-foreground' : 'text-muted-foreground/50'
              )}>
                {format(day, 'd')}
              </span>
              {hasAppts && (
                <div className="mt-1 space-y-0.5 flex-1 overflow-hidden">
                  {dayAppts.slice(0, 3).map((appt) => (
                    <div key={appt.id} className={cn('text-[9px] lg:text-[10px] px-1.5 py-0.5 rounded truncate font-medium', statusColors[appt.status])}>
                      {appt.time} {appt.petName}
                    </div>
                  ))}
                  {dayAppts.length > 3 && (
                    <span className="text-[9px] text-muted-foreground px-1.5">+{dayAppts.length - 3} mais</span>
                  )}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
