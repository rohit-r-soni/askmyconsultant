import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Users } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2" style={{ textDecoration: 'none' }}>
            <Users className="h-8 w-8 text-primary-600" />
            <span className="text-xl font-bold text-gray-900">AskMyConsultant</span>
          </Link>
          
          <nav className="flex items-center space-x-6">
            <Link 
              to="/" 
              className="text-gray-600 hover:text-primary-600 transition-colors"
            >
              Find Consultants
            </Link>

            <button
              onClick={() => {
                const formUrl = process.env.REACT_APP_REGISTRATION_FORM_URL || 'https://forms.google.com/dummy-consultant-registration-form';
                window.open(formUrl, '_blank');
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center space-x-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span>Register</span>
            </button>
            <div className="flex items-center space-x-2 text-gray-500">
              <Search className="h-4 w-4" />
              <span className="text-sm">Discover the perfect consultant</span>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header; 