import { Client, Pet, Service, Appointment, Product, Sale, FinancialEntry } from '@/types/petshop';

export const services: Service[] = [
  { id: 's1', name: 'Banho', price: 60, duration: 45, category: 'Higiene', active: true },
  { id: 's2', name: 'Tosa Higiênica', price: 45, duration: 30, category: 'Tosa', active: true },
  { id: 's3', name: 'Tosa na Máquina', price: 70, duration: 50, category: 'Tosa', active: true },
  { id: 's4', name: 'Tosa na Tesoura', price: 90, duration: 60, category: 'Tosa', active: true },
  { id: 's5', name: 'Tosa das Raças', price: 120, duration: 90, category: 'Tosa', active: true },
  { id: 's6', name: 'Trimming', price: 150, duration: 120, category: 'Tosa', active: true },
  { id: 's7', name: 'Banho + Tosa', price: 100, duration: 75, category: 'Combo', active: true },
  { id: 's8', name: 'Leva e Traz', price: 25, duration: 0, category: 'Transporte', active: true },
];

export const clients: Client[] = [
  { id: 'c1', name: 'Maria Silva', phone: '(11) 98765-4321', whatsapp: '5511987654321', address: 'Rua das Flores, 123', pets: [], createdAt: '2024-01-15', totalVisits: 24 },
  { id: 'c2', name: 'João Santos', phone: '(11) 91234-5678', whatsapp: '5511912345678', address: 'Av. Brasil, 456', pets: [], createdAt: '2024-03-10', totalVisits: 12 },
  { id: 'c3', name: 'Ana Costa', phone: '(11) 99876-5432', whatsapp: '5511998765432', address: 'Rua do Parque, 789', pets: [], createdAt: '2024-06-01', totalVisits: 8 },
  { id: 'c4', name: 'Carlos Oliveira', phone: '(11) 95555-1234', whatsapp: '5511955551234', address: 'Rua Augusta, 321', pets: [], createdAt: '2024-02-20', totalVisits: 18 },
  { id: 'c5', name: 'Fernanda Lima', phone: '(11) 94444-9876', whatsapp: '5511944449876', address: 'Rua Consolação, 654', pets: [], createdAt: '2024-08-05', totalVisits: 5 },
];

export const pets: Pet[] = [
  { id: 'p1', clientId: 'c1', name: 'Thor', breed: 'Golden Retriever', size: 'grande', age: '3 anos', notes: 'Alérgico a produtos com perfume forte' },
  { id: 'p2', clientId: 'c1', name: 'Luna', breed: 'Shih Tzu', size: 'pequeno', age: '5 anos', notes: '' },
  { id: 'p3', clientId: 'c2', name: 'Rex', breed: 'Pastor Alemão', size: 'grande', age: '4 anos', notes: 'Agitado durante o banho' },
  { id: 'p4', clientId: 'c3', name: 'Mel', breed: 'Poodle', size: 'medio', age: '2 anos', notes: '' },
  { id: 'p5', clientId: 'c4', name: 'Bob', breed: 'Bulldog Francês', size: 'medio', age: '1 ano', notes: 'Problema respiratório, cuidar com água no focinho' },
  { id: 'p6', clientId: 'c4', name: 'Nina', breed: 'Yorkshire', size: 'pequeno', age: '6 anos', notes: '' },
  { id: 'p7', clientId: 'c5', name: 'Max', breed: 'Labrador', size: 'grande', age: '2 anos', notes: '' },
];

const today = new Date().toISOString().split('T')[0];

export const appointments: Appointment[] = [
  { id: 'a1', clientId: 'c1', clientName: 'Maria Silva', petId: 'p1', petName: 'Thor', petBreed: 'Golden Retriever', serviceId: 's7', serviceName: 'Banho + Tosa', date: today, time: '09:00', status: 'finalizado', price: 100 },
  { id: 'a2', clientId: 'c2', clientName: 'João Santos', petId: 'p3', petName: 'Rex', petBreed: 'Pastor Alemão', serviceId: 's1', serviceName: 'Banho', date: today, time: '10:00', status: 'em_andamento', price: 60 },
  { id: 'a3', clientId: 'c3', clientName: 'Ana Costa', petId: 'p4', petName: 'Mel', petBreed: 'Poodle', serviceId: 's4', serviceName: 'Tosa na Tesoura', date: today, time: '11:30', status: 'agendado', price: 90 },
  { id: 'a4', clientId: 'c4', clientName: 'Carlos Oliveira', petId: 'p5', petName: 'Bob', petBreed: 'Bulldog Francês', serviceId: 's1', serviceName: 'Banho', date: today, time: '14:00', status: 'agendado', price: 60, levaTraz: true, levaTrazStatus: 'a_buscar' },
  { id: 'a5', clientId: 'c5', clientName: 'Fernanda Lima', petId: 'p7', petName: 'Max', petBreed: 'Labrador', serviceId: 's7', serviceName: 'Banho + Tosa', date: today, time: '15:30', status: 'agendado', price: 100 },
  { id: 'a6', clientId: 'c1', clientName: 'Maria Silva', petId: 'p2', petName: 'Luna', petBreed: 'Shih Tzu', serviceId: 's5', serviceName: 'Tosa das Raças', date: today, time: '16:30', status: 'agendado', price: 120 },
];

export const products: Product[] = [
  { id: 'pr1', name: 'Shampoo Neutro 500ml', category: 'Higiene', price: 35.90, stock: 24, minStock: 5 },
  { id: 'pr2', name: 'Condicionador Premium 300ml', category: 'Higiene', price: 42.50, stock: 18, minStock: 5 },
  { id: 'pr3', name: 'Perfume Pet 120ml', category: 'Higiene', price: 28.00, stock: 30, minStock: 10 },
  { id: 'pr4', name: 'Ração Premium 15kg', category: 'Alimentação', price: 189.90, stock: 8, minStock: 3 },
  { id: 'pr5', name: 'Petisco Natural 200g', category: 'Alimentação', price: 24.90, stock: 45, minStock: 10 },
  { id: 'pr6', name: 'Coleira Ajustável M', category: 'Acessórios', price: 49.90, stock: 12, minStock: 3 },
  { id: 'pr7', name: 'Brinquedo Mordedor', category: 'Acessórios', price: 19.90, stock: 3, minStock: 5 },
  { id: 'pr8', name: 'Antipulgas Comprimido', category: 'Saúde', price: 65.00, stock: 15, minStock: 5 },
];

export const sales: Sale[] = [
  { id: 'sl1', productId: 'pr1', productName: 'Shampoo Neutro 500ml', quantity: 2, total: 71.80, paymentMethod: 'pix', date: today },
  { id: 'sl2', productId: 'pr5', productName: 'Petisco Natural 200g', quantity: 3, total: 74.70, paymentMethod: 'cartao_debito', date: today },
  { id: 'sl3', productId: 'pr8', productName: 'Antipulgas Comprimido', quantity: 1, total: 65.00, paymentMethod: 'dinheiro', date: today },
];

export const financialEntries: FinancialEntry[] = [
  { id: 'f1', type: 'entrada', category: 'Serviços', description: 'Banho + Tosa - Thor', amount: 100, date: today },
  { id: 'f2', type: 'entrada', category: 'Vendas', description: 'Shampoo Neutro x2', amount: 71.80, date: today },
  { id: 'f3', type: 'entrada', category: 'Vendas', description: 'Petiscos x3', amount: 74.70, date: today },
  { id: 'f4', type: 'saida', category: 'Fornecedores', description: 'Compra de shampoos - distribuidora', amount: 450, date: today },
  { id: 'f5', type: 'saida', category: 'Operacional', description: 'Conta de água', amount: 180, date: today },
  { id: 'f6', type: 'entrada', category: 'Serviços', description: 'Banho - Rex', amount: 60, date: today },
  { id: 'f7', type: 'entrada', category: 'Vendas', description: 'Antipulgas', amount: 65, date: today },
];

export const statusLabels: Record<string, string> = {
  agendado: 'Agendado',
  em_andamento: 'Em Andamento',
  finalizado: 'Finalizado',
  cancelado: 'Cancelado',
};

export const statusColors: Record<string, string> = {
  agendado: 'bg-info/20 text-info',
  em_andamento: 'bg-warning/20 text-warning',
  finalizado: 'bg-success/20 text-success',
  cancelado: 'bg-destructive/20 text-destructive',
};

export const levaTrazLabels: Record<string, string> = {
  a_buscar: 'A Buscar',
  em_transporte: 'Em Transporte',
  entregue: 'Entregue',
};

export const paymentLabels: Record<string, string> = {
  dinheiro: 'Dinheiro',
  pix: 'PIX',
  cartao_credito: 'Cartão Crédito',
  cartao_debito: 'Cartão Débito',
};
