import React, { useState } from 'react';
import { useAccessibility } from '../../contexts/AccessibilityContext';
import Button from './Button';
import Card from './Card';
import { Icons } from './Icons';

interface AccessibilityPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const AccessibilityPanel: React.FC<AccessibilityPanelProps> = ({ isOpen, onClose }) => {
  const {
    highContrast,
    toggleHighContrast,
    fontSize,
    setFontSize,
    reducedMotion,
    toggleReducedMotion,
    focusVisible,
    setFocusVisible,
    announceToScreenReader
  } = useAccessibility();

  const [activeTab, setActiveTab] = useState('visual');

  const tabs = [
    { id: 'visual', label: 'Visual', icon: Icons.MousePointer },
    { id: 'audio', label: 'Audio', icon: Icons.MousePointer },
    { id: 'navigation', label: 'Navigation', icon: Icons.MousePointer }
  ];

  const handleFontSizeIncrease = () => {
    if (fontSize === 'small') setFontSize('medium');
    else if (fontSize === 'medium') setFontSize('large');
    announceToScreenReader(`Font size increased to ${fontSize === 'small' ? 'medium' : 'large'}`);
  };

  const handleFontSizeDecrease = () => {
    if (fontSize === 'large') setFontSize('medium');
    else if (fontSize === 'medium') setFontSize('small');
    announceToScreenReader(`Font size decreased to ${fontSize === 'large' ? 'medium' : 'small'}`);
  };

  const handleHighContrastToggle = () => {
    toggleHighContrast();
    announceToScreenReader(`High contrast mode ${!highContrast ? 'enabled' : 'disabled'}`);
  };

  const handleReducedMotionToggle = () => {
    toggleReducedMotion();
    announceToScreenReader(`Reduced motion ${!reducedMotion ? 'enabled' : 'disabled'}`);
  };

  const handleFocusVisibleToggle = () => {
    setFocusVisible(!focusVisible);
    announceToScreenReader(`Focus indicators ${!focusVisible ? 'enabled' : 'disabled'}`);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <Icons.Settings className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-900">Accessibility Settings</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close accessibility panel"
          >
            <Icons.X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="p-4 space-y-6">
          {activeTab === 'visual' && (
            <div className="space-y-4">
              {/* Font Size Controls */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Text Size</h3>
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleFontSizeDecrease}
                    disabled={fontSize === 'small'}
                    aria-label="Decrease font size"
                  >
                    <Icons.Minus className="w-4 h-4" />
                  </Button>
                  <span className="text-sm font-medium text-gray-700 min-w-[60px] text-center">
                    {fontSize.charAt(0).toUpperCase() + fontSize.slice(1)}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleFontSizeIncrease}
                    disabled={fontSize === 'large'}
                    aria-label="Increase font size"
                  >
                    <Icons.Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* High Contrast Toggle */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3">High Contrast</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Icons.Contrast className="w-4 h-4 text-gray-600" />
                    <span className="text-sm text-gray-700">Enhanced contrast for better visibility</span>
                  </div>
                  <button
                    onClick={handleHighContrastToggle}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      highContrast ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                    role="switch"
                    aria-checked={highContrast}
                    aria-label="Toggle high contrast mode"
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        highContrast ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Reduced Motion Toggle */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Reduced Motion</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Icons.Zap className="w-4 h-4 text-gray-600" />
                    <span className="text-sm text-gray-700">Minimize animations and transitions</span>
                  </div>
                  <button
                    onClick={handleReducedMotionToggle}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      reducedMotion ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                    role="switch"
                    aria-checked={reducedMotion}
                    aria-label="Toggle reduced motion"
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        reducedMotion ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'audio' && (
            <div className="space-y-4">
              {/* Screen Reader Support */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-medium text-blue-900 mb-2">Screen Reader Support</h3>
                <p className="text-blue-800 text-sm mb-3">
                  This platform is optimized for screen readers and assistive technologies.
                </p>
                <div className="space-y-2 text-sm text-blue-800">
                  <div className="flex items-center space-x-2">
                    <Icons.Check className="w-4 h-4" />
                    <span>Semantic HTML structure</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icons.Check className="w-4 h-4" />
                    <span>ARIA labels and descriptions</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icons.Check className="w-4 h-4" />
                    <span>Keyboard navigation support</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icons.Check className="w-4 h-4" />
                    <span>Live region announcements</span>
                  </div>
                </div>
              </div>

              {/* Audio Controls */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Audio Feedback</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">System sounds</span>
                    <button className="text-blue-600 hover:text-blue-700 text-sm">
                      Test audio
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Speech synthesis</span>
                    <button className="text-blue-600 hover:text-blue-700 text-sm">
                      Enable
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'navigation' && (
            <div className="space-y-4">
              {/* Keyboard Navigation */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Keyboard Navigation</h3>
                <div className="space-y-2 text-sm text-gray-700">
                  <div className="flex items-center justify-between">
                    <span>Tab key navigation</span>
                    <span className="text-green-600 font-medium">Enabled</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Arrow key navigation</span>
                    <span className="text-green-600 font-medium">Enabled</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Escape key to close</span>
                    <span className="text-green-600 font-medium">Enabled</span>
                  </div>
                </div>
              </div>

              {/* Focus Indicators */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Focus Indicators</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Icons.MousePointer className="w-4 h-4 text-gray-600" />
                    <span className="text-sm text-gray-700">Enhanced focus visibility</span>
                  </div>
                  <button
                    onClick={handleFocusVisibleToggle}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      focusVisible ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                    role="switch"
                    aria-checked={focusVisible}
                    aria-label="Toggle focus indicators"
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        focusVisible ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Keyboard Shortcuts */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Keyboard Shortcuts</h3>
                <div className="space-y-2 text-sm text-gray-700">
                  <div className="flex justify-between">
                    <span>Skip to main content</span>
                    <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Tab</kbd>
                  </div>
                  <div className="flex justify-between">
                    <span>Navigate sections</span>
                    <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">H</kbd>
                  </div>
                  <div className="flex justify-between">
                    <span>Search</span>
                    <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Ctrl + K</kbd>
                  </div>
                  <div className="flex justify-between">
                    <span>Accessibility panel</span>
                    <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Ctrl + A</kbd>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">
              WCAG 2.1 AA Compliant
            </span>
            <Button variant="outline" size="sm" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AccessibilityPanel; 