import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { schemesAPI } from '../services/api';
import { Scheme } from '../types';
import Loading from '../components/Loading';
import { Icons } from '../components/ui/Icons';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, Legend
} from 'recharts';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [eligibilityResults, setEligibilityResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        try {
          const eligibilityResponse = await schemesAPI.getEligibilityResults();
          if (eligibilityResponse.success) {
            setEligibilityResults(eligibilityResponse.data || []);
          }
        } catch {
          const schemesResponse = await schemesAPI.getAllSchemes();
          if (schemesResponse.success) {
            setSchemes(schemesResponse.data || []);
          }
        }
      } catch (err) {
        setError('Network error. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Define a MoneyBag icon for the emoji
  const MoneyBag = (props: { className?: string }) => <span className={props.className}>💰</span>;

  // Stat Cards Data
  const statCards = [
    { label: 'Total Applications', value: 5, icon: Icons.Documents, color: 'bg-blue-500' },
    { label: 'Approved', value: 2, icon: Icons.Check, color: 'bg-green-500' },
    { label: 'Pending', value: 2, icon: Icons.Clock, color: 'bg-yellow-500' },
    { label: 'Rejected', value: 1, icon: Icons.X, color: 'bg-red-100 text-red-500' },
  ];

  // Recent Activity
  const recentActivities = [
    {
      id: 1,
      type: 'application',
      title: 'PM-KISAN Application Approved',
      description: 'Your application for PM-KISAN scheme has been approved',
      time: '2 hours ago',
      icon: Icons.Check,
      color: 'text-green-600'
    },
    {
      id: 2,
      type: 'document',
      title: 'Document Uploaded',
      description: 'Income certificate uploaded for NSP Scholarship',
      time: '1 day ago',
      icon: Icons.Documents,
      color: 'text-blue-600'
    },
    {
      id: 3,
      type: 'scheme',
      title: 'New Scheme Match',
      description: 'You are now eligible for MUDRA Loan scheme',
      time: '2 days ago',
      icon: Icons.Star,
      color: 'text-purple-600'
    },
    {
      id: 4,
      type: 'notification',
      title: 'Document Expiry Alert',
      description: 'Your driving license will expire in 30 days',
      time: '3 days ago',
      icon: Icons.AlertTriangle,
      color: 'text-orange-600'
    }
  ];

  // Trending Schemes
  const trendingSchemes = [
    {
      id: 'pm-kisan',
      name: 'PM-KISAN',
      applications: '2.5M+',
      category: 'Agriculture',
      icon: Icons.PAN,
      growth: '+15%'
    },
    {
      id: 'ayushman-bharat',
      name: 'Ayushman Bharat',
      applications: '1.8M+',
      category: 'Healthcare',
      icon: Icons.Shield,
      growth: '+22%'
    },
    {
      id: 'nsp-scholarship',
      name: 'NSP Scholarship',
      applications: '1.2M+',
      category: 'Education',
      icon: Icons.User,
      growth: '+8%'
    },
    {
      id: 'mudra-loan',
      name: 'MUDRA Loan',
      applications: '950K+',
      category: 'Business',
      icon: Icons.PAN,
      growth: '+18%'
    }
  ];

  // Document Alerts
  const documentAlerts = [
    {
      id: 1,
      type: 'expiry',
      title: 'Driving License Expiry',
      description: 'Expires on March 15, 2024',
      daysLeft: 45,
      severity: 'warning',
      action: 'Renew Now'
    },
    {
      id: 2,
      type: 'verification',
      title: 'Income Certificate',
      description: 'Verification pending for NSP application',
      daysLeft: null,
      severity: 'info',
      action: 'Check Status'
    },
    {
      id: 3,
      type: 'required',
      title: 'Bank Statement',
      description: 'Required for PMAY application',
      daysLeft: null,
      severity: 'error',
      action: 'Upload Now'
    }
  ];

  // Analytics Data (mock)
  const applicationsOverTime = [
    { month: 'Jan', Applications: 2 },
    { month: 'Feb', Applications: 3 },
    { month: 'Mar', Applications: 4 },
    { month: 'Apr', Applications: 5 },
    { month: 'May', Applications: 7 },
    { month: 'Jun', Applications: 6 },
    { month: 'Jul', Applications: 8 },
    { month: 'Aug', Applications: 9 },
    { month: 'Sep', Applications: 10 },
    { month: 'Oct', Applications: 12 },
    { month: 'Nov', Applications: 11 },
    { month: 'Dec', Applications: 13 },
  ];
  const eligibilityDistribution = [
    { name: 'Eligible', value: 5 },
    { name: 'Ineligible', value: 2 },
  ];
  const eligibilityColors = ['#34d399', '#f87171'];
  const documentStatus = [
    { name: 'Linked', value: 8 },
    { name: 'Pending', value: 2 },
    { name: 'Expired', value: 1 },
  ];
  const documentColors = ['#60a5fa', '#fbbf24', '#f87171'];
  const benefitDistribution = [
    { category: 'Agriculture', value: 6000 },
    { category: 'Healthcare', value: 500000 },
    { category: 'Education', value: 20000 },
    { category: 'Business', value: 100000 },
    { category: 'Housing', value: 267000 },
  ];

  if (loading) return <Loading />;

  return (
    <div className="space-y-10 min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 relative">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-8">
        {statCards.map((card, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow-md p-6 flex items-center gap-4 border border-gray-100">
            <div className={`w-12 h-12 flex items-center justify-center rounded-full text-white text-2xl ${card.color}`}>{card.icon({})}</div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{card.value}</div>
              <div className="text-gray-500 text-sm font-medium">{card.label}</div>
            </div>
        </div>
        ))}
      </div>
      
      {/* Recent Activity & Trending Schemes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h2>
          <ul className="divide-y divide-gray-100">
            {recentActivities.map((activity) => (
              <li key={activity.id} className="py-3 flex items-start gap-3">
                <span className={`mt-1 text-xl ${activity.color}`}><activity.icon /></span>
            <div>
                  <div className="font-semibold text-gray-800">{activity.title}</div>
                  <div className="text-gray-500 text-sm">{activity.description}</div>
                  <div className="text-xs text-gray-400 mt-1">{activity.time}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {/* Trending Schemes */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Trending Schemes</h2>
          <div className="flex flex-col gap-4">
            {trendingSchemes.map((scheme) => (
              <div key={scheme.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-blue-50 transition">
                <span className="text-2xl text-blue-500"><scheme.icon /></span>
                <div className="flex-1">
                  <div className="font-semibold text-gray-800">{scheme.name}</div>
                  <div className="text-xs text-gray-400">{scheme.category} • {scheme.applications}</div>
                </div>
                <span className="text-green-600 font-bold text-sm">{scheme.growth}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Document Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {documentAlerts.map((alert) => (
          <div key={alert.id} className={`rounded-xl shadow-md p-5 border-l-4 ${
            alert.severity === 'warning' ? 'border-yellow-400 bg-yellow-50' :
            alert.severity === 'info' ? 'border-blue-400 bg-blue-50' :
            'border-red-400 bg-red-50'} flex flex-col gap-2`}>
            <div className="font-semibold text-gray-800">{alert.title}</div>
            <div className="text-gray-600 text-sm">{alert.description}</div>
            {alert.daysLeft && <div className="text-xs text-gray-400">{alert.daysLeft} days left</div>}
            <button className="mt-2 self-start px-3 py-1 rounded bg-white border border-gray-200 text-xs font-medium hover:bg-gray-50 transition">{alert.action}</button>
          </div>
        ))}
      </div>

      {/* Analytics Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        {/* Applications Over Time */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Applications Over Time</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={applicationsOverTime} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Line type="monotone" dataKey="Applications" stroke="#6366f1" strokeWidth={3} dot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        {/* Eligibility Distribution */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 flex flex-col items-center justify-center">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Eligibility Distribution</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={eligibilityDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                {eligibilityDistribution.map((entry, idx) => (
                  <Cell key={`cell-${idx}`} fill={eligibilityColors[idx % eligibilityColors.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        {/* Document Status */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 flex flex-col items-center justify-center">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Document Status</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={documentStatus} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="value">
                {documentStatus.map((entry, idx) => (
                  <Cell key={`cell-doc-${idx}`} fill={documentColors[idx % documentColors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        {/* Benefit Distribution */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 flex flex-col items-center justify-center">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Benefit Distribution</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={benefitDistribution} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#6366f1" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 