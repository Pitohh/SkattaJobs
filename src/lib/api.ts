import axios from 'axios';

// Configuration API
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

// Instance Axios avec configuration de base
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token JWT
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('skattajobs-auth');
    if (token) {
      try {
        const parsed = JSON.parse(token);
        if (parsed.state?.token) {
          config.headers.Authorization = `Bearer ${parsed.state.token}`;
        }
      } catch (error) {
        console.error('Erreur parsing token:', error);
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les réponses et erreurs
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // Gestion des erreurs globales
    if (error.response?.status === 401) {
      // Token expiré ou invalide
      localStorage.removeItem('skattajobs-auth');
      window.location.href = '/login';
    }
    
    const message = error.response?.data?.message || error.message || 'Une erreur est survenue';
    return Promise.reject(new Error(message));
  }
);

// Types d'API
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role: 'client' | 'prestataire';
  phone?: string;
  location?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface User {
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

export interface AuthResponse {
  user: User;
  token: string;
}

// API Endpoints
export const authAPI = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    return api.post('/auth/login', data);
  },

  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    return api.post('/auth/register', data);
  },

  logout: async (): Promise<void> => {
    return api.post('/auth/logout');
  },

  refreshToken: async (): Promise<{ token: string }> => {
    return api.post('/auth/refresh');
  },

  getProfile: async (): Promise<User> => {
    return api.get('/auth/profile');
  },

  updateProfile: async (data: Partial<User>): Promise<User> => {
    return api.put('/auth/profile', data);
  }
};

export const servicesAPI = {
  getServices: async (params?: any): Promise<any[]> => {
    return api.get('/services', { params });
  },

  getService: async (id: string): Promise<any> => {
    return api.get(`/services/${id}`);
  },

  createService: async (data: any): Promise<any> => {
    return api.post('/services', data);
  },

  updateService: async (id: string, data: any): Promise<any> => {
    return api.put(`/services/${id}`, data);
  },

  deleteService: async (id: string): Promise<void> => {
    return api.delete(`/services/${id}`);
  },

  searchServices: async (query: string, filters?: any): Promise<any[]> => {
    return api.get('/services/search', { params: { q: query, ...filters } });
  }
};

export const bookingsAPI = {
  getBookings: async (params?: any): Promise<any[]> => {
    return api.get('/bookings', { params });
  },

  getBooking: async (id: string): Promise<any> => {
    return api.get(`/bookings/${id}`);
  },

  createBooking: async (data: any): Promise<any> => {
    return api.post('/bookings', data);
  },

  updateBooking: async (id: string, data: any): Promise<any> => {
    return api.put(`/bookings/${id}`, data);
  },

  cancelBooking: async (id: string): Promise<void> => {
    return api.delete(`/bookings/${id}`);
  }
};

export const stagesAPI = {
  getStageOffers: async (params?: any): Promise<any[]> => {
    return api.get('/stages', { params });
  },

  getStageOffer: async (id: string): Promise<any> => {
    return api.get(`/stages/${id}`);
  },

  applyToStage: async (stageId: string, applicationData: any): Promise<any> => {
    return api.post(`/stages/${stageId}/apply`, applicationData);
  },

  getApplications: async (params?: any): Promise<any[]> => {
    return api.get('/stages/applications', { params });
  }
};

export const usersAPI = {
  getUsers: async (params?: any): Promise<User[]> => {
    return api.get('/users', { params });
  },

  getUser: async (id: string): Promise<User> => {
    return api.get(`/users/${id}`);
  },

  updateUser: async (id: string, data: any): Promise<User> => {
    return api.put(`/users/${id}`, data);
  },

  deleteUser: async (id: string): Promise<void> => {
    return api.delete(`/users/${id}`);
  },

  getUserStats: async (id: string): Promise<any> => {
    return api.get(`/users/${id}/stats`);
  }
};

export const adminAPI = {
  getDashboardStats: async (): Promise<any> => {
    return api.get('/admin/stats');
  },

  getReports: async (params?: any): Promise<any[]> => {
    return api.get('/admin/reports', { params });
  },

  moderateContent: async (contentId: string, action: string): Promise<void> => {
    return api.post(`/admin/moderate/${contentId}`, { action });
  },

  getSystemLogs: async (params?: any): Promise<any[]> => {
    return api.get('/admin/logs', { params });
  }
};

// Fonction utilitaire pour upload de fichiers
export const uploadFile = async (file: File, type: 'avatar' | 'service' | 'portfolio'): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('type', type);
  
  const response = await api.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  
  return response.url;
};

// Export par défaut
export default api;