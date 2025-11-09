import React from 'react';

interface LogoProps {
  className?: string;
  light?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = '', light = false }) => {
  const textColor = light ? 'text-white' : 'text-gray-900';
  const primaryColor = light ? 'text-gray-300' : 'text-primary';

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
        <svg className={`w-auto ${primaryColor}`} height="100%" viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 0 L100 25 L100 75 L50 100 L0 75 L0 25 Z M15 32 L15 68 L50 85 L85 68 L85 32 L50 15 Z M25 38 L50 25 L75 38 L75 62 L50 75 L25 62 Z" />
        </svg>
      <span className={`text-2xl font-bold tracking-tight ${textColor}`}>
        Marso <span className={`${primaryColor} font-light`}>Electronic</span>
      </span>
    </div>
  );
};

export default Logo;
