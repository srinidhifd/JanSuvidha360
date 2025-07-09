import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { schemesAPI } from '../services/api';
import { Scheme } from '../types';
import Loading from '../components/Loading';
import toast from 'react-hot-toast';

const SchemeDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [scheme, setScheme] = useState<Scheme | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchScheme = async () => {
      try {
        const response = await schemesAPI.getAllSchemes();
        if (response.success) {
          const foundScheme = response.data?.find(s => s.id === id);
          if (foundScheme) {
            setScheme(foundScheme);
          } else {
            setError('Scheme not found');
          }
        } else {
          setError(response.message || 'Failed to load scheme');
        }
      } catch (err) {
        setError('Network error. Please try again.');
        console.error('Scheme details error:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchScheme();
    }
  }, [id]);

  if (loading) return <Loading />;
  if (error) return <div className="text-red-600">{error}</div>;
  if (!scheme) return <div className="text-gray-600">Scheme not found</div>;

  const handleApply = () => {
    if (scheme.officialWebsite) {
      window.open(scheme.officialWebsite, '_blank');
    } else {
      toast.success('Application process information will be available soon');
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'agriculture': 'bg-green-100 text-green-800',
      'education': 'bg-blue-100 text-blue-800',
      'healthcare': 'bg-red-100 text-red-800',
      'housing': 'bg-yellow-100 text-yellow-800',
      'employment': 'bg-purple-100 text-purple-800',
      'social-security': 'bg-indigo-100 text-indigo-800',
      'business': 'bg-orange-100 text-orange-800',
      'women': 'bg-pink-100 text-pink-800',
      'senior-citizen': 'bg-gray-100 text-gray-800',
      'youth': 'bg-cyan-100 text-cyan-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      'active': 'bg-green-100 text-green-800',
      'inactive': 'bg-gray-100 text-gray-800',
      'suspended': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-4">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(scheme.category)} bg-white`}>
                {scheme.category}
              </span>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(scheme.status)} bg-white`}>
                {scheme.status}
              </span>
            </div>
            <h1 className="text-3xl font-bold mb-2">{scheme.name}</h1>
            <p className="text-blue-100 text-lg">{scheme.description}</p>
          </div>
          <div className="hidden md:block ml-8">
            <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <div className="w-10 h-10 bg-white bg-opacity-30 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Info */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="text-center">
            <p className="text-sm font-medium text-gray-600 mb-2">Application Fee</p>
            <p className="text-2xl font-bold text-green-600">₹{scheme.applicationFee}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="text-center">
            <p className="text-sm font-medium text-gray-600 mb-2">Processing Time</p>
            <p className="text-2xl font-bold text-blue-600">{scheme.processingTime}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="text-center">
            <p className="text-sm font-medium text-gray-600 mb-2">Department</p>
            <p className="text-lg font-semibold text-gray-900 text-center">{scheme.department}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="text-center">
            <p className="text-sm font-medium text-gray-600 mb-2">Launch Date</p>
            <p className="text-lg font-semibold text-gray-900">{scheme.launchDate}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Main Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Benefits */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Benefits</h2>
            <div className="space-y-2">
              {scheme.benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  </div>
                  <p className="text-gray-700">{benefit}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Application Process */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Application Process</h2>
            <div className="space-y-4">
              {scheme.applicationProcess.map((step, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-blue-600">{index + 1}</span>
                  </div>
                  <p className="text-gray-700 pt-1">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Required Documents */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Required Documents</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {scheme.documentsRequired.map((doc, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-4 h-4 bg-blue-500 rounded-full flex-shrink-0"></div>
                  <span className="text-gray-700">{doc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* Apply Button */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <button
              onClick={handleApply}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-lg font-bold text-lg transition-colors duration-200 mb-4"
            >
              Apply Now
            </button>
            <p className="text-xs text-gray-500 text-center">
              {scheme.officialWebsite ? 'Redirects to official website' : 'Information will be available soon'}
            </p>
          </div>

          {/* Eligibility Criteria */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Eligibility Criteria</h3>
            <div className="space-y-3">
              {scheme.eligibilityCriteria.minAge && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Min Age:</span>
                  <span className="font-medium">{scheme.eligibilityCriteria.minAge} years</span>
                </div>
              )}
              {scheme.eligibilityCriteria.maxAge && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Max Age:</span>
                  <span className="font-medium">{scheme.eligibilityCriteria.maxAge} years</span>
                </div>
              )}
              {scheme.eligibilityCriteria.gender && scheme.eligibilityCriteria.gender !== 'all' && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Gender:</span>
                  <span className="font-medium">{scheme.eligibilityCriteria.gender}</span>
                </div>
              )}
              {scheme.eligibilityCriteria.maxIncome && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Max Income:</span>
                  <span className="font-medium">₹{scheme.eligibilityCriteria.maxIncome.toLocaleString()}</span>
                </div>
              )}
              {scheme.eligibilityCriteria.customCriteria && scheme.eligibilityCriteria.customCriteria.length > 0 && (
                <div>
                  <span className="text-gray-600 block mb-2">Other Criteria:</span>
                  <div className="space-y-1">
                    {scheme.eligibilityCriteria.customCriteria.map((criteria, index) => (
                      <div key={index} className="text-sm bg-gray-50 p-2 rounded">
                        {criteria}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Contact Information</h3>
            <div className="space-y-3">
              {scheme.helplineNumber && (
                <div>
                  <p className="text-sm text-gray-600">Helpline</p>
                  <p className="font-medium text-blue-600">{scheme.helplineNumber}</p>
                </div>
              )}
              {scheme.officialWebsite && (
                <div>
                  <p className="text-sm text-gray-600">Official Website</p>
                  <a
                    href={scheme.officialWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-blue-600 hover:text-blue-700 break-all"
                  >
                    {scheme.officialWebsite}
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Tags */}
          {scheme.tags && scheme.tags.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {scheme.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Back to Schemes */}
      <div className="text-center">
        <Link
          to="/schemes"
          className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 font-medium transition-colors duration-200"
        >
          ← Back to All Schemes
        </Link>
      </div>
    </div>
  );
};

export default SchemeDetails; 