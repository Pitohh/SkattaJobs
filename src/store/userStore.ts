import { create } from 'zustand';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  location?: string;
  bio?: string;
  rating?: number;
  reviewCount?: number;
  completedJobs?: number;
  specialties?: string[];
  availability?: {
    days: string[];
    timeSlots: string[];
  };
  portfolio?: {
    id: string;
    title: string;
    description: string;
    images: string[];
    completedAt: string;
  }[];
  isOnline?: boolean;
  lastSeen?: string;
}

interface UserState {
  profiles: Map<string, UserProfile>;
  favorites: string[];
  isLoading: boolean;
  
  // Actions
  fetchUserProfile: (userId: string) => Promise<UserProfile>;
  updateUserProfile: (userId: string, data: Partial<UserProfile>) => Promise<void>;
  addToFavorites: (userId: string) => void;
  removeFromFavorites: (userId: string) => void;
  setLoading: (loading: boolean) => void;
}

export const useUserStore = create<UserState>((set, get) => ({
  profiles: new Map(),
  favorites: [],
  isLoading: false,

  fetchUserProfile: async (userId: string) => {
    const existing = get().profiles.get(userId);
    if (existing) return existing;

    set({ isLoading: true });

    try {
      // TODO: Remplacer par l'appel API réel
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulation

      // Mock profile data
      const mockProfile: UserProfile = {
        id: userId,
        name: `User ${userId}`,
        email: `user${userId}@example.com`,
        phone: '+226 70 12 34 56',
        location: 'Ouagadougou, Burkina Faso',
        bio: 'Prestataire expérimenté avec 5 ans d\'expérience dans le domaine.',
        rating: 4.8,
        reviewCount: 124,
        completedJobs: 89,
        specialties: ['Plomberie', 'Électricité', 'Réparation'],
        availability: {
          days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
          timeSlots: ['09:00-12:00', '14:00-18:00']
        },
        portfolio: [
          {
            id: '1',
            title: 'Rénovation cuisine',
            description: 'Rénovation complète d\'une cuisine moderne',
            images: ['https://images.pexels.com/photos/1599791/pexels-photo-1599791.jpeg'],
            completedAt: '2024-01-15'
          }
        ],
        isOnline: Math.random() > 0.5,
        lastSeen: new Date().toISOString()
      };

      const profiles = new Map(get().profiles);
      profiles.set(userId, mockProfile);
      
      set({ profiles, isLoading: false });
      return mockProfile;
    } catch (error) {
      set({ isLoading: false });
      throw new Error('Erreur lors du chargement du profil');
    }
  },

  updateUserProfile: async (userId: string, data: Partial<UserProfile>) => {
    set({ isLoading: true });

    try {
      // TODO: Remplacer par l'appel API réel
      await new Promise(resolve => setTimeout(resolve, 500));

      const profiles = new Map(get().profiles);
      const existing = profiles.get(userId);
      
      if (existing) {
        profiles.set(userId, { ...existing, ...data });
        set({ profiles, isLoading: false });
      }
    } catch (error) {
      set({ isLoading: false });
      throw new Error('Erreur lors de la mise à jour du profil');
    }
  },

  addToFavorites: (userId: string) => {
    const favorites = get().favorites;
    if (!favorites.includes(userId)) {
      set({ favorites: [...favorites, userId] });
    }
  },

  removeFromFavorites: (userId: string) => {
    const favorites = get().favorites.filter(id => id !== userId);
    set({ favorites });
  },

  setLoading: (loading: boolean) => {
    set({ isLoading: loading });
  }
}));