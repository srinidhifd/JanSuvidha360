import React, { useState, useEffect } from 'react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';

// Simple icon components to replace lucide-react
const BarChart = ({ className }: { className?: string }) => <span className={className}>📊</span>;
const TrendingUp = ({ className }: { className?: string }) => <span className={className}>📈</span>;
const TrendingDown = ({ className }: { className?: string }) => <span className={className}>📉</span>;
const PieChart = ({ className }: { className?: string }) => <span className={className}>🥧</span>;
const Users = ({ className }: { className?: string }) => <span className={className}>👥</span>;
const Calendar = ({ className }: { className?: string }) => <span className={className}>📅</span>;
const MapPin = ({ className }: { className?: string }) => <span className={className}>📍</span>;
const Download = ({ className }: { className?: string }) => <span className={className}>⬇️</span>;
const Filter = ({ className }: { className?: string }) => <span className={className}>🔍</span>;
const Refresh = ({ className }: { className?: string }) => <span className={className}>🔄</span>;
const Eye = ({ className }: { className?: string }) => <span className={className}>👁️</span>;
const Target = ({ className }: { className?: string }) => <span className={className}>🎯</span>;
const Award = ({ className }: { className?: string }) => <span className={className}>🏆</span>;
const Clock = ({ className }: { className?: string }) => <span className={className}>⏰</span>;
const CheckCircle = ({ className }: { className?: string }) => <span className={className}>✅</span>;
const AlertCircle = ({ className }: { className?: string }) => <span className={className}>⚠️</span>;
const XCircle = ({ className }: { className?: string }) => <span className={className}>❌</span>;

interface AnalyticsData {
  overview: {
    totalApplications: number;
    approvedApplications: number;
    pendingApplications: number;
    rejectedApplications: number;
    totalBenefits: number;
    averageProcessingTime: number;
    userSatisfaction: number;
  };
  trends: {
    applicationsByMonth: Array<{ month: string; count: number }>;
    benefitsByCategory: Array<{ category: string; amount: number }>;
    userGrowth: Array<{ month: string; users: number }>;
  };
  demographics: {
    ageGroups: Array<{ age: string; percentage: number }>;
    genderDistribution: Array<{ gender: string; percentage: number }>;
    locationData: Array<{ state: string; applications: number }>;
  };
  performance: {
    topSchemes: Array<{ name: string; applications: number; successRate: number }>;
    processingTimes: Array<{ scheme: string; averageDays: number }>;
    errorRates: Array<{ category: string; rate: number }>;
  };
}

const Analytics: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('30d');
  const [loading, setLoading] = useState(false);

  // Mock analytics data
  const analyticsData: AnalyticsData = {
    overview: {
      totalApplications: 15420,
      approvedApplications: 12850,
      pendingApplications: 2340,
      rejectedApplications: 230,
      totalBenefits: 45600000,
      averageProcessingTime: 3.2,
      userSatisfaction: 4.6
    },
    trends: {
      applicationsByMonth: [
        { month: 'Jan', count: 1200 },
        { month: 'Feb', count: 1350 },
        { month: 'Mar', count: 1420 },
        { month: 'Apr', count: 1580 },
        { month: 'May', count: 1650 },
        { month: 'Jun', count: 1720 }
      ],
      benefitsByCategory: [
        { category: 'Agriculture', amount: 18000000 },
        { category: 'Healthcare', amount: 12000000 },
        { category: 'Education', amount: 8000000 },
        { category: 'Housing', amount: 5600000 },
        { category: 'Business', amount: 2000000 }
      ],
      userGrowth: [
        { month: 'Jan', users: 45000 },
        { month: 'Feb', users: 52000 },
        { month: 'Mar', users: 58000 },
        { month: 'Apr', users: 65000 },
        { month: 'May', users: 72000 },
        { month: 'Jun', users: 78000 }
      ]
    },
    demographics: {
      ageGroups: [
        { age: '18-25', percentage: 15 },
        { age: '26-35', percentage: 28 },
        { age: '36-45', percentage: 32 },
        { age: '46-55', percentage: 18 },
        { age: '55+', percentage: 7 }
      ],
      genderDistribution: [
        { gender: 'Male', percentage: 52 },
        { gender: 'Female', percentage: 45 },
        { gender: 'Other', percentage: 3 }
      ],
      locationData: [
        { state: 'Maharashtra', applications: 3200 },
        { state: 'Uttar Pradesh', applications: 2800 },
        { state: 'Karnataka', applications: 2400 },
        { state: 'Tamil Nadu', applications: 2200 },
        { state: 'Gujarat', applications: 2000 }
      ]
    },
    performance: {
      topSchemes: [
        { name: 'PM-KISAN', applications: 4500, successRate: 94 },
        { name: 'Ayushman Bharat', applications: 3200, successRate: 89 },
        { name: 'NSP Scholarship', applications: 2800, successRate: 92 },
        { name: 'MUDRA Loan', applications: 2100, successRate: 87 },
        { name: 'PMAY Urban', applications: 1800, successRate: 91 }
      ],
      processingTimes: [
        { scheme: 'PM-KISAN', averageDays: 2.1 },
        { scheme: 'Ayushman Bharat', averageDays: 3.5 },
        { scheme: 'NSP Scholarship', averageDays: 4.2 },
        { scheme: 'MUDRA Loan', averageDays: 5.8 },
        { scheme: 'PMAY Urban', averageDays: 6.3 }
      ],
      errorRates: [
        { category: 'Document Upload', rate: 2.3 },
        { category: 'Form Validation', rate: 1.8 },
        { category: 'Payment Processing', rate: 0.9 },
        { category: 'System Errors', rate: 0.4 }
      ]
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart },
    { id: 'trends', label: 'Trends', icon: TrendingUp },
    { id: 'demographics', label: 'Demographics', icon: Users },
    { id: 'performance', label: 'Performance', icon: Target }
  ];

  const timeRanges = [
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 90 Days' },
    { value: '1y', label: 'Last Year' }
  ];

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Applications</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">
                {analyticsData.overview.totalApplications.toLocaleString()}
              </p>
              <p className="text-sm text-green-600 mt-1">+12.5% from last month</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <BarChart className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Approved Applications</p>
              <p className="text-3xl font-bold text-green-600 mt-2">
                {analyticsData.overview.approvedApplications.toLocaleString()}
              </p>
              <p className="text-sm text-green-600 mt-1">83.3% success rate</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Benefits</p>
              <p className="text-3xl font-bold text-purple-600 mt-2">
                ₹{(analyticsData.overview.totalBenefits / 10000000).toFixed(1)}Cr
              </p>
              <p className="text-sm text-green-600 mt-1">+8.2% from last month</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Processing Time</p>
              <p className="text-3xl font-bold text-orange-600 mt-2">
                {analyticsData.overview.averageProcessingTime} days
              </p>
              <p className="text-sm text-green-600 mt-1">-0.3 days from last month</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Application Status Chart */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Application Status Distribution</h3>
          <Badge variant="success">Live Data</Badge>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-green-600">
              {analyticsData.overview.approvedApplications.toLocaleString()}
            </p>
            <p className="text-sm text-gray-600">Approved</p>
          </div>
          <div className="text-center">
            <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <AlertCircle className="w-8 h-8 text-yellow-600" />
            </div>
            <p className="text-2xl font-bold text-yellow-600">
              {analyticsData.overview.pendingApplications.toLocaleString()}
            </p>
            <p className="text-sm text-gray-600">Pending</p>
          </div>
          <div className="text-center">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
            <p className="text-2xl font-bold text-red-600">
              {analyticsData.overview.rejectedApplications.toLocaleString()}
            </p>
            <p className="text-sm text-gray-600">Rejected</p>
          </div>
        </div>
      </Card>

      {/* User Satisfaction */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">User Satisfaction Score</h3>
          <Badge variant="success">4.6/5.0</Badge>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="h-3 rounded-full bg-green-500"
                style={{ width: `${(analyticsData.overview.userSatisfaction / 5) * 100}%` }}
              ></div>
            </div>
          </div>
          <span className="text-2xl font-bold text-green-600">
            {analyticsData.overview.userSatisfaction}/5.0
          </span>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          Based on {analyticsData.overview.totalApplications} user feedback responses
        </p>
      </Card>
    </div>
  );

  const renderTrendsTab = () => (
    <div className="space-y-6">
      {/* Applications Trend */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Applications by Month</h3>
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <span className="text-sm text-green-600">+15.2% growth</span>
          </div>
        </div>
        <div className="space-y-3">
          {analyticsData.trends.applicationsByMonth.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">{item.month}</span>
              <div className="flex items-center space-x-3">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full bg-blue-500"
                    style={{ width: `${(item.count / 1800) * 100}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-900">{item.count.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Benefits by Category */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Benefits by Category</h3>
        <div className="space-y-4">
          {analyticsData.trends.benefitsByCategory.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">{item.category}</span>
              <div className="flex items-center space-x-3">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full bg-purple-500"
                    style={{ width: `${(item.amount / 18000000) * 100}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  ₹{(item.amount / 1000000).toFixed(1)}M
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* User Growth */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">User Growth</h3>
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <span className="text-sm text-green-600">+73.3% growth</span>
          </div>
        </div>
        <div className="space-y-3">
          {analyticsData.trends.userGrowth.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">{item.month}</span>
              <div className="flex items-center space-x-3">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full bg-green-500"
                    style={{ width: `${(item.users / 80000) * 100}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-900">{item.users.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );

  const renderDemographicsTab = () => (
    <div className="space-y-6">
      {/* Age Distribution */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Age Group Distribution</h3>
        <div className="space-y-4">
          {analyticsData.demographics.ageGroups.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">{item.age} years</span>
              <div className="flex items-center space-x-3">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full bg-blue-500"
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-900">{item.percentage}%</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Gender Distribution */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Gender Distribution</h3>
        <div className="space-y-4">
          {analyticsData.demographics.genderDistribution.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">{item.gender}</span>
              <div className="flex items-center space-x-3">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full bg-green-500"
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-900">{item.percentage}%</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Location Data */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Applications by State</h3>
        <div className="space-y-4">
          {analyticsData.demographics.locationData.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">{item.state}</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full bg-purple-500"
                    style={{ width: `${(item.applications / 3500) * 100}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-900">{item.applications.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );

  const renderPerformanceTab = () => (
    <div className="space-y-6">
      {/* Top Performing Schemes */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Top Performing Schemes</h3>
        <div className="space-y-4">
          {analyticsData.performance.topSchemes.map((scheme, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-blue-600">{index + 1}</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{scheme.name}</p>
                  <p className="text-sm text-gray-600">{scheme.applications.toLocaleString()} applications</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-green-600">{scheme.successRate}%</p>
                <p className="text-sm text-gray-600">Success Rate</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Processing Times */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Average Processing Times</h3>
        <div className="space-y-4">
          {analyticsData.performance.processingTimes.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">{item.scheme}</span>
              <div className="flex items-center space-x-3">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full bg-orange-500"
                    style={{ width: `${(item.averageDays / 7) * 100}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-900">{item.averageDays} days</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Error Rates */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Error Rates by Category</h3>
        <div className="space-y-4">
          {analyticsData.performance.errorRates.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">{item.category}</span>
              <div className="flex items-center space-x-3">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full bg-red-500"
                    style={{ width: `${item.rate * 10}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-900">{item.rate}%</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
        <div className="flex items-center space-x-3">
          <BarChart className="w-8 h-8" />
          <div>
            <h1 className="text-2xl font-bold">Analytics & Insights</h1>
            <p className="text-blue-100">Comprehensive data analysis and performance metrics</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 space-y-4 md:space-y-0">
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
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="text-sm border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {timeRanges.map((range) => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>
            <Button variant="outline" size="sm" rightIcon={<Refresh className="w-4 h-4" />}>
              Refresh
            </Button>
            <Button variant="outline" size="sm" rightIcon={<Download className="w-4 h-4" />}>
              Export
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {activeTab === 'overview' && renderOverviewTab()}
          {activeTab === 'trends' && renderTrendsTab()}
          {activeTab === 'demographics' && renderDemographicsTab()}
          {activeTab === 'performance' && renderPerformanceTab()}
        </div>
      </div>
    </div>
  );
};

export default Analytics; 