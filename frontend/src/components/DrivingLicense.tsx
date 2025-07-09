import React from 'react';
import { DrivingLicenseDocument } from '../types';

interface DrivingLicenseProps {
  document: DrivingLicenseDocument;
  className?: string;
}

const DrivingLicense: React.FC<DrivingLicenseProps> = ({ document, className = '' }) => {
  return (
    <div className={`bg-white rounded-xl shadow-lg border-2 border-gray-200 overflow-hidden max-w-2xl ${className}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-800 p-4 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">DRIVING LICENCE</h2>
            <p className="text-sm opacity-90">TRANSPORT AUTHORITY</p>
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
              <p className="text-xl font-bold text-green-900 tracking-wider bg-green-50 px-4 py-2 rounded-lg border-2 border-green-200">
                {document.number}
              </p>
              <p className="text-sm text-gray-600 mt-1">License Number</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-lg font-semibold text-gray-900">{document.dob}</p>
                <p className="text-sm text-gray-600">Date of Birth</p>
              </div>
              
              <div>
                <p className="text-lg font-semibold text-gray-900">{document.bloodGroup}</p>
                <p className="text-sm text-gray-600">Blood Group</p>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-900">{document.address}</p>
              <p className="text-sm text-gray-600">Address</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-900">Issue Date: {document.issueDate}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Valid Until: {document.validUpto}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Vehicle Classes */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Authorized Vehicle Classes</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {document.vehicleClass.split(',').map((cls, index) => (
              <div key={index} className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
                <p className="text-lg font-bold text-green-800">{cls.trim()}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <p>Issuing Authority: {document.issuingAuthority}</p>
            <p>Transport Department</p>
          </div>
        </div>
      </div>

      {/* Security Features */}
      <div className="bg-green-50 px-6 py-3 border-t border-green-200">
        <div className="flex items-center justify-between text-xs text-green-700">
          <span>🚗 Valid License</span>
          <span>🔒 Secure Document</span>
          <span>✅ Verified Driver</span>
        </div>
      </div>
    </div>
  );
};

export default DrivingLicense; 