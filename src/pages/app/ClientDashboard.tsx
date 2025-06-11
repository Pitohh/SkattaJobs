import React, { useEffect, useState } from 'react';
import { 
  Calendar, 
  Clock, 
  CreditCard, 
  Star, 
  MapPin, 
  Phone,
  MessageCircle,
  Plus,
  Filter,
  Search,
  BarChart3,
  Users,
  CheckCircle,
  AlertCircle,
  TrendingUp
} from 'lucide-react';
import { useJobStore } from '../../store/jobStore';
import { useAuthStore } from '../../store/authStore';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const ClientDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { bookings, fetchBookings, updateBookingStatus } = useJobStore();
  const [activeTab, setActiveTab] = useState('overview');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (user?.id) {
      fetchBookings(user.id);
    }
  }, [user?.id, fetchBookings]);

  const handleBookingAction = async (bookingId: string, action: string) => {
    try {
      let newStatus: any = action;
      if (action === 'cancel') newStatus = 'cancelled';
      if (action === 'confirm') newStatus = 'confirmed';
      
      await updateBookingStatus(bookingId, newStatus);
      toast.success(`Réservation ${action === 'cancel' ? 'annulée' : 'confirmée'} avec succès`);
    } catch (error) {
      toast.error('Erreur lors de la mise à jour');
    }
  };

  const mockBookings = [
    {
      id: '1',
      serviceTitle: 'Plomberie - Réparation fuite',
      providerName: 'Jean Ouédraogo',
      date: '2024-02-15',
      time: '14:00',
      duration: 2,
      status: 'confirmed' as const,
      totalPrice: 5000,
      location: 'Secteur 15, Ouagadougou',
      paymentMethod: 'airtel_money' as const,
      providerPhone: '+226 70 12 34 56',
      rating: null
    },
    {
      id: '2',
      serviceTitle: 'Jardinage - Entretien pelouse',
      providerName: 'Marie Sawadogo',
      date: '2024-02-18',
      time: '09:00',
      duration: 3,
      status: 'pending' as const,
      totalPrice: 5400,
      location: 'Secteur 12, Ouagadougou',
      paymentMethod: 'moov_money' as const,
      providerPhone: '+226 75 98 76 54',
      rating: null
    },
    {
      id: '3',
      serviceTitle: 'Électricité - Installation prise',
      providerName: 'Paul Kaboré',
      date: '2024-02-10',
      time: '16:00',
      duration: 1,
      status: 'completed' as const,
      totalPrice: 3000,
      location: 'Secteur 30, Ouagadougou',
      paymentMethod: 'cash' as const,
      providerPhone: '+226 72 45 67 89',
      rating: 5
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'in_progress':
        return 'bg-purple-100 text-purple-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending':
        return 'En attente';
      case 'confirmed':
        return 'Confirmé';
      case 'in_progress':
        return 'En cours';
      case 'completed':
        return 'Terminé';
      case 'cancelled':
        return 'Annulé';
      default:
        return status;
    }
  };

  const filteredBookings = mockBookings.filter(booking => {
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    const matchesSearch = !searchQuery || 
      booking.serviceTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.providerName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const stats = {
    totalBookings: mockBookings.length,
    completedBookings: mockBookings.filter(b => b.status === 'completed').length,
    totalSpent: mockBookings.filter(b => b.status === 'completed').reduce((sum, b) => sum + b.totalPrice, 0),
    averageRating: 4.8
  };

  const tabs = [
    { id: 'overview', label: 'Vue d\'ensemble', icon: BarChart3 },
    { id: 'bookings', label: 'Mes réservations', icon: Calendar },
    { id: 'providers', label: 'Mes prestataires', icon: Users }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard Client</h1>
              <p className="text-gray-600">Bienvenue, {user?.name}</p>
            </div>
            <button
              onClick={() => navigate('/search')}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Nouveau service</span>
            </button>
          </div>

          {/* Tabs */}
          <div className="mt-6 border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total réservations</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalBookings}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Services terminés</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.completedBookings}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total dépensé</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalSpent.toLocaleString()} FCFA</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Star className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Note moyenne</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.averageRating}/5</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Activité récente</h2>
              <div className="space-y-4">
                {mockBookings.slice(0, 3).map((booking) => (
                  <div key={booking.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium text-sm">
                        {booking.providerName.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{booking.serviceTitle}</p>
                      <p className="text-sm text-gray-600">avec {booking.providerName}</p>
                      <p className="text-sm text-gray-500">{booking.date} à {booking.time}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                      {getStatusLabel(booking.status)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <div className="space-y-6">
            {/* Filters */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Rechercher une réservation..."
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">Tous les statuts</option>
                  <option value="pending">En attente</option>
                  <option value="confirmed">Confirmé</option>
                  <option value="completed">Terminé</option>
                  <option value="cancelled">Annulé</option>
                </select>
              </div>
            </div>

            {/* Bookings List */}
            <div className="space-y-4">
              {filteredBookings.map((booking) => (
                <div key={booking.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-medium text-sm">
                          {booking.providerName.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{booking.serviceTitle}</h3>
                        <p className="text-sm text-gray-600">Par {booking.providerName}</p>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{booking.date}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{booking.time} ({booking.duration}h)</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{booking.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 mt-4 lg:mt-0">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                        {getStatusLabel(booking.status)}
                      </span>
                      <span className="text-lg font-semibold text-gray-900">
                        {booking.totalPrice.toLocaleString()} FCFA
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {booking.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleBookingAction(booking.id, 'confirm')}
                          className="px-3 py-1 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors"
                        >
                          Confirmer
                        </button>
                        <button
                          onClick={() => handleBookingAction(booking.id, 'cancel')}
                          className="px-3 py-1 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition-colors"
                        >
                          Annuler
                        </button>
                      </>
                    )}
                    
                    <button className="flex items-center space-x-1 px-3 py-1 text-blue-600 border border-blue-600 text-sm rounded-md hover:bg-blue-50 transition-colors">
                      <Phone className="w-3 h-3" />
                      <span>Appeler</span>
                    </button>
                    
                    <button className="flex items-center space-x-1 px-3 py-1 text-gray-600 border border-gray-300 text-sm rounded-md hover:bg-gray-50 transition-colors">
                      <MessageCircle className="w-3 h-3" />
                      <span>Message</span>
                    </button>

                    {booking.status === 'completed' && !booking.rating && (
                      <button className="flex items-center space-x-1 px-3 py-1 text-yellow-600 border border-yellow-600 text-sm rounded-md hover:bg-yellow-50 transition-colors">
                        <Star className="w-3 h-3" />
                        <span>Noter</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {filteredBookings.length === 0 && (
              <div className="text-center py-12">
                <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune réservation trouvée</h3>
                <p className="text-gray-600 mb-6">
                  {searchQuery || statusFilter !== 'all' 
                    ? 'Aucune réservation ne correspond à vos critères de recherche.'
                    : 'Vous n\'avez pas encore de réservation.'
                  }
                </p>
                <button
                  onClick={() => navigate('/search')}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Trouver un service
                </button>
              </div>
            )}
          </div>
        )}

        {/* Providers Tab */}
        {activeTab === 'providers' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Mes prestataires favoris</h2>
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Fonctionnalité bientôt disponible</h3>
              <p className="text-gray-600">
                Retrouvez ici tous vos prestataires favoris et leur historique de services.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientDashboard;