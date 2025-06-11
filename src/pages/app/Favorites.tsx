import React, { useEffect, useState } from 'react';
import { Heart, Search, Filter, Grid, List, Trash2 } from 'lucide-react';
import { useUserStore } from '../../store/userStore';
import { useJobStore } from '../../store/jobStore';
import ServiceCard from '../../components/ServiceCard';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Favorites: React.FC = () => {
  const navigate = useNavigate();
  const { favorites, removeFromFavorites } = useUserStore();
  const { services, fetchServices } = useJobStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('recent');

  useEffect(() => {
    if (services.length === 0) {
      fetchServices();
    }
  }, [services.length, fetchServices]);

  const favoriteServices = services.filter(service => favorites.includes(service.id));

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleServiceView = (id: string) => {
    navigate(`/job-details/${id}`);
  };

  const handleRemoveFromFavorites = (serviceId: string) => {
    removeFromFavorites(serviceId);
    toast.success('Service retiré des favoris');
  };

  const clearAllFavorites = () => {
    favorites.forEach(id => removeFromFavorites(id));
    toast.success('Tous les favoris ont été supprimés');
  };

  const filteredServices = favoriteServices.filter(service => {
    if (!searchQuery) return true;
    return service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
           service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
           service.providerName.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const sortedServices = [...filteredServices].sort((a, b) => {
    switch (sortBy) {
      case 'price_low':
        return a.price - b.price;
      case 'price_high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'recent':
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-white fill-current" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Mes Favoris</h1>
              <p className="text-gray-600">
                {favoriteServices.length} service{favoriteServices.length > 1 ? 's' : ''} favori{favoriteServices.length > 1 ? 's' : ''}
              </p>
            </div>
          </div>

          {/* Search and Controls */}
          <div className="space-y-4">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher dans mes favoris..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </form>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  <option value="recent">Plus récents</option>
                  <option value="price_low">Prix croissant</option>
                  <option value="price_high">Prix décroissant</option>
                  <option value="rating">Mieux notés</option>
                </select>

                {favoriteServices.length > 0 && (
                  <button
                    onClick={clearAllFavorites}
                    className="flex items-center space-x-2 px-3 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors text-sm"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Vider</span>
                  </button>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">
                  {sortedServices.length} résultat{sortedServices.length > 1 ? 's' : ''}
                </span>
                
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'} transition-colors`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'} transition-colors`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {favoriteServices.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Aucun favori pour le moment</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Explorez nos services et ajoutez ceux qui vous intéressent à vos favoris pour les retrouver facilement.
            </p>
            <button
              onClick={() => navigate('/search')}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Découvrir les services
            </button>
          </div>
        ) : sortedServices.length === 0 ? (
          <div className="text-center py-16">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">Aucun résultat</h3>
            <p className="text-gray-600">
              Aucun service ne correspond à votre recherche dans vos favoris.
            </p>
          </div>
        ) : (
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          }`}>
            {sortedServices.map((service) => (
              <ServiceCard
                key={service.id}
                {...service}
                imageUrl={service.images[0]}
                onView={handleServiceView}
                onFavorite={handleRemoveFromFavorites}
                isFavorite={true}
              />
            ))}
          </div>
        )}
      </div>

      {/* Floating Action Button for Mobile */}
      {favoriteServices.length === 0 && (
        <button
          onClick={() => navigate('/search')}
          className="fixed bottom-24 right-4 md:hidden w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-700 transition-colors"
        >
          <Search className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default Favorites;