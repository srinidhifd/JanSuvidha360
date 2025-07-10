import React, { useState, useEffect, useRef } from 'react';
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
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const otpSectionRef = useRef<HTMLDivElement>(null);

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

  // Auto-focus OTP input when it becomes visible
  useEffect(() => {
    if (isOtpSent && otpSectionRef.current) {
      // Smooth scroll to OTP section
      setTimeout(() => {
        otpSectionRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
        // Focus the OTP input
        const otpInput = document.getElementById('otp') as HTMLInputElement;
        if (otpInput) {
          otpInput.focus();
        }
      }, 100);
    }
  }, [isOtpSent]);

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
        // Show success animation
        setShowSuccessAnimation(true);
        
        // Set OTP sent state after a brief delay for better UX
        setTimeout(() => {
          setIsOtpSent(true);
          setCountdown(30);
          setShowSuccessAnimation(false);
          
          // Auto-fill OTP for demo
          const generatedOtp = response.data?.otp || '123456';
          setAutoFilledOtp(generatedOtp);
          setOtp(generatedOtp);
          
          // Show success toast with clear next steps
          toast.success(
            `✅ OTP sent successfully!\n📱 Check the OTP section below\n🔢 Demo OTP: ${generatedOtp}`, 
            {
              duration: 6000,
              style: {
                background: '#10b981',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '14px',
                lineHeight: '1.4',
                whiteSpace: 'pre-line'
              }
            }
          );
          
          // Additional notification toast
          setTimeout(() => {
            toast('👇 Please scroll down to enter OTP', {
              icon: '👀',
              duration: 3000,
              style: {
                background: '#3b82f6',
                color: 'white',
                fontWeight: 'bold'
              }
            });
          }, 1000);
        }, 1500);
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
      toast.success('✅ Login successful! Redirecting to dashboard...', {
        duration: 2000,
        style: {
          background: '#10b981',
          color: 'white',
          fontWeight: 'bold'
        }
      });
      
      // Slight delay for better UX
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } catch (error) {
      console.error('OTP verification error:', error);
      toast.error('❌ Verification failed. Please check your OTP and try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handlePhoneNumberSelect = (number: string) => {
    setPhoneNumber(number);
    setIsOtpSent(false);
    setOtp('');
    setAutoFilledOtp('');
    setShowSuccessAnimation(false);
  };

  const handleResendOTP = async () => {
    if (countdown > 0) return;
    
    toast.loading('Resending OTP...', { id: 'resend-otp' });
    await handleSendOTP();
    toast.dismiss('resend-otp');
  };

  // Progress indicator component
  const ProgressIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      <div className="flex items-center space-x-4">
        {/* Step 1 - Phone Number */}
        <div className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
            !isOtpSent ? 'bg-blue-600 text-white' : 'bg-green-500 text-white'
          }`}>
            {!isOtpSent ? '1' : '✓'}
          </div>
          <span className={`ml-2 text-sm font-medium ${
            !isOtpSent ? 'text-blue-600' : 'text-green-600'
          }`}>
            Phone Number
          </span>
        </div>
        
        {/* Connector */}
        <div className={`w-8 h-0.5 transition-all duration-300 ${
          isOtpSent ? 'bg-green-500' : 'bg-gray-300'
        }`}></div>
        
        {/* Step 2 - OTP Verification */}
        <div className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
            isOtpSent ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-500'
          }`}>
            2
          </div>
          <span className={`ml-2 text-sm font-medium ${
            isOtpSent ? 'text-blue-600' : 'text-gray-500'
          }`}>
            OTP Verification
          </span>
        </div>
      </div>
    </div>
  );

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
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 p-6 lg:p-8 hover:bg-white/90 transition-all duration-200">
              
              {/* Progress Indicator */}
              <ProgressIndicator />
              
              {/* Success Animation */}
              {showSuccessAnimation && (
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4 animate-pulse">
                    <svg className="w-8 h-8 text-green-600 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-green-600 font-semibold text-lg">Sending OTP...</p>
                  <p className="text-gray-600 text-sm">Please wait while we send the verification code</p>
                </div>
              )}
              
              {/* Login Header */}
              {!showSuccessAnimation && (
                <div className="text-center mb-8">
                  <div className="flex justify-center mb-6">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-500 ${
                      isOtpSent 
                        ? 'bg-gradient-to-br from-green-500 to-emerald-600' 
                        : 'bg-gradient-to-br from-blue-500 to-indigo-600'
                    }`}>
                      <span className="text-white text-2xl">
                        {isOtpSent ? '📱' : '🔐'}
                      </span>
                    </div>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    {isOtpSent ? 'Verify Your Phone' : 'Login'}
                  </h2>
                  <p className="text-gray-600 text-lg">
                    {isOtpSent 
                      ? 'We\'ve sent a verification code to your phone'
                      : 'Sign in to access your government schemes dashboard'
                    }
                  </p>
                </div>
              )}

              {/* Login Form */}
              <div className="space-y-6">
                {/* Phone Number Input */}
                <div className={`transition-all duration-500 ${isOtpSent ? 'opacity-50' : 'opacity-100'}`}>
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

                {/* OTP Input Section */}
                {isOtpSent && (
                  <div 
                    ref={otpSectionRef}
                    className="animate-fadeIn border-2 border-blue-200 rounded-xl p-6 bg-blue-50/30 backdrop-blur-sm"
                  >
                    {/* OTP Section Header */}
                    <div className="text-center mb-4">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-3">
                        <span className="text-blue-600 text-xl">📧</span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        Enter Verification Code
                      </h3>
                      <p className="text-sm text-gray-600">
                        We've sent a 6-digit code to <span className="font-medium text-blue-600">{phoneNumber}</span>
                      </p>
                    </div>
                    
                    <div>
                      <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">
                        OTP Code
                      </label>
                      <input
                        id="otp"
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="w-full px-4 py-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-center font-mono bg-white"
                        placeholder="Enter 6-digit OTP"
                        maxLength={6}
                      />
                      {autoFilledOtp && (
                        <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
                          <p className="text-sm text-green-700 flex items-center">
                            <span className="w-4 h-4 bg-green-500 rounded-full mr-2 flex items-center justify-center">
                              <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M9 12l2 2 4-4"/>
                              </svg>
                            </span>
                            Demo OTP has been auto-filled: <strong className="ml-1 font-mono bg-green-100 px-2 py-1 rounded">{autoFilledOtp}</strong>
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="space-y-4 pt-4">
                  {!isOtpSent ? (
                    <button
                      onClick={handleSendOTP}
                      disabled={isLoading || !phoneNumber.trim() || showSuccessAnimation}
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