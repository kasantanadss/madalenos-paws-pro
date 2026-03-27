import { AppLayout } from '@/components/layout/AppLayout';
import { usePetshop } from '@/contexts/PetshopContext';
import { normalizeSearch } from '@/components/dialogs/PetshopDialogs';
import { motion } from 'framer-motion';
import { Plus, Search, MessageCircle, PawPrint, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { NovoClienteDialog } from '@/components/dialogs/PetshopDialogs';

export default function Clientes() {
  const { clients, pets } = usePetshop();
  const [search, setSearch] = useState('');
  const [selectedClient, setSelectedClient] = useState<string | null>(null);
  const [showNew, setShowNew] = useState(false);

  const filtered = clients.filter(c => {
    if (!search) return true;
    const norm = normalizeSearch(search);
    return normalizeSearch(c.name).includes(norm) || normalizeSearch(c.phone).includes(norm) || normalizeSearch(c.whatsapp).includes(norm);
  });
  const clientPets = (clientId: string) => pets.filter(p => p.clientId === clientId);

  return (
    <AppLayout title="Clientes" subtitle={`${clients.length} clientes cadastrados`}
      actions={<Button onClick={() => setShowNew(true)} className="gold-gradient text-primary-foreground font-semibold text-sm gap-2 hover:opacity-90"><Plus className="w-4 h-4" />Novo Cliente</Button>}>
      <NovoClienteDialog open={showNew} onOpenChange={setShowNew} />

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input type="text" placeholder="Buscar por nome ou telefone..." value={search} onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all" />
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        {filtered.map((client, i) => {
          const cPets = clientPets(client.id);
          const isOpen = selectedClient === client.id;
          return (
            <motion.div key={client.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="glass-card-hover rounded-xl overflow-hidden">
              <button onClick={() => setSelectedClient(isOpen ? null : client.id)} className="w-full p-4 text-left">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-foreground">{client.name}</h3>
                    <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{client.phone}</span>
                      <span className="flex items-center gap-1"><PawPrint className="w-3 h-3" />{cPets.length} pet{cPets.length !== 1 ? 's' : ''}</span>
                    </div>
                    <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground"><MapPin className="w-3 h-3" />{client.address}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">{client.totalVisits} visitas</span>
                    <a href={`https://wa.me/${client.whatsapp}`} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
                      className="w-8 h-8 rounded-lg bg-success/15 hover:bg-success/25 flex items-center justify-center transition-colors">
                      <MessageCircle className="w-4 h-4 text-success" />
                    </a>
                  </div>
                </div>
              </button>
              {isOpen && cPets.length > 0 && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                  className="border-t border-border px-4 py-3 space-y-2 bg-muted/30">
                  {cPets.map((pet) => (
                    <div key={pet.id} className="flex items-center gap-3 p-2 rounded-lg bg-secondary/50">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center"><PawPrint className="w-4 h-4 text-primary" /></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground">{pet.name}</p>
                        <p className="text-xs text-muted-foreground">{pet.breed} • {pet.size} • {pet.age}</p>
                      </div>
                      {pet.notes && <span className="text-[10px] bg-warning/15 text-warning px-2 py-0.5 rounded-full max-w-[120px] truncate">⚠ {pet.notes}</span>}
                    </div>
                  ))}
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </AppLayout>
  );
}
