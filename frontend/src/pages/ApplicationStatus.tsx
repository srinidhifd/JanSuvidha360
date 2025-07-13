import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import UserProfileHeaderCard from '../components/UserProfileHeaderCard';

interface Application {
  id: string;
  schemeId: string;
  schemeName: string;
  applicationDate: string;
  lastUpdated: string;
  status: 'draft' | 'submitted' | 'under_review' | 'document_verification' | 'approved' | 'rejected' | 'disbursed';
  currentStep: number;
  totalSteps: number;
  documents: {
    name: string;
    status: 'pending' | 'verified' | 'rejected' | 'required';
    uploadDate?: string;
    remarks?: string;
  }[];
  timeline: {
    date: string;
    title: string;
    description: string;
    status: 'completed' | 'current' | 'pending';
    remarks?: string;
  }[];
  benefitAmount?: string;
  nextAction?: string;
  rejectionReason?: string;
  estimatedDisbursement?: string;
}

const ApplicationStatus: React.FC = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);

  // Mock application data
  useEffect(() => {
    setTimeout(() => {
      setApplications([
        {
          id: 'APP001',
          schemeId: 'pm-kisan',
          schemeName: 'PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)',
          applicationDate: '2024-01-15',
          lastUpdated: '2024-01-20',
          status: 'approved',
          currentStep: 4,
          totalSteps: 4,
          benefitAmount: '₹6,000/year',
          estimatedDisbursement: '2024-02-01',
          documents: [
            { name: 'Aadhaar Card', status: 'verified', uploadDate: '2024-01-15' },
            { name: 'Land Ownership Documents', status: 'verified', uploadDate: '2024-01-15' },
            { name: 'Bank Account Details', status: 'verified', uploadDate: '2024-01-15' }
          ],
          timeline: [
            {
              date: '2024-01-15',
              title: 'Application Submitted',
              description: 'Your application has been successfully submitted',
              status: 'completed'
            },
            {
              date: '2024-01-16',
              title: 'Document Verification',
              description: 'All documents verified successfully',
              status: 'completed'
            },
            {
              date: '2024-01-18',
              title: 'Eligibility Check',
              description: 'Eligibility criteria verified',
              status: 'completed'
            },
            {
              date: '2024-01-20',
              title: 'Application Approved',
              description: 'Congratulations! Your application has been approved',
              status: 'completed'
            }
          ],
          nextAction: 'Benefit disbursement scheduled for February 1, 2024'
        },
        {
          id: 'APP002',
          schemeId: 'nsp-scholarship',
          schemeName: 'National Scholarship Portal - Merit Scholarship',
          applicationDate: '2024-01-10',
          lastUpdated: '2024-01-22',
          status: 'document_verification',
          currentStep: 2,
          totalSteps: 4,
          benefitAmount: '₹20,000/year',
          documents: [
            { name: 'Aadhaar Card', status: 'verified', uploadDate: '2024-01-10' },
            { name: 'Income Certificate', status: 'rejected', uploadDate: '2024-01-10', remarks: 'Document not clear, please reupload' },
            { name: 'Mark Sheets', status: 'verified', uploadDate: '2024-01-10' },
            { name: 'Bank Account Details', status: 'pending', uploadDate: '2024-01-10' }
          ],
          timeline: [
            {
              date: '2024-01-10',
              title: 'Application Submitted',
              description: 'Your application has been successfully submitted',
              status: 'completed'
            },
            {
              date: '2024-01-12',
              title: 'Document Verification',
              description: 'Document verification in progress',
              status: 'current',
              remarks: 'Income certificate needs to be reuploaded'
            },
            {
              date: '',
              title: 'Eligibility Check',
              description: 'Pending document verification completion',
              status: 'pending'
            },
            {
              date: '',
              title: 'Final Approval',
              description: 'Awaiting previous steps completion',
              status: 'pending'
            }
          ],
          nextAction: 'Please reupload Income Certificate with clear image'
        },
        {
          id: 'APP003',
          schemeId: 'ayushman-bharat',
          schemeName: 'Ayushman Bharat - PM-JAY',
          applicationDate: '2024-01-05',
          lastUpdated: '2024-01-25',
          status: 'rejected',
          currentStep: 3,
          totalSteps: 4,
          documents: [
            { name: 'Aadhaar Card', status: 'verified', uploadDate: '2024-01-05' },
            { name: 'Ration Card', status: 'verified', uploadDate: '2024-01-05' },
            { name: 'Income Certificate', status: 'verified', uploadDate: '2024-01-05' }
          ],
          timeline: [
            {
              date: '2024-01-05',
              title: 'Application Submitted',
              description: 'Your application has been successfully submitted',
              status: 'completed'
            },
            {
              date: '2024-01-08',
              title: 'Document Verification',
              description: 'All documents verified successfully',
              status: 'completed'
            },
            {
              date: '2024-01-25',
              title: 'Application Rejected',
              description: 'Application rejected due to eligibility criteria',
              status: 'completed'
            }
          ],
          rejectionReason: 'Your family income exceeds the maximum limit of ₹1.2 lakh per annum as per SECC 2011 data',
          nextAction: 'You can reapply when your family income falls within the eligible range'
        },
        {
          id: 'APP004',
          schemeId: 'startup-india',
          schemeName: 'Startup India Initiative',
          applicationDate: '2024-01-20',
          lastUpdated: '2024-01-23',
          status: 'under_review',
          currentStep: 3,
          totalSteps: 4,
          benefitAmount: 'Tax exemption for 3 years',
          documents: [
            { name: 'Aadhaar Card', status: 'verified', uploadDate: '2024-01-20' },
            { name: 'Business Registration Certificate', status: 'verified', uploadDate: '2024-01-20' },
            { name: 'Innovation Certificate', status: 'verified', uploadDate: '2024-01-20' },
            { name: 'Bank Account Details', status: 'verified', uploadDate: '2024-01-20' }
          ],
          timeline: [
            {
              date: '2024-01-20',
              title: 'Application Submitted',
              description: 'Your application has been successfully submitted',
              status: 'completed'
            },
            {
              date: '2024-01-21',
              title: 'Document Verification',
              description: 'All documents verified successfully',
              status: 'completed'
            },
            {
              date: '2024-01-23',
              title: 'Under Review',
              description: 'Application is under review by expert committee',
              status: 'current'
            },
            {
              date: '',
              title: 'Final Decision',
              description: 'Awaiting review completion',
              status: 'pending'
            }
          ],
          nextAction: 'Please wait for expert committee review. Expected completion: January 30, 2024'
        },
        {
          id: 'APP005',
          schemeId: 'pmay-urban',
          schemeName: 'Pradhan Mantri Awas Yojana - Urban',
          applicationDate: '2024-01-01',
          lastUpdated: '2024-01-28',
          status: 'disbursed',
          currentStep: 4,
          totalSteps: 4,
          benefitAmount: '₹2,67,000 subsidy',
          documents: [
            { name: 'Aadhaar Card', status: 'verified', uploadDate: '2024-01-01' },
            { name: 'Income Certificate', status: 'verified', uploadDate: '2024-01-01' },
            { name: 'Property Documents', status: 'verified', uploadDate: '2024-01-01' },
            { name: 'Bank Statements', status: 'verified', uploadDate: '2024-01-01' }
          ],
          timeline: [
            {
              date: '2024-01-01',
              title: 'Application Submitted',
              description: 'Your application has been successfully submitted',
              status: 'completed'
            },
            {
              date: '2024-01-05',
              title: 'Document Verification',
              description: 'All documents verified successfully',
              status: 'completed'
            },
            {
              date: '2024-01-15',
              title: 'Application Approved',
              description: 'Your application has been approved',
              status: 'completed'
            },
            {
              date: '2024-01-28',
              title: 'Benefit Disbursed',
              description: 'Subsidy amount has been credited to your account',
              status: 'completed'
            }
          ],
          nextAction: 'Benefit successfully disbursed. Check your bank account for credit confirmation'
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'submitted': return 'bg-blue-100 text-blue-800';
      case 'under_review': return 'bg-yellow-100 text-yellow-800';
      case 'document_verification': return 'bg-purple-100 text-purple-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'disbursed': return 'bg-emerald-100 text-emerald-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'draft': return 'Draft';
      case 'submitted': return 'Submitted';
      case 'under_review': return 'Under Review';
      case 'document_verification': return 'Document Verification';
      case 'approved': return 'Approved';
      case 'rejected': return 'Rejected';
      case 'disbursed': return 'Disbursed';
      default: return 'Unknown';
    }
  };

  const getDocumentStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'verified': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'required': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredApplications = applications.filter(app => {
    if (activeTab === 'all') return true;
    return app.status === activeTab;
  });

  const getApplicationStats = () => {
    const total = applications.length;
    const approved = applications.filter(app => app.status === 'approved' || app.status === 'disbursed').length;
    const pending = applications.filter(app => ['submitted', 'under_review', 'document_verification'].includes(app.status)).length;
    const rejected = applications.filter(app => app.status === 'rejected').length;
    
    return { total, approved, pending, rejected };
  };

  const stats = getApplicationStats();

  if (loading) return <Loading />;

  return (
    <div className="space-y-8 min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 relative">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-3">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="w-full h-full bg-gradient-to-br from-blue-100/10 to-indigo-100/10"></div>
        </div>
      </div>

      <div className="pt-2 pb-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">Applications</h1>
        <p className="text-gray-600 text-base">Track your scheme applications and monitor progress</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Applications</p>
              <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📝</span>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Approved</p>
              <p className="text-3xl font-bold text-green-600">{stats.approved}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">✅</span>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">⏳</span>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Rejected</p>
              <p className="text-3xl font-bold text-red-600">{stats.rejected}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">❌</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 overflow-hidden">
        <nav className="flex overflow-x-auto">
          {[
            { id: 'all', label: 'All Applications', count: stats.total },
            { id: 'submitted', label: 'Submitted', count: applications.filter(app => app.status === 'submitted').length },
            { id: 'under_review', label: 'Under Review', count: applications.filter(app => app.status === 'under_review').length },
            { id: 'document_verification', label: 'Document Verification', count: applications.filter(app => app.status === 'document_verification').length },
            { id: 'approved', label: 'Approved', count: applications.filter(app => app.status === 'approved').length },
            { id: 'disbursed', label: 'Disbursed', count: applications.filter(app => app.status === 'disbursed').length },
            { id: 'rejected', label: 'Rejected', count: applications.filter(app => app.status === 'rejected').length }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 min-w-0 py-4 px-6 text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'text-blue-600 bg-blue-50/80 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50/80'
              }`}
            >
              {tab.label}
              {tab.count > 0 && (
                <span className="ml-2 px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded-full">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Applications List */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Applications</h2>
          
          {filteredApplications.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📋</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No applications found</h3>
              <p className="text-gray-600 mb-4">
                {activeTab === 'all' 
                  ? "You haven't applied for any schemes yet." 
                  : `No applications with status "${getStatusText(activeTab)}" found.`
                }
              </p>
              <Link 
                to="/schemes"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Browse Schemes
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredApplications.map((app) => (
                <div key={app.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{app.schemeName}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>App ID: {app.id}</span>
                        <span>Applied: {new Date(app.applicationDate).toLocaleDateString()}</span>
                        <span>Updated: {new Date(app.lastUpdated).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(app.status)}`}>
                        {getStatusText(app.status)}
                      </span>
                      {app.benefitAmount && (
                        <span className="text-sm font-medium text-green-600">{app.benefitAmount}</span>
                      )}
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Progress</span>
                      <span className="text-sm font-medium text-gray-700">{app.currentStep}/{app.totalSteps}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(app.currentStep / app.totalSteps) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Next Action */}
                  {app.nextAction && (
                    <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <strong>Next Action:</strong> {app.nextAction}
                      </p>
                    </div>
                  )}

                  {/* Rejection Reason */}
                  {app.rejectionReason && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-sm text-red-800">
                        <strong>Rejection Reason:</strong> {app.rejectionReason}
                      </p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setSelectedApplication(app)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm"
                    >
                      View Details
                    </button>
                    <Link
                      to={`/schemes/${app.schemeId}`}
                      className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-200 text-sm"
                    >
                      View Scheme
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Application Details Modal */}
      {selectedApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Application Details</h2>
                <button
                  onClick={() => setSelectedApplication(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Application Info */}
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-bold text-gray-900 mb-2">Application Information</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Application ID:</span>
                        <span className="font-medium">{selectedApplication.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Scheme:</span>
                        <span className="font-medium">{selectedApplication.schemeName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status:</span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(selectedApplication.status)}`}>
                          {getStatusText(selectedApplication.status)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Applied On:</span>
                        <span className="font-medium">{new Date(selectedApplication.applicationDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Last Updated:</span>
                        <span className="font-medium">{new Date(selectedApplication.lastUpdated).toLocaleDateString()}</span>
                      </div>
                      {selectedApplication.benefitAmount && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Benefit Amount:</span>
                          <span className="font-medium text-green-600">{selectedApplication.benefitAmount}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Document Status */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-bold text-gray-900 mb-2">Document Status</h3>
                    <div className="space-y-2">
                      {selectedApplication.documents.map((doc, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-white rounded">
                          <span className="text-sm text-gray-700">{doc.name}</span>
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDocumentStatusColor(doc.status)}`}>
                              {doc.status}
                            </span>
                            {doc.remarks && (
                              <span className="text-xs text-red-600" title={doc.remarks}>
                                ⚠️
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Timeline */}
                <div>
                  <h3 className="font-bold text-gray-900 mb-4">Application Timeline</h3>
                  <div className="space-y-4">
                    {selectedApplication.timeline.map((event, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className={`w-3 h-3 rounded-full mt-1 ${
                          event.status === 'completed' ? 'bg-green-500' :
                          event.status === 'current' ? 'bg-blue-500' :
                          'bg-gray-300'
                        }`}></div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-gray-900">{event.title}</h4>
                            {event.date && (
                              <span className="text-sm text-gray-500">{new Date(event.date).toLocaleDateString()}</span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">{event.description}</p>
                          {event.remarks && (
                            <p className="text-sm text-orange-600 mt-1">{event.remarks}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationStatus; 