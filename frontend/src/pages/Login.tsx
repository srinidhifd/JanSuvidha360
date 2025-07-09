import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../services/api';
import toast from 'react-hot-toast';

const Login: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [autoFilledOtp, setAutoFilledOtp] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  // Demo phone numbers for testing
  const demoNumbers = [
    '+919876543210',
    '+919876543211',
    '+919876543212',
    '+919876543213',
    '+919876543214'
  ];

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleSendOTP = async () => {
    if (!phoneNumber.trim()) {
      toast.error('Please enter your phone number');
      return;
    }

    if (!demoNumbers.includes(phoneNumber)) {
      toast.error('Please use a demo phone number for testing');
      return;
    }

    setIsLoading(true);
    try {
      const response = await authAPI.sendOTP(phoneNumber);
      if (response.success) {
        setIsOtpSent(true);
        setCountdown(30);
        
        // Auto-fill OTP for demo
        const generatedOtp = response.data?.otp || '123456';
        setAutoFilledOtp(generatedOtp);
        setOtp(generatedOtp);
        
        toast.success(`OTP sent! Demo OTP: ${generatedOtp}`, {
          duration: 8000,
          style: {
            background: '#10b981',
            color: 'white',
            fontWeight: 'bold'
          }
        });
      } else {
        toast.error(response.message || 'Failed to send OTP');
      }
    } catch (error) {
      console.error('OTP send error:', error);
      toast.error('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp.trim()) {
      toast.error('Please enter the OTP');
      return;
    }

    setIsVerifying(true);
    try {
      await login(phoneNumber, otp);
      // Remove duplicate toast - navigation will handle success feedback
      navigate('/dashboard');
    } catch (error) {
      console.error('OTP verification error:', error);
      toast.error('Verification failed. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handlePhoneNumberSelect = (number: string) => {
    setPhoneNumber(number);
    setIsOtpSent(false);
    setOtp('');
    setAutoFilledOtp('');
  };

  const handleResendOTP = async () => {
    if (countdown > 0) return;
    await handleSendOTP();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background pattern */}
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
      
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-200/50 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center group">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 group-hover:bg-gray-50">
                <img 
                  src="/jansuvidha360-logo.png" 
                  alt="JanSuvidha360 Logo" 
                  className="w-8 h-8 object-contain transition-transform duration-200 group-hover:scale-110 jansuvidha-logo"
                />
              </div>
              <div className="ml-3 hidden sm:block">
                <h1 className="text-xl font-bold text-gray-900">JanSuvidha360</h1>
                <p className="text-xs text-gray-500">Government of India Initiative</p>
              </div>
            </Link>
            <Link
              to="/"
              className="bg-white/80 hover:bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center backdrop-blur-sm"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-12 relative z-10">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Demo Numbers Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-200/50 p-6 hover:bg-white/90 transition-all duration-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-5 h-5 bg-blue-500 rounded-full mr-3"></span>
                Demo Phone Numbers
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Select a demo number to test the login system
              </p>
              <div className="space-y-2">
                {demoNumbers.map((number) => (
                  <button
                    key={number}
                    onClick={() => handlePhoneNumberSelect(number)}
                    className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-all duration-200 border-2 ${
                      phoneNumber === number
                        ? 'bg-blue-50 text-blue-900 font-medium border-blue-300'
                        : 'bg-gray-50/80 text-gray-700 hover:bg-gray-100/80 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {number}
                  </button>
                ))}
              </div>
              <div className="mt-4 p-3 bg-blue-50/80 rounded-lg">
                <p className="text-xs text-blue-700">
                  💡 These are demo numbers for testing. In production, use your real phone number.
                </p>
              </div>
            </div>
          </div>

          {/* Main Login Form */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 p-8 lg:p-12 hover:bg-white/90 transition-all duration-200">
              
              {/* Login Header */}
              <div className="text-center mb-8">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-white text-2xl">🔐</span>
                  </div>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Welcome Back
                </h2>
                <p className="text-gray-600 text-lg">
                  Sign in to access your government schemes dashboard
                </p>
              </div>

              {/* Login Form */}
              <div className="space-y-6">
                {/* Phone Number Input */}
                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    id="phoneNumber"
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full px-4 py-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your phone number"
                    disabled={isOtpSent}
                  />
                </div>

                {/* OTP Input */}
                {isOtpSent && (
                  <div>
                    <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">
                      Enter OTP
                    </label>
                    <input
                      id="otp"
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="w-full px-4 py-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-center font-mono"
                      placeholder="Enter 6-digit OTP"
                      maxLength={6}
                    />
                    {autoFilledOtp && (
                      <div className="mt-3 p-3 bg-green-50 rounded-lg">
                        <p className="text-sm text-green-700 flex items-center">
                          <span className="w-4 h-4 bg-green-500 rounded-full mr-2"></span>
                          Demo OTP has been auto-filled: <strong className="ml-1">{autoFilledOtp}</strong>
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="space-y-4 pt-4">
                  {!isOtpSent ? (
                    <button
                      onClick={handleSendOTP}
                      disabled={isLoading || !phoneNumber.trim()}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-[1.02] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center space-x-2">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Sending OTP...</span>
                        </div>
                      ) : (
                        'Send OTP'
                      )}
                    </button>
                  ) : (
                    <div className="space-y-3">
                      <button
                        onClick={handleVerifyOTP}
                        disabled={isVerifying || !otp.trim()}
                        className="w-full bg-green-600 hover:bg-green-700 text-white py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-[1.02] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                      >
                        {isVerifying ? (
                          <div className="flex items-center justify-center space-x-2">
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Verifying...</span>
                          </div>
                        ) : (
                          'Verify & Login'
                        )}
                      </button>
                      
                      <button
                        onClick={handleResendOTP}
                        disabled={countdown > 0}
                        className="w-full bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-xl font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {countdown > 0 ? `Resend OTP in ${countdown}s` : 'Resend OTP'}
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                <p className="text-sm text-gray-600">
                  Secure access to government schemes and services
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Powered by Digital India Initiative
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 