import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, CreditCard } from 'lucide-react';
import toast from 'react-hot-toast';

interface ModalBookingProps {
  isOpen: boolean;
  onClose: () => void;
  service: {
    id: string;
    title: string;
    providerName: string;
    price: number;
    location: string;
  };
  onConfirm: (bookingData: BookingData) => void;
}

interface BookingData {
  serviceId: string;
  date: string;
  time: string;
  duration: number;
  location: string;
  notes: string;
  paymentMethod: 'airtel_money' | 'moov_money' | 'cash';
}

const ModalBooking: React.FC<ModalBookingProps> = ({
  isOpen,
  onClose,
  service,
  onConfirm
}) => {
  const [formData, setFormData] = useState<BookingData>({
    serviceId: service.id,
    date: '',
    time: '',
    duration: 1,
    location: service.location,
    notes: '',
    paymentMethod: 'airtel_money'
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validation
      if (!formData.date || !formData.time) {
        toast.error('Veuillez sélectionner une date et une heure');
        return;
      }

      await onConfirm(formData);
      toast.success('Réservation confirmée !');
      onClose();
    } catch (error) {
      toast.error('Erreur lors de la réservation');
    } finally {
      setIsLoading(false);
    }
  };

  const totalPrice = service.price * formData.duration;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Réserver le service</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Service Info */}
        <div className="p-6 border-b border-gray-200 bg-gray-50">
          <h3 className="font-medium text-gray-900 mb-1">{service.title}</h3>
          <p className="text-sm text-gray-600 mb-2">Par {service.providerName}</p>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <MapPin className="w-4 h-4" />
            <span>{service.location}</span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-1" />
                Date
              </label>
              <input
                type="date"
                required
                min={new Date().toISOString().split('T')[0]}
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Clock className="w-4 h-4 inline mr-1" />
                Heure
              </label>
              <input
                type="time"
                required
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Durée (heures)
            </label>
            <select
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map(hour => (
                <option key={hour} value={hour}>{hour} heure{hour > 1 ? 's' : ''}</option>
              ))}
            </select>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MapPin className="w-4 h-4 inline mr-1" />
              Lieu du rendez-vous
            </label>
            <input
              type="text"
              required
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Adresse précise..."
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes additionnelles
            </label>
            <textarea
              rows={3}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Détails spécifiques, matériel requis..."
            />
          </div>

          {/* Payment Method */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              <CreditCard className="w-4 h-4 inline mr-1" />
              Mode de paiement
            </label>
            <div className="space-y-2">
              {[
                { value: 'airtel_money', label: 'Airtel Money', color: 'bg-red-50 border-red-200' },
                { value: 'moov_money', label: 'Moov Money', color: 'bg-blue-50 border-blue-200' },
                { value: 'cash', label: 'Espèces', color: 'bg-green-50 border-green-200' }
              ].map(method => (
                <label key={method.value} className={`flex items-center p-3 border-2 rounded-lg cursor-pointer transition-colors ${
                  formData.paymentMethod === method.value 
                    ? method.color + ' border-opacity-100' 
                    : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                }`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method.value}
                    checked={formData.paymentMethod === method.value}
                    onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value as any })}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="ml-3 font-medium text-gray-700">{method.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Total */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">
                {service.price} FCFA × {formData.duration} heure{formData.duration > 1 ? 's' : ''}
              </span>
              <span className="text-lg font-semibold text-blue-600">
                {totalPrice.toLocaleString()} FCFA
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-3 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Confirmation...' : 'Confirmer la réservation'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalBooking;