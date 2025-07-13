import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';

// Simple icon components to replace lucide-react
const Shield = ({ className }: { className?: string }) => <span className={className}>🛡️</span>;
const Lock = ({ className }: { className?: string }) => <span className={className}>🔒</span>;
const Eye = ({ className }: { className?: string }) => <span className={className}>👁️</span>;
const Database = ({ className }: { className?: string }) => <span className={className}>💾</span>;
const Users = ({ className }: { className?: string }) => <span className={className}>👥</span>;
const Globe = ({ className }: { className?: string }) => <span className={className}>🌐</span>;
const FileText = ({ className }: { className?: string }) => <span className={className}>📄</span>;
const CheckCircle = ({ className }: { className?: string }) => <span className={className}>✅</span>;
const AlertTriangle = ({ className }: { className?: string }) => <span className={className}>⚠️</span>;
const Calendar = ({ className }: { className?: string }) => <span className={className}>📅</span>;
const Mail = ({ className }: { className?: string }) => <span className={className}>📧</span>;
const Phone = ({ className }: { className?: string }) => <span className={className}>📞</span>;
const MapPin = ({ className }: { className?: string }) => <span className={className}>📍</span>;
const ChevronDown = ({ className }: { className?: string }) => <span className={className}>⬇️</span>;
const ChevronRight = ({ className }: { className?: string }) => <span className={className}>▶️</span>;
const ExternalLink = ({ className }: { className?: string }) => <span className={className}>🔗</span>;
const Download = ({ className }: { className?: string }) => <span className={className}>⬇️</span>;

interface PolicySection {
  id: string;
  title: string;
  icon: React.FC<any>;
  content: React.ReactNode;
  isExpanded?: boolean;
}

const PrivacyPolicy: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['overview']));

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const policySections: PolicySection[] = [
    {
      id: 'overview',
      title: 'Overview & Introduction',
      icon: Shield,
      content: (
        <div className="space-y-4">
          <p className="text-gray-700">
            JanSuvidha360 ("we," "our," or "us") is committed to protecting your privacy and ensuring 
            the security of your personal information. This Privacy Policy explains how we collect, use, 
            disclose, and safeguard your information when you use our digital platform for government services.
          </p>
          <p className="text-gray-700">
            This policy is compliant with the Information Technology Act, 2000, Personal Data Protection Bill, 
            and other applicable Indian laws and regulations governing data protection and privacy.
          </p>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Key Principles</h4>
            <ul className="space-y-1 text-blue-800 text-sm">
              <li>• Transparency in data collection and usage</li>
              <li>• Purpose limitation and data minimization</li>
              <li>• Secure storage and transmission of data</li>
              <li>• User control and consent management</li>
              <li>• Regular audits and compliance monitoring</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'collection',
      title: 'Information We Collect',
      icon: Database,
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Personal Information</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h5 className="font-medium text-gray-900 mb-2">Identity Information</h5>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Full name and date of birth</li>
                  <li>• Aadhaar number and PAN details</li>
                  <li>• Contact information (email, phone)</li>
                  <li>• Address and location data</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h5 className="font-medium text-gray-900 mb-2">Government Documents</h5>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Aadhaar card copies</li>
                  <li>• PAN card documents</li>
                  <li>• Income certificates</li>
                  <li>• Caste certificates</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Usage Information</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h5 className="font-medium text-gray-900 mb-2">Platform Usage</h5>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Application submissions and status</li>
                  <li>• Scheme preferences and favorites</li>
                  <li>• Search queries and interactions</li>
                  <li>• Notification preferences</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h5 className="font-medium text-gray-900 mb-2">Technical Data</h5>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Device information and IP address</li>
                  <li>• Browser type and version</li>
                  <li>• Usage patterns and analytics</li>
                  <li>• Error logs and performance data</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'usage',
      title: 'How We Use Your Information',
      icon: Eye,
      content: (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Primary Purposes</h4>
              <ul className="space-y-3">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <span className="text-gray-700">Process government scheme applications</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <span className="text-gray-700">Verify eligibility and authenticate users</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <span className="text-gray-700">Provide personalized scheme recommendations</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <span className="text-gray-700">Send status updates and notifications</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Secondary Purposes</h4>
              <ul className="space-y-3">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <span className="text-gray-700">Improve platform functionality and user experience</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <span className="text-gray-700">Generate analytics and performance reports</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <span className="text-gray-700">Ensure platform security and prevent fraud</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <span className="text-gray-700">Comply with legal and regulatory requirements</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <h5 className="font-semibold text-yellow-900 mb-2">Important Notice</h5>
                <p className="text-yellow-800 text-sm">
                  We will never sell, rent, or trade your personal information to third parties for 
                  marketing purposes. Your data is used solely for government service delivery and 
                  platform improvement.
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'sharing',
      title: 'Information Sharing & Disclosure',
      icon: Users,
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Government Departments</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <h5 className="font-medium text-green-900 mb-2">Authorized Sharing</h5>
                <ul className="space-y-1 text-sm text-green-800">
                  <li>• Ministry of Electronics & IT</li>
                  <li>• Ministry of Rural Development</li>
                  <li>• Ministry of Social Justice</li>
                  <li>• State Government Departments</li>
                </ul>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h5 className="font-medium text-blue-900 mb-2">Purpose of Sharing</h5>
                <ul className="space-y-1 text-sm text-blue-800">
                  <li>• Scheme eligibility verification</li>
                  <li>• Application processing</li>
                  <li>• Benefit distribution</li>
                  <li>• Compliance monitoring</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Third-Party Service Providers</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h5 className="font-medium text-gray-900">Cloud Storage Providers</h5>
                  <p className="text-sm text-gray-600">Secure document storage and backup</p>
                </div>
                <Badge variant="success">Encrypted</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h5 className="font-medium text-gray-900">Analytics Services</h5>
                  <p className="text-sm text-gray-600">Platform usage and performance monitoring</p>
                </div>
                <Badge variant="primary">Anonymized</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h5 className="font-medium text-gray-900">Security Services</h5>
                  <p className="text-sm text-gray-600">Fraud detection and threat prevention</p>
                </div>
                <Badge variant="warning">Restricted Access</Badge>
              </div>
            </div>
          </div>

          <div className="bg-red-50 p-4 rounded-lg">
            <h4 className="font-semibold text-red-900 mb-2">Legal Requirements</h4>
            <p className="text-red-800 text-sm">
              We may disclose your information when required by law, court order, or government 
              request, or to protect our rights, property, or safety, or that of our users or the public.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'security',
      title: 'Data Security & Protection',
      icon: Lock,
      content: (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Technical Safeguards</h4>
              <ul className="space-y-3">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <span className="text-gray-700">256-bit SSL encryption for data transmission</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <span className="text-gray-700">Multi-factor authentication for user accounts</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <span className="text-gray-700">Regular security audits and penetration testing</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <span className="text-gray-700">Secure data centers with 24/7 monitoring</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Organizational Measures</h4>
              <ul className="space-y-3">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <span className="text-gray-700">Employee training on data protection</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <span className="text-gray-700">Access controls and role-based permissions</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <span className="text-gray-700">Incident response and breach notification</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <span className="text-gray-700">Regular compliance assessments</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Certifications & Compliance</h4>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 mb-1">ISO 27001</div>
                <div className="text-sm text-blue-800">Information Security Management</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 mb-1">STQC</div>
                <div className="text-sm text-blue-800">Standardisation Testing & Quality Certification</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 mb-1">GDPR</div>
                <div className="text-sm text-blue-800">General Data Protection Regulation</div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'rights',
      title: 'Your Rights & Choices',
      icon: Shield,
      content: (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Access & Control</h4>
              <ul className="space-y-3">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <span className="text-gray-700">Access your personal information</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <span className="text-gray-700">Correct inaccurate or incomplete data</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <span className="text-gray-700">Request deletion of your data</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <span className="text-gray-700">Export your data in portable format</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Communication Preferences</h4>
              <ul className="space-y-3">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <span className="text-gray-700">Control notification settings</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <span className="text-gray-700">Opt-out of marketing communications</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <span className="text-gray-700">Manage data sharing preferences</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <span className="text-gray-700">Withdraw consent at any time</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold text-green-900 mb-2">How to Exercise Your Rights</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-medium text-green-900 mb-2">Online Portal</h5>
                <p className="text-green-800 text-sm">
                  Access your data and manage preferences through your account settings.
                </p>
              </div>
              <div>
                <h5 className="font-medium text-green-900 mb-2">Contact Us</h5>
                <p className="text-green-800 text-sm">
                  Email: privacy@jansuvidha360.gov.in<br />
                  Phone: 1800-XXX-XXXX
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'retention',
      title: 'Data Retention & Deletion',
      icon: Calendar,
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Retention Periods</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h5 className="font-medium text-gray-900 mb-2">Application Data</h5>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Active applications: 7 years</li>
                  <li>• Completed applications: 10 years</li>
                  <li>• Rejected applications: 3 years</li>
                  <li>• Supporting documents: 10 years</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h5 className="font-medium text-gray-900 mb-2">User Account Data</h5>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Profile information: Until deletion</li>
                  <li>• Login sessions: 90 days</li>
                  <li>• Activity logs: 2 years</li>
                  <li>• Analytics data: 3 years</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-orange-50 p-4 rounded-lg">
            <h4 className="font-semibold text-orange-900 mb-2">Automatic Deletion</h4>
            <p className="text-orange-800 text-sm">
              Data is automatically deleted after the retention period expires, unless required 
              for legal or regulatory compliance. You can request early deletion through your 
              account settings or by contacting our support team.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Deletion Process</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-blue-600">1</span>
                </div>
                <span className="text-gray-700">Submit deletion request through account settings</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-blue-600">2</span>
                </div>
                <span className="text-gray-700">Verification of identity and account ownership</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-blue-600">3</span>
                </div>
                <span className="text-gray-700">Processing and secure deletion of data</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-blue-600">4</span>
                </div>
                <span className="text-gray-700">Confirmation email with deletion summary</span>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'contact',
      title: 'Contact Information',
      icon: Mail,
      content: (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Privacy Team</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-gray-500" />
                  <div>
                    <div className="font-medium text-gray-900">Email</div>
                    <div className="text-sm text-gray-600">privacy@jansuvidha360.gov.in</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-gray-500" />
                  <div>
                    <div className="font-medium text-gray-900">Phone</div>
                    <div className="text-sm text-gray-600">1800-XXX-XXXX</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-gray-500" />
                  <div>
                    <div className="font-medium text-gray-900">Address</div>
                    <div className="text-sm text-gray-600">
                      Ministry of Electronics & IT<br />
                      New Delhi, India 110001
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Response Time</h4>
              <div className="space-y-3">
                <div className="bg-green-50 p-3 rounded-lg">
                  <div className="font-medium text-green-900">General Inquiries</div>
                  <div className="text-sm text-green-800">Within 48 hours</div>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="font-medium text-blue-900">Data Requests</div>
                  <div className="text-sm text-blue-800">Within 30 days</div>
                </div>
                <div className="bg-orange-50 p-3 rounded-lg">
                  <div className="font-medium text-orange-900">Complaints</div>
                  <div className="text-sm text-orange-800">Within 7 days</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2">Additional Resources</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-medium text-gray-900 mb-2">Legal Framework</h5>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Information Technology Act, 2000</li>
                  <li>• Personal Data Protection Bill</li>
                  <li>• Digital India Guidelines</li>
                  <li>• Right to Information Act</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-gray-900 mb-2">Related Policies</h5>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Terms of Service</li>
                  <li>• Cookie Policy</li>
                  <li>• Security Policy</li>
                  <li>• Grievance Redressal</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
            <div className="flex items-center space-x-3">
              <Shield className="w-8 h-8" />
              <div>
                <h1 className="text-2xl font-bold">Privacy Policy</h1>
                <p className="text-blue-100">Your privacy and data protection rights</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="space-y-4">
              {policySections.map((section) => (
                <Card key={section.id} className="overflow-hidden">
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <section.icon className="w-5 h-5 text-blue-600" />
                      <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
                    </div>
                    {expandedSections.has(section.id) ? (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-500" />
                    )}
                  </button>
                  
                  {expandedSections.has(section.id) && (
                    <div className="px-6 pb-6 border-t border-gray-200">
                      {section.content}
                    </div>
                  )}
                </Card>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-8 p-6 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">
                    Last updated: January 15, 2024
                  </p>
                  <p className="text-sm text-gray-600">
                    Version: 2.1
                  </p>
                </div>
                <div className="flex space-x-3">
                  <Button variant="outline" size="sm" rightIcon={<Download className="w-4 h-4" />}>
                    Download PDF
                  </Button>
                  <Button variant="outline" size="sm" rightIcon={<ExternalLink className="w-4 h-4" />}>
                    Print Version
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy; 