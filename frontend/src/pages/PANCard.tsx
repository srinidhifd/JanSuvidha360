import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userAPI } from '../services/api';
import { PANDocument } from '../types';
import { toast } from 'react-hot-toast';

const PANCard: React.FC = () => {
  const navigate = useNavigate();
  const [panData, setPanData] = useState<PANDocument | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPANData();
  }, []);

  const fetchPANData = async () => {
    try {
      const response = await userAPI.getDocument('pan');
      if (response.success && response.data) {
        setPanData(response.data);
      }
    } catch (error: any) {
      console.error('Failed to fetch PAN data:', error);
      toast.error('Failed to load PAN card');
    } finally {
      setLoading(false);
    }
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
          <p className="text-gray-600">Loading PAN card...</p>
        </div>
      </div>
    );
  }

  if (!panData) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg mb-4">PAN card not found</p>
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
            <h1 className="text-2xl font-bold text-gray-900">PAN Card</h1>
            <p className="text-gray-600">Permanent Account Number</p>
          </div>
        </div>
        
        <div className="flex gap-2">
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

      {/* PAN Card */}
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg border overflow-hidden">
          {/* Card Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4">
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-sm">🇮🇳</span>
                </div>
                <div>
                  <h2 className="text-lg font-bold">INCOME TAX DEPARTMENT</h2>
                  <p className="text-blue-100 text-xs">GOVT. OF INDIA</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-blue-100 text-xs font-semibold">आयकर विभाग</div>
                <div className="text-blue-100 text-xs">भारत सरकार</div>
              </div>
            </div>
          </div>

          {/* Card Body */}
          <div className="p-6 bg-gradient-to-br from-blue-50 to-white">
            <div className="flex gap-6">
              {/* Photo Section */}
              <div className="flex-shrink-0">
                <div className="w-20 h-24 bg-gray-200 rounded border-2 border-gray-300 flex items-center justify-center">
                  <div className="text-gray-500 text-center">
                    <svg className="w-6 h-6 mx-auto mb-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                    </svg>
                    <div className="text-xs">Photo</div>
                  </div>
                </div>
              </div>

              {/* Details Section */}
              <div className="flex-1 space-y-4">
                {/* PAN Number */}
                <div className="bg-white rounded-lg p-3 border-2 border-blue-200">
                  <div className="text-2xl font-bold font-mono text-blue-900 tracking-widest text-center">
                    {panData.number}
                  </div>
                  <div className="text-center text-xs text-blue-600 font-semibold mt-1">
                    PERMANENT ACCOUNT NUMBER
                  </div>
                </div>

                {/* Name */}
                <div>
                  <div className="text-xl font-bold text-gray-900">{panData.name}</div>
                  <div className="text-gray-600 text-xs">Name</div>
                </div>

                {/* Father's Name */}
                <div>
                  <div className="text-lg font-semibold text-gray-900">{panData.fatherName}</div>
                  <div className="text-gray-600 text-xs">Father's Name</div>
                </div>

                {/* Date of Birth */}
                <div>
                  <div className="text-lg font-semibold text-gray-900">{panData.dob}</div>
                  <div className="text-gray-600 text-xs">Date of Birth</div>
                </div>
              </div>

              {/* Signature Section */}
              <div className="flex-shrink-0">
                <div className="w-24 h-12 bg-gray-100 rounded border border-gray-300 flex items-center justify-center mb-2">
                  <div className="text-gray-500 text-center">
                    <div className="text-xs">Signature</div>
                  </div>
                </div>
                <div className="text-xs text-gray-600 text-center">
                  Issue Date<br/>
                  {panData.issueDate}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-6 pt-4 border-t border-gray-300 flex justify-between items-center text-xs text-gray-600">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
                <span className="font-semibold">NSDL</span>
              </div>
              <div className="text-center">
                <div className="font-bold text-blue-900">www.incometaxindia.gov.in</div>
              </div>
              <div className="text-right">
                <div className="font-mono text-xs">
                  Series: 2024
                </div>
              </div>
            </div>
          </div>

          {/* Security Strip */}
          <div className="h-2 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600"></div>
        </div>
      </div>

      {/* Document Information */}
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Document Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Document Type:</span>
              <span className="font-medium">PAN Card</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Issuing Authority:</span>
              <span className="font-medium">Income Tax Department</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Issue Date:</span>
              <span className="font-medium">{panData.issueDate}</span>
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
              <span className="text-gray-600">Valid Until:</span>
              <span className="font-medium">Lifetime</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tax Status:</span>
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                Active
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Category:</span>
              <span className="font-medium">Individual</span>
            </div>
          </div>
        </div>
      </div>

      {/* Usage Information */}
      <div className="max-w-2xl mx-auto bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">
              PAN Card Usage
            </h3>
            <div className="mt-2 text-sm text-blue-700">
              <ul className="list-disc list-inside space-y-1">
                <li>Required for all financial transactions above ₹50,000</li>
                <li>Mandatory for filing income tax returns</li>
                <li>Essential for opening bank accounts and investments</li>
                <li>Used for property purchases and high-value transactions</li>
                <li>Keep your PAN details confidential and secure</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PANCard; 