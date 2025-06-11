import React from 'react';
import { MapPin, Calendar, Clock, Building, Users } from 'lucide-react';

interface StageOfferCardProps {
  id: string;
  title: string;
  company: string;
  location: string;
  duration: string;
  startDate: string;
  type: 'stage' | 'job' | 'vacation_job';
  salary?: number;
  description: string;
  requirements: string[];
  companyLogo?: string;
  isUrgent?: boolean;
  applicants?: number;
  onApply: (id: string) => void;
}

const StageOfferCard: React.FC<StageOfferCardProps> = ({
  id,
  title,
  company,
  location,
  duration,
  startDate,
  type,
  salary,
  description,
  requirements,
  companyLogo,
  isUrgent = false,
  applicants = 0,
  onApply
}) => {
  const getTypeLabel = () => {
    switch (type) {
      case 'stage':
        return { label: 'Stage', color: 'bg-blue-100 text-blue-800' };
      case 'job':
        return { label: 'Emploi', color: 'bg-green-100 text-green-800' };
      case 'vacation_job':
        return { label: 'Job Vacances', color: 'bg-orange-100 text-orange-800' };
      default:
        return { label: 'Opportunité', color: 'bg-gray-100 text-gray-800' };
    }
  };

  const typeInfo = getTypeLabel();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-start space-x-3">
            {companyLogo ? (
              <img 
                src={companyLogo} 
                alt={company}
                className="w-12 h-12 rounded-lg object-cover"
              />
            ) : (
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-teal-500 rounded-lg flex items-center justify-center">
                <Building className="w-6 h-6 text-white" />
              </div>
            )}
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {title}
              </h3>
              <p className="text-sm text-gray-600 font-medium">{company}</p>
            </div>
          </div>
          
          <div className="flex flex-col items-end space-y-2">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${typeInfo.color}`}>
              {typeInfo.label}
            </span>
            {isUrgent && (
              <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                Urgent
              </span>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-3">
          {description}
        </p>

        {/* Requirements */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Prérequis :</h4>
          <div className="flex flex-wrap gap-2">
            {requirements.slice(0, 4).map((req, index) => (
              <span 
                key={index}
                className="px-2 py-1 bg-gray-50 text-gray-700 text-xs rounded-md border"
              >
                {req}
              </span>
            ))}
            {requirements.length > 4 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                +{requirements.length - 4} autres
              </span>
            )}
          </div>
        </div>

        {/* Details */}
        <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-gray-400" />
            <span>{location}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-gray-400" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span>{startDate}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-gray-400" />
            <span>{applicants} candidats</span>
          </div>
        </div>

        {/* Salary & Action */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div>
            {salary ? (
              <div className="flex items-baseline space-x-1">
                <span className="text-lg font-semibold text-gray-900">{salary.toLocaleString()}</span>
                <span className="text-sm text-gray-500">FCFA/mois</span>
              </div>
            ) : (
              <span className="text-sm text-gray-500">Rémunération à négocier</span>
            )}
          </div>
          
          <button
            onClick={() => onApply(id)}
            className="px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Postuler
          </button>
        </div>
      </div>
    </div>
  );
};

export default StageOfferCard;