import React, { useState } from 'react';
import { Icons } from '../components/ui/Icons';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  isOfficial: boolean;
  isSupported: boolean;
  isInstalled: boolean;
  translationProgress: number;
  lastUpdated: string;
}

interface LanguageSettings {
  primaryLanguage: string;
  secondaryLanguages: string[];
  interfaceLanguage: string;
  contentLanguage: string;
  autoTranslate: boolean;
  showTranslations: boolean;
  speechToText: boolean;
  textToSpeech: boolean;
  voiceLanguage: string;
  fontSize: 'small' | 'medium' | 'large';
  fontFamily: string;
  direction: 'ltr' | 'rtl';
}

const LanguageSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('languages');
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [settings, setSettings] = useState<LanguageSettings>({
    primaryLanguage: 'en',
    secondaryLanguages: ['hi', 'ta'],
    interfaceLanguage: 'en',
    contentLanguage: 'en',
    autoTranslate: true,
    showTranslations: true,
    speechToText: false,
    textToSpeech: false,
    voiceLanguage: 'en',
    fontSize: 'medium',
    fontFamily: 'default',
    direction: 'ltr'
  });

  // Mock languages data
  const languages: Language[] = [
    {
      code: 'en',
      name: 'English',
      nativeName: 'English',
      flag: '🇺🇸',
      isOfficial: true,
      isSupported: true,
      isInstalled: true,
      translationProgress: 100,
      lastUpdated: '2024-01-15T10:30:00Z'
    },
    {
      code: 'hi',
      name: 'Hindi',
      nativeName: 'हिन्दी',
      flag: '🇮🇳',
      isOfficial: true,
      isSupported: true,
      isInstalled: true,
      translationProgress: 95,
      lastUpdated: '2024-01-14T15:20:00Z'
    },
    {
      code: 'ta',
      name: 'Tamil',
      nativeName: 'தமிழ்',
      flag: '🇮🇳',
      isOfficial: true,
      isSupported: true,
      isInstalled: true,
      translationProgress: 88,
      lastUpdated: '2024-01-13T12:45:00Z'
    },
    {
      code: 'te',
      name: 'Telugu',
      nativeName: 'తెలుగు',
      flag: '🇮🇳',
      isOfficial: true,
      isSupported: true,
      isInstalled: false,
      translationProgress: 75,
      lastUpdated: '2024-01-12T09:15:00Z'
    },
    {
      code: 'bn',
      name: 'Bengali',
      nativeName: 'বাংলা',
      flag: '🇮🇳',
      isOfficial: true,
      isSupported: true,
      isInstalled: false,
      translationProgress: 70,
      lastUpdated: '2024-01-11T14:30:00Z'
    },
    {
      code: 'mr',
      name: 'Marathi',
      nativeName: 'मराठी',
      flag: '🇮🇳',
      isOfficial: true,
      isSupported: true,
      isInstalled: false,
      translationProgress: 65,
      lastUpdated: '2024-01-10T11:20:00Z'
    },
    {
      code: 'gu',
      name: 'Gujarati',
      nativeName: 'ગુજરાતી',
      flag: '🇮🇳',
      isOfficial: true,
      isSupported: true,
      isInstalled: false,
      translationProgress: 60,
      lastUpdated: '2024-01-09T16:40:00Z'
    },
    {
      code: 'kn',
      name: 'Kannada',
      nativeName: 'ಕನ್ನಡ',
      flag: '🇮🇳',
      isOfficial: true,
      isSupported: true,
      isInstalled: false,
      translationProgress: 55,
      lastUpdated: '2024-01-08T13:25:00Z'
    },
    {
      code: 'ml',
      name: 'Malayalam',
      nativeName: 'മലയാളം',
      flag: '🇮🇳',
      isOfficial: true,
      isSupported: true,
      isInstalled: false,
      translationProgress: 50,
      lastUpdated: '2024-01-07T10:50:00Z'
    },
    {
      code: 'pa',
      name: 'Punjabi',
      nativeName: 'ਪੰਜਾਬੀ',
      flag: '🇮🇳',
      isOfficial: true,
      isSupported: true,
      isInstalled: false,
      translationProgress: 45,
      lastUpdated: '2024-01-06T08:35:00Z'
    }
  ];

  const tabs = [
    { id: 'languages', label: 'Languages', icon: Icons.Globe },
    { id: 'interface', label: 'Interface', icon: Icons.Monitor },
    { id: 'accessibility', label: 'Accessibility', icon: Icons.Eye },
    { id: 'voice', label: 'Voice & Speech', icon: Icons.Volume2 }
  ];

  const fontFamilies = [
    { value: 'default', label: 'System Default' },
    { value: 'arial', label: 'Arial' },
    { value: 'times', label: 'Times New Roman' },
    { value: 'courier', label: 'Courier New' },
    { value: 'verdana', label: 'Verdana' }
  ];

  const voiceLanguages = [
    { code: 'en', name: 'English', voice: 'en-US' },
    { code: 'hi', name: 'Hindi', voice: 'hi-IN' },
    { code: 'ta', name: 'Tamil', voice: 'ta-IN' },
    { code: 'te', name: 'Telugu', voice: 'te-IN' },
    { code: 'bn', name: 'Bengali', voice: 'bn-IN' }
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleLanguageInstall = (languageCode: string) => {
    console.log(`Installing language: ${languageCode}`);
    // Mock installation
    const updatedLanguages = languages.map(lang => 
      lang.code === languageCode ? { ...lang, isInstalled: true } : lang
    );
    console.log('Updated languages:', updatedLanguages);
  };

  const handleLanguageUninstall = (languageCode: string) => {
    console.log(`Uninstalling language: ${languageCode}`);
    // Mock uninstallation
    const updatedLanguages = languages.map(lang => 
      lang.code === languageCode ? { ...lang, isInstalled: false } : lang
    );
    console.log('Updated languages:', updatedLanguages);
  };

  const handleSettingsChange = (key: keyof LanguageSettings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const renderLanguagesTab = () => (
    <div className="space-y-6">
      {/* Primary Language */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Primary Language</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {languages.filter(lang => lang.isInstalled).map((language) => (
            <div
              key={language.code}
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                settings.primaryLanguage === language.code
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => handleSettingsChange('primaryLanguage', language.code)}
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{language.flag}</span>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{language.name}</p>
                  <p className="text-sm text-gray-600">{language.nativeName}</p>
                </div>
                {settings.primaryLanguage === language.code && (
                  <Icons.CheckCircle className="w-5 h-5 text-blue-600" />
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Available Languages */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Languages</h3>
        <div className="space-y-4">
          {languages.map((language) => (
            <div key={language.code} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-4">
                <span className="text-2xl">{language.flag}</span>
                <div>
                  <div className="flex items-center space-x-2">
                    <p className="font-medium text-gray-900">{language.name}</p>
                    <p className="text-sm text-gray-600">({language.nativeName})</p>
                    {language.isOfficial && (
                      <Badge variant="success" size="sm">Official</Badge>
                    )}
                  </div>
                  <div className="flex items-center space-x-4 mt-1">
                    <div className="flex items-center space-x-1">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full bg-green-500"
                          style={{ width: `${language.translationProgress}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-600">{language.translationProgress}%</span>
                    </div>
                    <span className="text-xs text-gray-500">
                      Updated: {formatDate(language.lastUpdated)}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {language.isInstalled ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleLanguageUninstall(language.code)}
                  >
                    Uninstall
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    onClick={() => handleLanguageInstall(language.code)}
                  >
                    Install
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Language Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Icons.Globe className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-blue-600">
              {languages.filter(lang => lang.isInstalled).length}
            </p>
            <p className="text-sm text-gray-600">Installed Languages</p>
          </div>
        </Card>

        <Card>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Icons.CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-green-600">
              {languages.filter(lang => lang.translationProgress === 100).length}
            </p>
            <p className="text-sm text-gray-600">Complete Translations</p>
          </div>
        </Card>

        <Card>
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Icons.Settings className="w-6 h-6 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-purple-600">
              {languages.filter(lang => lang.isOfficial).length}
            </p>
            <p className="text-sm text-gray-600">Official Languages</p>
          </div>
        </Card>
      </div>
    </div>
  );

  const renderInterfaceTab = () => (
    <div className="space-y-6">
      {/* Interface Language */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Interface Language</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Display Language
            </label>
            <select
              value={settings.interfaceLanguage}
              onChange={(e) => handleSettingsChange('interfaceLanguage', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {languages.filter(lang => lang.isInstalled).map((language) => (
                <option key={language.code} value={language.code}>
                  {language.name} ({language.nativeName})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content Language
            </label>
            <select
              value={settings.contentLanguage}
              onChange={(e) => handleSettingsChange('contentLanguage', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {languages.filter(lang => lang.isInstalled).map((language) => (
                <option key={language.code} value={language.code}>
                  {language.name} ({language.nativeName})
                </option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {/* Translation Settings */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Translation Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Auto-translate content</p>
              <p className="text-sm text-gray-600">Automatically translate content to your preferred language</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.autoTranslate}
                onChange={(e) => handleSettingsChange('autoTranslate', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Show original text</p>
              <p className="text-sm text-gray-600">Display original text alongside translations</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.showTranslations}
                onChange={(e) => handleSettingsChange('showTranslations', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </Card>
    </div>
  );

  const renderAccessibilityTab = () => (
    <div className="space-y-6">
      {/* Font Settings */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Font Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Font Size
            </label>
            <div className="flex items-center space-x-4">
              {['small', 'medium', 'large'].map((size) => (
                <button
                  key={size}
                  onClick={() => handleSettingsChange('fontSize', size)}
                  className={`px-4 py-2 rounded-lg border ${
                    settings.fontSize === size
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 text-gray-700 hover:border-gray-400'
                  }`}
                >
                  {size.charAt(0).toUpperCase() + size.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Font Family
            </label>
            <select
              value={settings.fontFamily}
              onChange={(e) => handleSettingsChange('fontFamily', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {fontFamilies.map((font) => (
                <option key={font.value} value={font.value}>
                  {font.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Text Direction
            </label>
            <div className="flex items-center space-x-4">
              {['ltr', 'rtl'].map((direction) => (
                <button
                  key={direction}
                  onClick={() => handleSettingsChange('direction', direction)}
                  className={`px-4 py-2 rounded-lg border ${
                    settings.direction === direction
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 text-gray-700 hover:border-gray-400'
                  }`}
                >
                  {direction.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );

  const renderVoiceTab = () => (
    <div className="space-y-6">
      {/* Voice Settings */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Voice & Speech Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Speech-to-Text</p>
              <p className="text-sm text-gray-600">Enable voice input for text fields</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.speechToText}
                onChange={(e) => handleSettingsChange('speechToText', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Text-to-Speech</p>
              <p className="text-sm text-gray-600">Read content aloud</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.textToSpeech}
                onChange={(e) => handleSettingsChange('textToSpeech', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Voice Language
            </label>
            <select
              value={settings.voiceLanguage}
              onChange={(e) => handleSettingsChange('voiceLanguage', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {voiceLanguages.map((voice) => (
                <option key={voice.code} value={voice.code}>
                  {voice.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {/* Voice Preview */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Voice Preview</h3>
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-700 mb-2">Sample text for voice preview:</p>
            <p className="text-sm text-gray-600">
              "Welcome to JanSuvidha360. Your trusted platform for government services."
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" rightIcon={<Icons.Volume2 className="w-4 h-4" />}>
              Play Preview
            </Button>
            <Button variant="outline" size="sm" rightIcon={<Icons.VolumeX className="w-4 h-4" />}>
              Stop
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
        <div className="flex items-center space-x-3">
          <Icons.Globe className="w-8 h-8" />
          <div>
            <h1 className="text-2xl font-bold">Language Settings</h1>
            <p className="text-blue-100">Multi-language support and accessibility options</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex space-x-1 bg-white rounded-lg p-1 shadow-sm mb-8">
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

        {/* Content */}
        <div className="space-y-6">
          {activeTab === 'languages' && renderLanguagesTab()}
          {activeTab === 'interface' && renderInterfaceTab()}
          {activeTab === 'accessibility' && renderAccessibilityTab()}
          {activeTab === 'voice' && renderVoiceTab()}
        </div>

        {/* Save Button */}
        <div className="mt-8 flex justify-end">
          <Button size="lg" rightIcon={<Icons.Save className="w-4 h-4" />}>
            Save Language Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LanguageSettings; 