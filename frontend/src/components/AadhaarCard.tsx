import React from 'react';
import { AadhaarDocument } from '../types';

interface AadhaarCardProps {
  document: AadhaarDocument;
  className?: string;
}

const AadhaarCard: React.FC<AadhaarCardProps> = ({ document, className = '' }) => {
  return (
    <div className={`bg-white rounded-xl shadow-lg border-2 border-gray-200 overflow-hidden max-w-2xl ${className}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 p-4 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">Aadhaar</h2>
            <p className="text-sm opacity-90">Unique Identification Authority of India</p>
          </div>
          <div className="text-right">
            <p className="text-sm">भारत सरकार</p>
            <p className="text-xs opacity-90">GOVERNMENT OF INDIA</p>
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Photo and QR Section */}
          <div className="flex-shrink-0">
            <div className="space-y-4">
              {/* Photo */}
              <div className="w-24 h-32 bg-gray-100 border-2 border-gray-300 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-2"></div>
                  <span className="text-xs text-gray-500">Photo</span>
                </div>
              </div>
              
              {/* QR Code */}
              <div className="w-24 h-24 bg-gray-100 border-2 border-gray-300 rounded-lg flex items-center justify-center">
                <div className="grid grid-cols-8 gap-px">
                  {[...Array(64)].map((_, i) => (
                    <div key={i} className={`w-2 h-2 ${Math.random() > 0.5 ? 'bg-black' : 'bg-white'}`}></div>
                  ))}
                </div>
              </div>
              <p className="text-xs text-gray-600 text-center">QR Code</p>
            </div>
          </div>

          {/* Details Section */}
          <div className="flex-1 space-y-4">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{document.name}</h3>
              <p className="text-sm text-gray-600">Name / नाम</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-lg font-semibold text-gray-900">{document.dob}</p>
                <p className="text-sm text-gray-600">Date of Birth / जन्म तिथि</p>
              </div>
              
              <div>
                <p className="text-lg font-semibold text-gray-900">{document.gender}</p>
                <p className="text-sm text-gray-600">Gender / लिंग</p>
              </div>
            </div>

            <div>
              <p className="text-xl font-bold text-gray-900 tracking-wider">
                **** **** {document.number.slice(-4)}
              </p>
              <p className="text-sm text-gray-600">Aadhaar Number / आधार संख्या</p>
            </div>

            <div>
              <p className="text-sm text-gray-900">{document.address}</p>
              <p className="text-sm text-gray-600">Address / पता</p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium text-gray-900">Issue Date: {document.issueDate}</p>
              </div>
              <div>
                <p className="font-medium text-gray-900">PIN: {document.pincode}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <p>Father's Name: {document.fatherName}</p>
            <p>www.uidai.gov.in</p>
          </div>
        </div>
      </div>

      {/* Security Features */}
      <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
        <div className="flex items-center justify-between text-xs text-gray-600">
          <span>📱 mAadhaar Download Available</span>
          <span>🔒 Secure Document</span>
          <span>✅ Verified Identity</span>
        </div>
      </div>
    </div>
  );
};

export default AadhaarCard; 