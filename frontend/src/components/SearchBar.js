import React, { useRef, useEffect, useState } from 'react';
import { Search, MapPin, Briefcase, Target, Globe, Landmark, Building2 } from 'lucide-react';
import SearchSuggestions from './SearchSuggestions';
import { consultantAPI } from '../services/api';
import Select from 'react-select';

const professionOptions = [
  '',
  'Business Strategy Consultant',
  'Technology Consultant',
  'Marketing Consultant',
  'Financial Consultant',
  'HR & Organizational Development Consultant',
  'Operations Consultant',
  'Sales Consultant',
  'Legal Consultant',
  'Healthcare Consultant',
  'Education Consultant',
];

const expertiseOptions = [
  '',
  'Strategic planning',
  'Market analysis',
  'Business transformation',
  'Digital strategy',
  'Software architecture',
  'Cloud migration',
  'DevOps',
  'AI/ML implementation',
  'Digital marketing',
  'Brand strategy',
  'Social media',
  'Content marketing',
  'Financial planning',
  'Investment strategy',
  'Risk management',
  'M&A advisory',
  'Talent acquisition',
  'Employee engagement',
  'Leadership development',
  'Change management',
];

const defaultFilters = {
  address: '',
  country: '',
  state: '',
  city: '',
  profession: '',
  expertise: ''
};

const SearchBar = ({ filters, setFilters, searchTerm, setSearchTerm, onSearch, onFilterChange }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [countryOptions, setCountryOptions] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const searchRef = useRef(null);

  // Fetch countries on mount
  useEffect(() => {
    consultantAPI.getCountries().then(countries => {
      setCountryOptions(countries.map(c => ({ value: c, label: c })));
    });
  }, []);

  // Fetch states when country changes
  useEffect(() => {
    if (filters.country) {
      consultantAPI.getStates(filters.country).then(states => {
        setStateOptions(states.map(s => ({ value: s, label: s })));
      });
    } else {
      setStateOptions([]);
    }
    setFilters(f => ({ ...f, state: '', city: '' }));
  }, [filters.country, setFilters]);

  // Fetch cities when state or country changes
  useEffect(() => {
    if (filters.country && filters.state) {
      consultantAPI.getCities(filters.country, filters.state).then(cities => {
        setCityOptions(cities.map(c => ({ value: c, label: c })));
      });
    } else {
      setCityOptions([]);
    }
    setFilters(f => ({ ...f, city: '' }));
  }, [filters.country, filters.state, setFilters]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setShowSuggestions(false);
    onSearch(searchTerm, filters);
  };

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    if (key === 'profession' || key === 'expertise') {
      onSearch(searchTerm, newFilters);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    let matchedProfession = professionOptions.find(
      (option) => option && suggestion.toLowerCase().includes(option.toLowerCase())
    );
    let matchedExpertise = expertiseOptions.find(
      (option) => option && suggestion.toLowerCase().includes(option.toLowerCase())
    );
    const newFilters = {
      ...filters,
      profession: matchedProfession || filters.profession,
      expertise: matchedExpertise || filters.expertise,
    };
    setSearchTerm(suggestion);
    setFilters(newFilters);
    setShowSuggestions(false);
    onSearch(suggestion, newFilters);
  };

  const handleReset = () => {
    setSearchTerm('');
    setFilters(defaultFilters);
    onSearch('', defaultFilters);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <form onSubmit={handleSearch} className="space-y-4">
        {/* Main Search */}
        <div className="relative" ref={searchRef}>
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search consultants by name, profession, or expertise..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setShowSuggestions(e.target.value.length >= 5);
            }}
            onFocus={() => setShowSuggestions(searchTerm.length >= 5)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          <SearchSuggestions
            searchTerm={searchTerm}
            onSuggestionClick={handleSuggestionClick}
            visible={showSuggestions}
          />
        </div>

        {/* Location Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Landmark className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Address"
              value={filters.address}
              onChange={(e) => setFilters({ ...filters, address: e.target.value })}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          {/* Country Dropdown */}
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Select
              placeholder="Country"
              value={filters.country ? { value: filters.country, label: filters.country } : null}
              onChange={option => setFilters(f => ({ ...f, country: option ? option.value : '' }))}
              options={countryOptions}
              isClearable
              isSearchable
              classNamePrefix="react-select"
              styles={{
                control: (base) => ({ ...base, paddingLeft: '2.5rem', minHeight: '42px' })
              }}
            />
          </div>
          {/* State Dropdown */}
          <div className="relative">
            <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Select
              placeholder="State"
              value={filters.state ? { value: filters.state, label: filters.state } : null}
              onChange={option => setFilters(f => ({ ...f, state: option ? option.value : '' }))}
              options={stateOptions}
              isClearable
              isSearchable
              isDisabled={!filters.country}
              classNamePrefix="react-select"
              styles={{
                control: (base) => ({ ...base, paddingLeft: '2.5rem', minHeight: '42px' })
              }}
            />
          </div>
          {/* City Dropdown */}
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Select
              placeholder="City"
              value={filters.city ? { value: filters.city, label: filters.city } : null}
              onChange={option => setFilters(f => ({ ...f, city: option ? option.value : '' }))}
              options={cityOptions}
              isClearable
              isSearchable
              isDisabled={!filters.state}
              classNamePrefix="react-select"
              styles={{
                control: (base) => ({ ...base, paddingLeft: '2.5rem', minHeight: '42px' })
              }}
            />
          </div>
        </div>

        {/* Profession/Expertise Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <select
              value={filters.profession}
              onChange={(e) => handleFilterChange('profession', e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
            >
              {professionOptions.map((option) => (
                <option key={option} value={option}>{option ? option : 'All Professions'}</option>
              ))}
            </select>
          </div>
          <div className="relative">
            <Target className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <select
              value={filters.expertise}
              onChange={(e) => handleFilterChange('expertise', e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
            >
              {expertiseOptions.map((option) => (
                <option key={option} value={option}>{option ? option : 'All Expertise'}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 bg-primary-600 text-white py-3 px-6 rounded-lg hover:bg-primary-700 transition-colors font-medium"
          >
            Search Consultants
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors font-medium"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar; 