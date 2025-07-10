import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface DocumentType {
  id: string;
  name: string;
  category: string;
  icon: string;
  shortDetails: {
    label: string;
    value: string;
  }[];
  bgColor: string;
  textColor: string;
  hasDocument: boolean; // Only show if user has this document
}

const Documents: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedView, setSelectedView] = useState<'overview' | 'document'>('overview');
  const [currentDocument, setCurrentDocument] = useState<DocumentType | null>(null);

  // Mock user document status - in real app, this would come from API
  const userDocuments = {
    aadhaar: true,
    pan: true,
    driving: true,
    passport: false, // User doesn't have passport
    voter: true,
    ration: true,
    pf: true,
    bank: true,
    insurance: false, // User doesn't have health insurance
    lic: false,
    income: false,
    caste: false,
    domicile: true,
    birth: true,
    marriage: false,
    property: false,
    electricity: true,
    water: true,
    gas: true,
    phone: true,
    gst: false,
    trade: false,
    fssai: false,
    pollution: true,
    vehicle: true,
    vehicle_insurance: true
  };

  const documents: DocumentType[] = [
    {
      id: 'aadhaar',
      name: 'Aadhaar Card',
      category: 'Identity',
      icon: '🆔',
      shortDetails: [
        { label: 'Number', value: '1234 5678 9012 3456' },
        { label: 'Name', value: user?.name || 'Ramesh Kumar' },
        { label: 'Status', value: 'Active' }
      ],
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-700',
      hasDocument: userDocuments.aadhaar
    },
    {
      id: 'pan',
      name: 'PAN Card',
      category: 'Identity',
      icon: '💳',
      shortDetails: [
        { label: 'Number', value: 'ABCDE1234F' },
        { label: 'Name', value: user?.name || 'Ramesh Kumar' },
        { label: 'Status', value: 'Active' }
      ],
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700',
      hasDocument: userDocuments.pan
    },
    {
      id: 'driving',
      name: 'Driving License',
      category: 'Transport',
      icon: '🚗',
      shortDetails: [
        { label: 'Number', value: 'MH20 20220012345' },
        { label: 'Valid Till', value: '01-01-2040' },
        { label: 'Class', value: 'LMV, MCWG' }
      ],
      bgColor: 'bg-green-50',
      textColor: 'text-green-700',
      hasDocument: userDocuments.driving
    },
    {
      id: 'passport',
      name: 'Passport',
      category: 'Travel',
      icon: '🛂',
      shortDetails: [
        { label: 'Number', value: 'A1234567' },
        { label: 'Valid Till', value: '01-01-2030' },
        { label: 'Type', value: 'Ordinary' }
      ],
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700',
      hasDocument: userDocuments.passport
    },
    {
      id: 'voter',
      name: 'Voter ID Card',
      category: 'Identity',
      icon: '🗳️',
      shortDetails: [
        { label: 'Number', value: 'ABC1234567' },
        { label: 'Constituency', value: 'Mumbai South' },
        { label: 'Status', value: 'Active' }
      ],
      bgColor: 'bg-indigo-50',
      textColor: 'text-indigo-700',
      hasDocument: userDocuments.voter
    },
    {
      id: 'ration',
      name: 'Ration Card',
      category: 'Welfare',
      icon: '🌾',
      shortDetails: [
        { label: 'Number', value: '12345678901234567890' },
        { label: 'Type', value: 'APL' },
        { label: 'Members', value: '4' }
      ],
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-700',
      hasDocument: userDocuments.ration
    },
    {
      id: 'pf',
      name: 'PF Account Statement',
      category: 'Finance',
      icon: '💰',
      shortDetails: [
        { label: 'UAN', value: '123456789012' },
        { label: 'PF Number', value: 'MH/12345/123456' },
        { label: 'Balance', value: '₹2,50,000' }
      ],
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-700',
      hasDocument: userDocuments.pf
    },
    {
      id: 'bank',
      name: 'Bank Passbook',
      category: 'Finance',
      icon: '🏦',
      shortDetails: [
        { label: 'Account', value: '1234567890123456' },
        { label: 'IFSC', value: 'SBIN0001234' },
        { label: 'Balance', value: '₹75,000' }
      ],
      bgColor: 'bg-cyan-50',
      textColor: 'text-cyan-700',
      hasDocument: userDocuments.bank
    },
    {
      id: 'domicile',
      name: 'Domicile Certificate',
      category: 'Certificate',
      icon: '🏠',
      shortDetails: [
        { label: 'Certificate No', value: 'DC/2024/12345' },
        { label: 'State', value: user?.state || 'Maharashtra' },
        { label: 'Valid Till', value: '31-03-2025' }
      ],
      bgColor: 'bg-rose-50',
      textColor: 'text-rose-700',
      hasDocument: userDocuments.domicile
    },
    {
      id: 'birth',
      name: 'Birth Certificate',
      category: 'Certificate',
      icon: '👶',
      shortDetails: [
        { label: 'Registration No', value: 'BC/2024/12345' },
        { label: 'Date of Birth', value: '01-01-1990' },
        { label: 'Place', value: user?.city || 'Mumbai' }
      ],
      bgColor: 'bg-pink-50',
      textColor: 'text-pink-700',
      hasDocument: userDocuments.birth
    },
    {
      id: 'electricity',
      name: 'Electricity Bill',
      category: 'Utility',
      icon: '⚡',
      shortDetails: [
        { label: 'Consumer No', value: 'EB123456789' },
        { label: 'Units', value: '250 kWh' },
        { label: 'Amount', value: '₹1,500' }
      ],
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-700',
      hasDocument: userDocuments.electricity
    },
    {
      id: 'water',
      name: 'Water Bill',
      category: 'Utility',
      icon: '💧',
      shortDetails: [
        { label: 'Consumer No', value: 'WB123456789' },
        { label: 'Usage', value: '15,000 L' },
        { label: 'Amount', value: '₹800' }
      ],
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700',
      hasDocument: userDocuments.water
    },
    {
      id: 'gas',
      name: 'Gas Connection',
      category: 'Utility',
      icon: '🔥',
      shortDetails: [
        { label: 'Consumer No', value: 'GC123456789' },
        { label: 'Connection Type', value: 'Domestic' },
        { label: 'Subsidy', value: 'Yes' }
      ],
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-700',
      hasDocument: userDocuments.gas
    },
    {
      id: 'phone',
      name: 'Phone Bill',
      category: 'Utility',
      icon: '📞',
      shortDetails: [
        { label: 'Number', value: user?.phoneNumber || '+91 9876543210' },
        { label: 'Plan', value: 'Unlimited' },
        { label: 'Amount', value: '₹599' }
      ],
      bgColor: 'bg-green-50',
      textColor: 'text-green-700',
      hasDocument: userDocuments.phone
    },
    {
      id: 'pollution',
      name: 'Pollution Certificate',
      category: 'Vehicle',
      icon: '🌿',
      shortDetails: [
        { label: 'Certificate No', value: 'PC/2024/12345' },
        { label: 'Vehicle No', value: 'MH12AB1234' },
        { label: 'Valid Till', value: '31-03-2025' }
      ],
      bgColor: 'bg-green-50',
      textColor: 'text-green-700',
      hasDocument: userDocuments.pollution
    },
    {
      id: 'vehicle',
      name: 'Vehicle Registration',
      category: 'Vehicle',
      icon: '🚙',
      shortDetails: [
        { label: 'Registration No', value: 'MH12AB1234' },
        { label: 'Vehicle Type', value: 'Car' },
        { label: 'Owner', value: user?.name || 'Ramesh Kumar' }
      ],
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700',
      hasDocument: userDocuments.vehicle
    },
    {
      id: 'vehicle_insurance',
      name: 'Vehicle Insurance',
      category: 'Vehicle',
      icon: '🚗',
      shortDetails: [
        { label: 'Policy No', value: 'VI123456789' },
        { label: 'Vehicle No', value: 'MH12AB1234' },
        { label: 'Valid Till', value: '31-03-2025' }
      ],
      bgColor: 'bg-cyan-50',
      textColor: 'text-cyan-700',
      hasDocument: userDocuments.vehicle_insurance
    }
  ];

  const categories = ['All', 'Identity', 'Transport', 'Travel', 'Welfare', 'Finance', 'Insurance', 'Certificate', 'Property', 'Utility', 'Business', 'Vehicle'];
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Filter documents that user has
  const availableDocuments = documents.filter(doc => doc.hasDocument);
  const filteredDocuments = selectedCategory === 'All' 
    ? availableDocuments 
    : availableDocuments.filter(doc => doc.category === selectedCategory);

  const viewDocument = (document: DocumentType) => {
    setCurrentDocument(document);
    setSelectedView('document');
  };

  const backToOverview = () => {
    setSelectedView('overview');
    setCurrentDocument(null);
  };

  const renderDetailedDocument = (document: DocumentType) => {
    if (!document) return null;

    switch (document.id) {
      case 'aadhaar':
        return (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-orange-200">
              {/* Header - Orange Bar */}
              <div className="bg-orange-600 text-white px-8 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                      <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiIGZpbGw9IiNGRjhBMDAiLz4KPHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0iI0ZGRiIgeD0iOCIgeT0iOCI+CjxwYXRoIGQ9Ik04IDJDNi40IDIgNSAzLjQgNSA1czEuNCAzIDMgMyAzLTEuNCAzLTMtMS40LTMtMy0zek04IDEwYy0yLjY3IDAtOCAxLjM0LTggNHYyaDE2di0yYzAtMi42Ni01LjMzLTQtOC00eiIvPgo8L3N2Zz4KPC9zdmc+" alt="Emblem" className="w-8 h-8" />
                    </div>
                    <div>
                      <div className="text-lg font-bold">भारत सरकार</div>
                      <div className="text-sm">Government of India</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">आधार</div>
                    <div className="text-sm">AADHAAR</div>
                  </div>
                </div>
              </div>

              {/* Green Bar */}
              <div className="bg-green-600 text-white px-8 py-3 text-center">
                <div className="text-lg font-bold">भारतीय विशिष्ट पहचान प्राधिकरण</div>
                <div className="text-sm">Unique Identification Authority of India</div>
              </div>

              {/* Main Content */}
              <div className="px-8 py-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Left - Photo and Basic Info */}
                  <div className="space-y-4">
                    <div className="w-32 h-40 bg-gray-200 rounded-lg mx-auto flex items-center justify-center">
                      <span className="text-4xl">👤</span>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-gray-800">{user?.name || 'रमेश कुमार'}</div>
                      <div className="text-lg font-bold text-gray-800">{user?.name || 'RAMESH KUMAR'}</div>
                      <div className="text-sm text-gray-600 mt-1">S/O: सुरेश कुमार</div>
                      <div className="text-sm text-gray-600">S/O: SURESH KUMAR</div>
                    </div>
                  </div>

                  {/* Middle - Details */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-gray-600">जन्म तिथि / DOB</div>
                        <div className="font-semibold">01/01/1990</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">लिंग / Gender</div>
                        <div className="font-semibold">{user?.gender || 'पुरुष / MALE'}</div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-gray-600">पता / Address</div>
                      <div className="font-semibold text-sm">
                        Krupa Sindhu Apt, Pune<br />
                        Dhayari, Pune City,<br />
                        Maharashtra - 411041<br />
                        {user?.city || 'Mumbai'}, {user?.state || 'Maharashtra'}, India
                      </div>
                    </div>

                    <div>
                      <div className="text-sm text-gray-600">मोबाइल / Mobile</div>
                      <div className="font-semibold">{user?.phoneNumber || '+91 9876543210'}</div>
                    </div>
                  </div>

                  {/* Right - QR Code and Number */}
                  <div className="space-y-4">
                    <div className="w-32 h-32 bg-gray-200 rounded-lg mx-auto flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-xs text-gray-600">QR CODE</div>
                        <div className="text-2xl">⬛</div>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-sm text-gray-600 mb-2">आपका आधार संख्या / Your Aadhaar No.</div>
                      <div className="text-3xl font-bold text-red-600 tracking-wider">
                        1234 5678 9012
                      </div>
                      <div className="text-sm text-gray-600 mt-2">
                        VID: 9113 7859 9778 9189
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Info */}
                <div className="mt-8 pt-4 border-t border-gray-200">
                  <div className="text-center text-sm text-gray-600">
                    <div className="mb-2">आधार भारत में कहीं भी पहचान का प्रमाण है</div>
                    <div className="mb-2">Aadhaar is a proof of identity, not of citizenship</div>
                    <div className="mb-2">पहचान सत्यापन के लिए सिक्योर QR कोड/ऑफलाइन XML/ऑनलाइन प्रमाणीकरण का उपयोग करें</div>
                    <div>Verify identity using Secure QR Code/Offline XML/Online Authentication</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'pan':
        return (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-blue-200">
              {/* Header */}
              <div className="bg-blue-600 text-white px-4 sm:px-8 py-4">
                <div className="flex items-center justify-between">
                                      <div className="flex items-center space-x-2 sm:space-x-3">
                      <div className="w-8 h-8 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                        <img src="/jansuvidha360-logo.png" alt="JanSuvidha360 Logo" className="w-3 h-3 sm:w-4 sm:h-4 object-contain jansuvidha-logo" />
                      </div>
                    <div>
                      <div className="text-sm sm:text-lg font-bold">GOVT. OF INDIA</div>
                      <div className="text-xs sm:text-sm">INCOME TAX DEPARTMENT</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg sm:text-2xl font-bold">PAN</div>
                    <div className="text-xs sm:text-sm">CARD</div>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="px-4 sm:px-8 py-6 sm:py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                  {/* Left - Photo and Info */}
                  <div className="space-y-4 sm:space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-20 h-24 sm:w-24 sm:h-32 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl sm:text-3xl">👤</span>
                      </div>
                      <div className="min-w-0">
                        <div className="text-lg sm:text-2xl font-bold text-gray-800 mb-2 break-words">
                          {user?.name?.toUpperCase() || 'RAMESH KUMAR'}
                        </div>
                        <div className="text-xs sm:text-sm text-gray-600">Name</div>
                      </div>
                    </div>

                    <div className="space-y-3 sm:space-y-4">
                      <div>
                        <div className="text-xs sm:text-sm text-gray-600">Father's Name</div>
                        <div className="font-semibold text-sm sm:text-lg">SURESH KUMAR</div>
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm text-gray-600">Date of Birth</div>
                        <div className="font-semibold text-sm sm:text-lg">01/01/1990</div>
                      </div>
                    </div>
                  </div>

                  {/* Right - PAN Details */}
                  <div className="space-y-4 sm:space-y-6">
                    <div className="text-center">
                      <div className="bg-blue-100 text-blue-800 text-2xl sm:text-4xl lg:text-6xl font-bold tracking-wider py-4 sm:py-6 px-4 sm:px-8 rounded-lg mb-4 break-all">
                        ABCDE1234F
                      </div>
                      <div className="text-sm sm:text-lg font-semibold text-gray-700">
                        Permanent Account Number
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <div className="text-xs sm:text-sm text-gray-600">Status</div>
                        <div className="font-semibold text-green-600">Active</div>
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm text-gray-600">Issue Date</div>
                        <div className="font-semibold">01/01/2020</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Info */}
                <div className="mt-6 sm:mt-8 pt-4 border-t border-gray-200 text-center">
                  <div className="text-xs sm:text-sm text-gray-600">
                    This card is property of Income Tax Department, Govt. of India<br />
                    It is punishable to use this card for identity proof
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'driving':
        return (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-green-200">
              {/* Header */}
              <div className="bg-green-600 text-white px-8 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                      <span className="text-green-600 font-bold text-lg">🚗</span>
                    </div>
                    <div>
                      <div className="text-lg font-bold">DRIVING LICENCE</div>
                      <div className="text-sm">{user?.state || 'Maharashtra'} Transport Department</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">INDIA</div>
                    <div className="text-sm">भारत</div>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Left - Photo and Basic Info */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-24 h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                        <span className="text-3xl">👤</span>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-gray-800 mb-2">
                          {user?.name?.toUpperCase() || 'RAMESH KUMAR'}
                        </div>
                        <div className="text-sm text-gray-600">S/O: SURESH KUMAR</div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <div className="text-sm text-gray-600">Date of Birth</div>
                        <div className="font-semibold text-lg">01-01-1990</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Blood Group</div>
                        <div className="font-semibold text-lg">B+</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Address</div>
                        <div className="font-semibold text-sm">
                          Krupa Sindhu Apt, Pune<br />
                          {user?.city || 'Mumbai'}, {user?.state || 'Maharashtra'} - 411041
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right - License Details */}
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-gray-800 mb-2">
                        MH20 20220012345
                      </div>
                      <div className="text-sm text-gray-600">Driving Licence Number</div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-gray-600">Issue Date</div>
                        <div className="font-semibold">01-01-2020</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Valid Till</div>
                        <div className="font-semibold text-green-600">01-01-2040</div>
                      </div>
                    </div>

                    <div>
                      <div className="text-sm text-gray-600 mb-2">Authorized to Drive</div>
                      <div className="space-y-2">
                        <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium inline-block mr-2">
                          LMV - Light Motor Vehicle
                        </div>
                        <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium inline-block">
                          MCWG - Motor Cycle Without Gear
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="text-sm text-gray-600">Issuing Authority</div>
                      <div className="font-semibold">RTO {user?.state || 'Maharashtra'}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'voter':
        return (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-indigo-200">
              {/* Header */}
              <div className="bg-indigo-600 text-white px-8 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                      <span className="text-indigo-600 font-bold text-lg">🗳️</span>
                    </div>
                    <div>
                      <div className="text-lg font-bold">ELECTION COMMISSION OF INDIA</div>
                      <div className="text-sm">भारत निर्वाचन आयोग</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">VOTER</div>
                    <div className="text-sm">मतदाता पहचान पत्र</div>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Left - Photo and Basic Info */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-24 h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                        <span className="text-3xl">👤</span>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-gray-800 mb-2">
                          {user?.name?.toUpperCase() || 'RAMESH KUMAR'}
                        </div>
                        <div className="text-lg font-bold text-gray-800">
                          रमेश कुमार
                        </div>
                        <div className="text-sm text-gray-600 mt-1">S/O: SURESH KUMAR</div>
                        <div className="text-sm text-gray-600">पिता: सुरेश कुमार</div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <div className="text-sm text-gray-600">Age / आयु</div>
                        <div className="font-semibold text-lg">{user?.age || '34'} Years</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Gender / लिंग</div>
                        <div className="font-semibold text-lg">{user?.gender?.toUpperCase() || 'MALE'} / पुरुष</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Date of Birth / जन्म तिथि</div>
                        <div className="font-semibold">01/01/1990</div>
                      </div>
                    </div>
                  </div>

                  {/* Right - Voting Details */}
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-gray-800 mb-2">
                        ABC1234567
                      </div>
                      <div className="text-sm text-gray-600">Elector's Photo Identity Card Number</div>
                      <div className="text-sm text-gray-600">मतदाता फोटो पहचान पत्र संख्या</div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <div className="text-sm text-gray-600">Constituency / निर्वाचन क्षेत्र</div>
                        <div className="font-semibold">Mumbai South</div>
                        <div className="font-semibold">मुंबई दक्षिण</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Assembly Constituency / विधानसभा निर्वाचन क्षेत्र</div>
                        <div className="font-semibold">174 - Worli</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Part No. / भाग संख्या</div>
                        <div className="font-semibold">001</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Serial No. / क्रम संख्या</div>
                        <div className="font-semibold">123</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Issue Date / जारी करने की तिथि</div>
                        <div className="font-semibold">15/08/2019</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Address Section */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="text-sm text-gray-600 mb-2">Address / पता</div>
                  <div className="font-semibold text-gray-800">
                    Krupa Sindhu Apartment, Flat No. 304<br />
                    Dhayari, Pune - 411041<br />
                    {user?.state || 'Maharashtra'}, India<br />
                    भारत
                  </div>
                </div>

                {/* Bottom Info */}
                <div className="mt-8 pt-4 border-t border-gray-200 text-center">
                  <div className="text-sm text-gray-600">
                    <div className="mb-2">मतदान एक अधिकार है, इसका सदुपयोग करें</div>
                    <div>Voting is a right, use it wisely</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'ration':
        return (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-yellow-200">
              {/* Header */}
              <div className="bg-yellow-600 text-white px-8 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                      <span className="text-yellow-600 font-bold text-lg">🌾</span>
                    </div>
                    <div>
                      <div className="text-lg font-bold">खाद्य एवं नागरिक आपूर्ति विभाग</div>
                      <div className="text-sm">FOOD & CIVIL SUPPLIES DEPARTMENT</div>
                      <div className="text-xs">{user?.state || 'Maharashtra'} Government</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold">राशन कार्ड</div>
                    <div className="text-sm">RATION CARD</div>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Left - Card Details */}
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-800 mb-2">
                        12345678901234567890
                      </div>
                      <div className="text-sm text-gray-600">Ration Card Number / राशन कार्ड संख्या</div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <div className="text-sm text-gray-600">Card Type / कार्ड का प्रकार</div>
                        <div className="font-semibold text-lg text-green-600">
                          APL (Above Poverty Line)<br />
                          गरीबी रेखा से ऊपर
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Head of Family / परिवार के मुखिया</div>
                        <div className="font-semibold text-lg">{user?.name || 'Ramesh Kumar'}</div>
                        <div className="font-semibold text-lg">रमेश कुमार</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Category / श्रेणी</div>
                        <div className="font-semibold">General / सामान्य</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Issue Date / जारी करने की तिथि</div>
                        <div className="font-semibold">01/04/2020</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Valid Till / वैधता</div>
                        <div className="font-semibold text-green-600">31/03/2025</div>
                      </div>
                    </div>
                  </div>

                  {/* Right - Family Members */}
                  <div className="space-y-6">
                    <div>
                      <div className="text-lg font-bold text-gray-800 mb-4">
                        Family Members / परिवार के सदस्य
                      </div>
                      
                      <div className="space-y-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                              <span className="text-lg">👨</span>
                            </div>
                            <div>
                              <div className="font-semibold">{user?.name || 'Ramesh Kumar'}</div>
                              <div className="text-sm text-gray-600">Head / मुखिया</div>
                              <div className="text-sm text-gray-600">Age: {user?.age || '34'}</div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                              <span className="text-lg">👩</span>
                            </div>
                            <div>
                              <div className="font-semibold">Sunita Kumar</div>
                              <div className="text-sm text-gray-600">Wife / पत्नी</div>
                              <div className="text-sm text-gray-600">Age: 30</div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                              <span className="text-lg">👦</span>
                            </div>
                            <div>
                              <div className="font-semibold">Rohit Kumar</div>
                              <div className="text-sm text-gray-600">Son / पुत्र</div>
                              <div className="text-sm text-gray-600">Age: 12</div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                              <span className="text-lg">👧</span>
                            </div>
                            <div>
                              <div className="font-semibold">Priya Kumar</div>
                              <div className="text-sm text-gray-600">Daughter / पुत्री</div>
                              <div className="text-sm text-gray-600">Age: 8</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 text-center">
                        <div className="text-sm text-gray-600">Total Members / कुल सदस्य: <span className="font-bold">4</span></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Address and Shop Details */}
                <div className="mt-8 pt-6 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="text-sm text-gray-600 mb-2">Address / पता</div>
                    <div className="font-semibold text-gray-800">
                      Krupa Sindhu Apartment, Flat No. 304<br />
                      Dhayari, Pune - 411041<br />
                      {user?.state || 'Maharashtra'}, India
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-2">Fair Price Shop / उचित मूल्य दुकान</div>
                    <div className="font-semibold text-gray-800">
                      Shop No: FPS/001/DHY<br />
                      License No: FPS123456<br />
                      Dealer: Ganesh Stores<br />
                      Address: Dhayari Market, Pune
                    </div>
                  </div>
                </div>

                {/* Bottom Info */}
                <div className="mt-8 pt-4 border-t border-gray-200 text-center">
                  <div className="text-sm text-gray-600">
                    <div className="mb-2">सब्सिडी युक्त खाद्यान्न केवल निर्धारित दुकान से ही खरीदें</div>
                    <div>Purchase subsidized food grains only from designated shops</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'bank':
        return (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-cyan-200">
              {/* Header */}
              <div className="bg-cyan-600 text-white px-8 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                      <span className="text-cyan-600 font-bold text-lg">🏦</span>
                    </div>
                    <div>
                      <div className="text-lg font-bold">STATE BANK OF INDIA</div>
                      <div className="text-sm">भारतीय स्टेट बैंक</div>
                      <div className="text-xs">A Government of India Enterprise</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold">PASSBOOK</div>
                    <div className="text-sm">पासबुक</div>
                  </div>
                </div>
              </div>

              {/* Account Details Section */}
              <div className="px-8 py-6 bg-gradient-to-r from-cyan-50 to-blue-50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-gray-600">Account Holder Name / खाताधारक का नाम</div>
                      <div className="font-bold text-xl text-gray-800">{user?.name?.toUpperCase() || 'RAMESH KUMAR'}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Account Number / खाता संख्या</div>
                      <div className="font-bold text-2xl text-cyan-600">1234567890123456</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Account Type / खाता प्रकार</div>
                      <div className="font-semibold">Savings Account / बचत खाता</div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-gray-600">IFSC Code</div>
                      <div className="font-bold text-lg">SBIN0001234</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Branch / शाखा</div>
                      <div className="font-semibold">Dhayari, Pune</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Customer ID / ग्राहक आईडी</div>
                      <div className="font-semibold">123456789</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Transaction History */}
              <div className="px-8 py-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-gray-800">Recent Transactions / हाल की लेनदेन</h3>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">Current Balance / वर्तमान शेष</div>
                    <div className="font-bold text-2xl text-green-600">₹75,000.00</div>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-2 text-left">Date / तारीख</th>
                        <th className="px-4 py-2 text-left">Description / विवरण</th>
                        <th className="px-4 py-2 text-right">Debit / डेबिट</th>
                        <th className="px-4 py-2 text-right">Credit / क्रेडिट</th>
                        <th className="px-4 py-2 text-right">Balance / शेष</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="px-4 py-2">15/12/2024</td>
                        <td className="px-4 py-2">Salary Credit</td>
                        <td className="px-4 py-2 text-right">-</td>
                        <td className="px-4 py-2 text-right text-green-600">₹50,000.00</td>
                        <td className="px-4 py-2 text-right font-semibold">₹75,000.00</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="px-4 py-2">10/12/2024</td>
                        <td className="px-4 py-2">UPI Transfer to Sunita</td>
                        <td className="px-4 py-2 text-right text-red-600">₹5,000.00</td>
                        <td className="px-4 py-2 text-right">-</td>
                        <td className="px-4 py-2 text-right font-semibold">₹25,000.00</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2">08/12/2024</td>
                        <td className="px-4 py-2">ATM Withdrawal</td>
                        <td className="px-4 py-2 text-right text-red-600">₹10,000.00</td>
                        <td className="px-4 py-2 text-right">-</td>
                        <td className="px-4 py-2 text-right font-semibold">₹30,000.00</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="px-4 py-2">05/12/2024</td>
                        <td className="px-4 py-2">Online Purchase - Amazon</td>
                        <td className="px-4 py-2 text-right text-red-600">₹2,500.00</td>
                        <td className="px-4 py-2 text-right">-</td>
                        <td className="px-4 py-2 text-right font-semibold">₹40,000.00</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2">01/12/2024</td>
                        <td className="px-4 py-2">Fixed Deposit Interest</td>
                        <td className="px-4 py-2 text-right">-</td>
                        <td className="px-4 py-2 text-right text-green-600">₹2,500.00</td>
                        <td className="px-4 py-2 text-right font-semibold">₹42,500.00</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Account Services */}
              <div className="px-8 py-6 bg-gray-50">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Account Services / खाता सेवाएं</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="text-center">
                      <div className="text-2xl mb-2">💳</div>
                      <div className="font-semibold">Debit Card</div>
                      <div className="text-sm text-gray-600">Active</div>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="text-center">
                      <div className="text-2xl mb-2">📱</div>
                      <div className="font-semibold">Mobile Banking</div>
                      <div className="text-sm text-gray-600">Enabled</div>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="text-center">
                      <div className="text-2xl mb-2">🔒</div>
                      <div className="font-semibold">Net Banking</div>
                      <div className="text-sm text-gray-600">Active</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Branch Information */}
              <div className="px-8 py-6 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="text-sm text-gray-600 mb-2">Branch Address / शाखा का पता</div>
                    <div className="font-semibold text-gray-800">
                      State Bank of India<br />
                      Dhayari Branch<br />
                      Shop No. 1-2, Ground Floor<br />
                      Dhayari Phata, Pune - 411041<br />
                      Maharashtra, India
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-2">Contact Information / संपर्क जानकारी</div>
                    <div className="font-semibold text-gray-800">
                      Phone: 020-1234567<br />
                      Email: dhayari.sbi@bank.sbi<br />
                      Manager: Mr. Rajesh Sharma<br />
                      Timing: 10:00 AM - 4:00 PM<br />
                      (Mon-Fri, Sat till 2:00 PM)
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'pf':
        return (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-emerald-200">
              {/* Header */}
              <div className="bg-emerald-600 text-white px-8 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                      <span className="text-emerald-600 font-bold text-lg">💰</span>
                    </div>
                    <div>
                      <div className="text-lg font-bold">EMPLOYEES' PROVIDENT FUND</div>
                      <div className="text-sm">कर्मचारी भविष्य निधि</div>
                      <div className="text-xs">Ministry of Labour & Employment, Govt. of India</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold">PF STATEMENT</div>
                    <div className="text-sm">पीएफ विवरण</div>
                  </div>
                </div>
              </div>

              {/* Member Details */}
              <div className="px-8 py-6 bg-gradient-to-r from-emerald-50 to-green-50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-gray-600">Member Name / सदस्य का नाम</div>
                      <div className="font-bold text-xl text-gray-800">{user?.name?.toUpperCase() || 'RAMESH KUMAR'}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">UAN (Universal Account Number)</div>
                      <div className="font-bold text-2xl text-emerald-600">123456789012</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">PF Number / पीएफ संख्या</div>
                      <div className="font-bold text-lg">MH/12345/123456</div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-gray-600">Date of Birth / जन्म तिथि</div>
                      <div className="font-semibold">01/01/1990</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Date of Joining / नियुक्ति तिथि</div>
                      <div className="font-semibold">01/04/2018</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Father's Name / पिता का नाम</div>
                      <div className="font-semibold">SURESH KUMAR</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Current Balance */}
              <div className="px-8 py-6">
                <div className="bg-emerald-100 rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">
                    Current PF Balance / वर्तमान पीएफ शेष राशि
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-sm text-gray-600">Employee Contribution</div>
                      <div className="text-sm text-gray-600">कर्मचारी अंशदान</div>
                      <div className="font-bold text-2xl text-emerald-600">₹1,25,000</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Employer Contribution</div>
                      <div className="text-sm text-gray-600">नियोक्ता अंशदान</div>
                      <div className="font-bold text-2xl text-emerald-600">₹1,25,000</div>
                    </div>
                    <div className="bg-emerald-200 rounded-lg p-4">
                      <div className="text-sm text-gray-600">Total Balance</div>
                      <div className="text-sm text-gray-600">कुल शेष राशि</div>
                      <div className="font-bold text-3xl text-emerald-700">₹2,50,000</div>
                    </div>
                  </div>
                </div>

                {/* Monthly Contributions */}
                <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Contributions / हाल के अंशदान</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-2 text-left">Month / महीना</th>
                        <th className="px-4 py-2 text-right">Basic Salary</th>
                        <th className="px-4 py-2 text-right">Employee (12%)</th>
                        <th className="px-4 py-2 text-right">Employer (12%)</th>
                        <th className="px-4 py-2 text-right">Total / कुल</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="px-4 py-2">Dec 2024</td>
                        <td className="px-4 py-2 text-right">₹25,000</td>
                        <td className="px-4 py-2 text-right text-blue-600">₹3,000</td>
                        <td className="px-4 py-2 text-right text-green-600">₹3,000</td>
                        <td className="px-4 py-2 text-right font-semibold">₹6,000</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="px-4 py-2">Nov 2024</td>
                        <td className="px-4 py-2 text-right">₹25,000</td>
                        <td className="px-4 py-2 text-right text-blue-600">₹3,000</td>
                        <td className="px-4 py-2 text-right text-green-600">₹3,000</td>
                        <td className="px-4 py-2 text-right font-semibold">₹6,000</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2">Oct 2024</td>
                        <td className="px-4 py-2 text-right">₹25,000</td>
                        <td className="px-4 py-2 text-right text-blue-600">₹3,000</td>
                        <td className="px-4 py-2 text-right text-green-600">₹3,000</td>
                        <td className="px-4 py-2 text-right font-semibold">₹6,000</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="px-4 py-2">Sep 2024</td>
                        <td className="px-4 py-2 text-right">₹25,000</td>
                        <td className="px-4 py-2 text-right text-blue-600">₹3,000</td>
                        <td className="px-4 py-2 text-right text-green-600">₹3,000</td>
                        <td className="px-4 py-2 text-right font-semibold">₹6,000</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Employer Details */}
              <div className="px-8 py-6 bg-gray-50">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Employer Details / नियोक्ता विवरण</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="text-sm text-gray-600 mb-2">Current Employer / वर्तमान नियोक्ता</div>
                    <div className="font-semibold text-gray-800">
                      Tech Solutions Pvt Ltd<br />
                      Plot No. 123, IT Park<br />
                      Hinjewadi, Pune - 411057<br />
                      Maharashtra, India
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-2">PF Office Details / पीएफ कार्यालय विवरण</div>
                    <div className="font-semibold text-gray-800">
                      RPFC Office: Pune<br />
                      Establishment ID: MH12345<br />
                      PF Code: 12345<br />
                      Phone: 020-1234567<br />
                      Email: pune.rpfc@epfindia.gov.in
                    </div>
                  </div>
                </div>
              </div>

              {/* Nomination Details */}
              <div className="px-8 py-6 border-t border-gray-200">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Nomination Details / नामांकन विवरण</h3>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-600">Nominee Name / नामिती का नाम</div>
                      <div className="font-semibold">Sunita Kumar</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Relationship / रिश्ता</div>
                      <div className="font-semibold">Wife / पत्नी</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Share Percentage / हिस्सा प्रतिशत</div>
                      <div className="font-semibold">100%</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Date of Nomination / नामांकन तिथि</div>
                      <div className="font-semibold">01/04/2018</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'domicile':
        return (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-orange-200">
              {/* Header */}
              <div className="bg-orange-600 text-white px-8 py-4">
                <div className="flex items-center justify-between">
                                      <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                        <img src="/jansuvidha360-logo.png" alt="JanSuvidha360 Logo" className="w-4 h-4 object-contain jansuvidha-logo" />
                      </div>
                    <div>
                      <div className="text-lg font-bold">GOVERNMENT OF {user?.state?.toUpperCase() || 'MAHARASHTRA'}</div>
                      <div className="text-sm">REVENUE DEPARTMENT</div>
                      <div className="text-xs">राजस्व विभाग</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold">DOMICILE</div>
                    <div className="text-sm">मूल निवासी प्रमाण पत्र</div>
                  </div>
                </div>
              </div>

              {/* Certificate Content */}
              <div className="px-8 py-8">
                <div className="text-center mb-8">
                  <div className="text-2xl font-bold text-gray-800 mb-2">
                    DOMICILE CERTIFICATE
                  </div>
                  <div className="text-lg font-bold text-gray-800">
                    मूल निवासी प्रमाण पत्र
                  </div>
                  <div className="text-sm text-gray-600 mt-2">
                    Certificate No. / प्रमाण पत्र संख्या: DOM/{user?.state?.substring(0,2)?.toUpperCase() || 'MH'}/2024/123456
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Photo and Basic Details */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="w-32 h-40 bg-gray-200 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <span className="text-4xl">👤</span>
                      </div>
                      <div className="text-sm text-gray-600">Photograph / फोटो</div>
                    </div>
                    <div className="md:col-span-2 space-y-4">
                      <div>
                        <div className="text-sm text-gray-600">Full Name / पूरा नाम</div>
                        <div className="font-bold text-xl text-gray-800">{user?.name?.toUpperCase() || 'RAMESH KUMAR'}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Father's Name / पिता का नाम</div>
                        <div className="font-semibold text-lg">SURESH KUMAR</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Date of Birth / जन्म तिथि</div>
                        <div className="font-semibold">01st January 1990</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Age / आयु</div>
                        <div className="font-semibold">{user?.age || '34'} Years</div>
                      </div>
                    </div>
                  </div>

                  {/* Certificate Text */}
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="text-justify text-gray-800 leading-relaxed">
                      <p className="mb-4">
                        <strong>This is to certify that</strong> Mr./Ms. <strong>{user?.name?.toUpperCase() || 'RAMESH KUMAR'}</strong> 
                        son/daughter of <strong>SURESH KUMAR</strong> is a bonafide resident of 
                        <strong> {user?.state || 'Maharashtra'}</strong> State. He/She is domiciled in this state since birth.
                      </p>
                      <p className="mb-4">
                        <strong>प्रमाणित किया जाता है कि</strong> श्री/श्रीमती <strong>रमेश कुमार</strong> 
                        पुत्र/पुत्री <strong>सुरेश कुमार</strong> महाराष्ट्र राज्य के मूल निवासी हैं। 
                        वे जन्म से इस राज्य में निवास कर रहे हैं।
                      </p>
                      <p className="mb-4">
                        His/Her permanent address is: <strong>Krupa Sindhu Apartment, Flat No. 304, 
                        Dhayari, Pune - 411041, {user?.state || 'Maharashtra'}, India</strong>
                      </p>
                      <p>
                        This certificate is issued for the purpose of <strong>Educational/Employment/Government Services</strong> 
                        and is valid as per the rules and regulations of the Government of {user?.state || 'Maharashtra'}.
                      </p>
                    </div>
                  </div>

                  {/* Personal Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <div className="text-sm text-gray-600">Gender / लिंग</div>
                        <div className="font-semibold">{user?.gender || 'Male'}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Caste / जाति</div>
                        <div className="font-semibold">General</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Religion / धर्म</div>
                        <div className="font-semibold">Hindu</div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <div className="text-sm text-gray-600">Nationality / राष्ट्रीयता</div>
                        <div className="font-semibold">Indian</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Issue Date / जारी करने की तिथि</div>
                        <div className="font-semibold">15th December 2024</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Valid Till / मान्यता</div>
                        <div className="font-semibold text-green-600">Lifetime / आजीवन</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Authority Section */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex justify-between items-end">
                    <div>
                      <div className="text-sm text-gray-600">Issued By / जारीकर्ता</div>
                      <div className="font-semibold text-gray-800">
                        District Collector<br />
                        Pune District<br />
                        {user?.state || 'Maharashtra'}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="w-32 h-20 border-2 border-dashed border-gray-300 flex items-center justify-center mb-2">
                        <span className="text-gray-400 text-xs">Official Seal</span>
                      </div>
                      <div className="text-sm text-gray-600">Signature / हस्ताक्षर</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'birth':
        return (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-pink-200">
              {/* Header */}
              <div className="bg-pink-600 text-white px-8 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                      <span className="text-pink-600 font-bold text-lg">👶</span>
                    </div>
                    <div>
                      <div className="text-lg font-bold">GOVERNMENT OF {user?.state?.toUpperCase() || 'MAHARASHTRA'}</div>
                      <div className="text-sm">REGISTRAR OF BIRTHS & DEATHS</div>
                      <div className="text-xs">जन्म मृत्यु रजिस्ट्रार</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold">BIRTH</div>
                    <div className="text-sm">जन्म प्रमाण पत्र</div>
                  </div>
                </div>
              </div>

              {/* Certificate Content */}
              <div className="px-8 py-8">
                <div className="text-center mb-8">
                  <div className="text-2xl font-bold text-gray-800 mb-2">
                    CERTIFICATE OF BIRTH
                  </div>
                  <div className="text-lg font-bold text-gray-800">
                    जन्म प्रमाण पत्र
                  </div>
                  <div className="text-sm text-gray-600 mt-2">
                    Registration No. / पंजीकरण संख्या: {user?.state?.substring(0,2)?.toUpperCase() || 'MH'}/PUN/1990/123456
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Birth Details */}
                  <div className="bg-pink-50 p-6 rounded-lg">
                    <div className="text-center mb-6">
                      <div className="text-lg font-bold text-gray-800">
                        CERTIFIED COPY OF AN ENTRY IN THE REGISTER OF BIRTHS
                      </div>
                      <div className="text-sm font-semibold text-gray-800 mt-2">
                        जन्म रजिस्टर में प्रविष्टि की प्रमाणित प्रति
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <div className="text-sm text-gray-600">Name of Child / बच्चे का नाम</div>
                          <div className="font-bold text-xl text-gray-800">{user?.name?.toUpperCase() || 'RAMESH KUMAR'}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Sex / लिंग</div>
                          <div className="font-semibold text-lg">{user?.gender || 'Male'}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Date of Birth / जन्म तिथि</div>
                          <div className="font-bold text-lg text-pink-600">01st January 1990</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Time of Birth / जन्म का समय</div>
                          <div className="font-semibold">10:30 AM</div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <div className="text-sm text-gray-600">Place of Birth / जन्म स्थान</div>
                          <div className="font-semibold">Pune, {user?.state || 'Maharashtra'}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Name of Hospital / अस्पताल का नाम</div>
                          <div className="font-semibold">Sahyadri Hospital, Pune</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Religion / धर्म</div>
                          <div className="font-semibold">Hindu</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Nationality / राष्ट्रीयता</div>
                          <div className="font-semibold">Indian</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Parents Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-blue-50 p-6 rounded-lg">
                      <div className="text-lg font-bold text-gray-800 mb-4">
                        Father's Details / पिता का विवरण
                      </div>
                      <div className="space-y-3">
                        <div>
                          <div className="text-sm text-gray-600">Name / नाम</div>
                          <div className="font-semibold">SURESH KUMAR</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Age at time of birth / जन्म के समय आयु</div>
                          <div className="font-semibold">28 Years</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Nationality / राष्ट्रीयता</div>
                          <div className="font-semibold">Indian</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Education / शिक्षा</div>
                          <div className="font-semibold">Graduate</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Occupation / व्यवसाय</div>
                          <div className="font-semibold">Business</div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-purple-50 p-6 rounded-lg">
                      <div className="text-lg font-bold text-gray-800 mb-4">
                        Mother's Details / माता का विवरण
                      </div>
                      <div className="space-y-3">
                        <div>
                          <div className="text-sm text-gray-600">Name / नाम</div>
                          <div className="font-semibold">LAKSHMI KUMAR</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Age at time of birth / जन्म के समय आयु</div>
                          <div className="font-semibold">25 Years</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Nationality / राष्ट्रीयता</div>
                          <div className="font-semibold">Indian</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Education / शिक्षा</div>
                          <div className="font-semibold">Graduate</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Occupation / व्यवसाय</div>
                          <div className="font-semibold">Homemaker</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Address Details */}
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="text-lg font-bold text-gray-800 mb-4">
                      Permanent Address / स्थायी पता
                    </div>
                    <div className="font-semibold text-gray-800">
                      Krupa Sindhu Apartment, Flat No. 304<br />
                      Dhayari, Pune - 411041<br />
                      {user?.state || 'Maharashtra'}, India
                    </div>
                  </div>

                  {/* Registration Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="text-sm text-gray-600">Date of Registration / पंजीकरण की तिथि</div>
                      <div className="font-semibold">15th January 1990</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Registrar / रजिस्ट्रार</div>
                      <div className="font-semibold">Pune Municipal Corporation</div>
                    </div>
                  </div>
                </div>

                {/* Authority Section */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex justify-between items-end">
                    <div>
                      <div className="text-sm text-gray-600">Issued By / जारीकर्ता</div>
                      <div className="font-semibold text-gray-800">
                        Sub-Registrar of Births & Deaths<br />
                        Pune District<br />
                        {user?.state || 'Maharashtra'}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="w-32 h-20 border-2 border-dashed border-gray-300 flex items-center justify-center mb-2">
                        <span className="text-gray-400 text-xs">Official Seal</span>
                      </div>
                      <div className="text-sm text-gray-600">Signature / हस्ताक्षर</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'electricity':
        return (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-red-200">
              {/* Header */}
              <div className="bg-red-600 text-white px-8 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                      <span className="text-red-600 font-bold text-lg">⚡</span>
                    </div>
                    <div>
                      <div className="text-lg font-bold">MSEDCL</div>
                      <div className="text-sm">Maharashtra State Electricity Distribution Co. Ltd.</div>
                      <div className="text-xs">महाराष्ट्र राज्य विद्युत वितरण कंपनी लिमिटेड</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold">ELECTRICITY BILL</div>
                    <div className="text-sm">विद्युत बिल</div>
                  </div>
                </div>
              </div>

              {/* Bill Details */}
              <div className="px-8 py-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-gray-600">Consumer Name / ग्राहक का नाम</div>
                      <div className="font-bold text-xl text-gray-800">{user?.name?.toUpperCase() || 'RAMESH KUMAR'}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Consumer Number / ग्राहक संख्या</div>
                      <div className="font-bold text-2xl text-red-600">123456789012</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Service Connection Number</div>
                      <div className="font-semibold">SC123456789</div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-gray-600">Bill Date / बिल की तारीख</div>
                      <div className="font-semibold">15th December 2024</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Due Date / अंतिम तिथि</div>
                      <div className="font-semibold text-red-600">31st December 2024</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Billing Period / बिलिंग अवधि</div>
                      <div className="font-semibold">01-Nov-2024 to 30-Nov-2024</div>
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div className="mb-6">
                  <div className="text-sm text-gray-600 mb-2">Service Address / सेवा पता</div>
                  <div className="font-semibold text-gray-800">
                    Krupa Sindhu Apartment, Flat No. 304<br />
                    Dhayari, Pune - 411041<br />
                    Maharashtra, India
                  </div>
                </div>

                {/* Consumption Details */}
                <div className="bg-blue-50 p-6 rounded-lg mb-6">
                  <div className="text-lg font-bold text-gray-800 mb-4">
                    Consumption Details / खपत विवरण
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600">150</div>
                      <div className="text-sm text-gray-600">Previous Reading</div>
                      <div className="text-sm text-gray-600">पिछली रीडिंग</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600">275</div>
                      <div className="text-sm text-gray-600">Current Reading</div>
                      <div className="text-sm text-gray-600">वर्तमान रीडिंग</div>
                    </div>
                    <div className="text-center bg-blue-100 p-4 rounded-lg">
                      <div className="text-4xl font-bold text-blue-700">125</div>
                      <div className="text-sm text-gray-600">Units Consumed</div>
                      <div className="text-sm text-gray-600">खपत इकाइयां</div>
                    </div>
                  </div>
                </div>

                {/* Bill Breakdown */}
                <div className="mb-6">
                  <div className="text-lg font-bold text-gray-800 mb-4">
                    Bill Breakdown / बिल विवरण
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-4 py-2 text-left">Particulars / विवरण</th>
                          <th className="px-4 py-2 text-right">Units / इकाइयां</th>
                          <th className="px-4 py-2 text-right">Rate / दर</th>
                          <th className="px-4 py-2 text-right">Amount / राशि</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr>
                          <td className="px-4 py-2">Energy Charges (0-100 units)</td>
                          <td className="px-4 py-2 text-right">100</td>
                          <td className="px-4 py-2 text-right">₹3.50</td>
                          <td className="px-4 py-2 text-right">₹350.00</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="px-4 py-2">Energy Charges (101-200 units)</td>
                          <td className="px-4 py-2 text-right">25</td>
                          <td className="px-4 py-2 text-right">₹5.50</td>
                          <td className="px-4 py-2 text-right">₹137.50</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2">Fixed Charges</td>
                          <td className="px-4 py-2 text-right">-</td>
                          <td className="px-4 py-2 text-right">-</td>
                          <td className="px-4 py-2 text-right">₹75.00</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="px-4 py-2">Fuel Adjustment Charges</td>
                          <td className="px-4 py-2 text-right">125</td>
                          <td className="px-4 py-2 text-right">₹0.50</td>
                          <td className="px-4 py-2 text-right">₹62.50</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2">Electricity Duty</td>
                          <td className="px-4 py-2 text-right">-</td>
                          <td className="px-4 py-2 text-right">-</td>
                          <td className="px-4 py-2 text-right">₹31.25</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="px-4 py-2">CGST (9%)</td>
                          <td className="px-4 py-2 text-right">-</td>
                          <td className="px-4 py-2 text-right">-</td>
                          <td className="px-4 py-2 text-right">₹59.12</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2">SGST (9%)</td>
                          <td className="px-4 py-2 text-right">-</td>
                          <td className="px-4 py-2 text-right">-</td>
                          <td className="px-4 py-2 text-right">₹59.12</td>
                        </tr>
                        <tr className="bg-red-100 font-bold">
                          <td className="px-4 py-2">Total Amount / कुल राशि</td>
                          <td className="px-4 py-2 text-right">125</td>
                          <td className="px-4 py-2 text-right">-</td>
                          <td className="px-4 py-2 text-right text-red-600">₹774.49</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Payment Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-green-50 p-6 rounded-lg">
                    <div className="text-lg font-bold text-gray-800 mb-4">
                      Payment Information / भुगतान जानकारी
                    </div>
                    <div className="space-y-3">
                      <div>
                        <div className="text-sm text-gray-600">Previous Balance / पिछला बकाया</div>
                        <div className="font-semibold text-green-600">₹0.00</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Current Charges / वर्तमान शुल्क</div>
                        <div className="font-semibold">₹774.49</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Late Payment Charges / विलंब शुल्क</div>
                        <div className="font-semibold">₹0.00</div>
                      </div>
                      <div className="border-t pt-2">
                        <div className="text-sm text-gray-600">Total Amount Payable / कुल देय राशि</div>
                        <div className="font-bold text-2xl text-red-600">₹774.49</div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-yellow-50 p-6 rounded-lg">
                    <div className="text-lg font-bold text-gray-800 mb-4">
                      Connection Details / कनेक्शन विवरण
                    </div>
                    <div className="space-y-3">
                      <div>
                        <div className="text-sm text-gray-600">Connection Type / कनेक्शन प्रकार</div>
                        <div className="font-semibold">Domestic / घरेलू</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Sanctioned Load / स्वीकृत भार</div>
                        <div className="font-semibold">3 KW</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Phase / फेज</div>
                        <div className="font-semibold">Single Phase</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Tariff Category / टैरिफ श्रेणी</div>
                        <div className="font-semibold">Domestic (LT-I)</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Info */}
              <div className="px-8 py-6 bg-gray-50 border-t border-gray-200">
                <div className="text-center">
                  <div className="text-sm text-gray-600 mb-4">
                    <strong>Customer Care:</strong> 1912 | <strong>Website:</strong> www.mahadiscom.in<br />
                    <strong>Emergency:</strong> 1912 | <strong>Email:</strong> care@mahadiscom.in
                  </div>
                  <div className="text-xs text-gray-500">
                    Please pay your bill on time to avoid disconnection. For online payment, visit our website.
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'water':
        return (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-blue-200">
              {/* Header */}
              <div className="bg-blue-600 text-white px-8 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-bold text-lg">💧</span>
                    </div>
                    <div>
                      <div className="text-lg font-bold">PUNE MUNICIPAL CORPORATION</div>
                      <div className="text-sm">Water Supply Department</div>
                      <div className="text-xs">पुणे महानगरपालिका - जल पुरवठा विभाग</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold">WATER BILL</div>
                    <div className="text-sm">जल बिल</div>
                  </div>
                </div>
              </div>

              {/* Bill Details */}
              <div className="px-8 py-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-gray-600">Consumer Name / ग्राहक का नाम</div>
                      <div className="font-bold text-xl text-gray-800">{user?.name?.toUpperCase() || 'RAMESH KUMAR'}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Consumer Number / ग्राहक संख्या</div>
                      <div className="font-bold text-2xl text-blue-600">WB123456789012</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Connection Type / कनेक्शन प्रकार</div>
                      <div className="font-semibold">Domestic / घरेलू</div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-gray-600">Bill Date / बिल की तारीख</div>
                      <div className="font-semibold">15th December 2024</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Due Date / अंतिम तिथि</div>
                      <div className="font-semibold text-red-600">31st December 2024</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Billing Period / बिलिंग अवधि</div>
                      <div className="font-semibold">01-Nov-2024 to 30-Nov-2024</div>
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div className="mb-6">
                  <div className="text-sm text-gray-600 mb-2">Service Address / सेवा पता</div>
                  <div className="font-semibold text-gray-800">
                    Krupa Sindhu Apartment, Flat No. 304<br />
                    Dhayari, Pune - 411041<br />
                    Maharashtra, India
                  </div>
                </div>

                {/* Consumption Details */}
                <div className="bg-blue-50 p-6 rounded-lg mb-6">
                  <div className="text-lg font-bold text-gray-800 mb-4">
                    Water Consumption / जल खपत
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600">1,200</div>
                      <div className="text-sm text-gray-600">Previous Reading</div>
                      <div className="text-sm text-gray-600">पिछली रीडिंग (Liters)</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600">16,200</div>
                      <div className="text-sm text-gray-600">Current Reading</div>
                      <div className="text-sm text-gray-600">वर्तमान रीडिंग (Liters)</div>
                    </div>
                    <div className="text-center bg-blue-100 p-4 rounded-lg">
                      <div className="text-4xl font-bold text-blue-700">15,000</div>
                      <div className="text-sm text-gray-600">Total Consumption</div>
                      <div className="text-sm text-gray-600">कुल खपत (Liters)</div>
                    </div>
                  </div>
                </div>

                {/* Bill Breakdown */}
                <div className="mb-6">
                  <div className="text-lg font-bold text-gray-800 mb-4">Bill Breakdown / बिल विवरण</div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-4 py-2 text-left">Particulars / विवरण</th>
                          <th className="px-4 py-2 text-right">Quantity / मात्रा</th>
                          <th className="px-4 py-2 text-right">Rate / दर</th>
                          <th className="px-4 py-2 text-right">Amount / राशि</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr>
                          <td className="px-4 py-2">Water Charges (0-10,000 L)</td>
                          <td className="px-4 py-2 text-right">10,000 L</td>
                          <td className="px-4 py-2 text-right">₹0.05/L</td>
                          <td className="px-4 py-2 text-right">₹500.00</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="px-4 py-2">Water Charges (10,001-20,000 L)</td>
                          <td className="px-4 py-2 text-right">5,000 L</td>
                          <td className="px-4 py-2 text-right">₹0.08/L</td>
                          <td className="px-4 py-2 text-right">₹400.00</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2">Fixed Charges</td>
                          <td className="px-4 py-2 text-right">-</td>
                          <td className="px-4 py-2 text-right">-</td>
                          <td className="px-4 py-2 text-right">₹150.00</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="px-4 py-2">Maintenance Charges</td>
                          <td className="px-4 py-2 text-right">-</td>
                          <td className="px-4 py-2 text-right">-</td>
                          <td className="px-4 py-2 text-right">₹100.00</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2">GST (18%)</td>
                          <td className="px-4 py-2 text-right">-</td>
                          <td className="px-4 py-2 text-right">-</td>
                          <td className="px-4 py-2 text-right">₹189.00</td>
                        </tr>
                        <tr className="bg-blue-100 font-bold">
                          <td className="px-4 py-2">Total Amount / कुल राशि</td>
                          <td className="px-4 py-2 text-right">15,000 L</td>
                          <td className="px-4 py-2 text-right">-</td>
                          <td className="px-4 py-2 text-right text-blue-600">₹1,339.00</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Payment and Connection Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-green-50 p-6 rounded-lg">
                    <div className="text-lg font-bold text-gray-800 mb-4">Payment Information / भुगतान जानकारी</div>
                    <div className="space-y-3">
                      <div>
                        <div className="text-sm text-gray-600">Previous Balance / पिछला बकाया</div>
                        <div className="font-semibold text-green-600">₹0.00</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Current Charges / वर्तमान शुल्क</div>
                        <div className="font-semibold">₹1,339.00</div>
                      </div>
                      <div className="border-t pt-2">
                        <div className="text-sm text-gray-600">Total Payable / कुल देय राशि</div>
                        <div className="font-bold text-2xl text-blue-600">₹1,339.00</div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-yellow-50 p-6 rounded-lg">
                    <div className="text-lg font-bold text-gray-800 mb-4">Connection Details / कनेक्शन विवरण</div>
                    <div className="space-y-3">
                      <div>
                        <div className="text-sm text-gray-600">Connection Size / कनेक्शन आकार</div>
                        <div className="font-semibold">15mm</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Water Pressure / जल दबाव</div>
                        <div className="font-semibold">Normal</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Connection Date / कनेक्शन तारीख</div>
                        <div className="font-semibold">15/04/2020</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Info */}
              <div className="px-8 py-6 bg-gray-50 border-t border-gray-200">
                <div className="text-center">
                  <div className="text-sm text-gray-600 mb-4">
                    <strong>Helpline:</strong> 1916 | <strong>Website:</strong> www.pmc.gov.in<br />
                    <strong>Emergency:</strong> 1916 | <strong>Email:</strong> water@pmc.gov.in
                  </div>
                  <div className="text-xs text-gray-500">
                    Save water, save life. Report leakages immediately. Online payment available.
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'gas':
        return (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-orange-200">
              {/* Header */}
              <div className="bg-orange-600 text-white px-8 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                      <span className="text-orange-600 font-bold text-lg">🔥</span>
                    </div>
                    <div>
                      <div className="text-lg font-bold">BHARAT GAS</div>
                      <div className="text-sm">Bharat Petroleum Corporation Limited</div>
                      <div className="text-xs">भारत पेट्रोलियम कॉर्पोरेशन लिमिटेड</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold">LPG CONNECTION</div>
                    <div className="text-sm">एलपीजी कनेक्शन</div>
                  </div>
                </div>
              </div>

              {/* Connection Details */}
              <div className="px-8 py-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-gray-600">Consumer Name / ग्राहक का नाम</div>
                      <div className="font-bold text-xl text-gray-800">{user?.name?.toUpperCase() || 'RAMESH KUMAR'}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Consumer Number / ग्राहक संख्या</div>
                      <div className="font-bold text-2xl text-orange-600">GC123456789012</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Connection Type / कनेक्शन प्रकार</div>
                      <div className="font-semibold">Domestic / घरेलू</div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-gray-600">Connection Date / कनेक्शन तारीख</div>
                      <div className="font-semibold">15th April 2020</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">KYC Status / केवाईसी स्थिति</div>
                      <div className="font-semibold text-green-600">Verified / सत्यापित</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Subsidy Status / सब्सिडी स्थिति</div>
                      <div className="font-semibold text-blue-600">Active / सक्रिय</div>
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div className="mb-6">
                  <div className="text-sm text-gray-600 mb-2">Service Address / सेवा पता</div>
                  <div className="font-semibold text-gray-800">
                    Krupa Sindhu Apartment, Flat No. 304<br />
                    Dhayari, Pune - 411041<br />
                    Maharashtra, India
                  </div>
                </div>

                {/* Cylinder Details */}
                <div className="bg-orange-50 p-6 rounded-lg mb-6">
                  <div className="text-lg font-bold text-gray-800 mb-4">
                    Cylinder Information / सिलेंडर जानकारी
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-orange-600">14.2</div>
                      <div className="text-sm text-gray-600">Cylinder Size</div>
                      <div className="text-sm text-gray-600">सिलेंडर आकार (KG)</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-orange-600">₹803</div>
                      <div className="text-sm text-gray-600">Market Price</div>
                      <div className="text-sm text-gray-600">बाजार मूल्य</div>
                    </div>
                    <div className="text-center bg-orange-100 p-4 rounded-lg">
                      <div className="text-4xl font-bold text-orange-700">₹603</div>
                      <div className="text-sm text-gray-600">Subsidized Price</div>
                      <div className="text-sm text-gray-600">सब्सिडी मूल्य</div>
                    </div>
                  </div>
                </div>

                {/* Recent Bookings */}
                <div className="mb-6">
                  <div className="text-lg font-bold text-gray-800 mb-4">Recent Bookings / हाल की बुकिंग</div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-4 py-2 text-left">Booking Date / बुकिंग तारीख</th>
                          <th className="px-4 py-2 text-left">Delivery Date / डिलीवरी तारीख</th>
                          <th className="px-4 py-2 text-right">Amount / राशि</th>
                          <th className="px-4 py-2 text-right">Subsidy / सब्सिडी</th>
                          <th className="px-4 py-2 text-right">Status / स्थिति</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr>
                          <td className="px-4 py-2">10/12/2024</td>
                          <td className="px-4 py-2">12/12/2024</td>
                          <td className="px-4 py-2 text-right">₹603.00</td>
                          <td className="px-4 py-2 text-right text-green-600">₹200.00</td>
                          <td className="px-4 py-2 text-right text-green-600">Delivered</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="px-4 py-2">15/11/2024</td>
                          <td className="px-4 py-2">17/11/2024</td>
                          <td className="px-4 py-2 text-right">₹603.00</td>
                          <td className="px-4 py-2 text-right text-green-600">₹200.00</td>
                          <td className="px-4 py-2 text-right text-green-600">Delivered</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2">20/10/2024</td>
                          <td className="px-4 py-2">22/10/2024</td>
                          <td className="px-4 py-2 text-right">₹603.00</td>
                          <td className="px-4 py-2 text-right text-green-600">₹200.00</td>
                          <td className="px-4 py-2 text-right text-green-600">Delivered</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Distributor and Safety Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <div className="text-lg font-bold text-gray-800 mb-4">Distributor Details / वितरक विवरण</div>
                    <div className="space-y-3">
                      <div>
                        <div className="text-sm text-gray-600">Distributor Name / वितरक का नाम</div>
                        <div className="font-semibold">Shree Ganesh Gas Agency</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Contact Number / संपर्क नंबर</div>
                        <div className="font-semibold">020-1234567</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Address / पता</div>
                        <div className="font-semibold">Dhayari Market, Pune - 411041</div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-red-50 p-6 rounded-lg">
                    <div className="text-lg font-bold text-gray-800 mb-4">Safety Information / सुरक्षा जानकारी</div>
                    <div className="space-y-3">
                      <div>
                        <div className="text-sm text-gray-600">✓ Keep cylinders upright / सिलेंडर सीधा रखें</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">✓ Check for leaks regularly / रिसाव की जांच करें</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">✓ Emergency: 1906 / आपातकाल: 1906</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">✓ Use ISI marked accessories / ISI चिह्नित सामान</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Info */}
              <div className="px-8 py-6 bg-gray-50 border-t border-gray-200">
                <div className="text-center">
                  <div className="text-sm text-gray-600 mb-4">
                    <strong>Customer Care:</strong> 1800-22-4344 | <strong>Website:</strong> www.bharatgas.co.in<br />
                    <strong>Emergency:</strong> 1906 | <strong>Booking:</strong> 7718955555
                  </div>
                  <div className="text-xs text-gray-500">
                    Book your cylinder online or via SMS. Safety first - check for leaks regularly.
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'phone':
        return (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-green-200">
              {/* Header */}
              <div className="bg-green-600 text-white px-8 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                      <span className="text-green-600 font-bold text-lg">📞</span>
                    </div>
                    <div>
                      <div className="text-lg font-bold">BHARTI AIRTEL</div>
                      <div className="text-sm">Bharti Airtel Limited</div>
                      <div className="text-xs">भारती एयरटेल लिमिटेड</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold">MOBILE BILL</div>
                    <div className="text-sm">मोबाइल बिल</div>
                  </div>
                </div>
              </div>

              {/* Account Details */}
              <div className="px-8 py-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-gray-600">Account Holder / खाताधारक</div>
                      <div className="font-bold text-xl text-gray-800">{user?.name?.toUpperCase() || 'RAMESH KUMAR'}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Mobile Number / मोबाइल नंबर</div>
                      <div className="font-bold text-2xl text-green-600">{user?.phoneNumber || '+91 9876543210'}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Account Number / खाता संख्या</div>
                      <div className="font-semibold">AC123456789012</div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-gray-600">Bill Date / बिल तारीख</div>
                      <div className="font-semibold">15th December 2024</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Due Date / अंतिम तिथि</div>
                      <div className="font-semibold text-red-600">31st December 2024</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Billing Period / बिलिंग अवधि</div>
                      <div className="font-semibold">16-Nov-2024 to 15-Dec-2024</div>
                    </div>
                  </div>
                </div>

                {/* Current Plan */}
                <div className="bg-green-50 p-6 rounded-lg mb-6">
                  <div className="text-lg font-bold text-gray-800 mb-4">Current Plan / वर्तमान योजना</div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">₹599</div>
                      <div className="text-sm text-gray-600">Plan Amount</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">Unlimited</div>
                      <div className="text-sm text-gray-600">Voice Calls</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">2GB/Day</div>
                      <div className="text-sm text-gray-600">Data</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">100/Day</div>
                      <div className="text-sm text-gray-600">SMS</div>
                    </div>
                  </div>
                </div>

                {/* Usage Details */}
                <div className="mb-6">
                  <div className="text-lg font-bold text-gray-800 mb-4">Usage Summary / उपयोग सारांश</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600">850</div>
                        <div className="text-sm text-gray-600">Voice Minutes</div>
                        <div className="text-sm text-gray-600">वॉइस मिनट</div>
                      </div>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-purple-600">45.2 GB</div>
                        <div className="text-sm text-gray-600">Data Used</div>
                        <div className="text-sm text-gray-600">डेटा उपयोग</div>
                      </div>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-yellow-600">1,250</div>
                        <div className="text-sm text-gray-600">SMS Sent</div>
                        <div className="text-sm text-gray-600">एसएमएस भेजे</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bill Breakdown */}
                <div className="mb-6">
                  <div className="text-lg font-bold text-gray-800 mb-4">Bill Breakdown / बिल विवरण</div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-4 py-2 text-left">Service / सेवा</th>
                          <th className="px-4 py-2 text-right">Amount / राशि</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr>
                          <td className="px-4 py-2">Monthly Rental (Unlimited Plan)</td>
                          <td className="px-4 py-2 text-right">₹599.00</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="px-4 py-2">Additional Data Charges</td>
                          <td className="px-4 py-2 text-right">₹0.00</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2">Voice Calls (Local/STD)</td>
                          <td className="px-4 py-2 text-right">₹0.00</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="px-4 py-2">SMS Charges</td>
                          <td className="px-4 py-2 text-right">₹0.00</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2">Service Tax</td>
                          <td className="px-4 py-2 text-right">₹89.85</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="px-4 py-2">GST (18%)</td>
                          <td className="px-4 py-2 text-right">₹107.82</td>
                        </tr>
                        <tr className="bg-green-100 font-bold">
                          <td className="px-4 py-2">Total Amount / कुल राशि</td>
                          <td className="px-4 py-2 text-right text-green-600">₹796.67</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Payment and Account Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <div className="text-lg font-bold text-gray-800 mb-4">Payment Information / भुगतान जानकारी</div>
                    <div className="space-y-3">
                      <div>
                        <div className="text-sm text-gray-600">Previous Balance / पिछला बकाया</div>
                        <div className="font-semibold text-green-600">₹0.00</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Current Charges / वर्तमान शुल्क</div>
                        <div className="font-semibold">₹796.67</div>
                      </div>
                      <div className="border-t pt-2">
                        <div className="text-sm text-gray-600">Amount Due / देय राशि</div>
                        <div className="font-bold text-2xl text-green-600">₹796.67</div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-yellow-50 p-6 rounded-lg">
                    <div className="text-lg font-bold text-gray-800 mb-4">Account Details / खाता विवरण</div>
                    <div className="space-y-3">
                      <div>
                        <div className="text-sm text-gray-600">Plan Type / योजना प्रकार</div>
                        <div className="font-semibold">Postpaid / पोस्टपेड</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Network / नेटवर्क</div>
                        <div className="font-semibold">4G/5G</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Account Status / खाता स्थिति</div>
                        <div className="font-semibold text-green-600">Active / सक्रिय</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Info */}
              <div className="px-8 py-6 bg-gray-50 border-t border-gray-200">
                <div className="text-center">
                  <div className="text-sm text-gray-600 mb-4">
                    <strong>Customer Care:</strong> 121 | <strong>Website:</strong> www.airtel.in<br />
                    <strong>WhatsApp:</strong> 7290012345 | <strong>Email:</strong> care@airtel.com
                  </div>
                  <div className="text-xs text-gray-500">
                    Pay online and get instant confirmation. Download MyAirtel app for easy recharges.
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'pollution':
        return (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-green-200">
              {/* Header */}
              <div className="bg-green-600 text-white px-8 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                      <span className="text-green-600 font-bold text-lg">🌿</span>
                    </div>
                    <div>
                      <div className="text-lg font-bold">POLLUTION UNDER CONTROL</div>
                      <div className="text-sm">Ministry of Road Transport & Highways</div>
                      <div className="text-xs">सड़क परिवहन और राजमार्ग मंत्रालय</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold">PUC CERTIFICATE</div>
                    <div className="text-sm">प्रदूषण नियंत्रण प्रमाण पत्र</div>
                  </div>
                </div>
              </div>

              {/* Certificate Content */}
              <div className="px-8 py-8">
                <div className="text-center mb-8">
                  <div className="text-2xl font-bold text-gray-800 mb-2">
                    POLLUTION UNDER CONTROL CERTIFICATE
                  </div>
                  <div className="text-lg font-bold text-gray-800">
                    प्रदूषण नियंत्रण प्रमाण पत्र
                  </div>
                  <div className="text-sm text-gray-600 mt-2">
                    Certificate No. / प्रमाण पत्र संख्या: PUC/MH/2024/123456
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Vehicle Details */}
                  <div className="bg-green-50 p-6 rounded-lg">
                    <div className="text-lg font-bold text-gray-800 mb-4 text-center">
                      Vehicle Information / वाहन की जानकारी
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <div className="text-sm text-gray-600">Registration Number / पंजीकरण संख्या</div>
                          <div className="font-bold text-2xl text-green-600">MH12AB1234</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Owner Name / मालिक का नाम</div>
                          <div className="font-bold text-xl text-gray-800">{user?.name?.toUpperCase() || 'RAMESH KUMAR'}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Vehicle Type / वाहन प्रकार</div>
                          <div className="font-semibold">Motor Car / मोटर कार</div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <div className="text-sm text-gray-600">Engine Number / इंजन संख्या</div>
                          <div className="font-semibold">EN123456789</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Chassis Number / चेसिस संख्या</div>
                          <div className="font-semibold">CH987654321</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Fuel Type / ईंधन प्रकार</div>
                          <div className="font-semibold">Petrol / पेट्रोल</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Emission Test Results */}
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <div className="text-lg font-bold text-gray-800 mb-4 text-center">
                      Emission Test Results / उत्सर्जन परीक्षण परिणाम
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">0.45%</div>
                        <div className="text-sm text-gray-600">CO Emission</div>
                        <div className="text-sm text-gray-600">कार्बन मोनोऑक्साइड</div>
                        <div className="text-xs text-green-600">✓ Within Limits</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">120 ppm</div>
                        <div className="text-sm text-gray-600">HC Emission</div>
                        <div className="text-sm text-gray-600">हाइड्रोकार्बन</div>
                        <div className="text-xs text-green-600">✓ Within Limits</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">1.2</div>
                        <div className="text-sm text-gray-600">Lambda Value</div>
                        <div className="text-sm text-gray-600">लैम्ब्डा मान</div>
                        <div className="text-xs text-green-600">✓ Within Limits</div>
                      </div>
                    </div>
                  </div>

                  {/* Certificate Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <div className="text-sm text-gray-600">Test Date / परीक्षण तिथि</div>
                        <div className="font-semibold">15th December 2024</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Issue Date / जारी करने की तिथि</div>
                        <div className="font-semibold">15th December 2024</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Valid Till / वैधता तक</div>
                        <div className="font-semibold text-green-600">31st March 2025</div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <div className="text-sm text-gray-600">Testing Station / परीक्षण केंद्र</div>
                        <div className="font-semibold">Authorized Testing Center, Dhayari</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Inspector Name / निरीक्षक का नाम</div>
                        <div className="font-semibold">Suresh Patil</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Test Result / परीक्षण परिणाम</div>
                        <div className="font-bold text-green-600">PASS / उत्तीर्ण</div>
                      </div>
                    </div>
                  </div>

                  {/* Standards Information */}
                  <div className="bg-yellow-50 p-6 rounded-lg">
                    <div className="text-lg font-bold text-gray-800 mb-4">
                      Emission Standards / उत्सर्जन मानक
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <div className="font-semibold">CO Limit: <span className="text-green-600">≤ 3.0%</span></div>
                        <div className="text-gray-600">Actual: 0.45%</div>
                      </div>
                      <div>
                        <div className="font-semibold">HC Limit: <span className="text-green-600">≤ 1200 ppm</span></div>
                        <div className="text-gray-600">Actual: 120 ppm</div>
                      </div>
                      <div>
                        <div className="font-semibold">Lambda: <span className="text-green-600">0.9 - 1.3</span></div>
                        <div className="text-gray-600">Actual: 1.2</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Authority Section */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex justify-between items-end">
                    <div>
                      <div className="text-sm text-gray-600">Authorized Testing Station / प्राधिकृत परीक्षण केंद्र</div>
                      <div className="font-semibold text-gray-800">
                        Green Earth Pollution Check Center<br />
                        Dhayari, Pune - 411041<br />
                        License No: PTC/MH/2024/001
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="w-32 h-20 border-2 border-dashed border-gray-300 flex items-center justify-center mb-2">
                        <span className="text-gray-400 text-xs">Official Seal</span>
                      </div>
                      <div className="text-sm text-gray-600">Inspector Signature / निरीक्षक हस्ताक्षर</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'vehicle':
        return (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-blue-200">
              {/* Header */}
              <div className="bg-blue-600 text-white px-8 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-bold text-lg">🚙</span>
                    </div>
                    <div>
                      <div className="text-lg font-bold">REGISTRATION CERTIFICATE</div>
                      <div className="text-sm">Ministry of Road Transport & Highways</div>
                      <div className="text-xs">सड़क परिवहन और राजमार्ग मंत्रालय</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold">RC</div>
                    <div className="text-sm">पंजीकरण प्रमाण पत्र</div>
                  </div>
                </div>
              </div>

              {/* Registration Details */}
              <div className="px-8 py-8">
                <div className="text-center mb-8">
                  <div className="text-2xl font-bold text-gray-800 mb-2">
                    CERTIFICATE OF REGISTRATION
                  </div>
                  <div className="text-lg font-bold text-gray-800">
                    पंजीकरण प्रमाण पत्र
                  </div>
                  <div className="text-sm text-gray-600 mt-2">
                    Form No. 23 / फॉर्म संख्या 23
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Vehicle Registration Number */}
                  <div className="text-center bg-blue-50 p-6 rounded-lg">
                    <div className="text-sm text-gray-600 mb-2">Registration Number / पंजीकरण संख्या</div>
                    <div className="text-5xl font-bold text-blue-600 tracking-wider mb-4">
                      MH12AB1234
                    </div>
                    <div className="text-sm text-gray-600">Maharashtra State</div>
                  </div>

                  {/* Owner Details */}
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="text-lg font-bold text-gray-800 mb-4">
                      Owner Details / मालिक का विवरण
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <div className="text-sm text-gray-600">Name / नाम</div>
                          <div className="font-bold text-xl text-gray-800">{user?.name?.toUpperCase() || 'RAMESH KUMAR'}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Father's Name / पिता का नाम</div>
                          <div className="font-semibold">SURESH KUMAR</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Date of Birth / जन्म तिथि</div>
                          <div className="font-semibold">01/01/1990</div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <div className="text-sm text-gray-600">Mobile Number / मोबाइल नंबर</div>
                          <div className="font-semibold">{user?.phoneNumber || '+91 9876543210'}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Email / ईमेल</div>
                          <div className="font-semibold">ramesh@example.com</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Blood Group / रक्त समूह</div>
                          <div className="font-semibold">B+</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Vehicle Details */}
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <div className="text-lg font-bold text-gray-800 mb-4">
                      Vehicle Details / वाहन का विवरण
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <div className="text-sm text-gray-600">Make / निर्माता</div>
                          <div className="font-semibold text-lg">MARUTI SUZUKI</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Model / मॉडल</div>
                          <div className="font-semibold text-lg">SWIFT DZIRE</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Variant / वेरिएंट</div>
                          <div className="font-semibold">ZXI PLUS</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Body Type / बॉडी टाइप</div>
                          <div className="font-semibold">Sedan / सेडान</div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <div className="text-sm text-gray-600">Engine Number / इंजन संख्या</div>
                          <div className="font-semibold">K12NENG123456</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Chassis Number / चेसिस संख्या</div>
                          <div className="font-semibold">MA3EJKDV9N0123456</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Fuel Type / ईंधन प्रकार</div>
                          <div className="font-semibold">Petrol / पेट्रोल</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Engine Capacity / इंजन क्षमता</div>
                          <div className="font-semibold">1197 cc</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Registration Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-green-50 p-6 rounded-lg">
                      <div className="text-lg font-bold text-gray-800 mb-4">
                        Registration Details / पंजीकरण विवरण
                      </div>
                      <div className="space-y-3">
                        <div>
                          <div className="text-sm text-gray-600">Registration Date / पंजीकरण तिथि</div>
                          <div className="font-semibold">15/04/2020</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Valid Till / वैधता तक</div>
                          <div className="font-semibold text-green-600">14/04/2035</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">RTO Code / आरटीओ कोड</div>
                          <div className="font-semibold">MH12 - Pune East</div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-yellow-50 p-6 rounded-lg">
                      <div className="text-lg font-bold text-gray-800 mb-4">
                        Additional Information / अतिरिक्त जानकारी
                      </div>
                      <div className="space-y-3">
                        <div>
                          <div className="text-sm text-gray-600">Vehicle Class / वाहन श्रेणी</div>
                          <div className="font-semibold">Motor Car (Personal)</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Seating Capacity / बैठने की क्षमता</div>
                          <div className="font-semibold">5 Persons</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Cubic Capacity / घन क्षमता</div>
                          <div className="font-semibold">1197 cc</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="text-lg font-bold text-gray-800 mb-4">
                      Permanent Address / स्थायी पता
                    </div>
                    <div className="font-semibold text-gray-800">
                      Krupa Sindhu Apartment, Flat No. 304<br />
                      Dhayari, Pune - 411041<br />
                      Maharashtra, India
                    </div>
                  </div>
                </div>

                {/* Authority Section */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex justify-between items-end">
                    <div>
                      <div className="text-sm text-gray-600">Registering Authority / पंजीकरण प्राधिकरण</div>
                      <div className="font-semibold text-gray-800">
                        Regional Transport Officer<br />
                        Pune East, Maharashtra<br />
                        Office Code: MH12
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="w-32 h-20 border-2 border-dashed border-gray-300 flex items-center justify-center mb-2">
                        <span className="text-gray-400 text-xs">Official Seal</span>
                      </div>
                      <div className="text-sm text-gray-600">Registrar Signature / रजिस्ट्रार हस्ताक्षर</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'vehicle_insurance':
        return (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-cyan-200">
              {/* Header */}
              <div className="bg-cyan-600 text-white px-8 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                      <span className="text-cyan-600 font-bold text-lg">🚗</span>
                    </div>
                    <div>
                      <div className="text-lg font-bold">BAJAJ ALLIANZ</div>
                      <div className="text-sm">General Insurance Company Limited</div>
                      <div className="text-xs">बजाज आलियांज जनरल इंश्योरेंस कंपनी लिमिटेड</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold">MOTOR INSURANCE</div>
                    <div className="text-sm">मोटर बीमा</div>
                  </div>
                </div>
              </div>

              {/* Policy Details */}
              <div className="px-8 py-8">
                <div className="text-center mb-8">
                  <div className="text-2xl font-bold text-gray-800 mb-2">
                    MOTOR INSURANCE CERTIFICATE
                  </div>
                  <div className="text-lg font-bold text-gray-800">
                    मोटर बीमा प्रमाण पत्र
                  </div>
                  <div className="text-sm text-gray-600 mt-2">
                    Policy No. / पॉलिसी संख्या: VI123456789012345
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Insured Vehicle */}
                  <div className="bg-cyan-50 p-6 rounded-lg">
                    <div className="text-lg font-bold text-gray-800 mb-4 text-center">
                      Insured Vehicle Details / बीमित वाहन का विवरण
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <div className="text-sm text-gray-600">Registration Number / पंजीकरण संख्या</div>
                          <div className="font-bold text-2xl text-cyan-600">MH12AB1234</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Make & Model / निर्माता और मॉडल</div>
                          <div className="font-semibold text-lg">MARUTI SUZUKI SWIFT DZIRE</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Engine Number / इंजन संख्या</div>
                          <div className="font-semibold">K12NENG123456</div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <div className="text-sm text-gray-600">Chassis Number / चेसिस संख्या</div>
                          <div className="font-semibold">MA3EJKDV9N0123456</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Year of Manufacture / निर्माण वर्ष</div>
                          <div className="font-semibold">2020</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Fuel Type / ईंधन प्रकार</div>
                          <div className="font-semibold">Petrol / पेट्रोल</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Policy Holder Details */}
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <div className="text-lg font-bold text-gray-800 mb-4">
                      Policy Holder Details / पॉलिसी धारक का विवरण
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <div className="text-sm text-gray-600">Name / नाम</div>
                          <div className="font-bold text-xl text-gray-800">{user?.name?.toUpperCase() || 'RAMESH KUMAR'}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Mobile Number / मोबाइल नंबर</div>
                          <div className="font-semibold">{user?.phoneNumber || '+91 9876543210'}</div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <div className="text-sm text-gray-600">Email / ईमेल</div>
                          <div className="font-semibold">ramesh@example.com</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">PAN Number / पैन नंबर</div>
                          <div className="font-semibold">ABCDE1234F</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Coverage Details */}
                  <div className="bg-green-50 p-6 rounded-lg">
                    <div className="text-lg font-bold text-gray-800 mb-4">
                      Coverage Details / कवरेज विवरण
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <div className="text-sm text-gray-600">Policy Type / पॉलिसी प्रकार</div>
                          <div className="font-semibold">Comprehensive / व्यापक</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Own Damage Cover / स्वयं की क्षति कवर</div>
                          <div className="font-bold text-green-600">₹8,50,000</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Third Party Cover / तृतीय पक्ष कवर</div>
                          <div className="font-bold text-green-600">Unlimited / असीमित</div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <div className="text-sm text-gray-600">Personal Accident Cover / व्यक्तिगत दुर्घटना कवर</div>
                          <div className="font-bold text-green-600">₹15,00,000</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Zero Depreciation / शून्य मूल्यह्रास</div>
                          <div className="font-semibold text-green-600">Yes / हाँ</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">NCB Discount / एनसीबी छूट</div>
                          <div className="font-semibold text-blue-600">20%</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Policy Period */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-yellow-50 p-6 rounded-lg text-center">
                      <div className="text-sm text-gray-600">Policy Start Date / पॉलिसी प्रारंभ तिथि</div>
                      <div className="font-bold text-lg">15/04/2024</div>
                    </div>
                    <div className="bg-yellow-50 p-6 rounded-lg text-center">
                      <div className="text-sm text-gray-600">Policy End Date / पॉलिसी समाप्ति तिथि</div>
                      <div className="font-bold text-lg text-red-600">14/04/2025</div>
                    </div>
                    <div className="bg-yellow-50 p-6 rounded-lg text-center">
                      <div className="text-sm text-gray-600">Premium Amount / प्रीमियम राशि</div>
                      <div className="font-bold text-2xl text-green-600">₹18,450</div>
                    </div>
                  </div>

                  {/* Additional Benefits */}
                  <div className="bg-purple-50 p-6 rounded-lg">
                    <div className="text-lg font-bold text-gray-800 mb-4">
                      Additional Benefits / अतिरिक्त लाभ
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-green-600">✓</span>
                          <span className="text-sm">24x7 Roadside Assistance / 24x7 रोडसाइड सहायता</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-green-600">✓</span>
                          <span className="text-sm">Engine Protection Cover / इंजन सुरक्षा कवर</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-green-600">✓</span>
                          <span className="text-sm">Key Replacement Cover / चाबी प्रतिस्थापन कवर</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-green-600">✓</span>
                          <span className="text-sm">Consumables Cover / उपभोग्य सामग्री कवर</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-green-600">✓</span>
                          <span className="text-sm">Return to Invoice / चालान पर वापसी</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-green-600">✓</span>
                          <span className="text-sm">NCB Protection / एनसीबी सुरक्षा</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-800 mb-4">
                        For Claims & Support / दावे और सहायता के लिए
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <div className="font-semibold">Claim Helpline / दावा हेल्पलाइन</div>
                          <div className="text-cyan-600 font-bold">1800-103-5555</div>
                        </div>
                        <div>
                          <div className="font-semibold">Customer Care / ग्राहक सेवा</div>
                          <div className="text-cyan-600 font-bold">1800-209-5555</div>
                        </div>
                        <div>
                          <div className="font-semibold">Website / वेबसाइट</div>
                          <div className="text-cyan-600 font-bold">www.bajajallianz.com</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-gray-200">
              <div className="px-8 py-8 text-center">
                <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl">{document.icon}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{document.name}</h3>
                <p className="text-gray-600 mb-6">Detailed document view coming soon</p>
                <div className="max-w-md mx-auto space-y-4">
                  {document.shortDetails.map((detail, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600">{detail.label}:</span>
                      <span className="font-medium">{detail.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  if (selectedView === 'document' && currentDocument) {
    return (
      <div className="space-y-6">
        {/* Back Button */}
        <div className="flex items-center space-x-4">
          <button
            onClick={backToOverview}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            <span>←</span>
            <span>Back to Documents</span>
          </button>
          <div className="text-gray-400">|</div>
          <h1 className="text-2xl font-bold text-gray-900">{currentDocument.name}</h1>
        </div>

        {/* Document Detail */}
        <div className="bg-gray-50 rounded-xl p-8">
          {renderDetailedDocument(currentDocument)}
        </div>

        {/* Document Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📄</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Document Actions</h3>
            <p className="text-gray-600 mb-4">
              This is a secure digital view of your government document. 
              For official use, please visit the respective government office.
            </p>
            <div className="text-sm text-gray-500">
              <p>• Documents are digitally stored and encrypted</p>
              <p>• Use official government portals for certified copies</p>
              <p>• Contact support for any verification needs</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">My Government Documents</h1>
            <p className="text-blue-100">
              {availableDocuments.length} documents available • Only showing documents you have
            </p>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📄</span>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Filter by Category</h2>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredDocuments.map((document) => (
          <div
            key={document.id}
            className={`${document.bgColor} rounded-xl p-6 border-2 border-gray-200 hover:shadow-lg transition-all duration-200 group`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm">
                <span className="text-2xl">{document.icon}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-medium bg-white px-2 py-1 rounded-full">
                  {document.category}
                </span>
                <span className="text-xs font-medium bg-green-100 text-green-800 px-2 py-1 rounded-full">
                  ✓ Available
                </span>
              </div>
            </div>

            <h3 className={`text-lg font-bold ${document.textColor} mb-3`}>
              {document.name}
            </h3>

            <div className="space-y-2 mb-4">
              {document.shortDetails.map((detail, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{detail.label}:</span>
                  <span className="text-sm font-medium text-gray-900">{detail.value}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => viewDocument(document)}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 group-hover:scale-105"
            >
              View Full Document →
            </button>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredDocuments.length === 0 && (
        <div className="text-center py-12">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl">📄</span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No Documents in this Category</h3>
          <p className="text-gray-600 mb-4">Try selecting a different category or check back later.</p>
          <button
            onClick={() => setSelectedCategory('All')}
            className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
          >
            View All Documents
          </button>
        </div>
      )}
    </div>
  );
};

export default Documents; 