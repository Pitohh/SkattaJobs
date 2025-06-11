import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        {/* 404 Animation */}
        <div className="mb-8">
          <div className="text-8xl font-bold text-gray-300 mb-4">404</div>
          <div className="w-24 h-24 mx-auto bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center mb-4">
            <Search className="w-12 h-12 text-white" />
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Page non trouvée</h1>
          <p className="text-gray-600 mb-6">
            Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
          </p>

          {/* Actions */}
          <div className="space-y-3">
            <Link
              to="/home"
              className="flex items-center justify-center space-x-2 w-full bg-gradient-to-r from-blue-500 to-teal-500 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-teal-600 transition-all duration-200 transform hover:scale-[1.02]"
            >
              <Home className="w-5 h-5" />
              <span>Retour à l'accueil</span>
            </Link>
            
            <button
              onClick={() => window.history.back()}
              className="flex items-center justify-center space-x-2 w-full text-gray-600 py-3 px-4 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Page précédente</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8">
          <p className="text-sm text-gray-500">
            Besoin d'aide ? <Link to="/contact" className="text-blue-600 hover:text-blue-700">Contactez-nous</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;