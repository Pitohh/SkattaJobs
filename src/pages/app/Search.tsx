import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { 
  Search as SearchIcon, 
  Filter, 
  MapPin, 
  Star, 
  SlidersHorizontal,
  X,
  Grid,
  List
} from 'lucide-react';
import { useJobStore } from '../../store/jobStore';
import { useUserStore } from '../../store/userStore';
import ServiceCard from '../../components/ServiceCard';

const Search: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { services, fetchServices, isLoading } = useJobStore();
  const { addToFavorites, removeFromFavorites, favorites } = useUserStore();

  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    location: '',
    priceRange: [0, 10000] as [number, number],
    rating: 0,
    availability: ''
  });

  useEffect(() => {
    fetchServices(filters);
  }, [fetchServices, filters]);

  const categories = [
    'Tous', 'Plomberie', 'Électricité', 'Jardinage', 'Ménage', 
    'Informatique', 'Réparation', 'Peinture', 'Maçonnerie', 'Autre'
  ];

  const availabilityOptions = [
    'Tous', 'Disponible maintenant', 'Disponible aujourd\'hui', 
    'Disponible cette semaine', 'Disponible ce mois'
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Apply search logic here
    fetchServices({ ...filters, search: searchQuery });
  };

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      location: '',
      priceRange: [0, 10000],
      rating: 0,
      availability: ''
    });
    setSearchQuery('');
  };

  const handleServiceView = (id: string) => {
    navigate(`/job-details/${id}`);
  };

  const handleFavoriteToggle = (serviceId: string) => {
    if (favorites.includes(serviceId)) {
      removeFromFavorites(serviceId);
    } else {
      addToFavorites(serviceId);
    }
  };

  const filteredServices = services.filter(service => {
    const matchesSearch = !searchQuery || 
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = !filters.category || filters.category === 'Tous' || 
      service.category === filters.category;
    
    const matchesLocation = !filters.location || 
      service.location.toLowerCase().includes(filters.location.toLowerCase());
    
    const matchesPrice = service.price >= filters.priceRange[0] && 
      service.price <= filters.priceRange[1];
    
    const matchesRating = filters.rating === 0 || service.rating >= filters.rating;

    return matchesSearch && matchesCategory && matchesLocation && 
           matchesPrice && matchesRating;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-16 z-40">
        <div className="container mx-auto px-4 py-4">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="mb-4">
            <div className="relative">
              <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher un service ou prestataire..."
                className="w-full pl-12 pr-32 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-4 py-1.5 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                Rechercher
              </button>
            </div>
          </form>

          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>Filtres</span>
              </button>

              {/* Active Filters */}
              <div className="flex items-center space-x-2">
                {filters.category && filters.category !== 'Tous' && (
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full flex items-center space-x-1">
                    <span>{filters.category}</span>
                    <button onClick={() => handleFilterChange('category', '')}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {filters.location && (
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full flex items-center space-x-1">
                    <span>{filters.location}</span>
                    <button onClick={() => handleFilterChange('location', '')}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">
                {filteredServices.length} résultat{filteredServices.length > 1 ? 's' : ''}
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

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          {showFilters && (
            <div className="lg:w-80 bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-fit">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Filtres</h3>
                <button
                  onClick={clearFilters}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  Réinitialiser
                </button>
              </div>

              <div className="space-y-6">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Catégorie
                  </label>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <label key={category} className="flex items-center">
                        <input
                          type="radio"
                          name="category"
                          checked={filters.category === category || (category === 'Tous' && !filters.category)}
                          onChange={() => handleFilterChange('category', category === 'Tous' ? '' : category)}
                          className="w-4 h-4 text-blue-600"
                        />
                        <span className="ml-2 text-sm text-gray-600">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Location Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Localisation
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={filters.location}
                      onChange={(e) => handleFilterChange('location', e.target.value)}
                      placeholder="Ville, secteur..."
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fourchette de prix (FCFA/h)
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.priceRange[0]}
                      onChange={(e) => handleFilterChange('priceRange', [parseInt(e.target.value) || 0, filters.priceRange[1]])}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.priceRange[1]}
                      onChange={(e) => handleFilterChange('priceRange', [filters.priceRange[0], parseInt(e.target.value) || 10000])}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Rating Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Note minimum
                  </label>
                  <div className="space-y-2">
                    {[4.5, 4.0, 3.5, 3.0, 0].map((rating) => (
                      <label key={rating} className="flex items-center">
                        <input
                          type="radio"
                          name="rating"
                          checked={filters.rating === rating}
                          onChange={() => handleFilterChange('rating', rating)}
                          className="w-4 h-4 text-blue-600"
                        />
                        <div className="ml-2 flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-600">
                            {rating === 0 ? 'Toutes les notes' : `${rating}+ étoiles`}
                          </span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Availability Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Disponibilité
                  </label>
                  <div className="space-y-2">
                    {availabilityOptions.map((option) => (
                      <label key={option} className="flex items-center">
                        <input
                          type="radio"
                          name="availability"
                          checked={filters.availability === option || (option === 'Tous' && !filters.availability)}
                          onChange={() => handleFilterChange('availability', option === 'Tous' ? '' : option)}
                          className="w-4 h-4 text-blue-600"
                        />
                        <span className="ml-2 text-sm text-gray-600">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Results */}
          <div className="flex-1">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-pulse">
                    <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                    <div className="h-6 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4"></div>
                    <div className="h-10 bg-gray-200 rounded"></div>
                  </div>
                ))}
              </div>
            ) : filteredServices.length === 0 ? (
              <div className="text-center py-12">
                <SearchIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">Aucun résultat trouvé</h3>
                <p className="text-gray-600 mb-6">
                  Essayez de modifier vos critères de recherche ou vos filtres
                </p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            ) : (
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
                {filteredServices.map((service) => (
                  <ServiceCard
                    key={service.id}
                    {...service}
                    imageUrl={service.images[0]}
                    onView={handleServiceView}
                    onFavorite={handleFavoriteToggle}
                    isFavorite={favorites.includes(service.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;