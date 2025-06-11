import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'client' | 'prestataire' | 'admin';
  avatar?: string;
  phone?: string;
  location?: string;
  isVerified: boolean;
  createdAt: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  setLoading: (loading: boolean) => void;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: 'client' | 'prestataire';
  phone?: string;
  location?: string;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        
        try {
          // TODO: Remplacer par l'appel API réel
          await new Promise(resolve => setTimeout(resolve, 1000)); // Simulation
          
          // Mock response - à remplacer par la vraie API
          const mockUser: User = {
            id: '1',
            name: email === 'admin@skattajobs.com' ? 'Admin SkattaJobs' : 
                  email === 'prestataire@test.com' ? 'Jean Prestataire' : 'Marie Client',
            email,
            role: email === 'admin@skattajobs.com' ? 'admin' : 
                  email === 'prestataire@test.com' ? 'prestataire' : 'client',
            isVerified: true,
            createdAt: '2024-01-01',
            location: 'Ouagadougou, Burkina Faso',
            phone: '+226 70 12 34 56'
          };
          
          const mockToken = 'mock-jwt-token-' + Date.now();
          
          set({
            user: mockUser,
            token: mockToken,
            isAuthenticated: true,
            isLoading: false
          });
        } catch (error) {
          set({ isLoading: false });
          throw new Error('Identifiants incorrects');
        }
      },

      register: async (userData: RegisterData) => {
        set({ isLoading: true });
        
        try {
          // TODO: Remplacer par l'appel API réel
          await new Promise(resolve => setTimeout(resolve, 1000)); // Simulation
          
          const newUser: User = {
            id: Date.now().toString(),
            name: userData.name,
            email: userData.email,
            role: userData.role,
            phone: userData.phone,
            location: userData.location,
            isVerified: false,
            createdAt: new Date().toISOString()
          };
          
          const token = 'mock-jwt-token-' + Date.now();
          
          set({
            user: newUser,
            token,
            isAuthenticated: true,
            isLoading: false
          });
        } catch (error) {
          set({ isLoading: false });
          throw new Error('Erreur lors de l\'inscription');
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false
        });
      },

      updateProfile: (data: Partial<User>) => {
        const currentUser = get().user;
        if (currentUser) {
          set({
            user: { ...currentUser, ...data }
          });
        }
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      }
    }),
    {
      name: 'skattajobs-auth',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
);