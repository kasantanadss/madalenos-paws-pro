import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Appointment, Client, Pet, Service, Product, Sale, FinancialEntry } from '@/types/petshop';
import {
  appointments as initialAppointments,
  clients as initialClients,
  pets as initialPets,
  services as initialServices,
  products as initialProducts,
  sales as initialSales,
  financialEntries as initialFinancialEntries,
} from '@/data/mockData';

interface PetshopState {
  appointments: Appointment[];
  clients: Client[];
  pets: Pet[];
  services: Service[];
  products: Product[];
  sales: Sale[];
  financialEntries: FinancialEntry[];
  addAppointment: (a: Appointment) => void;
  updateAppointmentStatus: (id: string, status: Appointment['status']) => void;
  addClient: (c: Client) => void;
  addPet: (p: Pet) => void;
  addService: (s: Service) => void;
  deleteService: (id: string) => void;
  addProduct: (p: Product) => void;
  addFinancialEntry: (f: FinancialEntry) => void;
}

const PetshopContext = createContext<PetshopState | null>(null);

export function PetshopProvider({ children }: { children: ReactNode }) {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [clients, setClients] = useState(initialClients);
  const [pets, setPets] = useState(initialPets);
  const [services, setServices] = useState(initialServices);
  const [products, setProducts] = useState(initialProducts);
  const [sales, setSales] = useState(initialSales);
  const [financialEntries, setFinancialEntries] = useState(initialFinancialEntries);

  const addAppointment = useCallback((a: Appointment) => setAppointments(prev => [...prev, a]), []);
  const updateAppointmentStatus = useCallback((id: string, status: Appointment['status']) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status } : a));
  }, []);
  const addClient = useCallback((c: Client) => setClients(prev => [...prev, c]), []);
  const addPet = useCallback((p: Pet) => setPets(prev => [...prev, p]), []);
  const addService = useCallback((s: Service) => setServices(prev => [...prev, s]), []);
  const deleteService = useCallback((id: string) => setServices(prev => prev.filter(s => s.id !== id)), []);
  const addProduct = useCallback((p: Product) => setProducts(prev => [...prev, p]), []);
  const addFinancialEntry = useCallback((f: FinancialEntry) => setFinancialEntries(prev => [...prev, f]), []);

  return (
    <PetshopContext.Provider value={{
      appointments, clients, pets, services, products, sales, financialEntries,
      addAppointment, updateAppointmentStatus, addClient, addPet, addService, deleteService, addProduct, addFinancialEntry,
    }}>
      {children}
    </PetshopContext.Provider>
  );
}

export function usePetshop() {
  const ctx = useContext(PetshopContext);
  if (!ctx) throw new Error('usePetshop must be within PetshopProvider');
  return ctx;
}
