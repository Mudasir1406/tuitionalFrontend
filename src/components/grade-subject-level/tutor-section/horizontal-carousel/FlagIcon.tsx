import React from 'react';

interface FlagIconProps {
  countryCode: string;
  size?: number;
}

const FlagIcon: React.FC<FlagIconProps> = ({ countryCode, size = 20 }) => {
  const getFlagSvg = (code: string) => {
    switch (code.toLowerCase()) {
      case 'sa': // Saudi Arabia
        return (
          <svg width={size} height={size} viewBox="0 0 24 16">
            <rect width="24" height="16" fill="#006C35"/>
            <rect width="24" height="8" fill="#FFFFFF"/>
            <text x="12" y="10" textAnchor="middle" fontSize="8" fill="#006C35">SA</text>
          </svg>
        );
      case 'ae': // UAE
        return (
          <svg width={size} height={size} viewBox="0 0 24 16">
            <rect width="24" height="16" fill="#FF0000"/>
            <rect width="18" y="0" height="5.33" fill="#00FF00"/>
            <rect width="18" y="5.33" height="5.33" fill="#FFFFFF"/>
            <rect width="18" y="10.67" height="5.33" fill="#000000"/>
          </svg>
        );
      case 'us': // USA
        return (
          <svg width={size} height={size} viewBox="0 0 24 16">
            <rect width="24" height="16" fill="#B22234"/>
            <rect width="24" y="1.23" height="1.23" fill="#FFFFFF"/>
            <rect width="24" y="3.69" height="1.23" fill="#FFFFFF"/>
            <rect width="24" y="6.15" height="1.23" fill="#FFFFFF"/>
            <rect width="24" y="8.62" height="1.23" fill="#FFFFFF"/>
            <rect width="24" y="11.08" height="1.23" fill="#FFFFFF"/>
            <rect width="24" y="13.54" height="1.23" fill="#FFFFFF"/>
            <rect width="9.6" height="8.62" fill="#3C3B6E"/>
          </svg>
        );
      case 'gb': // United Kingdom
        return (
          <svg width={size} height={size} viewBox="0 0 24 16">
            <rect width="24" height="16" fill="#012169"/>
            <path d="M0,0 L24,16 M24,0 L0,16" stroke="#FFFFFF" strokeWidth="1.6"/>
            <path d="M0,0 L24,16 M24,0 L0,16" stroke="#C8102E" strokeWidth="0.8"/>
            <rect x="9.6" y="0" width="4.8" height="16" fill="#FFFFFF"/>
            <rect x="0" y="6.4" width="24" height="3.2" fill="#FFFFFF"/>
            <rect x="10.4" y="0" width="3.2" height="16" fill="#C8102E"/>
            <rect x="0" y="7.2" width="24" height="1.6" fill="#C8102E"/>
          </svg>
        );
      case 'fr': // France
        return (
          <svg width={size} height={size} viewBox="0 0 24 16">
            <rect width="8" height="16" fill="#002395"/>
            <rect x="8" width="8" height="16" fill="#FFFFFF"/>
            <rect x="16" width="8" height="16" fill="#ED2939"/>
          </svg>
        );
      case 'de': // Germany
        return (
          <svg width={size} height={size} viewBox="0 0 24 16">
            <rect width="24" height="5.33" fill="#000000"/>
            <rect y="5.33" width="24" height="5.33" fill="#DD0000"/>
            <rect y="10.67" width="24" height="5.33" fill="#FFCE00"/>
          </svg>
        );
      case 'ca': // Canada
        return (
          <svg width={size} height={size} viewBox="0 0 24 16">
            <rect width="24" height="16" fill="#FFFFFF"/>
            <rect width="6" height="16" fill="#FF0000"/>
            <rect x="18" width="6" height="16" fill="#FF0000"/>
            <polygon points="12,4 13,7 16,7 13.5,9 14.5,12 12,10 9.5,12 10.5,9 8,7 11,7" fill="#FF0000"/>
          </svg>
        );
      case 'au': // Australia
        return (
          <svg width={size} height={size} viewBox="0 0 24 16">
            <rect width="24" height="16" fill="#012169"/>
            <rect width="12" height="8" fill="#012169"/>
            <path d="M0,0 L12,8 M12,0 L0,8" stroke="#FFFFFF" strokeWidth="0.8"/>
            <path d="M0,0 L12,8 M12,0 L0,8" stroke="#C8102E" strokeWidth="0.4"/>
          </svg>
        );
      case 'es': // Spain
        return (
          <svg width={size} height={size} viewBox="0 0 24 16">
            <rect width="24" height="16" fill="#AA151B"/>
            <rect y="4" width="24" height="8" fill="#F1BF00"/>
          </svg>
        );
      case 'it': // Italy
        return (
          <svg width={size} height={size} viewBox="0 0 24 16">
            <rect width="8" height="16" fill="#009246"/>
            <rect x="8" width="8" height="16" fill="#FFFFFF"/>
            <rect x="16" width="8" height="16" fill="#CE2B37"/>
          </svg>
        );
      default:
        return (
          <svg width={size} height={size} viewBox="0 0 24 16">
            <rect width="24" height="16" fill="#CCCCCC" stroke="#999999" strokeWidth="1"/>
            <text x="12" y="10" textAnchor="middle" fontSize="6" fill="#666666">{code.toUpperCase()}</text>
          </svg>
        );
    }
  };

  return (
    <div style={{ 
      display: 'inline-block', 
      borderRadius: '50%', 
      overflow: 'hidden',
      width: size,
      height: size
    }}>
      {getFlagSvg(countryCode)}
    </div>
  );
};

export default FlagIcon;