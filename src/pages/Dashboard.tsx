import { AppLayout } from '@/components/layout/AppLayout';
import { usePetshop } from '@/contexts/PetshopContext';
import { statusColors, statusLabels } from '@/data/mockData';
import { motion } from 'framer-motion';
import { Clock, DollarSign, PawPrint, TrendingUp, ArrowUpRight, MessageCircle, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { NovoAgendamentoDialog } from '@/components/dialogs/PetshopDialogs';

export default function Dashboard() {
  const { appointments, financialEntries, clients } = usePetshop();
  const [showNewAppt, setShowNewAppt] = useState(false);

  const todayRevenue = financialEntries.filter(e => e.type === 'entrada').reduce((a, e) => a + e.amount, 0);
  const todayExpenses = financialEntries.filter(e => e.type === 'saida').reduce((a, e) => a + e.amount, 0);
  const petsAttended = appointments.filter(a => a.status === 'finalizado').length;
  const pendingAppointments = appointments.filter(a => a.status === 'agendado' || a.status === 'em_andamento');

  const stats = [
    { label: 'Faturamento Hoje', value: `R$ ${todayRevenue.toFixed(2)}`, icon: DollarSign, change: '+12%', positive: true },
    { label: 'Pets Atendidos', value: petsAttended.toString(), icon: PawPrint, change: `${appointments.length} agendados`, positive: true },
    { label: 'Lucro Estimado', value: `R$ ${(todayRevenue - todayExpenses).toFixed(2)}`, icon: TrendingUp, change: `Despesas: R$ ${todayExpenses.toFixed(2)}`, positive: todayRevenue > todayExpenses },
    { label: 'Próximo Horário', value: pendingAppointments[0]?.time || '--:--', icon: Clock, change: pendingAppointments[0]?.petName || 'Livre', positive: true },
  ];

  const getWhatsapp = (clientId: string) => clients.find(c => c.id === clientId)?.whatsapp || '';

  return (
    <AppLayout title="Dashboard" subtitle="Visão geral do dia" actions={
      <Button onClick={() => setShowNewAppt(true)} className="gold-gradient text-primary-foreground font-semibold text-sm gap-2 hover:opacity-90">
        <Plus className="w-4 h-4" /> Novo Agendamento
      </Button>
    }>
      <NovoAgendamentoDialog open={showNewAppt} onOpenChange={setShowNewAppt} />

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <div key={i} className="stat-card">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <stat.icon className="w-5 h-5 text-primary" />
                </div>
                {stat.positive && i < 3 && (
                  <span className="text-[11px] text-success flex items-center gap-0.5">
                    <ArrowUpRight className="w-3 h-3" />{stat.change}
                  </span>
                )}
              </div>
              <p className="text-2xl font-bold text-foreground font-display">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
              {i === 3 && <p className="text-xs text-muted-foreground mt-0.5">{stat.change}</p>}
            </div>
          ))}
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-display font-semibold text-foreground">Agenda de Hoje</h2>
            <span className="text-xs text-muted-foreground bg-secondary px-2.5 py-1 rounded-full">{appointments.length} agendamentos</span>
          </div>
          <div className="space-y-3">
            {appointments.map((appt, i) => (
              <motion.div key={appt.id} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }} className="glass-card-hover rounded-xl p-4 flex items-center gap-4">
                <div className="text-center min-w-[52px]">
                  <p className="text-lg font-bold text-foreground font-display">{appt.time}</p>
                </div>
                <div className="w-px h-10 bg-border" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="font-semibold text-foreground text-sm truncate">{appt.petName}</p>
                    <span className="text-xs text-muted-foreground">({appt.petBreed})</span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{appt.clientName} • {appt.serviceName}</p>
                  {appt.levaTraz && (
                    <span className="inline-flex items-center gap-1 mt-1 text-[10px] bg-info/15 text-info px-2 py-0.5 rounded-full">🚗 Leva e Traz</span>
                  )}
                </div>
                <span className={cn('text-[11px] font-medium px-2.5 py-1 rounded-full whitespace-nowrap', statusColors[appt.status])}>
                  {statusLabels[appt.status]}
                </span>
                <p className="text-sm font-semibold text-primary min-w-[70px] text-right">R$ {appt.price.toFixed(2)}</p>
                <a href={`https://wa.me/${getWhatsapp(appt.clientId)}`} target="_blank" rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-success/15 hover:bg-success/25 flex items-center justify-center transition-colors">
                  <MessageCircle className="w-4 h-4 text-success" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </AppLayout>
  );
}
