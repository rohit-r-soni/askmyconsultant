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