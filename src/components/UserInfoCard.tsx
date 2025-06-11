import React from 'react';
import { User, MapPin, Star, Calendar, Briefcase, Mail, Phone } from 'lucide-react';

interface UserInfoCardProps {
  user: {
    id: string;
    name: string;
    email: string;
    phone?: string;
    role: 'client' | 'prestataire' | 'admin';
    avatar?: string;
    location?: string;
    joinDate: string;
    rating?: number;
    reviewCount?: number;
    completedJobs?: number;
    specialties?: string[];
    bio?: string;
    isOnline?: boolean;
  };
  variant?: 'full' | 'compact';
  showActions?: boolean;
  onContact?: () => void;
  onViewProfile?: () => void;
}

const UserInfoCard: React.FC<UserInfoCardProps> = ({
  user,
  variant = 'full',
  showActions = false,
  onContact,
  onViewProfile
}) => {
  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'client':
        return { label: 'Client', color: 'bg-blue-100 text-blue-800' };
      case 'prestataire':
        return { label: 'Prestataire', color: 'bg-green-100 text-green-800' };
      case 'admin':
        return { label: 'Administrateur', color: 'bg-purple-100 text-purple-800' };
      default:
        return { label: 'Utilisateur', color: 'bg-gray-100 text-gray-800' };
    }
  };

  const roleInfo = getRoleLabel(user.role);

  if (variant === 'compact') {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-sm transition-shadow">
        <div className="flex items-center space-x-3">
          <div className="relative">
            {user.avatar ? (
              <img 
                src={user.avatar}
                alt={user.name}
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
            )}
            {user.isOnline && (
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="text-sm font-medium text-gray-900 truncate">{user.name}</h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${roleInfo.color}`}>
                {roleInfo.label}
              </span>
            </div>
            
            {user.rating && (
              <div className="flex items-center space-x-1 mb-1">
                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                <span className="text-xs text-gray-600">{user.rating} ({user.reviewCount})</span>
              </div>
            )}
            
            {user.location && (
              <div className="flex items-center space-x-1">
                <MapPin className="w-3 h-3 text-gray-400" />
                <span className="text-xs text-gray-500 truncate">{user.location}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-teal-500 h-20"></div>
      
      <div className="px-6 pb-6">
        {/* Avatar & Basic Info */}
        <div className="flex items-start space-x-4 -mt-10 mb-4">
          <div className="relative">
            {user.avatar ? (
              <img 
                src={user.avatar}
                alt={user.name}
                className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-sm"
              />
            ) : (
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center border-4 border-white shadow-sm">
                <User className="w-10 h-10 text-white" />
              </div>
            )}
            {user.isOnline && (
              <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 border-3 border-white rounded-full"></div>
            )}
          </div>
          
          <div className="flex-1 pt-8">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-semibold text-gray-900">{user.name}</h2>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${roleInfo.color}`}>
                {roleInfo.label}
              </span>
            </div>
            
            {user.rating && (
              <div className="flex items-center space-x-2 mb-2">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium text-gray-900">{user.rating}</span>
                </div>
                <span className="text-sm text-gray-500">({user.reviewCount} avis)</span>
                {user.completedJobs && (
                  <>
                    <span className="text-gray-300">•</span>
                    <span className="text-sm text-gray-500">{user.completedJobs} missions</span>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Bio */}
        {user.bio && (
          <p className="text-sm text-gray-600 mb-4">{user.bio}</p>
        )}

        {/* Specialties */}
        {user.specialties && user.specialties.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Spécialités</h4>
            <div className="flex flex-wrap gap-2">
              {user.specialties.map((specialty, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full"
                >
                  {specialty}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Contact Info */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Mail className="w-4 h-4 text-gray-400" />
            <span>{user.email}</span>
          </div>
          {user.phone && (
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Phone className="w-4 h-4 text-gray-400" />
              <span>{user.phone}</span>
            </div>
          )}
          {user.location && (
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4 text-gray-400" />
              <span>{user.location}</span>
            </div>
          )}
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span>Membre depuis {user.joinDate}</span>
          </div>
        </div>

        {/* Actions */}
        {showActions && (
          <div className="flex space-x-3">
            {onContact && (
              <button
                onClick={onContact}
                className="flex-1 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Contacter
              </button>
            )}
            {onViewProfile && (
              <button
                onClick={onViewProfile}
                className="flex-1 px-4 py-2 text-blue-600 bg-blue-50 text-sm font-medium rounded-lg hover:bg-blue-100 transition-colors"
              >
                Voir profil
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserInfoCard;