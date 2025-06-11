import React from 'react';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastNotificationProps {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
  onClose: (id: string) => void;
}

const ToastNotification: React.FC<ToastNotificationProps> = ({
  id,
  type,
  title,
  message,
  onClose
}) => {
  const getToastStyles = () => {
    switch (type) {
      case 'success':
        return {
          containerClass: 'bg-green-50 border-green-200 text-green-800',
          iconClass: 'text-green-500',
          Icon: CheckCircle
        };
      case 'error':
        return {
          containerClass: 'bg-red-50 border-red-200 text-red-800',
          iconClass: 'text-red-500',
          Icon: XCircle
        };
      case 'warning':
        return {
          containerClass: 'bg-yellow-50 border-yellow-200 text-yellow-800',
          iconClass: 'text-yellow-500',
          Icon: AlertCircle
        };
      case 'info':
        return {
          containerClass: 'bg-blue-50 border-blue-200 text-blue-800',
          iconClass: 'text-blue-500',
          Icon: Info
        };
      default:
        return {
          containerClass: 'bg-gray-50 border-gray-200 text-gray-800',
          iconClass: 'text-gray-500',
          Icon: Info
        };
    }
  };

  const { containerClass, iconClass, Icon } = getToastStyles();

  return (
    <div className={`max-w-sm w-full border rounded-lg shadow-lg p-4 ${containerClass} animate-in slide-in-from-right-full`}>
      <div className="flex items-start space-x-3">
        <Icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${iconClass}`} />
        
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium">{title}</p>
          {message && (
            <p className="text-sm opacity-90 mt-1">{message}</p>
          )}
        </div>
        
        <button
          onClick={() => onClose(id)}
          className="ml-4 inline-flex text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-lg p-1"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// Toast Container Component
interface ToastContainerProps {
  toasts: Array<{
    id: string;
    type: ToastType;
    title: string;
    message?: string;
    duration?: number;
  }>;
  onRemove: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onRemove }) => {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-4">
      {toasts.map((toast) => (
        <ToastNotification
          key={toast.id}
          {...toast}
          onClose={onRemove}
        />
      ))}
    </div>
  );
};

export default ToastNotification;