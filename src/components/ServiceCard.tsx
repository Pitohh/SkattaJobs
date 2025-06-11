import React from 'react';
import { Star, MapPin, Clock, Eye } from 'lucide-react';

interface ServiceCardProps {
  id: string;
  title: string;
  providerName: string;
  rating: number;
  reviewCount: number;
  price: number;
  location: string;
  availability: string;
  description: string;
  imageUrl?: string;
  tags: string[];
  onView: (id: string) => void;
  onFavorite?: (id: string) => void;
  isFavorite?: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  id,
  title,
  providerName,
  rating,
  reviewCount,
  price,
  location,
  availability,
  description,
  imageUrl,
  tags,
  onView,
  onFavorite,
  isFavorite = false
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
      {/* Image */}
      {imageUrl && (
        <div className="h-48 bg-gray-200 overflow-hidden">
          <img 
            src={imageUrl} 
            alt={title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      <div className="p-4">
        {/* Header */}
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
            {title}
          </h3>
          {onFavorite && (
            <button
              onClick={() => onFavorite(id)}
              className={`p-1 rounded-full transition-colors ${
                isFavorite 
                  ? 'text-red-500 hover:text-red-600' 
                  : 'text-gray-400 hover:text-red-500'
              }`}
            >
              <Star className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
          )}
        </div>

        {/* Provider Info */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">
                {providerName.charAt(0).toUpperCase()}
              </span>
            </div>
            <span className="text-sm font-medium text-gray-700">{providerName}</span>
          </div>
          
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium text-gray-900">{rating}</span>
            <span className="text-sm text-gray-500">({reviewCount})</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.slice(0, 3).map((tag, index) => (
            <span 
              key={index}
              className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full"
            >
              {tag}
            </span>
          ))}
          {tags.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
              +{tags.length - 3}
            </span>
          )}
        </div>

        {/* Location & Availability */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center space-x-1">
            <MapPin className="w-4 h-4" />
            <span>{location}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{availability}</span>
          </div>
        </div>

        {/* Price & Action */}
        <div className="flex items-center justify-between">
          <div className="flex items-baseline space-x-1">
            <span className="text-2xl font-bold text-gray-900">{price}</span>
            <span className="text-sm text-gray-500">FCFA/h</span>
          </div>
          
          <button
            onClick={() => onView(id)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Eye className="w-4 h-4" />
            <span>Voir détails</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;