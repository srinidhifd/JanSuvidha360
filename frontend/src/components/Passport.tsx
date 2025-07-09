import React from 'react';
import { PassportDocument } from '../types';

interface PassportProps {
  document: PassportDocument;
  className?: string;
}

const Passport: React.FC<PassportProps> = ({ document, className = '' }) => {
  return (
    <div className={`bg-white rounded-xl shadow-lg border-2 border-gray-200 overflow-hidden max-w-2xl ${className}`}>
      {/* Header - Indian Tricolor */}
      <div className="bg-gradient-to-r from-orange-500 via-white to-green-500 p-1">
        <div className="bg-gray-900 text-white p-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-1">REPUBLIC OF INDIA</h1>
            <h2 className="text-lg font-semibold">भारत गणराज्य</h2>
            <p className="text-sm mt-2">PASSPORT</p>
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Photo Section */}
          <div className="flex-shrink-0">
            <div className="w-28 h-36 bg-gray-100 border-2 border-gray-300 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-2"></div>
                <span className="text-xs text-gray-500">Photo</span>
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="flex-1 space-y-4">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{document.name}</h3>
              <p className="text-sm text-gray-600">Name / नाम</p>
            </div>

            <div>
              <p className="text-xl font-bold text-indigo-900 tracking-wider bg-indigo-50 px-4 py-2 rounded-lg border-2 border-indigo-200">
                {document.number}
              </p>
              <p className="text-sm text-gray-600 mt-1">Passport Number</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-lg font-semibold text-gray-900">{document.nationality}</p>
                <p className="text-sm text-gray-600">Nationality</p>
              </div>
              
              <div>
                <p className="text-lg font-semibold text-gray-900">{document.dob}</p>
                <p className="text-sm text-gray-600">Date of Birth</p>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-900">{document.pob}</p>
              <p className="text-sm text-gray-600">Place of Birth</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-900">Issue Date: {document.issueDate}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Expiry Date: {document.expiryDate}</p>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-900">
                Issuing Authority: {document.issuingAuthority}
              </p>
            </div>
          </div>
        </div>

        {/* Machine Readable Zone */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Machine Readable Zone</h4>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="font-mono text-xs text-gray-700 space-y-1">
              <div>P&lt;IND{document.name.replace(/\s+/g, '&lt;').toUpperCase()}&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;</div>
              <div>{document.number}&lt;&lt;&lt;IND{document.dob.replace(/\//g, '')}&lt;&lt;&lt;{document.expiryDate.replace(/\//g, '')}&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <p>Ministry of External Affairs</p>
            <p>passportindia.gov.in</p>
          </div>
        </div>
      </div>

      {/* Security Features */}
      <div className="bg-gradient-to-r from-orange-50 via-white to-green-50 px-6 py-3 border-t border-gray-200">
        <div className="flex items-center justify-between text-xs text-gray-700">
          <span>🌍 International Travel</span>
          <span>🔒 Secure Document</span>
          <span>🇮🇳 Indian Passport</span>
        </div>
      </div>
    </div>
  );
};

export default Passport; 