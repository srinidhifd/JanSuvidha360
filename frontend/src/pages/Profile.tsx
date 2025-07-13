import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { Icons } from '../components/ui/Icons';
import UserProfileHeaderCard from '../components/UserProfileHeaderCard';

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [activeSection, setActiveSection] = useState('personal');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [saveStatus, setSaveStatus] = useState<string>('');

  // Profile completion calculation
  const calculateProfileCompletion = () => {
    const fields = [
      user?.name, user?.phoneNumber, user?.dateOfBirth, user?.age, user?.gender,
      user?.state, user?.city, user?.address, user?.occupation, user?.annualIncome,
      user?.aadhaarNumber, user?.panNumber
    ];
    const completedFields = fields.filter(field => field && field.toString().trim() !== '').length;
    return Math.round((completedFields / fields.length) * 100);
  };

  const profileCompletion = calculateProfileCompletion();

  // Enhanced sections including settings
  const sections = [
    { id: 'personal', label: 'Personal Info', icon: Icons.User },
    { id: 'location', label: 'Location', icon: Icons.Location },
    { id: 'professional', label: 'Professional', icon: Icons.Briefcase },
    { id: 'documents', label: 'Documents', icon: Icons.File },
    { id: 'settings', label: 'Settings', icon: Icons.Settings },
    { id: 'security', label: 'Security', icon: Icons.Shield },
    { id: 'notifications', label: 'Notifications', icon: Icons.Bell },
    { id: 'privacy', label: 'Privacy', icon: Icons.Lock }
  ];

  const getCompletionColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getCompletionBgColor = (percentage: number) => {
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const handleSave = (section: string) => {
    setSaveStatus(`${section} settings saved successfully!`);
    setTimeout(() => setSaveStatus(''), 3000);
  };

  // --- Section Renderers ---
  const renderPersonalSection = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <div className="bg-gray-50 p-3 rounded-lg text-gray-900">{user?.name || '-'}</div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
          <div className="bg-gray-50 p-3 rounded-lg text-gray-900">{user?.dateOfBirth || '-'}</div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
          <div className="bg-gray-50 p-3 rounded-lg text-gray-900">{user?.gender || '-'}</div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
          <div className="bg-gray-50 p-3 rounded-lg text-gray-900">{user?.phoneNumber || '-'}</div>
        </div>
      </div>
    </div>
  );

  const renderLocationSection = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Location</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
          <div className="bg-gray-50 p-3 rounded-lg text-gray-900">{user?.state || '-'}</div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
          <div className="bg-gray-50 p-3 rounded-lg text-gray-900">{user?.city || '-'}</div>
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
          <div className="bg-gray-50 p-3 rounded-lg text-gray-900">{user?.address || '-'}</div>
        </div>
      </div>
    </div>
  );

  const renderProfessionalSection = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Professional Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Occupation</label>
          <div className="bg-gray-50 p-3 rounded-lg text-gray-900">{user?.occupation || '-'}</div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Annual Income</label>
          <div className="bg-gray-50 p-3 rounded-lg text-gray-900">{user?.annualIncome || '-'}</div>
        </div>
      </div>
    </div>
  );

  const renderDocumentsSection = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Documents</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Aadhaar Number</label>
          <div className="bg-gray-50 p-3 rounded-lg text-gray-900">{user?.aadhaarNumber || '-'}</div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">PAN Number</label>
          <div className="bg-gray-50 p-3 rounded-lg text-gray-900">{user?.panNumber || '-'}</div>
        </div>
      </div>
    </div>
  );

  const renderSettingsSection = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">App Settings</h3>
      
      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-3">Appearance</h4>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">System</option>
              </select>
            </div>
            <label className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Compact mode</span>
              <input type="checkbox" className="text-blue-600" />
            </label>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-3">Language & Region</h4>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="en">English</option>
                <option value="hi">हिंदी (Hindi)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                <option value="Asia/Mumbai">Asia/Mumbai (IST)</option>
              </select>
            </div>
          </div>
        </div>

        <button
          onClick={() => handleSave('Settings')}
          className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Icons.Save className="w-4 h-4" />
          <span>Save Settings</span>
        </button>
      </div>
    </div>
  );

  const renderSecuritySection = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Security Settings</h3>
      
      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-3">Change Password</h4>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <Icons.EyeOff className="w-4 h-4" /> : <Icons.Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
              <input
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <Icons.EyeOff className="w-4 h-4" /> : <Icons.Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              onClick={() => handleSave('Password')}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Icons.Save className="w-4 h-4" />
              <span>Update Password</span>
            </button>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-3">Two-Factor Authentication</h4>
          <p className="text-sm text-gray-600 mb-4">
            Add an extra layer of security to your account with two-factor authentication.
          </p>
          <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            <Icons.Shield className="w-4 h-4" />
            <span>Enable 2FA</span>
          </button>
        </div>
      </div>
    </div>
  );

  const renderNotificationsSection = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Notification Preferences</h3>
      
      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-3">Delivery Methods</h4>
          <div className="space-y-3">
            {[
              { key: 'emailNotifications', label: 'Email notifications', icon: Icons.Mail },
              { key: 'smsNotifications', label: 'SMS notifications', icon: Icons.Phone },
              { key: 'pushNotifications', label: 'Push notifications', icon: Icons.Bell }
            ].map((item) => (
              <label key={item.key} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <item.icon className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-700">{item.label}</span>
                </div>
                <input type="checkbox" className="text-blue-600" defaultChecked />
              </label>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-3">Notification Types</h4>
          <div className="space-y-3">
            {[
              { key: 'schemeUpdates', label: 'New scheme updates and announcements', icon: Icons.Bell },
              { key: 'applicationStatus', label: 'Application status changes', icon: Icons.Shield },
              { key: 'documentExpiry', label: 'Document expiry warnings', icon: Icons.AlertTriangle },
              { key: 'reminderNotifications', label: 'Deadline and reminder notifications', icon: Icons.Clock }
            ].map((item) => (
              <label key={item.key} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <item.icon className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-700">{item.label}</span>
                </div>
                <input type="checkbox" className="text-blue-600" defaultChecked />
              </label>
            ))}
          </div>
        </div>

        <button
          onClick={() => handleSave('Notification')}
          className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Icons.Save className="w-4 h-4" />
          <span>Save Notification Settings</span>
        </button>
      </div>
    </div>
  );

  const renderPrivacySection = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Privacy Settings</h3>
      
      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-3">Profile Visibility</h4>
          <div className="space-y-2">
            {[
              { value: 'public', label: 'Public - Anyone can view your profile' },
              { value: 'private', label: 'Private - Only you can view your profile' },
              { value: 'friends', label: 'Friends - Only approved contacts can view' }
            ].map((option) => (
              <label key={option.value} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="profileVisibility"
                  value={option.value}
                  defaultChecked={option.value === 'private'}
                  className="text-blue-600"
                />
                <span className="text-sm text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-3">Data Usage</h4>
          <div className="space-y-3">
            {[
              { key: 'allowDataSharing', label: 'Allow data sharing with government departments', icon: Icons.Database },
              { key: 'allowAnalytics', label: 'Allow usage analytics for service improvement', icon: Icons.Shield },
              { key: 'allowMarketing', label: 'Allow marketing communications', icon: Icons.Mail }
            ].map((item) => (
              <label key={item.key} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <item.icon className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-700">{item.label}</span>
                </div>
                <input type="checkbox" className="text-blue-600" defaultChecked={item.key === 'allowAnalytics'} />
              </label>
            ))}
          </div>
        </div>

        <button
          onClick={() => handleSave('Privacy')}
          className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Icons.Save className="w-4 h-4" />
          <span>Save Privacy Settings</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 relative">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-3">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="w-full h-full bg-gradient-to-br from-blue-100/10 to-indigo-100/10"></div>
        </div>
      </div>
      
      <UserProfileHeaderCard
        name={user?.name || 'User'}
        subtitle="Government Schemes Portal Member"
        location={user?.city && user?.state ? `${user.city}, ${user.state}` : undefined}
        id={user?.phoneNumber?.slice(-4) || undefined}
        completion={profileCompletion}
        showCompletion={true}
      />

      {/* Save Status */}
      {saveStatus && (
        <div className="bg-green-50 border-l-4 border-green-400 p-4">
          <div className="flex items-center">
            <Icons.Check className="w-5 h-5 text-green-400 mr-2" />
            <span className="text-green-800">{saveStatus}</span>
          </div>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 overflow-hidden hover:bg-white/90 transition-all duration-300">
        <div className="border-b border-gray-200/50">
          <nav className="flex overflow-x-auto">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center space-x-2 py-4 px-6 text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
                  activeSection === section.id
                    ? 'text-blue-600 bg-blue-50/80 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50/80'
                }`}
              >
                <section.icon className="w-4 h-4" />
                <span>{section.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeSection === 'personal' && renderPersonalSection()}
          {activeSection === 'location' && renderLocationSection()}
          {activeSection === 'professional' && renderProfessionalSection()}
          {activeSection === 'documents' && renderDocumentsSection()}
          {activeSection === 'settings' && renderSettingsSection()}
          {activeSection === 'security' && renderSecuritySection()}
          {activeSection === 'notifications' && renderNotificationsSection()}
          {activeSection === 'privacy' && renderPrivacySection()}
        </div>
      </div>
    </div>
  );
};

export default Profile; 