import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userAPI } from '../services/api';
import { UserDocuments } from '../types';
import { toast } from 'react-hot-toast';

const DocumentsTextView: React.FC = () => {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState<UserDocuments | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDocument, setSelectedDocument] = useState<string>('all');

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const response = await userAPI.getUserDocuments();
      if (response.success && response.data) {
        setDocuments(response.data);
      }
    } catch (error: any) {
      console.error('Failed to fetch documents:', error);
      toast.error('Failed to load documents');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success('Copied to clipboard!');
    }).catch(() => {
      toast.error('Failed to copy');
    });
  };

  const formatDocumentText = (doc: any, type: string) => {
    switch (type) {
      case 'aadhaar':
        return `AADHAAR CARD
================
Name: ${doc.name}
Aadhaar Number: ${doc.number}
Date of Birth: ${doc.dob}
Gender: ${doc.gender}
Father's Name: ${doc.fatherName}
Address: ${doc.address}
Pincode: ${doc.pincode}
Issue Date: ${doc.issueDate}`;

      case 'pan':
        return `PAN CARD
=========
Name: ${doc.name}
PAN Number: ${doc.number}
Father's Name: ${doc.fatherName}
Date of Birth: ${doc.dob}
Issue Date: ${doc.issueDate}`;

      case 'drivingLicense':
        return `DRIVING LICENSE
================
Name: ${doc.name}
License Number: ${doc.number}
Date of Birth: ${doc.dob}
Address: ${doc.address}
Issue Date: ${doc.issueDate}
Valid Until: ${doc.validUpto}
Vehicle Class: ${doc.vehicleClass}
Blood Group: ${doc.bloodGroup}
Issuing Authority: ${doc.issuingAuthority}`;

      case 'passport':
        return `PASSPORT
=========
Name: ${doc.name}
Passport Number: ${doc.number}
Nationality: ${doc.nationality}
Date of Birth: ${doc.dob}
Place of Birth: ${doc.pob}
Issue Date: ${doc.issueDate}
Expiry Date: ${doc.expiryDate}
Issuing Authority: ${doc.issuingAuthority}`;

      default:
        return '';
    }
  };

  const getAllDocumentsText = () => {
    if (!documents) return '';
    
    const sections = [
      formatDocumentText(documents.aadhaar, 'aadhaar'),
      formatDocumentText(documents.pan, 'pan'),
      formatDocumentText(documents.drivingLicense, 'drivingLicense'),
      formatDocumentText(documents.passport, 'passport')
    ];
    
    return sections.join('\n\n\n');
  };

  const getSelectedDocumentText = () => {
    if (!documents) return '';
    
    if (selectedDocument === 'all') {
      return getAllDocumentsText();
    }
    
    const doc = documents[selectedDocument as keyof UserDocuments];
    return formatDocumentText(doc, selectedDocument);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading documents...</p>
        </div>
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
            <h1 className="text-2xl font-bold text-gray-900">Documents - Text View</h1>
            <p className="text-gray-600">Plain text format for easy copying</p>
          </div>
        </div>
        
        <button
          onClick={() => copyToClipboard(getSelectedDocumentText())}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
          </svg>
          Copy All
        </button>
      </div>

      {/* Document Selector */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Document to View:
        </label>
        <select
          value={selectedDocument}
          onChange={(e) => setSelectedDocument(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="all">All Documents</option>
          <option value="aadhaar">Aadhaar Card</option>
          <option value="pan">PAN Card</option>
          <option value="drivingLicense">Driving License</option>
          <option value="passport">Passport</option>
        </select>
      </div>

      {/* Text Content */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">
            {selectedDocument === 'all' ? 'All Documents' : 
             selectedDocument === 'aadhaar' ? 'Aadhaar Card' :
             selectedDocument === 'pan' ? 'PAN Card' :
             selectedDocument === 'drivingLicense' ? 'Driving License' :
             selectedDocument === 'passport' ? 'Passport' : ''}
          </h3>
          <button
            onClick={() => copyToClipboard(getSelectedDocumentText())}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded text-sm font-medium transition-colors flex items-center gap-1"
          >
            <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
            </svg>
            Copy
          </button>
        </div>
        
        <div className="p-6">
          <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono bg-gray-50 p-4 rounded-lg border overflow-x-auto">
            {getSelectedDocumentText()}
          </pre>
        </div>
      </div>

      {/* Individual Document Cards */}
      {documents && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { key: 'aadhaar', title: 'Aadhaar Card', icon: '🆔' },
            { key: 'pan', title: 'PAN Card', icon: '💳' },
            { key: 'drivingLicense', title: 'Driving License', icon: '🚗' },
            { key: 'passport', title: 'Passport', icon: '🛂' }
          ].map((doc) => (
            <div key={doc.key} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{doc.icon}</span>
                  <h4 className="font-semibold text-gray-900">{doc.title}</h4>
                </div>
                <button
                  onClick={() => copyToClipboard(formatDocumentText(documents[doc.key as keyof UserDocuments], doc.key))}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs font-medium transition-colors"
                >
                  Copy
                </button>
              </div>
              <pre className="whitespace-pre-wrap text-xs text-gray-700 font-mono bg-gray-50 p-3 rounded border overflow-x-auto">
                {formatDocumentText(documents[doc.key as keyof UserDocuments], doc.key)}
              </pre>
            </div>
          ))}
        </div>
      )}

      {/* Usage Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">
              How to Use Text View
            </h3>
            <div className="mt-2 text-sm text-blue-700">
              <ul className="list-disc list-inside space-y-1">
                <li>Select a specific document from the dropdown to view individual details</li>
                <li>Choose "All Documents" to see all information in one view</li>
                <li>Use the "Copy" buttons to copy text to your clipboard</li>
                <li>The text format is plain and easy to paste into forms or applications</li>
                <li>This format is useful for quick reference and data entry</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentsTextView; 