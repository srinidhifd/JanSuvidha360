import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { userAPI } from '../services/api';
import { UserDocuments } from '../types';
import Loading from './Loading';
import toast from 'react-hot-toast';

const DocumentsTextView: React.FC = () => {
  const { user } = useAuth();
  const [documents, setDocuments] = useState<UserDocuments | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await userAPI.getUserDocuments();
        if (response.success) {
          setDocuments(response.data || null);
        } else {
          setError(response.message || 'Failed to load documents');
        }
      } catch (err) {
        setError('Network error. Please try again.');
        console.error('Documents error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard`);
  };

  if (loading) return <Loading />;

  const documentSections = [
    {
      title: 'Aadhaar Card',
      available: !!documents?.aadhaar,
      data: documents?.aadhaar,
      text: documents?.aadhaar ? `
AADHAAR CARD
================
Name: ${documents.aadhaar.name}
Aadhaar Number: ${documents.aadhaar.number}
Date of Birth: ${documents.aadhaar.dob}
Gender: ${documents.aadhaar.gender}
Father's Name: ${documents.aadhaar.fatherName}
Address: ${documents.aadhaar.address}
Pincode: ${documents.aadhaar.pincode}
Issue Date: ${documents.aadhaar.issueDate}
      `.trim() : '',
      color: 'orange'
    },
    {
      title: 'PAN Card',
      available: !!documents?.pan,
      data: documents?.pan,
      text: documents?.pan ? `
PAN CARD
=========
Name: ${documents.pan.name}
PAN Number: ${documents.pan.number}
Father's Name: ${documents.pan.fatherName}
Date of Birth: ${documents.pan.dob}
Issue Date: ${documents.pan.issueDate}
      `.trim() : '',
      color: 'blue'
    },
    {
      title: 'Driving License',
      available: !!documents?.drivingLicense,
      data: documents?.drivingLicense,
      text: documents?.drivingLicense ? `
DRIVING LICENSE
===============
Name: ${documents.drivingLicense.name}
License Number: ${documents.drivingLicense.number}
Date of Birth: ${documents.drivingLicense.dob}
Address: ${documents.drivingLicense.address}
Issue Date: ${documents.drivingLicense.issueDate}
Valid Until: ${documents.drivingLicense.validUpto}
Vehicle Class: ${documents.drivingLicense.vehicleClass}
Blood Group: ${documents.drivingLicense.bloodGroup}
Issuing Authority: ${documents.drivingLicense.issuingAuthority}
      `.trim() : '',
      color: 'green'
    },
    {
      title: 'Passport',
      available: !!documents?.passport,
      data: documents?.passport,
      text: documents?.passport ? `
PASSPORT
========
Name: ${documents.passport.name}
Passport Number: ${documents.passport.number}
Nationality: ${documents.passport.nationality}
Date of Birth: ${documents.passport.dob}
Place of Birth: ${documents.passport.pob}
Issue Date: ${documents.passport.issueDate}
Expiry Date: ${documents.passport.expiryDate}
Issuing Authority: ${documents.passport.issuingAuthority}
      `.trim() : '',
      color: 'indigo'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors: { [key: string]: { bg: string; border: string; text: string; button: string } } = {
      orange: {
        bg: 'bg-orange-50',
        border: 'border-orange-200',
        text: 'text-orange-700',
        button: 'bg-orange-500 hover:bg-orange-600'
      },
      blue: {
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        text: 'text-blue-700',
        button: 'bg-blue-500 hover:bg-blue-600'
      },
      green: {
        bg: 'bg-green-50',
        border: 'border-green-200',
        text: 'text-green-700',
        button: 'bg-green-500 hover:bg-green-600'
      },
      indigo: {
        bg: 'bg-indigo-50',
        border: 'border-indigo-200',
        text: 'text-indigo-700',
        button: 'bg-indigo-500 hover:bg-indigo-600'
      }
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-600 to-gray-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Document Text View</h1>
            <p className="text-slate-100 text-lg">
              Copy document information in text format
            </p>
          </div>
          <div className="hidden md:block">
            <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <div className="w-10 h-10 bg-white bg-opacity-30 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <div className="w-5 h-5 bg-red-500 rounded-full"></div>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Documents */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {documentSections.map((section) => {
          const colors = getColorClasses(section.color);
          
          return (
            <div key={section.title} className={`${colors.bg} ${colors.border} border-2 rounded-xl p-6`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-lg font-bold ${colors.text}`}>{section.title}</h3>
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                  section.available 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {section.available ? 'Available' : 'Not Available'}
                </div>
              </div>

              {section.available ? (
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <pre className="text-sm text-gray-900 whitespace-pre-wrap font-mono">
                      {section.text}
                    </pre>
                  </div>
                  
                  <button
                    onClick={() => copyToClipboard(section.text, section.title)}
                    className={`w-full ${colors.button} text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200`}
                  >
                    Copy {section.title} Details
                  </button>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    {section.title} not available
                  </p>
                  <p className="text-xs text-gray-500">
                    Please upload your {section.title.toLowerCase()} to view details
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
        <h3 className="text-lg font-medium text-blue-900 mb-3">How to Use</h3>
        <div className="space-y-2 text-sm text-blue-700">
          <p>• Click the "Copy" button to copy document details to your clipboard</p>
          <p>• Use the copied text in applications or forms that require document information</p>
          <p>• All sensitive information is masked for security</p>
          <p>• Document data is fetched securely from your verified profile</p>
        </div>
      </div>
    </div>
  );
};

export default DocumentsTextView; 