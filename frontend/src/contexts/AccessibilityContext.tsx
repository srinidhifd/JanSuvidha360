import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AccessibilityState {
  highContrast: boolean;
  fontSize: 'small' | 'medium' | 'large';
  reducedMotion: boolean;
  focusVisible: boolean;
  screenReaderAnnouncements: string[];
}

interface AccessibilityContextType {
  // State properties
  highContrast: boolean;
  fontSize: 'small' | 'medium' | 'large';
  reducedMotion: boolean;
  focusVisible: boolean;
  screenReaderAnnouncement: string;
  
  // Methods
  toggleHighContrast: () => void;
  setFontSize: (size: 'small' | 'medium' | 'large') => void;
  toggleReducedMotion: () => void;
  setFocusVisible: (visible: boolean) => void;
  announceToScreenReader: (message: string) => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};

interface AccessibilityProviderProps {
  children: ReactNode;
}

export const AccessibilityProvider: React.FC<AccessibilityProviderProps> = ({ children }) => {
  const [accessibility, setAccessibility] = useState<AccessibilityState>({
    highContrast: false,
    fontSize: 'medium',
    reducedMotion: false,
    focusVisible: false,
    screenReaderAnnouncements: []
  });

  const toggleHighContrast = () => {
    setAccessibility(prev => ({
      ...prev,
      highContrast: !prev.highContrast
    }));
  };

  const setFontSize = (size: 'small' | 'medium' | 'large') => {
    setAccessibility(prev => ({
      ...prev,
      fontSize: size
    }));
  };

  const toggleReducedMotion = () => {
    setAccessibility(prev => ({
      ...prev,
      reducedMotion: !prev.reducedMotion
    }));
  };

  const setFocusVisible = (visible: boolean) => {
    setAccessibility(prev => ({
      ...prev,
      focusVisible: visible
    }));
  };

  const announceToScreenReader = (message: string) => {
    setAccessibility(prev => ({
      ...prev,
      screenReaderAnnouncements: [...prev.screenReaderAnnouncements, message]
    }));
  };

  const value: AccessibilityContextType = {
    // State properties
    highContrast: accessibility.highContrast,
    fontSize: accessibility.fontSize,
    reducedMotion: accessibility.reducedMotion,
    focusVisible: accessibility.focusVisible,
    screenReaderAnnouncement: accessibility.screenReaderAnnouncements[accessibility.screenReaderAnnouncements.length - 1] || '',
    
    // Methods
    toggleHighContrast,
    setFontSize,
    toggleReducedMotion,
    setFocusVisible,
    announceToScreenReader
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
}; 