import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Briefcase, Clock, Users, Landmark, Globe, Building2 } from 'lucide-react';

const ConsultantCard = ({ consultant }) => {
  const locationString = [
    consultant.address,
    consultant.city,
    consultant.state,
    consultant.country
  ].filter(Boolean).join(', ');

  return (
    <Link to={`/consultant/${consultant.id}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6 h-full">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {consultant.name}
            </h3>
            <div className="flex items-center text-gray-600 mb-2">
              <Briefcase className="h-4 w-4 mr-2" />
              <span className="text-sm">{consultant.profession}</span>
            </div>
            {locationString && (
              <div className="flex items-center text-gray-600 mb-2">
                <MapPin className="h-4 w-4 mr-2" />
                <span className="text-sm">{locationString}</span>
              </div>
            )}
            <div className="flex items-center text-gray-600 mb-3">
              <Clock className="h-4 w-4 mr-2" />
              <span className="text-sm">{consultant.experience_years} years experience</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <h4 className="font-medium text-gray-900 mb-1">Expertise</h4>
            <p className="text-sm text-gray-600 line-clamp-2">
              {consultant.fields_of_expertise}
            </p>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-1 flex items-center">
              <Users className="h-4 w-4 mr-1" />
              Clients Served
            </h4>
            <p className="text-sm text-gray-600 line-clamp-2">
              {consultant.clients_served}
            </p>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100">
          <span className="inline-block bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded-full">
            View Profile
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ConsultantCard; 