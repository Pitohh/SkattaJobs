import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  MapPin, 
  Briefcase, 
  Clock,
  Building,
  TrendingUp,
  X,
  SlidersHorizontal
} from 'lucide-react';
import { useJobStore } from '../../store/jobStore';
import StageOfferCard from '../../components/StageOfferCard';
import toast from 'react-hot-toast';

const StageOffers: React.FC = () => {
  const { stageOffers, fetchStageOffers, isLoading } = useJobStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    type: '',
    location: '',
    company: '',
    salaryRange: [0, 500000] as [number, number],
    isUrgent: false
  });

  useEffect(() => {
    fetchStageOffers();
  }, [fetchStageOffers]);

  const offerTypes = [
    { value: '', label: 'Tous les types' },
    { value: 'stage', label: 'Stages' },
    { value: 'job', label: 'Emplois' },
    { value: 'vacation_job', label: 'Jobs vacances' }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchStageOffers({ ...filters, search: searchQuery });
  };

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    fetchStageOffers({ ...newFilters, search: searchQuery });
  };

  const clearFilters = () => {
    const resetFilters = {
      type: '',
      location: '',
      company: '',
      salaryRange: [0, 500000] as [number, number],
      isUrgent: false
    };
    setFilters(resetFilters);
    setSearchQuery('');
    fetchStageOffers();
  };

  const handleApply = (offerId: string) => {
    toast.success('Votre candidature a été envoyée avec succès !');
  };

  const filteredOffers = stageOffers.filter(offer => {
    const matchesSearch = !searchQuery || 
      offer.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      offer.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      offer.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = !filters.type || offer.type === filters.type;
    const matchesLocation = !filters.location || 
      offer.location.toLowerCase().includes(filters.location.toLowerCase());
    const matchesCompany = !filters.company || 
      offer.company.toLowerCase().includes(filters.company.toLowerCase());
    const matchesSalary = !offer.salary || 
      (offer.salary >= filters.salaryRange[0] && offer.salary <= filters.salaryRange[1]);
    const matchesUrgency = !filters.isUrgent || offer.isUrgent;

    return matchesSearch && matchesType && matchesLocation && 
           matchesCompany && matchesSalary && matchesUrgency;
  });

  const stats = [
    { label: 'Offres actives', value: stageOffers.length, icon: Briefcase },
    { label: 'Entreprises partenaires', value: '45+', icon: Building },
    { label: 'Offres urgentes', value: stageOffers.filter(o => o.isUrgent).length, icon: Clock },
    { label: 'Taux de placement', value: '85%', icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Offres de Stages & Emplois
            </h1>
            <p className="text-xl mb-8 text-green-100">
              Lancez votre carrière avec les meilleures opportunités au Burkina Faso
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher par titre, entreprise, compétences..."
                  className="w-full pl-12 pr-32 py-4 text-gray-900 bg-white rounded-xl border-0 shadow-lg focus:ring-2 focus:ring-white focus:ring-opacity-50 text-lg"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  Rechercher
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-8 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 mx-auto mb-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>Filtres</span>
              </button>

              {/* Quick Filters */}
              <div className="hidden md:flex items-center space-x-2">
                {offerTypes.slice(1).map((type) => (
                  <button
                    key={type.value}
                    onClick={() => handleFilterChange('type', filters.type === type.value ? '' : type.value)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      filters.type === type.value
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>

              {/* Active Filters */}
              <div className="flex items-center space-x-2">
                {Object.entries(filters).map(([key, value]) => {
                  if (!value || (Array.isArray(value) && value.every(v => v === 0 || v === 500000))) return null;
                  
                  let displayValue = '';
                  if (key === 'type') {
                    displayValue = offerTypes.find(t => t.value === value)?.label || '';
                  } else if (typeof value === 'string') {
                    displayValue = value;
                  } else if (typeof value === 'boolean' && value) {
                    displayValue = 'Urgent';
                  }

                  if (!displayValue) return null;

                  return (
                    <span key={key} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full flex items-center space-x-1">
                      <span>{displayValue}</span>
                      <button onClick={() => handleFilterChange(key, key === 'isUrgent' ? false : '')}>
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                {filteredOffers.length} offre{filteredOffers.length > 1 ? 's' : ''}
              </span>
              {Object.values(filters).some(v => v && !(Array.isArray(v) && v.every(x => x === 0 || x === 500000))) && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  Réinitialiser
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Type Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type d'offre
                </label>
                <select
                  value={filters.type}
                  onChange={(e) => handleFilterChange('type', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {offerTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
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
                    placeholder="Ville..."
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Company Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Entreprise
                </label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={filters.company}
                    onChange={(e) => handleFilterChange('company', e.target.value)}
                    placeholder="Nom de l'entreprise..."
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Urgent Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Options
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.isUrgent}
                    onChange={(e) => handleFilterChange('isUrgent', e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-600">Offres urgentes seulement</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Results */}
      <div className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-pulse">
                <div className="h-6 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-4"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        ) : filteredOffers.length === 0 ? (
          <div className="text-center py-12">
            <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">Aucune offre trouvée</h3>
            <p className="text-gray-600 mb-6">
              Essayez de modifier vos critères de recherche ou vos filtres
            </p>
            <button
              onClick={clearFilters}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Voir toutes les offres
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredOffers.map((offer) => (
              <StageOfferCard
                key={offer.id}
                {...offer}
                onApply={handleApply}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StageOffers;