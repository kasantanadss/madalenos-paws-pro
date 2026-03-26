import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { usePetshop } from '@/contexts/PetshopContext';
import { toast } from 'sonner';

interface Props { open: boolean; onOpenChange: (v: boolean) => void; }

export function NovoAgendamentoDialog({ open, onOpenChange }: Props) {
  const { clients, pets, services, addAppointment } = usePetshop();
  const [clientId, setClientId] = useState('');
  const [petId, setPetId] = useState('');
  const [serviceId, setServiceId] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState('09:00');
  const [levaTraz, setLevaTraz] = useState(false);

  const clientPets = pets.filter(p => p.clientId === clientId);
  const selectedClient = clients.find(c => c.id === clientId);
  const selectedPet = pets.find(p => p.id === petId);
  const selectedService = services.find(s => s.id === serviceId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientId || !petId || !serviceId) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }
    addAppointment({
      id: `a${Date.now()}`,
      clientId,
      clientName: selectedClient?.name || '',
      petId,
      petName: selectedPet?.name || '',
      petBreed: selectedPet?.breed || '',
      serviceId,
      serviceName: selectedService?.name || '',
      date,
      time,
      status: 'agendado',
      price: selectedService?.price || 0,
      levaTraz,
      levaTrazStatus: levaTraz ? 'a_buscar' : undefined,
    });
    toast.success('Agendamento criado com sucesso!');
    onOpenChange(false);
    setClientId(''); setPetId(''); setServiceId(''); setLevaTraz(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-foreground">Novo Agendamento</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FieldSelect label="Cliente" value={clientId} onChange={(v) => { setClientId(v); setPetId(''); }}
            options={clients.map(c => ({ value: c.id, label: c.name }))} placeholder="Selecione o cliente" />
          <FieldSelect label="Pet" value={petId} onChange={setPetId}
            options={clientPets.map(p => ({ value: p.id, label: `${p.name} (${p.breed})` }))} placeholder={clientId ? "Selecione o pet" : "Selecione um cliente primeiro"} disabled={!clientId} />
          <FieldSelect label="Serviço" value={serviceId} onChange={setServiceId}
            options={services.filter(s => s.active).map(s => ({ value: s.id, label: `${s.name} - R$ ${s.price.toFixed(2)}` }))} placeholder="Selecione o serviço" />
          <div className="grid grid-cols-2 gap-3">
            <FieldInput label="Data" type="date" value={date} onChange={setDate} />
            <FieldInput label="Horário" type="time" value={time} onChange={setTime} />
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={levaTraz} onChange={(e) => setLevaTraz(e.target.checked)}
              className="w-4 h-4 rounded border-border bg-secondary accent-primary" />
            <span className="text-sm text-foreground">Incluir Leva e Traz</span>
          </label>
          {selectedService && (
            <div className="p-3 rounded-lg bg-primary/5 border border-primary/15">
              <p className="text-sm text-foreground font-medium">Total: <span className="text-primary font-bold">R$ {selectedService.price.toFixed(2)}</span></p>
            </div>
          )}
          <Button type="submit" className="w-full gold-gradient text-primary-foreground font-semibold hover:opacity-90">
            Criar Agendamento
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function NovoClienteDialog({ open, onOpenChange }: Props) {
  const { addClient } = usePetshop();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) { toast.error('Nome e telefone são obrigatórios'); return; }
    addClient({
      id: `c${Date.now()}`,
      name, phone, whatsapp: whatsapp || phone.replace(/\D/g, ''), address,
      pets: [], createdAt: new Date().toISOString().split('T')[0], totalVisits: 0,
    });
    toast.success('Cliente cadastrado com sucesso!');
    onOpenChange(false);
    setName(''); setPhone(''); setWhatsapp(''); setAddress('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-foreground">Novo Cliente</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FieldInput label="Nome completo" value={name} onChange={setName} placeholder="Ex: Maria Silva" />
          <FieldInput label="Telefone" value={phone} onChange={setPhone} placeholder="(11) 99999-9999" />
          <FieldInput label="WhatsApp" value={whatsapp} onChange={setWhatsapp} placeholder="5511999999999" />
          <FieldInput label="Endereço" value={address} onChange={setAddress} placeholder="Rua, número, bairro" />
          <Button type="submit" className="w-full gold-gradient text-primary-foreground font-semibold hover:opacity-90">
            Cadastrar Cliente
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function NovoPetDialog({ open, onOpenChange }: Props) {
  const { clients, addPet } = usePetshop();
  const [clientId, setClientId] = useState('');
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [size, setSize] = useState<'pequeno' | 'medio' | 'grande'>('medio');
  const [age, setAge] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientId || !name || !breed) { toast.error('Preencha os campos obrigatórios'); return; }
    addPet({ id: `p${Date.now()}`, clientId, name, breed, size, age, notes });
    toast.success('Pet cadastrado com sucesso!');
    onOpenChange(false);
    setClientId(''); setName(''); setBreed(''); setAge(''); setNotes('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-foreground">Novo Pet</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FieldSelect label="Tutor" value={clientId} onChange={setClientId}
            options={clients.map(c => ({ value: c.id, label: c.name }))} placeholder="Selecione o tutor" />
          <FieldInput label="Nome do pet" value={name} onChange={setName} placeholder="Ex: Thor" />
          <FieldInput label="Raça" value={breed} onChange={setBreed} placeholder="Ex: Golden Retriever" />
          <FieldSelect label="Porte" value={size} onChange={(v) => setSize(v as typeof size)}
            options={[{ value: 'pequeno', label: 'Pequeno' }, { value: 'medio', label: 'Médio' }, { value: 'grande', label: 'Grande' }]} />
          <FieldInput label="Idade" value={age} onChange={setAge} placeholder="Ex: 3 anos" />
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Observações</label>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={2}
              placeholder="Alergias, comportamento, etc."
              className="w-full px-3 py-2 rounded-lg bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" />
          </div>
          <Button type="submit" className="w-full gold-gradient text-primary-foreground font-semibold hover:opacity-90">
            Cadastrar Pet
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function NovoServicoDialog({ open, onOpenChange }: Props) {
  const { addService } = usePetshop();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [duration, setDuration] = useState('');
  const [category, setCategory] = useState('Higiene');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price) { toast.error('Nome e preço são obrigatórios'); return; }
    addService({ id: `s${Date.now()}`, name, price: parseFloat(price), duration: parseInt(duration) || 0, category, active: true });
    toast.success('Serviço criado com sucesso!');
    onOpenChange(false);
    setName(''); setPrice(''); setDuration('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-foreground">Novo Serviço</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FieldInput label="Nome do serviço" value={name} onChange={setName} placeholder="Ex: Banho Terapêutico" />
          <FieldSelect label="Categoria" value={category} onChange={setCategory}
            options={['Higiene', 'Tosa', 'Combo', 'Transporte', 'Saúde'].map(c => ({ value: c, label: c }))} />
          <div className="grid grid-cols-2 gap-3">
            <FieldInput label="Preço (R$)" type="number" value={price} onChange={setPrice} placeholder="0.00" />
            <FieldInput label="Duração (min)" type="number" value={duration} onChange={setDuration} placeholder="45" />
          </div>
          <Button type="submit" className="w-full gold-gradient text-primary-foreground font-semibold hover:opacity-90">
            Criar Serviço
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function NovoProdutoDialog({ open, onOpenChange }: Props) {
  const { addProduct } = usePetshop();
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Higiene');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price) { toast.error('Nome e preço são obrigatórios'); return; }
    addProduct({ id: `pr${Date.now()}`, name, category, price: parseFloat(price), stock: parseInt(stock) || 0, minStock: 5 });
    toast.success('Produto cadastrado com sucesso!');
    onOpenChange(false);
    setName(''); setPrice(''); setStock('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-foreground">Novo Produto</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FieldInput label="Nome do produto" value={name} onChange={setName} placeholder="Ex: Shampoo Premium" />
          <FieldSelect label="Categoria" value={category} onChange={setCategory}
            options={['Higiene', 'Alimentação', 'Acessórios', 'Saúde', 'Brinquedos'].map(c => ({ value: c, label: c }))} />
          <div className="grid grid-cols-2 gap-3">
            <FieldInput label="Preço (R$)" type="number" value={price} onChange={setPrice} placeholder="0.00" />
            <FieldInput label="Estoque" type="number" value={stock} onChange={setStock} placeholder="0" />
          </div>
          <Button type="submit" className="w-full gold-gradient text-primary-foreground font-semibold hover:opacity-90">
            Cadastrar Produto
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function EditProdutoDialog({ open, onOpenChange, product }: Props & { product: import('@/types/petshop').Product | null }) {
  const { updateProduct } = usePetshop();
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [minStock, setMinStock] = useState('');

  // Sync form when product changes
  useState(() => {
    if (product) {
      setName(product.name);
      setCategory(product.category);
      setPrice(String(product.price));
      setStock(String(product.stock));
      setMinStock(String(product.minStock));
    }
  });

  // Also update when open changes with a new product
  const prevProductId = useState<string | null>(null);
  if (product && product.id !== prevProductId[0]) {
    prevProductId[1](product.id);
    setName(product.name);
    setCategory(product.category);
    setPrice(String(product.price));
    setStock(String(product.stock));
    setMinStock(String(product.minStock));
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!product || !name || !price) { toast.error('Nome e preço são obrigatórios'); return; }
    updateProduct({ ...product, name, category, price: parseFloat(price), stock: parseInt(stock) || 0, minStock: parseInt(minStock) || 5 });
    toast.success('Produto atualizado com sucesso!');
    onOpenChange(false);
  };

  if (!product) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-foreground">Editar Produto</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FieldInput label="Nome do produto" value={name} onChange={setName} placeholder="Ex: Shampoo Premium" />
          <FieldSelect label="Categoria" value={category} onChange={setCategory}
            options={['Higiene', 'Alimentação', 'Acessórios', 'Saúde', 'Brinquedos'].map(c => ({ value: c, label: c }))} />
          <div className="grid grid-cols-3 gap-3">
            <FieldInput label="Preço (R$)" type="number" value={price} onChange={setPrice} placeholder="0.00" />
            <FieldInput label="Estoque" type="number" value={stock} onChange={setStock} placeholder="0" />
            <FieldInput label="Estoque mín." type="number" value={minStock} onChange={setMinStock} placeholder="5" />
          </div>
          <Button type="submit" className="w-full gold-gradient text-primary-foreground font-semibold hover:opacity-90">
            Salvar Alterações
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function NovaTransacaoDialog({ open, onOpenChange }: Props) {
  const { addFinancialEntry } = usePetshop();
  const [type, setType] = useState<'entrada' | 'saida'>('entrada');
  const [category, setCategory] = useState('Serviços');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !amount) { toast.error('Preencha todos os campos'); return; }
    addFinancialEntry({
      id: `f${Date.now()}`, type, category, description,
      amount: parseFloat(amount), date: new Date().toISOString().split('T')[0],
    });
    toast.success(`${type === 'entrada' ? 'Entrada' : 'Saída'} registrada!`);
    onOpenChange(false);
    setDescription(''); setAmount('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-foreground">Nova Transação</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex bg-secondary rounded-lg p-0.5">
            {(['entrada', 'saida'] as const).map(t => (
              <button key={t} type="button" onClick={() => setType(t)}
                className={`flex-1 px-4 py-2 rounded-md text-xs font-medium transition-all ${type === t ? (t === 'entrada' ? 'bg-success/20 text-success' : 'bg-destructive/20 text-destructive') : 'text-muted-foreground'}`}>
                {t === 'entrada' ? 'Entrada' : 'Saída'}
              </button>
            ))}
          </div>
          <FieldSelect label="Categoria" value={category} onChange={setCategory}
            options={(type === 'entrada' ? ['Serviços', 'Vendas', 'Outros'] : ['Fornecedores', 'Operacional', 'Funcionários', 'Outros']).map(c => ({ value: c, label: c }))} />
          <FieldInput label="Descrição" value={description} onChange={setDescription} placeholder="Descreva a transação" />
          <FieldInput label="Valor (R$)" type="number" value={amount} onChange={setAmount} placeholder="0.00" />
          <Button type="submit" className="w-full gold-gradient text-primary-foreground font-semibold hover:opacity-90">
            Registrar Transação
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// ── Shared field components ──

function FieldInput({ label, value, onChange, placeholder, type = 'text', disabled }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string; disabled?: boolean;
}) {
  return (
    <div>
      <label className="text-xs font-medium text-muted-foreground mb-1.5 block">{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} disabled={disabled}
        className="w-full px-3 py-2 rounded-lg bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:opacity-50 transition-all" />
    </div>
  );
}

function FieldSelect({ label, value, onChange, options, placeholder, disabled }: {
  label: string; value: string; onChange: (v: string) => void;
  options: { value: string; label: string }[]; placeholder?: string; disabled?: boolean;
}) {
  return (
    <div>
      <label className="text-xs font-medium text-muted-foreground mb-1.5 block">{label}</label>
      <select value={value} onChange={(e) => onChange(e.target.value)} disabled={disabled}
        className="w-full px-3 py-2 rounded-lg bg-secondary border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:opacity-50 transition-all">
        {placeholder && <option value="">{placeholder}</option>}
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
}
