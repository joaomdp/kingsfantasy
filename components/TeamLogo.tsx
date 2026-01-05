
import React, { useState } from 'react';

interface TeamLogoProps {
  logoUrl: string;
  teamName: string;
  className?: string;
}

const TeamLogo: React.FC<TeamLogoProps> = ({ logoUrl, teamName, className = "w-5 h-5" }) => {
  const [hasError, setHasError] = useState(false);

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  return (
    <div className={`${className} flex items-center justify-center overflow-hidden`}>
      {!hasError ? (
        <img 
          src={logoUrl} 
          alt={teamName}
          className="max-w-full max-h-full object-contain transition-all duration-500"
          onError={() => setHasError(true)}
        />
      ) : (
        <div className="w-full h-full rounded bg-[#c89b3c]/10 border border-[#c89b3c]/30 flex items-center justify-center">
          <span className="text-[8px] font-black text-[#c89b3c]">{getInitials(teamName)}</span>
        </div>
      )}
    </div>
  );
};

export default TeamLogo;
