import React from 'react';

// Common Icons used across the application
export const Icons = {
  // Navigation & UI
  Home: ({ className }: { className?: string }) => <span className={className}>🏠</span>,
  Dashboard: ({ className }: { className?: string }) => <span className={className}>📊</span>,
  Schemes: ({ className }: { className?: string }) => <span className={className}>📋</span>,
  Documents: ({ className }: { className?: string }) => <span className={className}>📄</span>,
  Profile: ({ className }: { className?: string }) => <span className={className}>👤</span>,
  Settings: ({ className }: { className?: string }) => <span className={className}>⚙️</span>,
  Help: ({ className }: { className?: string }) => <span className={className}>❓</span>,
  Notifications: ({ className }: { className?: string }) => <span className={className}>🔔</span>,
  Search: ({ className }: { className?: string }) => <span className={className}>🔍</span>,
  Favorites: ({ className }: { className?: string }) => <span className={className}>⭐</span>,
  Analytics: ({ className }: { className?: string }) => <span className={className}>📈</span>,
  About: ({ className }: { className?: string }) => <span className={className}>ℹ️</span>,
  Feedback: ({ className }: { className?: string }) => <span className={className}>💬</span>,
  Privacy: ({ className }: { className?: string }) => <span className={className}>🔒</span>,
  Language: ({ className }: { className?: string }) => <span className={className}>🌐</span>,
  
  // Actions
  Edit: ({ className }: { className?: string }) => <span className={className}>✏️</span>,
  Save: ({ className }: { className?: string }) => <span className={className}>💾</span>,
  Delete: ({ className }: { className?: string }) => <span className={className}>🗑️</span>,
  Download: ({ className }: { className?: string }) => <span className={className}>⬇️</span>,
  Upload: ({ className }: { className?: string }) => <span className={className}>⬆️</span>,
  Add: ({ className }: { className?: string }) => <span className={className}>➕</span>,
  Remove: ({ className }: { className?: string }) => <span className={className}>➖</span>,
  Check: ({ className }: { className?: string }) => <span className={className}>✅</span>,
  Close: ({ className }: { className?: string }) => <span className={className}>❌</span>,
  Back: ({ className }: { className?: string }) => <span className={className}>⬅️</span>,
  Forward: ({ className }: { className?: string }) => <span className={className}>➡️</span>,
  
  // Status & Feedback
  Success: ({ className }: { className?: string }) => <span className={className}>✅</span>,
  Error: ({ className }: { className?: string }) => <span className={className}>❌</span>,
  Warning: ({ className }: { className?: string }) => <span className={className}>⚠️</span>,
  Info: ({ className }: { className?: string }) => <span className={className}>ℹ️</span>,
  Loading: ({ className }: { className?: string }) => <span className={className}>⏳</span>,
  
  // Security & Privacy
  Lock: ({ className }: { className?: string }) => <span className={className}>🔒</span>,
  Unlock: ({ className }: { className?: string }) => <span className={className}>🔓</span>,
  Shield: ({ className }: { className?: string }) => <span className={className}>🛡️</span>,
  Key: ({ className }: { className?: string }) => <span className={className}>🔑</span>,
  Eye: ({ className }: { className?: string }) => <span className={className}>👁️</span>,
  EyeOff: ({ className }: { className?: string }) => <span className={className}>🙈</span>,
  
  // Communication
  Mail: ({ className }: { className?: string }) => <span className={className}>📧</span>,
  Phone: ({ className }: { className?: string }) => <span className={className}>📞</span>,
  Message: ({ className }: { className?: string }) => <span className={className}>💬</span>,
  Chat: ({ className }: { className?: string }) => <span className={className}>💭</span>,
  
  // Documents & Files
  File: ({ className }: { className?: string }) => <span className={className}>📄</span>,
  Folder: ({ className }: { className?: string }) => <span className={className}>📁</span>,
  Image: ({ className }: { className?: string }) => <span className={className}>🖼️</span>,
  PDF: ({ className }: { className?: string }) => <span className={className}>📕</span>,
  
  // Government & Identity
  Aadhaar: ({ className }: { className?: string }) => <span className={className}>🆔</span>,
  PAN: ({ className }: { className?: string }) => <span className={className}>💳</span>,
  DrivingLicense: ({ className }: { className?: string }) => <span className={className}>🚗</span>,
  Passport: ({ className }: { className?: string }) => <span className={className}>📘</span>,
  
  // UI Elements
  Calendar: ({ className }: { className?: string }) => <span className={className}>📅</span>,
  Clock: ({ className }: { className?: string }) => <span className={className}>🕐</span>,
  Location: ({ className }: { className?: string }) => <span className={className}>📍</span>,
  User: ({ className }: { className?: string }) => <span className={className}>👤</span>,
  Users: ({ className }: { className?: string }) => <span className={className}>👥</span>,
  Briefcase: ({ className }: { className?: string }) => <span className={className}>💼</span>,
  Database: ({ className }: { className?: string }) => <span className={className}>💾</span>,
  Globe: ({ className }: { className?: string }) => <span className={className}>🌐</span>,
  Moon: ({ className }: { className?: string }) => <span className={className}>🌙</span>,
  Sun: ({ className }: { className?: string }) => <span className={className}>☀️</span>,
  Palette: ({ className }: { className?: string }) => <span className={className}>🎨</span>,
  Volume: ({ className }: { className?: string }) => <span className={className}>🔊</span>,
  VolumeOff: ({ className }: { className?: string }) => <span className={className}>🔇</span>,
  Trash: ({ className }: { className?: string }) => <span className={className}>🗑️</span>,
  AlertTriangle: ({ className }: { className?: string }) => <span className={className}>⚠️</span>,
  Bell: ({ className }: { className?: string }) => <span className={className}>🔔</span>,
  Smartphone: ({ className }: { className?: string }) => <span className={className}>📱</span>,
  ShieldCheck: ({ className }: { className?: string }) => <span className={className}>🛡️</span>,
  Trash2: ({ className }: { className?: string }) => <span className={className}>🗑️</span>,
  CheckCircle: ({ className }: { className?: string }) => <span className={className}>✅</span>,
  XCircle: ({ className }: { className?: string }) => <span className={className}>❌</span>,
  InfoCircle: ({ className }: { className?: string }) => <span className={className}>ℹ️</span>,
  QuestionCircle: ({ className }: { className?: string }) => <span className={className}>❓</span>,
  Star: ({ className }: { className?: string }) => <span className={className}>⭐</span>,
  Heart: ({ className }: { className?: string }) => <span className={className}>❤️</span>,
  ThumbsUp: ({ className }: { className?: string }) => <span className={className}>👍</span>,
  ThumbsDown: ({ className }: { className?: string }) => <span className={className}>👎</span>,
  Share: ({ className }: { className?: string }) => <span className={className}>📤</span>,
  Copy: ({ className }: { className?: string }) => <span className={className}>📋</span>,
  Link: ({ className }: { className?: string }) => <span className={className}>🔗</span>,
  ExternalLink: ({ className }: { className?: string }) => <span className={className}>↗️</span>,
  Refresh: ({ className }: { className?: string }) => <span className={className}>🔄</span>,
  Filter: ({ className }: { className?: string }) => <span className={className}>🔍</span>,
  Sort: ({ className }: { className?: string }) => <span className={className}>↕️</span>,
  Grid: ({ className }: { className?: string }) => <span className={className}>⊞</span>,
  List: ({ className }: { className?: string }) => <span className={className}>☰</span>,
  Menu: ({ className }: { className?: string }) => <span className={className}>☰</span>,
  More: ({ className }: { className?: string }) => <span className={className}>⋯</span>,
  Play: ({ className }: { className?: string }) => <span className={className}>▶️</span>,
  Pause: ({ className }: { className?: string }) => <span className={className}>⏸️</span>,
  Stop: ({ className }: { className?: string }) => <span className={className}>⏹️</span>,
  Skip: ({ className }: { className?: string }) => <span className={className}>⏭️</span>,
  Rewind: ({ className }: { className?: string }) => <span className={className}>⏪</span>,
  FastForward: ({ className }: { className?: string }) => <span className={className}>⏩</span>,
  Volume2: ({ className }: { className?: string }) => <span className={className}>🔊</span>,
  VolumeX: ({ className }: { className?: string }) => <span className={className}>🔇</span>,
  
  // Accessibility & UI Controls
  X: ({ className }: { className?: string }) => <span className={className}>❌</span>,
  Minus: ({ className }: { className?: string }) => <span className={className}>➖</span>,
  Plus: ({ className }: { className?: string }) => <span className={className}>➕</span>,
  Contrast: ({ className }: { className?: string }) => <span className={className}>🌓</span>,
  Zap: ({ className }: { className?: string }) => <span className={className}>⚡</span>,
  MousePointer: ({ className }: { className?: string }) => <span className={className}>👆</span>,
  
  // Additional UI Elements
  Monitor: ({ className }: { className?: string }) => <span className={className}>🖥️</span>,
  Tablet: ({ className }: { className?: string }) => <span className={className}>📱</span>,
  Type: ({ className }: { className?: string }) => <span className={className}>🔤</span>,
  AlertCircle: ({ className }: { className?: string }) => <span className={className}>⚠️</span>,
};

export default Icons; 