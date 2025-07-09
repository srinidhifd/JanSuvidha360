import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userAPI } from '../services/api';
import { DrivingLicenseDocument } from '../types';
import { toast } from 'react-hot-toast';

const DrivingLicense: React.FC = () => {
  const navigate = useNavigate();
  const [dlData, setDlData] = useState<DrivingLicenseDocument | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDLData();
  }, []);

  const fetchDLData = async () => {
    try {
      const response = await userAPI.getDocument('drivingLicense');
      if (response.success && response.data) {
        setDlData(response.data);
      }
    } catch (error: any) {
      console.error('Failed to fetch Driving License data:', error);
      toast.error('Failed to load Driving License');
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
          <p className="text-gray-600">Loading Driving License...</p>
        </div>
      </div>
    );
  }

  if (!dlData) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg mb-4">Driving License not found</p>
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
            <h1 className="text-2xl font-bold text-gray-900">Driving License</h1>
            <p className="text-gray-600">Government Issued Driving Permit</p>
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

      {/* Driving License */}
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg border overflow-hidden">
          {/* Card Header */}
          <div className="bg-gradient-to-r from-green-600 to-green-700 p-4">
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-bold text-lg">🚗</span>
                </div>
                <div>
                  <h2 className="text-xl font-bold">DRIVING LICENCE</h2>
                  <p className="text-green-100 text-sm">{dlData.issuingAuthority}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-green-100 text-xs">भारत सरकार</div>
                <div className="text-green-100 text-xs">GOVERNMENT OF INDIA</div>
              </div>
            </div>
          </div>

          {/* Card Body */}
          <div className="p-6 bg-gradient-to-br from-green-50 to-white">
            <div className="flex gap-6">
              {/* Photo Section */}
              <div className="flex-shrink-0">
                <div className="w-24 h-32 bg-gray-200 rounded border-2 border-gray-300 flex items-center justify-center mb-3">
                  <div className="text-gray-500 text-center">
                    <svg className="w-8 h-8 mx-auto mb-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                    </svg>
                    <div className="text-xs">Photo</div>
                  </div>
                </div>
                
                {/* Blood Group */}
                <div className="bg-red-100 border border-red-300 rounded p-2 text-center">
                  <div className="text-red-800 font-bold text-lg">{dlData.bloodGroup}</div>
                  <div className="text-red-600 text-xs">Blood Group</div>
                </div>
              </div>

              {/* Details Section */}
              <div className="flex-1 space-y-3">
                {/* License Number */}
                <div className="bg-white rounded-lg p-3 border-2 border-green-200">
                  <div className="text-xl font-bold font-mono text-green-900 tracking-wide">
                    {dlData.number}
                  </div>
                  <div className="text-green-600 text-xs font-semibold">
                    DRIVING LICENCE NUMBER
                  </div>
                </div>

                {/* Name */}
                <div>
                  <div className="text-xl font-bold text-gray-900">{dlData.name}</div>
                  <div className="text-gray-600 text-sm">Name / नाम</div>
                </div>

                {/* Date of Birth */}
                <div className="flex gap-6">
                  <div>
                    <div className="text-lg font-semibold text-gray-900">{dlData.dob}</div>
                    <div className="text-gray-600 text-sm">Date of Birth / जन्म तिथि</div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-gray-900">{dlData.vehicleClass}</div>
                    <div className="text-gray-600 text-sm">Vehicle Class / वाहन श्रेणी</div>
                  </div>
                </div>

                {/* Validity */}
                <div className="flex gap-6">
                  <div>
                    <div className="text-lg font-semibold text-gray-900">{dlData.issueDate}</div>
                    <div className="text-gray-600 text-sm">Issue Date / जारी तिथि</div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-green-700">{dlData.validUpto}</div>
                    <div className="text-gray-600 text-sm">Valid Until / वैध अवधि</div>
                  </div>
                </div>
              </div>

              {/* Barcode Section */}
              <div className="flex-shrink-0">
                <div className="w-16 h-32 bg-gray-200 rounded border-2 border-gray-300 flex items-center justify-center">
                  <div className="text-gray-500 text-center">
                    <div className="text-xs mb-1">|||||||</div>
                    <div className="text-xs">|||||||</div>
                    <div className="text-xs mt-1">|||||||</div>
                    <div className="text-xs mt-2">Barcode</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="text-sm font-semibold text-gray-900 mb-1">{dlData.address}</div>
              <div className="text-gray-600 text-xs">Address / पता</div>
            </div>

            {/* Footer */}
            <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center text-xs text-gray-500">
              <div>
                <div className="font-semibold text-green-700">CLASS: {dlData.vehicleClass}</div>
                <div>Light Motor Vehicle</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-green-900">SARATHI</div>
                <div>parivahan.gov.in</div>
              </div>
              <div className="text-right">
                <div>Digital Signature</div>
                <div className="font-mono">✓ Verified</div>
              </div>
            </div>
          </div>

          {/* Security Strip */}
          <div className="h-2 bg-gradient-to-r from-orange-400 via-green-500 to-blue-600"></div>
        </div>
      </div>

      {/* Document Information */}
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">License Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Document Type:</span>
              <span className="font-medium">Driving License</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Issuing Authority:</span>
              <span className="font-medium">{dlData.issuingAuthority}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Issue Date:</span>
              <span className="font-medium">{dlData.issueDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Valid Until:</span>
              <span className="font-medium text-green-600">{dlData.validUpto}</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Vehicle Class:</span>
              <span className="font-medium">{dlData.vehicleClass}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Blood Group:</span>
              <span className="font-medium text-red-600">{dlData.bloodGroup}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Status:</span>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                Active
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Smart Card:</span>
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                Enabled
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Vehicle Classes Information */}
      <div className="max-w-3xl mx-auto bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">
              Vehicle Class Information
            </h3>
            <div className="mt-2 text-sm text-yellow-700">
              <p>
                <strong>LMV (Light Motor Vehicle):</strong> Authorized to drive cars, jeeps, and light motor vehicles not exceeding 7500 kg GVW. 
                Valid for motorcycles with engine capacity up to 50cc without gear.
              </p>
              <p className="mt-2">
                <strong>Note:</strong> Always carry your physical license while driving. This digital copy is for reference only.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrivingLicense; 