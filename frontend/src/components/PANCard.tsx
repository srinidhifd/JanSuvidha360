import React from 'react';
import { PANDocument } from '../types';

interface PANCardProps {
  document: PANDocument;
  className?: string;
}

const PANCard: React.FC<PANCardProps> = ({ document, className = '' }) => {
  return (
    <div className={`bg-white rounded-xl shadow-lg border-2 border-gray-200 overflow-hidden max-w-2xl ${className}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-900 p-4 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">INCOME TAX DEPARTMENT</h2>
            <p className="text-sm opacity-90">GOVT. OF INDIA</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold">PAN</p>
            <p className="text-xs opacity-90">PERMANENT ACCOUNT NUMBER</p>
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Photo Section */}
          <div className="flex-shrink-0">
            <div className="w-24 h-32 bg-gray-100 border-2 border-gray-300 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-2"></div>
                <span className="text-xs text-gray-500">Photo</span>
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="flex-1 space-y-4">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{document.name}</h3>
              <p className="text-sm text-gray-600">Name</p>
            </div>

            <div>
              <p className="text-xl font-bold text-blue-900 tracking-wider bg-blue-50 px-4 py-2 rounded-lg border-2 border-blue-200">
                {document.number}
              </p>
              <p className="text-sm text-gray-600 mt-1">PAN Number</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-lg font-semibold text-gray-900">{document.fatherName}</p>
                <p className="text-sm text-gray-600">Father's Name</p>
              </div>
              
              <div>
                <p className="text-lg font-semibold text-gray-900">{document.dob}</p>
                <p className="text-sm text-gray-600">Date of Birth</p>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-900">Issue Date: {document.issueDate}</p>
            </div>
          </div>

          {/* Signature Section */}
          <div className="flex-shrink-0">
            <div className="w-32 h-16 bg-gray-100 border-2 border-gray-300 rounded-lg flex items-center justify-center">
              <span className="text-xs text-gray-500">Signature</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <p>This is a computer generated PAN card</p>
            <p>www.incometax.gov.in</p>
          </div>
        </div>
      </div>

      {/* Security Features */}
      <div className="bg-blue-50 px-6 py-3 border-t border-blue-200">
        <div className="flex items-center justify-between text-xs text-blue-700">
          <span>🔒 Secure Document</span>
          <span>✅ Income Tax Verified</span>
          <span>📄 Official Document</span>
        </div>
      </div>
    </div>
  );
};

export default PANCard; 