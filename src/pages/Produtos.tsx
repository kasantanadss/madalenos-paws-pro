import { AppLayout } from '@/components/layout/AppLayout';
import { usePetshop } from '@/contexts/PetshopContext';
import { motion } from 'framer-motion';
import { Plus, Search, Package, AlertTriangle, Edit2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { NovoProdutoDialog, EditProdutoDialog } from '@/components/dialogs/PetshopDialogs';
import type { Product } from '@/types/petshop';

export default function Produtos() {
  const { products } = usePetshop();
  const [search, setSearch] = useState('');
  const [showNew, setShowNew] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AppLayout title="Produtos" subtitle={`${products.length} produtos cadastrados`}
      actions={<Button onClick={() => setShowNew(true)} className="gold-gradient text-primary-foreground font-semibold text-sm gap-2 hover:opacity-90"><Plus className="w-4 h-4" />Novo Produto</Button>}>
      <NovoProdutoDialog open={showNew} onOpenChange={setShowNew} />
      <EditProdutoDialog open={!!editProduct} onOpenChange={(v) => !v && setEditProduct(null)} product={editProduct} />

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input type="text" placeholder="Buscar produto..." value={search} onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all" />
      </div>

      {/* Desktop table view */}
      <div className="hidden lg:block glass-card rounded-xl overflow-hidden">
        <div className="grid grid-cols-[1fr_120px_100px_100px_60px] gap-4 px-5 py-3 text-xs font-medium text-muted-foreground border-b border-border uppercase tracking-wider">
          <span>Produto</span><span>Categoria</span><span className="text-right">Preço</span><span className="text-center">Estoque</span><span></span>
        </div>
        <div className="divide-y divide-border">
          {filtered.map((product, i) => {
            const lowStock = product.stock <= product.minStock;
            return (
              <motion.div key={product.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                className="grid grid-cols-[1fr_120px_100px_100px_60px] gap-4 px-5 py-4 hover:bg-muted/30 transition-colors items-center">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0"><Package className="w-4 h-4 text-muted-foreground" /></div>
                  <span className="font-medium text-sm text-foreground truncate">{product.name}</span>
                </div>
                <span className="text-xs text-muted-foreground">{product.category}</span>
                <span className="text-sm font-semibold text-primary text-right">R$ {product.price.toFixed(2)}</span>
                <div className="flex items-center justify-center gap-1.5">
                  <span className={cn('text-sm font-medium', lowStock ? 'text-destructive' : 'text-foreground')}>{product.stock}</span>
                  {lowStock && <AlertTriangle className="w-3.5 h-3.5 text-destructive" />}
                </div>
                <button onClick={() => setEditProduct(product)} className="w-7 h-7 rounded-md bg-secondary hover:bg-primary/20 hover:text-primary flex items-center justify-center transition-colors">
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Mobile card view */}
      <div className="lg:hidden space-y-3">
        {filtered.map((product, i) => {
          const lowStock = product.stock <= product.minStock;
          return (
            <motion.div key={product.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
              className="glass-card rounded-xl p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                    <Package className="w-4.5 h-4.5 text-muted-foreground" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-sm text-foreground truncate">{product.name}</p>
                    <p className="text-xs text-muted-foreground">{product.category}</p>
                  </div>
                </div>
                <button onClick={() => setEditProduct(product)}
                  className="w-8 h-8 rounded-lg bg-secondary hover:bg-primary/20 hover:text-primary flex items-center justify-center transition-colors flex-shrink-0">
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                <span className="text-sm font-semibold text-primary">R$ {product.price.toFixed(2)}</span>
                <div className="flex items-center gap-1.5">
                  {lowStock && <AlertTriangle className="w-3.5 h-3.5 text-destructive" />}
                  <span className={cn('text-xs font-medium px-2 py-0.5 rounded-full', lowStock ? 'bg-destructive/10 text-destructive' : 'bg-secondary text-foreground')}>
                    Estoque: {product.stock}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <Package className="w-10 h-10 mx-auto mb-3 opacity-40" />
          <p className="text-sm">Nenhum produto encontrado</p>
        </div>
      )}
    </AppLayout>
  );
}
