export interface Client {
  id: string;
  name: string;
  phone: string;
  whatsapp: string;
  address: string;
  pets: Pet[];
  createdAt: string;
  totalVisits: number;
}

export interface Pet {
  id: string;
  clientId: string;
  name: string;
  breed: string;
  size: 'pequeno' | 'medio' | 'grande';
  age: string;
  notes: string;
  photo?: string;
}

export interface Service {
  id: string;
  name: string;
  price: number;
  duration: number; // minutes
  category: string;
  active: boolean;
}

export interface Appointment {
  id: string;
  clientId: string;
  clientName: string;
  petId: string;
  petName: string;
  petBreed: string;
  serviceId: string;
  serviceName: string;
  date: string;
  time: string;
  status: 'agendado' | 'em_andamento' | 'finalizado' | 'cancelado';
  price: number;
  levaTraz?: boolean;
  levaTrazStatus?: 'a_buscar' | 'em_transporte' | 'entregue';
  notes?: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  minStock: number;
}

export interface Sale {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  total: number;
  paymentMethod: 'dinheiro' | 'pix' | 'cartao_credito' | 'cartao_debito';
  date: string;
}

export interface FinancialEntry {
  id: string;
  type: 'entrada' | 'saida';
  category: string;
  description: string;
  amount: number;
  date: string;
}

export type AppointmentStatus = Appointment['status'];
export type PaymentMethod = Sale['paymentMethod'];
