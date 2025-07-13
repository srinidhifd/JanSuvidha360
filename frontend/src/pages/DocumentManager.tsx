import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';

// Simple icon components to replace lucide-react
const FileText = ({ className }: { className?: string }) => <span className={className}>📄</span>;
const Upload = ({ className }: { className?: string }) => <span className={className}>📤</span>;
const Download = ({ className }: { className?: string }) => <span className={className}>⬇️</span>;
const Eye = ({ className }: { className?: string }) => <span className={className}>👁️</span>;
const CheckCircle = ({ className }: { className?: string }) => <span className={className}>✅</span>;
const AlertCircle = ({ className }: { className?: string }) => <span className={className}>⚠️</span>;
const XCircle = ({ className }: { className?: string }) => <span className={className}>❌</span>;
const Clock = ({ className }: { className?: string }) => <span className={className}>⏰</span>;
const Search = ({ className }: { className?: string }) => <span className={className}>🔍</span>;
const Filter = ({ className }: { className?: string }) => <span className={className}>🔍</span>;
const Refresh = ({ className }: { className?: string }) => <span className={className}>🔄</span>;
const Trash2 = ({ className }: { className?: string }) => <span className={className}>🗑️</span>;
const Edit = ({ className }: { className?: string }) => <span className={className}>✏️</span>;
const Lock = ({ className }: { className?: string }) => <span className={className}>🔒</span>;
const Shield = ({ className }: { className?: string }) => <span className={className}>🛡️</span>;
const Camera = ({ className }: { className?: string }) => <span className={className}>📷</span>;
const Scan = ({ className }: { className?: string }) => <span className={className}>📋</span>;
const Archive = ({ className }: { className?: string }) => <span className={className}>📦</span>;
const Share = ({ className }: { className?: string }) => <span className={className}>📤</span>;
const Star = ({ className }: { className?: string }) => <span className={className}>⭐</span>;

interface Document {
  id: string;
  name: string;
  type: 'aadhaar' | 'pan' | 'income' | 'caste' | 'bank' | 'photo' | 'other';
  status: 'pending' | 'verified' | 'rejected' | 'expired';
  size: number;
  uploadedAt: string;
  verifiedAt?: string;
  expiresAt?: string;
  ocrData?: string;
  verificationScore?: number;
  tags: string[];
  isEncrypted: boolean;
  isShared: boolean;
  isFavorite: boolean;
}

const DocumentManager: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Mock documents data
  const documents: Document[] = [
    {
      id: '1',
      name: 'Aadhaar_Card_2024.pdf',
      type: 'aadhaar',
      status: 'verified',
      size: 2457600,
      uploadedAt: '2024-01-15T10:30:00Z',
      verifiedAt: '2024-01-16T14:20:00Z',
      expiresAt: '2029-01-15T10:30:00Z',
      ocrData: 'Aadhaar Number: 1234-5678-9012\nName: John Doe\nDOB: 15-01-1990',
      verificationScore: 98.5,
      tags: ['identity', 'government', 'verified'],
      isEncrypted: true,
      isShared: false,
      isFavorite: true
    },
    {
      id: '2',
      name: 'PAN_Card_2024.pdf',
      type: 'pan',
      status: 'verified',
      size: 1894400,
      uploadedAt: '2024-01-10T09:15:00Z',
      verifiedAt: '2024-01-11T11:45:00Z',
      expiresAt: '2034-01-10T09:15:00Z',
      ocrData: 'PAN: ABCDE1234F\nName: John Doe\nDOB: 15-01-1990',
      verificationScore: 95.2,
      tags: ['identity', 'tax', 'verified'],
      isEncrypted: true,
      isShared: false,
      isFavorite: false
    },
    {
      id: '3',
      name: 'Income_Certificate_2024.pdf',
      type: 'income',
      status: 'pending',
      size: 1566720,
      uploadedAt: '2024-01-20T16:45:00Z',
      tags: ['income', 'certificate', 'pending'],
      isEncrypted: true,
      isShared: false,
      isFavorite: false
    },
    {
      id: '4',
      name: 'Caste_Certificate_2024.pdf',
      type: 'caste',
      status: 'rejected',
      size: 2048000,
      uploadedAt: '2024-01-18T12:30:00Z',
      tags: ['caste', 'certificate', 'rejected'],
      isEncrypted: true,
      isShared: false,
      isFavorite: false
    },
    {
      id: '5',
      name: 'Bank_Statement_2024.pdf',
      type: 'bank',
      status: 'verified',
      size: 3145728,
      uploadedAt: '2024-01-12T08:20:00Z',
      verifiedAt: '2024-01-13T10:15:00Z',
      expiresAt: '2024-07-12T08:20:00Z',
      verificationScore: 92.8,
      tags: ['bank', 'financial', 'verified'],
      isEncrypted: true,
      isShared: true,
      isFavorite: false
    },
    {
      id: '6',
      name: 'Profile_Photo.jpg',
      type: 'photo',
      status: 'verified',
      size: 512000,
      uploadedAt: '2024-01-05T14:10:00Z',
      verifiedAt: '2024-01-06T09:30:00Z',
      tags: ['photo', 'profile', 'verified'],
      isEncrypted: false,
      isShared: false,
      isFavorite: true
    }
  ];

  const tabs = [
    { id: 'all', label: 'All Documents', icon: FileText, count: documents.length },
    { id: 'verified', label: 'Verified', icon: CheckCircle, count: documents.filter(d => d.status === 'verified').length },
    { id: 'pending', label: 'Pending', icon: Clock, count: documents.filter(d => d.status === 'pending').length },
    { id: 'rejected', label: 'Rejected', icon: XCircle, count: documents.filter(d => d.status === 'rejected').length },
    { id: 'favorites', label: 'Favorites', icon: Star, count: documents.filter(d => d.isFavorite).length }
  ];

  const documentTypes = [
    { id: 'aadhaar', label: 'Aadhaar Card', icon: Shield },
    { id: 'pan', label: 'PAN Card', icon: Shield },
    { id: 'income', label: 'Income Certificate', icon: FileText },
    { id: 'caste', label: 'Caste Certificate', icon: FileText },
    { id: 'bank', label: 'Bank Statement', icon: FileText },
    { id: 'photo', label: 'Photo', icon: Camera },
    { id: 'other', label: 'Other', icon: FileText }
  ];

  const statusColors = {
    'verified': 'text-green-600 bg-green-100',
    'pending': 'text-yellow-600 bg-yellow-100',
    'rejected': 'text-red-600 bg-red-100',
    'expired': 'text-gray-600 bg-gray-100'
  };

  const typeColors = {
    'aadhaar': 'text-blue-600 bg-blue-100',
    'pan': 'text-purple-600 bg-purple-100',
    'income': 'text-green-600 bg-green-100',
    'caste': 'text-orange-600 bg-orange-100',
    'bank': 'text-indigo-600 bg-indigo-100',
    'photo': 'text-pink-600 bg-pink-100',
    'other': 'text-gray-600 bg-gray-100'
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesTab = activeTab === 'all' || 
      (activeTab === 'verified' && doc.status === 'verified') ||
      (activeTab === 'pending' && doc.status === 'pending') ||
      (activeTab === 'rejected' && doc.status === 'rejected') ||
      (activeTab === 'favorites' && doc.isFavorite);
    
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesTab && matchesSearch;
  });

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleDocumentSelect = (docId: string) => {
    setSelectedDocuments(prev => 
      prev.includes(docId) 
        ? prev.filter(id => id !== docId)
        : [...prev, docId]
    );
  };

  const handleBulkAction = (action: string) => {
    console.log(`Bulk action: ${action} on documents:`, selectedDocuments);
    setSelectedDocuments([]);
  };

  const renderDocumentCard = (doc: Document) => (
    <Card key={doc.id} className="relative group hover:shadow-lg transition-all duration-200">
      <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="p-1 bg-white rounded-full shadow-sm hover:bg-gray-50">
          <Eye className="w-4 h-4 text-gray-600" />
        </button>
        <button className="p-1 bg-white rounded-full shadow-sm hover:bg-gray-50">
          <Download className="w-4 h-4 text-gray-600" />
        </button>
        <button className="p-1 bg-white rounded-full shadow-sm hover:bg-gray-50">
          <Edit className="w-4 h-4 text-gray-600" />
        </button>
      </div>

      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
            <FileText className="w-6 h-6 text-gray-600" />
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-900 truncate">{doc.name}</h3>
            <div className="flex items-center space-x-1">
              {doc.isEncrypted && <Lock className="w-3 h-3 text-blue-600" />}
              {doc.isShared && <Share className="w-3 h-3 text-green-600" />}
              {doc.isFavorite && <Star className="w-3 h-3 text-yellow-600" />}
            </div>
          </div>
          
          <div className="flex items-center space-x-2 mb-2">
            <Badge variant={doc.status === 'verified' ? 'success' : doc.status === 'pending' ? 'warning' : 'error'}>
              {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
            </Badge>
            <Badge variant="outline" className={typeColors[doc.type]}>
              {documentTypes.find(t => t.id === doc.type)?.label}
            </Badge>
          </div>
          
          <div className="text-xs text-gray-500 space-y-1">
            <p>Size: {formatFileSize(doc.size)}</p>
            <p>Uploaded: {formatDate(doc.uploadedAt)}</p>
            {doc.verifiedAt && <p>Verified: {formatDate(doc.verifiedAt)}</p>}
            {doc.verificationScore && <p>Score: {doc.verificationScore}%</p>}
          </div>
          
          {doc.ocrData && (
            <div className="mt-2 p-2 bg-gray-50 rounded text-xs">
              <p className="font-medium text-gray-700 mb-1">OCR Data:</p>
              <p className="text-gray-600 line-clamp-2">{doc.ocrData}</p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );

  const renderDocumentList = (doc: Document) => (
    <div key={doc.id} className="flex items-center space-x-4 p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
      <input
        type="checkbox"
        checked={selectedDocuments.includes(doc.id)}
        onChange={() => handleDocumentSelect(doc.id)}
        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
      />
      
      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
        <FileText className="w-5 h-5 text-gray-600" />
      </div>
      
      <div className="flex-1">
        <h3 className="text-sm font-medium text-gray-900">{doc.name}</h3>
        <p className="text-xs text-gray-500">{formatFileSize(doc.size)} • {formatDate(doc.uploadedAt)}</p>
      </div>
      
      <div className="flex items-center space-x-2">
        <Badge variant={doc.status === 'verified' ? 'success' : doc.status === 'pending' ? 'warning' : 'error'}>
          {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
        </Badge>
        <Badge variant="outline" className={typeColors[doc.type]}>
          {documentTypes.find(t => t.id === doc.type)?.label}
        </Badge>
      </div>
      
      <div className="flex items-center space-x-1">
        {doc.isEncrypted && <Lock className="w-4 h-4 text-blue-600" />}
        {doc.isShared && <Share className="w-4 h-4 text-green-600" />}
        {doc.isFavorite && <Star className="w-4 h-4 text-yellow-600" />}
      </div>
      
      <div className="flex items-center space-x-1">
        <button className="p-1 hover:bg-gray-100 rounded">
          <Eye className="w-4 h-4 text-gray-600" />
        </button>
        <button className="p-1 hover:bg-gray-100 rounded">
          <Download className="w-4 h-4 text-gray-600" />
        </button>
        <button className="p-1 hover:bg-gray-100 rounded">
          <Edit className="w-4 h-4 text-gray-600" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
        <div className="flex items-center space-x-3">
          <FileText className="w-8 h-8" />
          <div>
            <h1 className="text-2xl font-bold">Document Manager</h1>
            <p className="text-blue-100">Advanced document management with OCR and verification</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Controls */}
        <div className="flex flex-col lg:flex-row items-center justify-between mb-8 space-y-4 lg:space-y-0">
          <div className="flex space-x-1 bg-white rounded-lg p-1 shadow-sm">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="font-medium">{tab.label}</span>
                <Badge variant="outline" className="ml-1">
                  {tab.count}
                </Badge>
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
              >
                <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                  <div className="w-1.5 h-1.5 bg-current"></div>
                  <div className="w-1.5 h-1.5 bg-current"></div>
                  <div className="w-1.5 h-1.5 bg-current"></div>
                  <div className="w-1.5 h-1.5 bg-current"></div>
                </div>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
              >
                <div className="w-4 h-4 space-y-0.5">
                  <div className="w-full h-0.5 bg-current"></div>
                  <div className="w-full h-0.5 bg-current"></div>
                  <div className="w-full h-0.5 bg-current"></div>
                </div>
              </button>
            </div>

            <Button variant="outline" size="sm" rightIcon={<Refresh className="w-4 h-4" />}>
              Refresh
            </Button>
            <Button size="sm" rightIcon={<Upload className="w-4 h-4" />}>
              Upload
            </Button>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedDocuments.length > 0 && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-blue-900">
                {selectedDocuments.length} document(s) selected
              </span>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={() => handleBulkAction('download')}>
                  Download
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleBulkAction('share')}>
                  Share
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleBulkAction('verify')}>
                  Verify
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleBulkAction('delete')}>
                  Delete
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Document Grid/List */}
        <div className="space-y-4">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDocuments.map(renderDocumentCard)}
            </div>
          ) : (
            <div className="space-y-2">
              {filteredDocuments.map(renderDocumentList)}
            </div>
          )}
        </div>

        {/* Empty State */}
        {filteredDocuments.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No documents found</h3>
            <p className="text-gray-600 mb-6">
              {searchQuery ? 'Try adjusting your search criteria.' : 'Upload your first document to get started.'}
            </p>
            <Button rightIcon={<Upload className="w-4 h-4" />}>
              Upload Document
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentManager; 