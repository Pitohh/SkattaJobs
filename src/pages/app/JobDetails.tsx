import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Star, 
  MapPin, 
  Clock, 
  Phone, 
  Mail, 
  Heart,
  Share2,
  Calendar,
  Shield,
  CheckCircle,
  MessageCircle,
  Camera
} from 'lucide-react';
import { useJobStore } from '../../store/jobStore';
import { useUserStore } from '../../store/userStore';
import ModalBooking from '../../components/ModalBooking';
import UserInfoCard from '../../components/UserInfoCard';
import toast from 'react-hot-toast';

interface BookingData {
  serviceId: string;
  date: string;
  time: string;
  duration: number;
  location: string;
  notes: string;
  paymentMethod: 'airtel_money' | 'moov_money' | 'cash';
}

const JobDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { services } = useJobStore();
  const { fetchUserProfile, addToFavorites, removeFromFavorites, favorites } = useUserStore();
  
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [providerProfile, setProviderProfile] = useState<any>(null);
  
  const service = services.find(s => s.id === id);
  const isFavorite = service ? favorites.includes(service.id) : false;

  useEffect(() => {
    if (service) {
      fetchUserProfile(service.providerId).then(setProviderProfile);
    }
  }, [service, fetchUserProfile]);

  if (!service) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Service non trouvé</h2>
          <p className="text-gray-600 mb-4">Ce service n'existe pas ou a été supprimé.</p>
          <button
            onClick={() => navigate('/search')}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retour à la recherche
          </button>
        </div>
      </div>
    );
  }

  const handleBookingConfirm = async (bookingData: BookingData) => {
    try {
      // Simulate booking creation
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Réservation confirmée !');
      setShowBookingModal(false);
    } catch (error) {
      toast.error('Erreur lors de la réservation');
    }
  };

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      removeFromFavorites(service.id);
      toast.success('Retiré des favoris');
    } else {
      addToFavorites(service.id);
      toast.success('Ajouté aux favoris');
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: service.title,
        text: service.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Lien copié dans le presse-papiers');
    }
  };

  const reviews = [
    {
      id: '1',
      userName: 'Marie Kaboré',
      rating: 5,
      comment: 'Excellent service ! Très professionnel et ponctuel. Je recommande vivement.',
      date: '2024-01-15',
      avatar: null
    },
    {
      id: '2',
      userName: 'Paul Ouédraogo',
      rating: 4,
      comment: 'Bon travail dans l\'ensemble. Quelques points d\'amélioration mais satisfait du résultat.',
      date: '2024-01-10',
      avatar: null
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Retour</span>
            </button>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={handleFavoriteToggle}
                className={`p-2 rounded-full transition-colors ${
                  isFavorite 
                    ? 'text-red-500 bg-red-50 hover:bg-red-100' 
                    : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                }`}
              >
                <Heart className={`w-6 h-6 ${isFavorite ? 'fill-current' : ''}`} />
              </button>
              <button
                onClick={handleShare}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
              >
                <Share2 className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Images */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              {service.images.length > 0 ? (
                <div>
                  <div className="h-80 bg-gray-200 overflow-hidden">
                    <img 
                      src={service.images[activeImageIndex]} 
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {service.images.length > 1 && (
                    <div className="p-4 flex space-x-2 overflow-x-auto">
                      {service.images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setActiveImageIndex(index)}
                          className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                            activeImageIndex === index ? 'border-blue-500' : 'border-gray-200'
                          }`}
                        >
                          <img 
                            src={image} 
                            alt={`${service.title} ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="h-80 bg-gray-100 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <Camera className="w-12 h-12 mx-auto mb-2" />
                    <p>Aucune image disponible</p>
                  </div>
                </div>
              )}
            </div>

            {/* Service Details */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{service.title}</h1>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="font-medium">{service.rating}</span>
                    <span>({service.reviewCount} avis)</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{service.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{service.availability}</span>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Description</h2>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </div>

              {/* Tags */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-3">Compétences</h3>
                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-blue-50 text-blue-700 text-sm font-medium rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Guarantees */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-green-800">Service garanti</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-green-800">Prestataire vérifié</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-green-800">Ponctualité garantie</span>
                </div>
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Avis clients ({service.reviewCount})
              </h2>
              
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-medium text-sm">
                          {review.userName.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-medium text-gray-900">{review.userName}</h4>
                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-4 h-4 ${
                                  i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                }`} 
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-600 mb-2">{review.comment}</p>
                        <p className="text-sm text-gray-500">{review.date}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Booking Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {service.price.toLocaleString()} FCFA
                </div>
                <div className="text-sm text-gray-500">par heure</div>
              </div>

              <div className="space-y-4 mb-6">
                <button
                  onClick={() => setShowBookingModal(true)}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Calendar className="w-5 h-5" />
                  <span>Réserver maintenant</span>
                </button>
                
                <button className="w-full text-blue-600 border border-blue-600 py-3 px-4 rounded-lg font-medium hover:bg-blue-50 transition-colors flex items-center justify-center space-x-2">
                  <MessageCircle className="w-5 h-5" />
                  <span>Contacter</span>
                </button>
              </div>

              <div className="text-center text-sm text-gray-500">
                <p>Réservation sans frais • Annulation gratuite</p>
              </div>
            </div>

            {/* Provider Info */}
            {providerProfile && (
              <UserInfoCard
                user={{
                  ...providerProfile,
                  joinDate: '2023'
                }}
                variant="full"
                showActions={true}
                onContact={() => toast.info('Fonctionnalité de contact bientôt disponible')}
                onViewProfile={() => navigate(`/provider/${providerProfile.id}`)}
              />
            )}
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <ModalBooking
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        service={{
          id: service.id,
          title: service.title,
          providerName: service.providerName,
          price: service.price,
          location: service.location
        }}
        onConfirm={handleBookingConfirm}
      />
    </div>
  );
};

export default JobDetails;