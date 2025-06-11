import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Star, 
  MapPin, 
  TrendingUp, 
  Users, 
  Briefcase,
  ArrowRight,
  Clock,
  Shield,
  Zap
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useJobStore } from '../../store/jobStore';
import ServiceCard from '../../components/ServiceCard';
import StageOfferCard from '../../components/StageOfferCard';
import toast from 'react-hot-toast';

const Home: React.FC = () => {
  const { user } = useAuthStore();
  const { services, stageOffers, fetchServices, fetchStageOffers } = useJobStore();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchServices();
    fetchStageOffers();
  }, [fetchServices, fetchStageOffers]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleServiceView = (id: string) => {
    navigate(`/job-details/${id}`);
  };

  const handleStageApply = (id: string) => {
    toast.success('Candidature envoyée avec succès !');
  };

  const featuredServices = services.slice(0, 3);
  const recentStageOffers = stageOffers.slice(0, 2);

  const stats = [
    { label: 'Prestataires actifs', value: '1,200+', icon: Users },
    { label: 'Services réalisés', value: '5,400+', icon: Briefcase },
    { label: 'Satisfaction client', value: '98%', icon: Star },
    { label: 'Temps de réponse', value: '< 2h', icon: Clock }
  ];

  const features = [
    {
      icon: Shield,
      title: 'Paiement sécurisé',
      description: 'Transactions protégées avec Airtel et Moov Money'
    },
    {
      icon: Zap,
      title: 'Intervention rapide',
      description: 'Prestataires disponibles en moins de 2h'
    },
    {
      icon: Star,
      title: 'Qualité garantie',
      description: 'Prestataires vérifiés et notés par la communauté'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-teal-600 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Bienvenue {user?.name} ! 👋
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              {user?.role === 'client' 
                ? 'Trouvez le prestataire parfait pour vos besoins'
                : user?.role === 'prestataire'
                ? 'Gérez vos services et trouvez de nouveaux clients'
                : 'Administrez la plateforme SkattaJobs'
              }
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher un service, prestataire..."
                  className="w-full pl-12 pr-32 py-4 text-gray-900 bg-white rounded-xl border-0 shadow-lg focus:ring-2 focus:ring-white focus:ring-opacity-50 text-lg"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Rechercher
                </button>
              </div>
            </form>

            {/* Quick Categories */}
            <div className="flex flex-wrap justify-center gap-3">
              {['Plomberie', 'Électricité', 'Jardinage', 'Ménage', 'Informatique'].map((category) => (
                <button
                  key={category}
                  onClick={() => navigate(`/search?category=${encodeURIComponent(category)}`)}
                  className="px-4 py-2 bg-white bg-opacity-20 rounded-full text-sm font-medium hover:bg-opacity-30 transition-colors"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center p-6 rounded-xl bg-gray-50">
                  <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-teal-500 rounded-lg flex items-center justify-center">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Featured Services */}
      {featuredServices.length > 0 && (
        <div className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Services populaires</h2>
              <button
                onClick={() => navigate('/search')}
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
              >
                <span>Voir tout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredServices.map((service) => (
                <ServiceCard
                  key={service.id}
                  {...service}
                  imageUrl={service.images[0]}
                  onView={handleServiceView}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Stage Offers */}
      {recentStageOffers.length > 0 && (
        <div className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Offres de stages récentes</h2>
              <button
                onClick={() => navigate('/stage-offers')}
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
              >
                <span>Voir toutes les offres</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recentStageOffers.map((offer) => (
                <StageOfferCard
                  key={offer.id}
                  {...offer}
                  onApply={handleStageApply}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Features Section */}
      <div className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Pourquoi choisir SkattaJobs ?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Une plateforme moderne et sécurisée pour connecter les meilleurs prestataires avec ceux qui ont besoin de leurs services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="text-center p-6">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-teal-500 rounded-xl flex items-center justify-center">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-r from-blue-600 to-teal-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            {user?.role === 'client' 
              ? 'Prêt à trouver votre prestataire idéal ?'
              : 'Commencez à développer votre activité dès aujourd\'hui'
            }
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            {user?.role === 'client'
              ? 'Plus de 1000 prestataires qualifiés vous attendent'
              : 'Rejoignez notre communauté de prestataires professionnels'
            }
          </p>
          <button
            onClick={() => navigate(user?.role === 'client' ? '/search' : '/provider-profile')}
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            {user?.role === 'client' ? 'Commencer ma recherche' : 'Compléter mon profil'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;