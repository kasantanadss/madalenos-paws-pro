import { AppLayout } from '@/components/layout/AppLayout';
import { products } from '@/data/mockData';
import { motion } from 'framer-motion';
import { Plus, Search, Package, AlertTriangle, Edit2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export default function Produtos() {
  const [search, setSearch] = useState('');
  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AppLayout
      title="Produtos"
      subtitle={`${products.length} produtos cadastrados`}
      actions={
        <Button className="gold-gradient text-primary-foreground font-semibold text-sm gap-2 hover:opacity-90">
          <Plus className="w-4 h-4" />
          Novo Produto
        </Button>
      }
    >
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Buscar produto..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
        />
      </div>

      <div className="glass-card rounded-xl overflow-hidden">
        {/* Table header */}
        <div className="hidden lg:grid grid-cols-[1fr_120px_100px_100px_60px] gap-4 px-5 py-3 text-xs font-medium text-muted-foreground border-b border-border uppercase tracking-wider">
          <span>Produto</span>
          <span>Categoria</span>
          <span className="text-right">Preço</span>
          <span className="text-center">Estoque</span>
          <span></span>
        </div>

        <div className="divide-y divide-border">
          {filtered.map((product, i) => {
            const lowStock = product.stock <= product.minStock;
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.03 }}
                className="flex flex-col lg:grid lg:grid-cols-[1fr_120px_100px_100px_60px] gap-2 lg:gap-4 px-5 py-4 hover:bg-muted/30 transition-colors items-center"
              >
                <div className="flex items-center gap-3 w-full lg:w-auto">
                  <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                    <Package className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <span className="font-medium text-sm text-foreground">{product.name}</span>
                </div>
                <span className="text-xs text-muted-foreground">{product.category}</span>
                <span className="text-sm font-semibold text-primary lg:text-right">R$ {product.price.toFixed(2)}</span>
                <div className="flex items-center justify-center gap-1.5">
                  <span className={cn(
                    'text-sm font-medium',
                    lowStock ? 'text-destructive' : 'text-foreground'
                  )}>{product.stock}</span>
                  {lowStock && <AlertTriangle className="w-3.5 h-3.5 text-destructive" />}
                </div>
                <button className="w-7 h-7 rounded-md bg-secondary hover:bg-muted flex items-center justify-center">
                  <Edit2 className="w-3.5 h-3.5 text-muted-foreground" />
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
}
