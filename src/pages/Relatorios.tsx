import { AppLayout } from '@/components/layout/AppLayout';
import { appointments, clients, financialEntries } from '@/data/mockData';
import { motion } from 'framer-motion';
import { BarChart3, Users, PawPrint, DollarSign, TrendingUp } from 'lucide-react';

export default function Relatorios() {
  const totalRevenue = financialEntries.filter(e => e.type === 'entrada').reduce((a, e) => a + e.amount, 0);
  const completedServices = appointments.filter(a => a.status === 'finalizado').length;

  const topClients = [...clients]
    .sort((a, b) => b.totalVisits - a.totalVisits)
    .slice(0, 5);

  const serviceCount: Record<string, number> = {};
  appointments.forEach(a => {
    serviceCount[a.serviceName] = (serviceCount[a.serviceName] || 0) + 1;
  });
  const topServices = Object.entries(serviceCount)
    .sort(([, a], [, b]) => b - a);

  return (
    <AppLayout title="Relatórios" subtitle="Métricas e desempenho">
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Revenue summary */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="stat-card"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-foreground">Faturamento</h3>
              <p className="text-xs text-muted-foreground">Período atual</p>
            </div>
          </div>
          <p className="text-3xl font-bold text-primary font-display mb-2">R$ {totalRevenue.toFixed(2)}</p>
          <div className="flex items-center gap-1 text-xs text-success">
            <TrendingUp className="w-3 h-3" />
            <span>+12% em relação ao mês anterior</span>
          </div>
        </motion.div>

        {/* Services stats */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="stat-card"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-info/10 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-info" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-foreground">Serviços Mais Realizados</h3>
              <p className="text-xs text-muted-foreground">{completedServices} finalizados hoje</p>
            </div>
          </div>
          <div className="space-y-2">
            {topServices.map(([name, count]) => (
              <div key={name} className="flex items-center justify-between">
                <span className="text-sm text-foreground">{name}</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-1.5 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${(count / appointments.length) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground w-6 text-right">{count}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Top clients */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="stat-card lg:col-span-2"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-success" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-foreground">Clientes Mais Frequentes</h3>
              <p className="text-xs text-muted-foreground">Top 5 por número de visitas</p>
            </div>
          </div>
          <div className="space-y-3">
            {topClients.map((client, i) => (
              <div key={client.id} className="flex items-center gap-4">
                <span className="w-6 h-6 rounded-full bg-primary/15 flex items-center justify-center text-xs font-bold text-primary">
                  {i + 1}
                </span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{client.name}</p>
                  <p className="text-xs text-muted-foreground">{client.phone}</p>
                </div>
                <div className="flex items-center gap-1">
                  <PawPrint className="w-3 h-3 text-muted-foreground" />
                  <span className="text-sm font-semibold text-primary">{client.totalVisits} visitas</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
}
