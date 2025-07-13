import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { consultantAPI } from '../services/api';
import { 
  MapPin, 
  Briefcase, 
  Clock, 
  Users, 
  GraduationCap, 
  FolderOpen, 
  Star, 
  Globe,
  ArrowLeft,
  Target
} from 'lucide-react';
import { Loader2 } from 'lucide-react';

const ConsultantProfile = () => {
  const { id } = useParams();
  const [consultant, setConsultant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadConsultant = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await consultantAPI.getConsultant(id);
      setConsultant(data);
    } catch (err) {
      setError('Failed to load consultant profile. Please try again.');
      console.error('Error loading consultant:', err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadConsultant();
  }, [loadConsultant]);

  const locationString = [
    consultant?.address,
    consultant?.city,
    consultant?.state,
    consultant?.country
  ].filter(Boolean).join(', ');

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin text-primary-600" />
          <span className="text-gray-600">Loading profile...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-800">{error}</p>
        <Link to="/" className="text-primary-600 hover:text-primary-700 mt-2 inline-block">
          ← Back to search
        </Link>
      </div>
    );
  }

  if (!consultant) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Consultant not found</h3>
        <Link to="/" className="text-primary-600 hover:text-primary-700">
          ← Back to search
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Link 
        to="/" 
        className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to search
      </Link>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-8 text-white">
          <h1 className="text-3xl font-bold mb-2">{consultant.name}</h1>
          <div className="flex flex-wrap items-center gap-4 text-primary-100">
            <div className="flex items-center">
              <Briefcase className="h-4 w-4 mr-2" />
              <span>{consultant.profession}</span>
            </div>
            {locationString && (
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                <span>{locationString}</span>
              </div>
            )}
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              <span>{consultant.experience_years} years experience</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <Target className="h-5 w-5 mr-2 text-primary-600" />
                  Fields of Expertise
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {consultant.fields_of_expertise}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <Users className="h-5 w-5 mr-2 text-primary-600" />
                  Clients Served
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {consultant.clients_served}
                </p>
              </div>

              {consultant.education && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <GraduationCap className="h-5 w-5 mr-2 text-primary-600" />
                    Education
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {consultant.education}
                  </p>
                </div>
              )}

              {consultant.projects_completed && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <FolderOpen className="h-5 w-5 mr-2 text-primary-600" />
                    Projects Completed
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {consultant.projects_completed}
                  </p>
                </div>
              )}
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {consultant.references_testimonials && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Star className="h-5 w-5 mr-2 text-primary-600" />
                    References & Testimonials
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-700 leading-relaxed italic">
                      "{consultant.references_testimonials}"
                    </p>
                  </div>
                </div>
              )}

              {consultant.website_social_links && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Globe className="h-5 w-5 mr-2 text-primary-600" />
                    Website & Social Media
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {consultant.website_social_links}
                  </p>
                </div>
              )}

              <div className="bg-primary-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-primary-900 mb-2">
                  Contact Information
                </h3>
                <p className="text-primary-700 text-sm">
                  To get in touch with {consultant.name}, please contact us through our platform.
                  We'll help you connect with the right consultant for your needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultantProfile; 