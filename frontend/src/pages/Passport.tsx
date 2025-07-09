import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userAPI } from '../services/api';
import { PassportDocument } from '../types';
import { toast } from 'react-hot-toast';

const Passport: React.FC = () => {
  const navigate = useNavigate();
  const [passportData, setPassportData] = useState<PassportDocument | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPassportData();
  }, []);

  const fetchPassportData = async () => {
    try {
      const response = await userAPI.getDocument('passport');
      if (response.success && response.data) {
        setPassportData(response.data);
      }
    } catch (error: any) {
      console.error('Failed to fetch Passport data:', error);
      toast.error('Failed to load Passport');
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
          <p className="text-gray-600">Loading Passport...</p>
        </div>
      </div>
    );
  }

  if (!passportData) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg mb-4">Passport not found</p>
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
            <h1 className="text-2xl font-bold text-gray-900">Passport</h1>
            <p className="text-gray-600">Republic of India</p>
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

      {/* Passport */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg border overflow-hidden">
          {/* Card Header */}
          <div className="bg-gradient-to-r from-orange-600 to-green-600 p-6">
            <div className="flex items-center justify-center text-white">
              <div className="text-center">
                <div className="flex items-center justify-center gap-4 mb-2">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                    <span className="text-orange-600 text-2xl">🇮🇳</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">भारत गणराज्य</h2>
                    <h3 className="text-xl font-semibold">REPUBLIC OF INDIA</h3>
                  </div>
                </div>
                <div className="text-lg font-semibold text-orange-100">
                  पासपोर्ट / PASSPORT
                </div>
              </div>
            </div>
          </div>

          {/* Card Body */}
          <div className="p-8 bg-gradient-to-br from-orange-50 to-green-50">
            <div className="flex gap-8">
              {/* Photo Section */}
              <div className="flex-shrink-0">
                <div className="w-32 h-40 bg-gray-200 rounded border-2 border-gray-300 flex items-center justify-center mb-4">
                  <div className="text-gray-500 text-center">
                    <svg className="w-12 h-12 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                    </svg>
                    <div className="text-sm">Photo</div>
                  </div>
                </div>
                
                {/* Signature */}
                <div className="w-32 h-16 bg-gray-100 rounded border border-gray-300 flex items-center justify-center">
                  <div className="text-gray-500 text-center">
                    <div className="text-xs">Signature</div>
                  </div>
                </div>
              </div>

              {/* Details Section */}
              <div className="flex-1 space-y-4">
                {/* Type and Country Code */}
                <div className="flex gap-8">
                  <div>
                    <div className="text-sm text-gray-600">Type / प्रकार</div>
                    <div className="text-xl font-bold text-gray-900">P</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Country Code / देश कोड</div>
                    <div className="text-xl font-bold text-gray-900">IND</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Passport No. / पासपोर्ट सं.</div>
                    <div className="text-xl font-bold font-mono text-blue-900">{passportData.number}</div>
                  </div>
                </div>

                {/* Name */}
                <div>
                  <div className="text-sm text-gray-600">Name / नाम</div>
                  <div className="text-2xl font-bold text-gray-900">{passportData.name}</div>
                </div>

                {/* Nationality */}
                <div>
                  <div className="text-sm text-gray-600">Nationality / राष्ट्रीयता</div>
                  <div className="text-lg font-semibold text-gray-900">{passportData.nationality}</div>
                </div>

                {/* Dates */}
                <div className="flex gap-8">
                  <div>
                    <div className="text-sm text-gray-600">Date of Birth / जन्म तिथि</div>
                    <div className="text-lg font-semibold text-gray-900">{passportData.dob}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Place of Birth / जन्म स्थान</div>
                    <div className="text-lg font-semibold text-gray-900">{passportData.pob}</div>
                  </div>
                </div>

                {/* Issue and Expiry */}
                <div className="flex gap-8">
                  <div>
                    <div className="text-sm text-gray-600">Date of Issue / जारी तिथि</div>
                    <div className="text-lg font-semibold text-green-700">{passportData.issueDate}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Date of Expiry / समाप्ति तिथि</div>
                    <div className="text-lg font-semibold text-red-700">{passportData.expiryDate}</div>
                  </div>
                </div>

                {/* Issuing Authority */}
                <div>
                  <div className="text-sm text-gray-600">Place of Issue / जारी स्थान</div>
                  <div className="text-lg font-semibold text-gray-900">{passportData.issuingAuthority}</div>
                </div>
              </div>

              {/* Machine Readable Zone */}
              <div className="flex-shrink-0">
                <div className="w-24 h-40 bg-gray-200 rounded border-2 border-gray-300 flex items-center justify-center">
                  <div className="text-gray-500 text-center transform -rotate-90">
                    <div className="text-xs whitespace-nowrap">
                      Machine Readable Zone
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Machine Readable Zone */}
            <div className="mt-8 pt-6 border-t-2 border-gray-300">
              <div className="bg-gray-100 p-4 rounded font-mono text-xs">
                <div className="text-center text-gray-600 mb-2">MACHINE READABLE ZONE</div>
                <div className="space-y-1">
                  <div>P&lt;IND{passportData.name.replace(/\s+/g, '&lt;')}&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;</div>
                  <div>{passportData.number}{passportData.nationality}{passportData.dob.replace(/\//g, '')}&lt;&lt;&lt;&lt;&lt;&lt;&lt;</div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-6 pt-4 border-t border-gray-200 flex justify-between items-center text-sm text-gray-600">
              <div>
                <div className="font-semibold">GOVERNMENT OF INDIA</div>
                <div>Ministry of External Affairs</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-blue-900">passportindia.gov.in</div>
                <div>Seva Hi Sangam</div>
              </div>
              <div className="text-right">
                <div className="text-orange-600 font-semibold">भारत सरकार</div>
                <div>विदेश मंत्रालय</div>
              </div>
            </div>
          </div>

          {/* Security Strip */}
          <div className="h-3 bg-gradient-to-r from-orange-500 via-white to-green-500"></div>
        </div>
      </div>

      {/* Document Information */}
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Passport Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Document Type:</span>
              <span className="font-medium">Indian Passport</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Issuing Authority:</span>
              <span className="font-medium">{passportData.issuingAuthority}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Issue Date:</span>
              <span className="font-medium">{passportData.issueDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Expiry Date:</span>
              <span className="font-medium text-red-600">{passportData.expiryDate}</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Nationality:</span>
              <span className="font-medium">{passportData.nationality}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Place of Birth:</span>
              <span className="font-medium">{passportData.pob}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Status:</span>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                Valid
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Biometric:</span>
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                Enabled
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Travel Information */}
      <div className="max-w-4xl mx-auto bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">
              Travel Information
            </h3>
            <div className="mt-2 text-sm text-blue-700">
              <ul className="list-disc list-inside space-y-1">
                <li>Valid for international travel to all countries (visa requirements may apply)</li>
                <li>Ensure passport is valid for at least 6 months from travel date</li>
                <li>Keep photocopies of passport when traveling abroad</li>
                <li>Report loss or theft immediately to nearest Indian embassy/consulate</li>
                <li>Renewal can be applied 1 year before expiry date</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Passport; 