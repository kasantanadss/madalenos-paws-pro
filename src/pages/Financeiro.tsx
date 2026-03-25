import { AppLayout } from '@/components/layout/AppLayout';
import { usePetshop } from '@/contexts/PetshopContext';
import { motion } from 'framer-motion';
import { ArrowDownLeft, ArrowUpRight, DollarSign, TrendingUp, TrendingDown, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { NovaTransacaoDialog } from '@/components/dialogs/PetshopDialogs';

export default function Financeiro() {
  const { financialEntries } = usePetshop();
  const [filter, setFilter] = useState<'all' | 'entrada' | 'saida'>('all');
  const [showNew, setShowNew] = useState(false);

  const entries = financialEntries.filter(e => filter === 'all' || e.type === filter);
  const totalIn = financialEntries.filter(e => e.type === 'entrada').reduce((a, e) => a + e.amount, 0);
  const totalOut = financialEntries.filter(e => e.type === 'saida').reduce((a, e) => a + e.amount, 0);
  const profit = totalIn - totalOut;

  return (
    <AppLayout title="Financeiro" subtitle="Controle de entradas e saídas"
      actions={<Button onClick={() => setShowNew(true)} className="gold-gradient text-primary-foreground font-semibold text-sm gap-2 hover:opacity-90"><Plus className="w-4 h-4" />Nova Transação</Button>}>
      <NovaTransacaoDialog open={showNew} onOpenChange={setShowNew} />

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="stat-card">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-success/15 flex items-center justify-center"><TrendingUp className="w-4 h-4 text-success" /></div>
            <span className="text-xs text-muted-foreground">Entradas</span>
          </div>
          <p className="text-xl font-bold text-success font-display">R$ {totalIn.toFixed(2)}</p>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-destructive/15 flex items-center justify-center"><TrendingDown className="w-4 h-4 text-destructive" /></div>
            <span className="text-xs text-muted-foreground">Saídas</span>
          </div>
          <p className="text-xl font-bold text-destructive font-display">R$ {totalOut.toFixed(2)}</p>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center"><DollarSign className="w-4 h-4 text-primary" /></div>
            <span className="text-xs text-muted-foreground">Lucro</span>
          </div>
          <p className={cn('text-xl font-bold font-display', profit >= 0 ? 'text-primary' : 'text-destructive')}>R$ {profit.toFixed(2)}</p>
        </div>
      </div>

      <div className="flex bg-secondary rounded-lg p-0.5 mb-4 w-fit">
        {([['all', 'Tudo'], ['entrada', 'Entradas'], ['saida', 'Saídas']] as const).map(([val, label]) => (
          <button key={val} onClick={() => setFilter(val)}
            className={cn('px-4 py-1.5 rounded-md text-xs font-medium transition-all', filter === val ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground')}>
            {label}
          </button>
        ))}
      </div>

      <div className="glass-card rounded-xl divide-y divide-border">
        {entries.map((entry, i) => (
          <motion.div key={entry.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
            className="flex items-center gap-4 px-5 py-4">
            <div className={cn('w-9 h-9 rounded-lg flex items-center justify-center', entry.type === 'entrada' ? 'bg-success/15' : 'bg-destructive/15')}>
              {entry.type === 'entrada' ? <ArrowDownLeft className="w-4 h-4 text-success" /> : <ArrowUpRight className="w-4 h-4 text-destructive" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">{entry.description}</p>
              <p className="text-xs text-muted-foreground">{entry.category}</p>
            </div>
            <span className={cn('text-sm font-bold', entry.type === 'entrada' ? 'text-success' : 'text-destructive')}>
              {entry.type === 'entrada' ? '+' : '-'} R$ {entry.amount.toFixed(2)}
            </span>
          </motion.div>
        ))}
      </div>
    </AppLayout>
  );
}
