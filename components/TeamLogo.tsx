
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
    <div className={`${className} flex items-center justify-center relative`}>
      {!hasError ? (
        <img 
          src={logoUrl} 
          alt={teamName}
          className="relative z-10 max-w-full max-h-full object-contain transition-all duration-500 brightness-110 contrast-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]"
          onError={() => setHasError(true)}
        />
      ) : (
        <div className="relative z-10 w-full h-full rounded-full bg-[#5E6CFF]/10 border border-[#5E6CFF]/30 flex items-center justify-center shadow-[0_0_10px_rgba(94,108,255,0.1)]">
          <span className="text-[10px] font-black text-[#5E6CFF]">{getInitials(teamName)}</span>
        </div>
      )}
    </div>
  );
};

export default TeamLogo;
