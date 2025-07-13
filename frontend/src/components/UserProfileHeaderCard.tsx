import React from 'react';

interface UserProfileHeaderCardProps {
  name: string;
  subtitle?: string;
  location?: string;
  id?: string;
  completion?: number;
  showCompletion?: boolean;
}

const UserProfileHeaderCard: React.FC<UserProfileHeaderCardProps> = ({
  name,
  subtitle = 'Government Schemes Portal Member',
  location,
  id,
  completion = 100,
  showCompletion = true,
}) => {
  return (
    <div className="bg-gradient-to-r from-blue-100 via-indigo-50 to-purple-100 rounded-2xl p-8 flex items-center justify-between shadow-lg border border-blue-100">
      <div className="flex items-center space-x-6">
        <div className="relative">
          <div className="w-20 h-20 bg-white bg-opacity-30 rounded-full flex items-center justify-center border-2 border-white border-opacity-40">
            <span className="text-3xl font-bold text-blue-900">{name?.charAt(0) || 'U'}</span>
          </div>
          <div className="absolute -bottom-2 -right-2 w-7 h-7 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
            <span className="text-white text-base">✓</span>
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-blue-900 mb-1">{name}</h1>
          <p className="text-indigo-700 text-base mb-1">{subtitle}</p>
          <div className="flex items-center space-x-4 text-sm">
            {location && (
              <span className="flex items-center text-blue-700"><span className="mr-1">📍</span>{location}</span>
            )}
            {id && (
              <span className="flex items-center text-blue-700"><span className="mr-1">🆔</span>ID: {id}</span>
            )}
          </div>
        </div>
      </div>
      {showCompletion && (
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-white bg-opacity-30 rounded-full flex items-center justify-center border-2 border-white border-opacity-40 mb-2">
            <span className="text-2xl font-bold text-green-600">{completion}%</span>
          </div>
          <span className="text-blue-700 text-sm font-medium">Profile Complete</span>
        </div>
      )}
    </div>
  );
};

export default UserProfileHeaderCard; 