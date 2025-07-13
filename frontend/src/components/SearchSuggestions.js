import React from 'react';

const SearchSuggestions = ({ searchTerm, onSuggestionClick, visible }) => {
  if (!visible || searchTerm.length < 5) return null;

  // Generate suggestions based on search term
  const suggestions = [
    'Business Strategy',
    'Technology Consulting',
    'Marketing Strategy',
    'Financial Planning',
    'Digital Transformation',
    'Cloud Migration',
    'AI/ML Implementation',
    'Leadership Development',
    'Change Management',
    'Market Analysis',
    'Strategic Planning',
    'Operations Consulting',
    'Sales Strategy',
    'Brand Development',
    'Employee Engagement'
  ].filter(suggestion => 
    suggestion.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice(0, 5);

  if (suggestions.length === 0) return null;

  return (
    <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-lg z-10 mt-1">
      {suggestions.map((suggestion, index) => (
        <button
          key={index}
          onClick={() => onSuggestionClick(suggestion)}
          className="w-full text-left px-4 py-2 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none first:rounded-t-lg last:rounded-b-lg"
        >
          {suggestion}
        </button>
      ))}
    </div>
  );
};

export default SearchSuggestions; 