import React from 'react';
import { Link } from 'react-router-dom';
import { Icons } from '../components/ui/Icons';

const LandingPage: React.FC = () => {
  const features = [
    {
      icon: <Icons.Dashboard className="w-12 h-12 text-blue-600" />,
      title: 'Unified Dashboard',
      description: 'Access all government schemes and manage your official documents from one centralized platform.'
    },
    {
      icon: <Icons.Documents className="w-12 h-12 text-orange-600" />,
      title: 'Document Management',
      description: 'Securely store and view your Aadhaar Card, PAN Card, Driving License, and Passport in digital format.'
    },
    {
      icon: <Icons.Star className="w-12 h-12 text-purple-600" />,
      title: 'Smart Eligibility',
      description: 'AI-powered scheme matching based on your profile, documents, and eligibility criteria with detailed reasons.'
    },
    {
      icon: <Icons.Check className="w-12 h-12 text-green-600" />,
      title: 'Instant Verification',
      description: 'Quick document verification and eligibility checking with real-time feedback and recommendations.'
    },
    {
      icon: <Icons.Smartphone className="w-12 h-12 text-indigo-600" />,
      title: 'Mobile-First Design',
      description: 'Responsive design that works seamlessly on all devices with offline document access.'
    },
    {
      icon: <Icons.Shield className="w-12 h-12 text-red-600" />,
      title: 'Bank-Level Security',
      description: 'OTP authentication, encrypted document storage, and secure data handling for your peace of mind.'
    }
  ];

  const benefits = [
    {
      icon: '💰',
      title: 'Save Money',
      description: 'Discover schemes that provide financial assistance, subsidies, and benefits you might have missed.'
    },
    {
      icon: '⏰',
      title: 'Save Time',
      description: 'No more visiting multiple websites or carrying physical documents. Everything digital in one place.'
    },
    {
      icon: '📋',
      title: 'Go Paperless',
      description: 'Access all your important documents digitally - Aadhaar, PAN, DL, Passport anytime, anywhere.'
    },
    {
      icon: '🎯',
      title: 'Smart Recommendations',
      description: 'Get personalized scheme suggestions based on your profile and documents with eligibility details.'
    }
  ];

  const stats = [
    { number: '500+', label: 'Government Schemes' },
    { number: '10+', label: 'Document Types' },
    { number: '10M+', label: 'Citizens Helped' },
    { number: '24/7', label: 'Digital Access' }
  ];

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center group">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 group-hover:bg-gray-50">
                <img 
                  src="/jansuvidha360-logo.png" 
                  alt="JanSuvidha360 Logo" 
                  className="w-8 h-8 object-contain transition-transform duration-200 group-hover:scale-110 jansuvidha-logo"
                />
              </div>
              <div className="ml-3">
                <h1 className="text-xl font-bold text-gray-900">JanSuvidha360</h1>
                <p className="text-xs text-gray-500">Government of India Initiative</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - 100vh */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden border-b-2 border-blue-200/50">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="w-full h-full bg-gradient-to-br from-blue-100/20 to-indigo-100/20 animate-pulse"></div>
          </div>
        </div>
        
        {/* Floating elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full opacity-60 animate-bounce" style={{animationDelay: '0s'}}></div>
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-indigo-400 rounded-full opacity-60 animate-bounce" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-purple-400 rounded-full opacity-60 animate-bounce" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-blue-500 rounded-full opacity-60 animate-bounce" style={{animationDelay: '0.5s'}}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            {/* Main headline with better typography */}
            <div className="mb-8">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-gray-900 leading-tight tracking-tight">
                <span className="block mb-2">Access All Your</span>
                <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  Government Services
                </span>
                <span className="block text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-700">
                  in One Secure Place
                </span>
              </h1>
              </div>
            
            {/* Enhanced subheading */}
            <div className="max-w-3xl mx-auto mb-10">
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 leading-relaxed mb-4">
                <span className="font-semibold text-gray-800">Aadhaar • PAN • Driving License • Passport</span>
              </p>
              <p className="text-base sm:text-lg text-gray-500">
                Smart eligibility matching for 500+ schemes • Instant document access • Secure digital wallet
              </p>
            </div>

            {/* Enhanced CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link
                to="/login"
                className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-lg rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 min-w-[200px]"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative flex items-center">
                  Get Started Free
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Link>
              
              <a
                href="https://youtu.be/Ieqa1oPb7s4?si=ds7pmjPakK0AKtBD"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center px-6 py-4 bg-white/90 backdrop-blur-sm border border-gray-200 text-gray-700 font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl hover:bg-white transition-all duration-300 min-w-[200px]"
              >
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
                <span>Watch Demo</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Government Partnership Section */}
      <section className="py-16 bg-gradient-to-br from-indigo-100 via-blue-50 to-slate-50 relative overflow-hidden border-b-2 border-indigo-300/50">
        {/* Background elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="w-full h-full bg-gradient-to-br from-indigo-100/20 to-blue-100/20"></div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Trust Badge moved here */}
          <div className="mb-8">
            <div className="inline-flex items-center px-6 py-3 bg-white/90 backdrop-blur-sm border border-green-200 rounded-full text-green-700 text-sm font-semibold shadow-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              <span className="text-green-600 font-semibold">Trusted by 10M+ Citizens • Official Government Platform</span>
            </div>
          </div>
          
          {/* Ashoka Pillar Image */}
          <div className="flex justify-center mb-6">
            <div className="w-28 h-28 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-full flex items-center justify-center shadow-xl border-2 border-blue-300/50 backdrop-blur-sm">
              <img 
                src="/ashoka_pillar.png" 
                alt="Ashoka Pillar" 
                className="w-24 h-24 object-contain filter drop-shadow-md"
              />
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Official Partnership with Government of India
          </h2>
          <p className="text-xl text-gray-700 mb-6 max-w-3xl mx-auto">
            This platform is developed in collaboration with various government departments under the 
            <span className="font-semibold text-blue-600"> Digital India Initiative</span> to streamline access to citizen services.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <span className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-blue-200 inline-flex items-center">
              <img src="/jansuvidha360-logo.png" alt="JanSuvidha360 Logo" className="w-4 h-4 object-contain mr-2 jansuvidha-logo" />
              Ministry of Electronics & IT
            </span>
            <span className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-blue-200">
              📊 National Informatics Centre
            </span>
            <span className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-blue-200">
              🔒 Aadhaar Integration
            </span>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden border-b-2 border-slate-300/50">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="w-full h-full bg-gradient-to-br from-blue-100/10 to-indigo-100/10"></div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-slate-50 relative overflow-hidden border-b-2 border-blue-300/50">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="w-full h-full bg-gradient-to-br from-indigo-100/20 to-blue-100/20"></div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We've simplified government services - from scheme discovery to document management - all in one platform
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-sm border border-gray-200/50 hover:shadow-lg hover:bg-white transition-all duration-200">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Document Management Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 via-blue-50 to-indigo-50 relative overflow-hidden border-b-2 border-green-300/50">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="w-full h-full bg-gradient-to-br from-green-100/20 to-blue-100/20"></div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Your Digital Document Wallet
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Securely store and access all your important government documents in one place
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-gray-200/50 hover:shadow-lg hover:bg-white transition-all duration-200 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Icons.Aadhaar className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Aadhaar Card</h3>
              <p className="text-gray-600 text-sm">Digital access to your Aadhaar with complete details and verification status</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-gray-200/50 hover:shadow-lg hover:bg-white transition-all duration-200 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Icons.PAN className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">PAN Card</h3>
              <p className="text-gray-600 text-sm">Instant access to your PAN details for tax-related schemes and applications</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-gray-200/50 hover:shadow-lg hover:bg-white transition-all duration-200 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Icons.DrivingLicense className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Driving License</h3>
              <p className="text-gray-600 text-sm">Digital DL with vehicle class info for transport-related schemes</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-gray-200/50 hover:shadow-lg hover:bg-white transition-all duration-200 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Icons.Passport className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Passport</h3>
              <p className="text-gray-600 text-sm">Passport details for international schemes and identity verification</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Benefits You
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Real value delivered to millions of citizens across India
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">{benefit.icon}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get started in just 3 simple steps
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-2xl">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Sign Up</h3>
              <p className="text-gray-600">
                Create your account using your phone number. Quick OTP verification ensures security.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-2xl">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Add Profile & Documents</h3>
              <p className="text-gray-600">
                Complete your profile and securely upload documents (Aadhaar, PAN, DL, Passport). Get instant eligibility matching.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-2xl">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Discover & Apply</h3>
              <p className="text-gray-600">
                Browse eligible schemes, access your documents instantly, and apply seamlessly with pre-filled information.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Ready to Transform Your Government Experience?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join millions of citizens who manage their documents and access government schemes seamlessly. 
            Start your digital government journey today.
          </p>
          <Link
            to="/login"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg inline-block"
          >
            Get Started Free →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                                  <img 
                  src="/jansuvidha360-logo.png" 
                  alt="JanSuvidha360 Logo" 
                  className="w-6 h-6 object-contain jansuvidha-logo"
                />
                </div>
                <span className="ml-2 text-lg font-bold">JanSuvidha360</span>
              </div>
              <p className="text-gray-400">
                Official government platform empowering citizens through digital document management and seamless access to schemes and benefits.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/schemes" className="hover:text-white">All Schemes</Link></li>
                <li><Link to="/documents" className="hover:text-white">My Documents</Link></li>
                <li><Link to="/login" className="hover:text-white">Login</Link></li>
                <li><a href="#" className="hover:text-white">Help & Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Categories</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Agriculture</a></li>
                <li><a href="#" className="hover:text-white">Education</a></li>
                <li><a href="#" className="hover:text-white">Healthcare</a></li>
                <li><a href="#" className="hover:text-white">Housing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white">Cookie Policy</a></li>
                <li><a href="#" className="hover:text-white">Disclaimer</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                          <p>&copy; 2024 Government of India | JanSuvidha360 | Digital India Initiative</p>
            <p className="text-sm mt-2">Developed in partnership with Ministry of Electronics & Information Technology</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage; 