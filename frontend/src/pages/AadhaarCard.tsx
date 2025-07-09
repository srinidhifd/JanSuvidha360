import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userAPI } from '../services/api';
import { AadhaarDocument } from '../types';
import { toast } from 'react-hot-toast';

const AadhaarCard: React.FC = () => {
  const navigate = useNavigate();
  const [aadhaarData, setAadhaarData] = useState<AadhaarDocument | null>(null);
  const [loading, setLoading] = useState(true);
  const [showFullNumber, setShowFullNumber] = useState(false);

  useEffect(() => {
    fetchAadhaarData();
  }, []);

  const fetchAadhaarData = async () => {
    try {
      const response = await userAPI.getDocument('aadhaar');
      if (response.success && response.data) {
        setAadhaarData(response.data);
      }
    } catch (error: any) {
      console.error('Failed to fetch Aadhaar data:', error);
      toast.error('Failed to load Aadhaar card');
    } finally {
      setLoading(false);
    }
  };

  const formatAadhaarNumber = (number: string) => {
    if (showFullNumber) {
      return number;
    }
    return `**** **** ${number.slice(-4)}`;
  };

  const downloadCard = () => {
    toast.success('Download feature will be available soon');
  };

  const shareCard = () => {
    toast.success('Share feature will be available soon');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Aadhaar card...</p>
        </div>
      </div>
    );
  }

  if (!aadhaarData) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg mb-4">Aadhaar card not found</p>
        <button
          onClick={() => navigate('/documents')}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Back to Documents
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/documents')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Aadhaar Card</h1>
            <p className="text-gray-600">Unique Identification Authority of India</p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => setShowFullNumber(!showFullNumber)}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            {showFullNumber ? 'Hide' : 'Show'} Number
          </button>
          <button
            onClick={shareCard}
            className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Share
          </button>
          <button
            onClick={downloadCard}
            className="bg-green-100 hover:bg-green-200 text-green-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Download
          </button>
        </div>
      </div>

      {/* Aadhaar Card */}
      <div className="max-w-4xl mx-auto">
        {/* Front Side */}
        <div className="bg-white rounded-lg shadow-lg border overflow-hidden mb-6">
          {/* Card Header */}
          <div className="bg-gradient-to-r from-orange-500 to-red-500 p-4">
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <span className="text-orange-500 font-bold text-lg">🇮🇳</span>
                </div>
                <div>
                  <h2 className="text-xl font-bold">Aadhaar</h2>
                  <p className="text-orange-100 text-sm">Unique Identification Authority of India</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-orange-100 text-xs">भारत सरकार</div>
                <div className="text-orange-100 text-xs">GOVERNMENT OF INDIA</div>
              </div>
            </div>
          </div>

          {/* Card Body */}
          <div className="p-6">
            <div className="flex gap-6">
              {/* Photo Section */}
              <div className="flex-shrink-0">
                <div className="w-24 h-32 bg-gray-200 rounded border-2 border-gray-300 flex items-center justify-center">
                  <div className="text-gray-500 text-center">
                    <svg className="w-8 h-8 mx-auto mb-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                    </svg>
                    <div className="text-xs">Photo</div>
                  </div>
                </div>
              </div>

              {/* Details Section */}
              <div className="flex-1 space-y-3">
                {/* Name */}
                <div>
                  <div className="text-2xl font-bold text-gray-900">{aadhaarData.name}</div>
                  <div className="text-gray-600 text-sm">Name / नाम</div>
                </div>

                {/* Date of Birth */}
                <div>
                  <div className="text-lg font-semibold text-gray-900">{aadhaarData.dob}</div>
                  <div className="text-gray-600 text-sm">Date of Birth / जन्म तिथि</div>
                </div>

                {/* Gender */}
                <div>
                  <div className="text-lg font-semibold text-gray-900">{aadhaarData.gender}</div>
                  <div className="text-gray-600 text-sm">Gender / लिंग</div>
                </div>

                {/* Aadhaar Number */}
                <div className="pt-2">
                  <div className="text-2xl font-mono font-bold text-gray-900 tracking-widest">
                    {formatAadhaarNumber(aadhaarData.number)}
                  </div>
                  <div className="text-gray-600 text-sm">Aadhaar Number / आधार संख्या</div>
                </div>
              </div>

              {/* QR Code Section */}
              <div className="flex-shrink-0">
                <div className="w-24 h-24 bg-gray-200 rounded border-2 border-gray-300 flex items-center justify-center">
                  <div className="text-gray-500 text-center">
                    <svg className="w-8 h-8 mx-auto mb-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm2 2V5h1v1H5zM3 13a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1v-3zm2 2v-1h1v1H5zM13 3a1 1 0 00-1 1v3a1 1 0 001 1h3a1 1 0 001-1V4a1 1 0 00-1-1h-3zm1 2v1h1V5h-1z" clipRule="evenodd"></path>
                    </svg>
                    <div className="text-xs">QR Code</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="text-sm font-semibold text-gray-900 mb-1">{aadhaarData.address}</div>
              <div className="text-gray-600 text-xs">Address / पता</div>
            </div>

            {/* Footer */}
            <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center text-xs text-gray-500">
              <div>
                <div>Issue Date: {aadhaarData.issueDate}</div>
                <div>PIN: {aadhaarData.pincode}</div>
              </div>
              <div className="text-right">
                <div>Father's Name: {aadhaarData.fatherName}</div>
                <div className="font-mono">www.uidai.gov.in</div>
              </div>
            </div>
          </div>
        </div>

        {/* Document Information */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Document Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Document Type:</span>
                <span className="font-medium">Aadhaar Card</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Issuing Authority:</span>
                <span className="font-medium">UIDAI</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Issue Date:</span>
                <span className="font-medium">{aadhaarData.issueDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Verification Status:</span>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                  Verified
                </span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Document Format:</span>
                <span className="font-medium">Digital</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Security Features:</span>
                <span className="font-medium">QR Code, Hologram</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Last Updated:</span>
                <span className="font-medium">Recently</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Biometric Link:</span>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                  Active
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                Important Security Information
              </h3>
              <div className="mt-2 text-sm text-red-700">
                <ul className="list-disc list-inside space-y-1">
                  <li>Never share your Aadhaar number with unauthorized parties</li>
                  <li>Use masked Aadhaar for most verification purposes</li>
                  <li>Report any misuse immediately to UIDAI</li>
                  <li>This is a digitally generated document for demonstration purposes</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AadhaarCard; 