import { create } from 'zustand';

interface Service {
  id: string;
  title: string;
  description: string;
  providerId: string;
  providerName: string;
  category: string;
  price: number;
  location: string;
  availability: string;
  rating: number;
  reviewCount: number;
  tags: string[];
  images: string[];
  isActive: boolean;
  createdAt: string;
}

interface StageOffer {
  id: string;
  title: string;
  company: string;
  description: string;
  requirements: string[];
  location: string;
  duration: string;
  startDate: string;
  type: 'stage' | 'job' | 'vacation_job';
  salary?: number;
  companyLogo?: string;
  isUrgent: boolean;
  applicants: number;
  deadline: string;
  contactEmail: string;
  createdAt: string;
}

interface Booking {
  id: string;
  serviceId: string;
  clientId: string;
  providerId: string;
  date: string;
  time: string;
  duration: number;
  location: string;
  notes: string;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  paymentMethod: 'airtel_money' | 'moov_money' | 'cash';
  totalPrice: number;
  createdAt: string;
}

interface JobState {
  services: Service[];
  stageOffers: StageOffer[];
  bookings: Booking[];
  isLoading: boolean;
  
  // Actions
  fetchServices: (filters?: ServiceFilters) => Promise<void>;
  fetchStageOffers: (filters?: StageOfferFilters) => Promise<void>;
  fetchBookings: (userId?: string) => Promise<void>;
  createBooking: (bookingData: CreateBookingData) => Promise<Booking>;
  updateBookingStatus: (bookingId: string, status: Booking['status']) => Promise<void>;
  createService: (serviceData: CreateServiceData) => Promise<Service>;
  updateService: (serviceId: string, data: Partial<Service>) => Promise<void>;
  setLoading: (loading: boolean) => void;
}

interface ServiceFilters {
  category?: string;
  location?: string;
  priceRange?: [number, number];
  rating?: number;
  availability?: string;
  search?: string;
}

interface StageOfferFilters {
  type?: 'stage' | 'job' | 'vacation_job';
  location?: string;
  company?: string;
  search?: string;
}

interface CreateBookingData {
  serviceId: string;
  date: string;
  time: string;
  duration: number;
  location: string;
  notes: string;
  paymentMethod: 'airtel_money' | 'moov_money' | 'cash';
}

interface CreateServiceData {
  title: string;
  description: string;
  category: string;
  price: number;
  location: string;
  availability: string;
  tags: string[];
  images: string[];
}

export const useJobStore = create<JobState>((set, get) => ({
  services: [],
  stageOffers: [],
  bookings: [],
  isLoading: false,

  fetchServices: async (filters?: ServiceFilters) => {
    set({ isLoading: true });

    try {
      // TODO: Remplacer par l'appel API réel
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock services data
      const mockServices: Service[] = [
        {
          id: '1',
          title: 'Plomberie - Réparation et installation',
          description: 'Service de plomberie professionnel pour tous vos besoins de réparation et d\'installation. Intervention rapide et tarifs compétitifs.',
          providerId: 'provider1',
          providerName: 'Jean Ouédraogo',
          category: 'Plomberie',
          price: 2500,
          location: 'Ouagadougou, Secteur 15',
          availability: 'Disponible aujourd\'hui',
          rating: 4.8,
          reviewCount: 45,
          tags: ['Plomberie', 'Réparation', 'Installation', 'Urgence'],
          images: ['https://images.pexels.com/photos/8486951/pexels-photo-8486951.jpeg'],
          isActive: true,
          createdAt: '2024-01-10'
        },
        {
          id: '2',
          title: 'Jardinage et entretien espaces verts',
          description: 'Services d\'entretien de jardins, taille de haies, plantation et aménagement paysager pour particuliers et entreprises.',
          providerId: 'provider2',
          providerName: 'Marie Sawadogo',
          category: 'Jardinage',
          price: 1800,
          location: 'Ouagadougou, Secteur 12',
          availability: 'Disponible demain',
          rating: 4.9,
          reviewCount: 67,
          tags: ['Jardinage', 'Aménagement', 'Entretien', 'Plantation'],
          images: ['https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg'],
          isActive: true,
          createdAt: '2024-01-08'
        },
        {
          id: '3',
          title: 'Électricité générale et dépannage',
          description: 'Électricien qualifié pour installation électrique, dépannage d\'urgence et mise aux normes. Devis gratuit.',
          providerId: 'provider3',
          providerName: 'Paul Kaboré',
          category: 'Électricité',
          price: 3000,
          location: 'Bobo-Dioulasso',
          availability: 'Disponible cette semaine',
          rating: 4.7,
          reviewCount: 89,
          tags: ['Électricité', 'Dépannage', 'Installation', 'Normes'],
          images: ['https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg'],
          isActive: true,
          createdAt: '2024-01-05'
        }
      ];

      set({ services: mockServices, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw new Error('Erreur lors du chargement des services');
    }
  },

  fetchStageOffers: async (filters?: StageOfferFilters) => {
    set({ isLoading: true });

    try {
      // TODO: Remplacer par l'appel API réel
      await new Promise(resolve => setTimeout(resolve, 800));

      // Mock stage offers data
      const mockStageOffers: StageOffer[] = [
        {
          id: '1',
          title: 'Stage développement web - Full Stack',
          company: 'TechBF Solutions',
          description: 'Nous recherchons un stagiaire motivé pour rejoindre notre équipe de développement. Vous travaillerez sur des projets web modernes avec React, Node.js et MongoDB.',
          requirements: ['JavaScript', 'React', 'Node.js', 'Étudiant en informatique'],
          location: 'Ouagadougou',
          duration: '3 mois',
          startDate: '15 Mars 2024',
          type: 'stage',
          salary: 150000,
          isUrgent: false,
          applicants: 23,
          deadline: '2024-03-01',
          contactEmail: 'rh@techbf.com',
          createdAt: '2024-01-15'
        },
        {
          id: '2',
          title: 'Job vacances - Agent commercial',
          company: 'CommerceMax',
          description: 'Poste temporaire pour les vacances scolaires. Vente de produits électroniques et conseil clientèle dans notre magasin du centre-ville.',
          requirements: ['Bac minimum', 'Sens du commerce', 'Disponible 2 mois'],
          location: 'Ouagadougou',
          duration: '2 mois',
          startDate: '1er Juillet 2024',
          type: 'vacation_job',
          salary: 80000,
          isUrgent: true,
          applicants: 45,
          deadline: '2024-06-15',
          contactEmail: 'jobs@commercemax.bf',
          createdAt: '2024-01-12'
        },
        {
          id: '3',
          title: 'Stage comptabilité et gestion',
          company: 'Cabinet Expertise BF',
          description: 'Stage en cabinet comptable pour étudiant en finance/comptabilité. Formation pratique sur logiciels comptables et accompagnement clients.',
          requirements: ['BTS/Licence Comptabilité', 'Maîtrise Excel', 'Rigoureux'],
          location: 'Bobo-Dioulasso',
          duration: '4 mois',
          startDate: '1er Avril 2024',
          type: 'stage',
          salary: 120000,
          isUrgent: false,
          applicants: 12,
          deadline: '2024-03-20',
          contactEmail: 'stage@expertisebf.com',
          createdAt: '2024-01-10'
        }
      ];

      set({ stageOffers: mockStageOffers, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw new Error('Erreur lors du chargement des offres');
    }
  },

  fetchBookings: async (userId?: string) => {
    set({ isLoading: true });

    try {
      // TODO: Remplacer par l'appel API réel
      await new Promise(resolve => setTimeout(resolve, 600));

      // Mock bookings data
      const mockBookings: Booking[] = [
        {
          id: '1',
          serviceId: '1',
          clientId: 'client1',
          providerId: 'provider1',
          date: '2024-02-15',
          time: '14:00',
          duration: 2,
          location: 'Secteur 15, Ouagadougou',
          notes: 'Réparation fuite dans la cuisine',
          status: 'confirmed',
          paymentMethod: 'airtel_money',
          totalPrice: 5000,
          createdAt: '2024-01-20'
        }
      ];

      set({ bookings: mockBookings, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw new Error('Erreur lors du chargement des réservations');
    }
  },

  createBooking: async (bookingData: CreateBookingData) => {
    set({ isLoading: true });

    try {
      // TODO: Remplacer par l'appel API réel
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newBooking: Booking = {
        id: Date.now().toString(),
        ...bookingData,
        clientId: 'current-user-id', // À remplacer par l'ID de l'utilisateur connecté
        providerId: 'provider-id', // À récupérer du service
        status: 'pending',
        totalPrice: 0, // À calculer
        createdAt: new Date().toISOString()
      };

      const bookings = [...get().bookings, newBooking];
      set({ bookings, isLoading: false });
      
      return newBooking;
    } catch (error) {
      set({ isLoading: false });
      throw new Error('Erreur lors de la création de la réservation');
    }
  },

  updateBookingStatus: async (bookingId: string, status: Booking['status']) => {
    set({ isLoading: true });

    try {
      // TODO: Remplacer par l'appel API réel
      await new Promise(resolve => setTimeout(resolve, 500));

      const bookings = get().bookings.map(booking =>
        booking.id === bookingId ? { ...booking, status } : booking
      );
      
      set({ bookings, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw new Error('Erreur lors de la mise à jour du statut');
    }
  },

  createService: async (serviceData: CreateServiceData) => {
    set({ isLoading: true });

    try {
      // TODO: Remplacer par l'appel API réel
      await new Promise(resolve => setTimeout(resolve, 800));

      const newService: Service = {
        id: Date.now().toString(),
        ...serviceData,
        providerId: 'current-user-id', // À remplacer par l'ID de l'utilisateur connecté
        providerName: 'Current User', // À récupérer du store auth
        rating: 0,
        reviewCount: 0,
        isActive: true,
        createdAt: new Date().toISOString()
      };

      const services = [...get().services, newService];
      set({ services, isLoading: false });
      
      return newService;
    } catch (error) {
      set({ isLoading: false });
      throw new Error('Erreur lors de la création du service');
    }
  },

  updateService: async (serviceId: string, data: Partial<Service>) => {
    set({ isLoading: true });

    try {
      // TODO: Remplacer par l'appel API réel
      await new Promise(resolve => setTimeout(resolve, 500));

      const services = get().services.map(service =>
        service.id === serviceId ? { ...service, ...data } : service
      );
      
      set({ services, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw new Error('Erreur lors de la mise à jour du service');
    }
  },

  setLoading: (loading: boolean) => {
    set({ isLoading: loading });
  }
}));