import React, { useState, useEffect, useCallback } from 'react';
import SearchBar from '../components/SearchBar';
import ConsultantCard from '../components/ConsultantCard';
import { consultantAPI } from '../services/api';
import { Loader2 } from 'lucide-react';

const defaultFilters = {
  location: '',
  profession: '',
  expertise: ''
};

const HomePage = () => {
  const [consultants, setConsultants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState(defaultFilters);
  const [searchTerm, setSearchTerm] = useState('');

  const loadConsultants = useCallback(async (search = '', filterObj = filters) => {
    try {
      setLoading(true);
      setError(null);
      let results;
      if (search) {
        results = await consultantAPI.searchConsultants(search);
      } else {
        results = await consultantAPI.getConsultants(filterObj);
      }
      setConsultants(results);
    } catch (err) {
      setError('Failed to load consultants. Please try again.');
      console.error('Error loading consultants:', err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    loadConsultants('', filters);
    // eslint-disable-next-line
  }, []);

  const handleSearch = (search, filterObj) => {
    setSearchTerm(search);
    setFilters(filterObj);
    loadConsultants(search, filterObj);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    loadConsultants('', newFilters);
  };

  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Find Your Perfect Consultant
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
          Discover experienced consultants across various industries and locations. 
          Filter by expertise, location, and profession to find the right match for your needs.
        </p>
        <div className="flex justify-center">
          <button
            onClick={() => {
              const formUrl = process.env.REACT_APP_REGISTRATION_FORM_URL || 'https://forms.google.com/dummy-consultant-registration-form';
              window.open(formUrl, '_blank');
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Register as Consultant</span>
          </button>
        </div>
      </div>
      <SearchBar
        filters={filters}
        setFilters={setFilters}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
      />
      {loading ? (
        <div className="flex items-center justify-center min-h-64">
          <div className="flex items-center space-x-2">
            <Loader2 className="h-6 w-6 animate-spin text-primary-600" />
            <span className="text-gray-600">Loading consultants...</span>
          </div>
        </div>
      ) : (
        <>
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-800">{error}</p>
            </div>
          )}
          {consultants.length === 0 && !loading && !error && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No consultants found</h3>
              <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
            </div>
          )}
          {consultants.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-900">
                  Available Consultants ({consultants.length})
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {consultants.map((consultant) => (
                  <ConsultantCard key={consultant.id} consultant={consultant} />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default HomePage; 