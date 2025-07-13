import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'scheme' | 'application' | 'document' | 'deadline' | 'system';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  date: string;
  isRead: boolean;
  actionLink?: string;
  actionText?: string;
  relatedScheme?: string;
  relatedApplication?: string;
}

const Notifications: React.FC = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'unread' | 'scheme' | 'application' | 'document' | 'deadline' | 'system'>('all');
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>([]);

  // Mock notifications data
  useEffect(() => {
    setTimeout(() => {
      setNotifications([
        {
          id: 'N001',
          title: 'New Scheme Alert: PM Digital Health Mission',
          message: 'A new healthcare scheme has been launched that you may be eligible for. The PM Digital Health Mission provides digital health infrastructure and services.',
          type: 'scheme',
          priority: 'medium',
          date: '2024-01-25T10:30:00Z',
          isRead: false,
          actionLink: '/schemes/pm-digital-health',
          actionText: 'Check Eligibility',
          relatedScheme: 'PM Digital Health Mission'
        },
        {
          id: 'N002',
          title: 'Application Status Update: PM-KISAN',
          message: 'Your PM-KISAN application (APP001) has been approved! The benefit amount of ₹6,000 will be disbursed to your account on February 1, 2024.',
          type: 'application',
          priority: 'high',
          date: '2024-01-20T14:45:00Z',
          isRead: false,
          actionLink: '/applications',
          actionText: 'View Application',
          relatedApplication: 'APP001'
        },
        {
          id: 'N003',
          title: 'Document Expiry Warning: Driving License',
          message: 'Your driving license will expire on March 15, 2024. Renew it soon to avoid interruption in scheme eligibility that requires valid DL.',
          type: 'document',
          priority: 'medium',
          date: '2024-01-18T09:15:00Z',
          isRead: false,
          actionLink: '/documents',
          actionText: 'Update Document'
        },
        {
          id: 'N004',
          title: 'Application Deadline Reminder: National Scholarship Portal',
          message: 'The application deadline for National Scholarship Portal is January 31, 2024. You have 6 days left to complete your application.',
          type: 'deadline',
          priority: 'urgent',
          date: '2024-01-25T08:00:00Z',
          isRead: false,
          actionLink: '/schemes/nsp-scholarship',
          actionText: 'Apply Now'
        },
        {
          id: 'N005',
          title: 'Document Verification Required: NSP Scholarship',
          message: 'Your income certificate for NSP Scholarship application needs to be reuploaded. The current document is not clear and has been rejected.',
          type: 'application',
          priority: 'high',
          date: '2024-01-22T11:20:00Z',
          isRead: true,
          actionLink: '/applications',
          actionText: 'Upload Document',
          relatedApplication: 'APP002'
        },
        {
          id: 'N006',
          title: 'Scheme Update: Ayushman Bharat Coverage Expanded',
          message: 'Ayushman Bharat scheme coverage has been expanded to include more medical procedures. Check if you qualify for additional benefits.',
          type: 'scheme',
          priority: 'medium',
          date: '2024-01-15T16:30:00Z',
          isRead: true,
          actionLink: '/schemes/ayushman-bharat',
          actionText: 'View Updates'
        },
        {
          id: 'N007',
          title: 'System Maintenance Scheduled',
          message: 'JanSuvidha360 platform will undergo maintenance on January 28, 2024, from 2:00 AM to 6:00 AM. Services may be temporarily unavailable.',
          type: 'system',
          priority: 'low',
          date: '2024-01-20T18:00:00Z',
          isRead: true,
          actionLink: '/help',
          actionText: 'Learn More'
        },
        {
          id: 'N008',
          title: 'Profile Completion Reminder',
          message: 'Your profile is 85% complete. Complete your profile to get better scheme recommendations and faster application processing.',
          type: 'system',
          priority: 'medium',
          date: '2024-01-16T12:00:00Z',
          isRead: true,
          actionLink: '/profile',
          actionText: 'Complete Profile'
        },
        {
          id: 'N009',
          title: 'New Eligibility Match: MUDRA Loan',
          message: 'Based on your updated profile, you are now eligible for MUDRA Loan scheme. This scheme provides collateral-free loans up to ₹10 lakh.',
          type: 'scheme',
          priority: 'high',
          date: '2024-01-14T10:45:00Z',
          isRead: true,
          actionLink: '/schemes/mudra-loan',
          actionText: 'View Scheme'
        },
        {
          id: 'N010',
          title: 'Monthly Scheme Digest',
          message: 'Your monthly digest: 3 new schemes added, 2 application updates, 1 document expiry warning. Stay updated with the latest information.',
          type: 'system',
          priority: 'low',
          date: '2024-01-01T00:00:00Z',
          isRead: true,
          actionLink: '/dashboard',
          actionText: 'View Dashboard'
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'scheme': return '🎯';
      case 'application': return '📝';
      case 'document': return '📄';
      case 'deadline': return '⏰';
      case 'system': return '🔧';
      default: return '📢';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'scheme': return 'bg-blue-100 text-blue-800';
      case 'application': return 'bg-purple-100 text-purple-800';
      case 'document': return 'bg-green-100 text-green-800';
      case 'deadline': return 'bg-red-100 text-red-800';
      case 'system': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.isRead;
    return notification.type === filter;
  });

  const markAsRead = (notificationId: string) => {
    setNotifications(notifications.map(n => 
      n.id === notificationId ? { ...n, isRead: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  const deleteNotification = (notificationId: string) => {
    setNotifications(notifications.filter(n => n.id !== notificationId));
  };

  const deleteSelected = () => {
    setNotifications(notifications.filter(n => !selectedNotifications.includes(n.id)));
    setSelectedNotifications([]);
  };

  const toggleNotificationSelection = (notificationId: string) => {
    setSelectedNotifications(prev => 
      prev.includes(notificationId) 
        ? prev.filter(id => id !== notificationId)
        : [...prev, notificationId]
    );
  };

  const getNotificationStats = () => {
    const total = notifications.length;
    const unread = notifications.filter(n => !n.isRead).length;
    const urgent = notifications.filter(n => n.priority === 'urgent').length;
    const high = notifications.filter(n => n.priority === 'high').length;
    
    return { total, unread, urgent, high };
  };

  const stats = getNotificationStats();

  if (loading) return <Loading />;

  return (
    <div className="space-y-6 min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 relative">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-3">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="w-full h-full bg-gradient-to-br from-blue-100/10 to-indigo-100/10"></div>
        </div>
      </div>

      <div className="relative z-10 space-y-8">
        <div className="pt-2 pb-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Notifications Center</h1>
          <p className="text-gray-600 text-base">Stay updated with scheme announcements, application status, and important deadlines</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Notifications</p>
                <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📢</span>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Unread</p>
                <p className="text-3xl font-bold text-blue-600">{stats.unread}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📩</span>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Urgent</p>
                <p className="text-3xl font-bold text-red-600">{stats.urgent}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🚨</span>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">High Priority</p>
                <p className="text-3xl font-bold text-orange-600">{stats.high}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">⚠️</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filter and Actions */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <label className="text-sm font-medium text-gray-700">Filter:</label>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Notifications</option>
                <option value="unread">Unread Only</option>
                <option value="scheme">Scheme Updates</option>
                <option value="application">Application Status</option>
                <option value="document">Document Alerts</option>
                <option value="deadline">Deadlines</option>
                <option value="system">System Notifications</option>
              </select>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={markAllAsRead}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm"
              >
                Mark All as Read
              </button>
              {selectedNotifications.length > 0 && (
                <button
                  onClick={deleteSelected}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 text-sm"
                >
                  Delete Selected ({selectedNotifications.length})
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Notifications</h2>
            
            {filteredNotifications.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📭</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications found</h3>
                <p className="text-gray-600">
                  {filter === 'all' 
                    ? "You're all caught up! No new notifications." 
                    : `No notifications matching filter "${filter}" found.`
                  }
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredNotifications.map((notification) => (
                  <div 
                    key={notification.id} 
                    className={`border rounded-lg p-4 transition-all duration-200 ${
                      notification.isRead ? 'bg-gray-50 border-gray-200' : 'bg-white border-blue-200 shadow-sm'
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <input
                          type="checkbox"
                          checked={selectedNotifications.includes(notification.id)}
                          onChange={() => toggleNotificationSelection(notification.id)}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl">{getTypeIcon(notification.type)}</span>
                            <div className="flex items-center space-x-2">
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(notification.type)}`}>
                                {notification.type}
                              </span>
                              <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(notification.priority)}`}>
                                {notification.priority}
                              </span>
                              {!notification.isRead && (
                                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-500">
                              {new Date(notification.date).toLocaleDateString()}
                            </span>
                            <button
                              onClick={() => deleteNotification(notification.id)}
                              className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </div>
                        <h3 className={`text-lg font-medium mb-2 ${notification.isRead ? 'text-gray-700' : 'text-gray-900'}`}>
                          {notification.title}
                        </h3>
                        <p className={`text-sm mb-3 ${notification.isRead ? 'text-gray-600' : 'text-gray-700'}`}>
                          {notification.message}
                        </p>
                        <div className="flex items-center space-x-4">
                          {notification.actionLink && (
                            <Link
                              to={notification.actionLink}
                              onClick={() => markAsRead(notification.id)}
                              className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                            >
                              {notification.actionText || 'View Details'}
                            </Link>
                          )}
                          {!notification.isRead && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="text-gray-600 hover:text-gray-800 text-sm"
                            >
                              Mark as Read
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Notification Preferences</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Email Notifications</label>
                <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">SMS Notifications</label>
                <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Scheme Updates</label>
                <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Application Status</label>
                <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Document Expiry Alerts</label>
                <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Deadline Reminders</label>
                <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications; 