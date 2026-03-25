import { AppLayout } from '@/components/layout/AppLayout';
import { pets, clients } from '@/data/mockData';
import { motion } from 'framer-motion';
import { PawPrint, AlertTriangle, Search } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const sizeLabels: Record<string, string> = { pequeno: 'Pequeno', medio: 'Médio', grande: 'Grande' };
const sizeColors: Record<string, string> = {
  pequeno: 'bg-info/15 text-info',
  medio: 'bg-warning/15 text-warning',
  grande: 'bg-primary/15 text-primary',
};

export default function Pets() {
  const [search, setSearch] = useState('');
  const getOwner = (clientId: string) => clients.find(c => c.id === clientId)?.name || '';

  const filtered = pets.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.breed.toLowerCase().includes(search.toLowerCase()) ||
    getOwner(p.clientId).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AppLayout title="Pets" subtitle={`${pets.length} pets cadastrados`}>
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Buscar pet, raça ou tutor..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
        />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((pet, i) => (
          <motion.div
            key={pet.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass-card-hover rounded-xl p-5"
          >
            <div className="flex items-start gap-3 mb-3">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <PawPrint className="w-6 h-6 text-primary" />
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold text-foreground text-base">{pet.name}</h3>
                <p className="text-xs text-muted-foreground">{pet.breed}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap mb-3">
              <span className={cn('text-[11px] font-medium px-2 py-0.5 rounded-full', sizeColors[pet.size])}>
                {sizeLabels[pet.size]}
              </span>
              <span className="text-[11px] bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full">
                {pet.age}
              </span>
            </div>

            <p className="text-xs text-muted-foreground mb-2">Tutor: <span className="text-foreground">{getOwner(pet.clientId)}</span></p>

            {pet.notes && (
              <div className="flex items-start gap-1.5 p-2 rounded-lg bg-warning/5 border border-warning/15">
                <AlertTriangle className="w-3.5 h-3.5 text-warning mt-0.5 flex-shrink-0" />
                <p className="text-[11px] text-warning">{pet.notes}</p>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </AppLayout>
  );
}
