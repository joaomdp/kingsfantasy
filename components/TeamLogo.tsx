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
          className="relative z-10 max-w-full max-h-full object-contain transition-all duration-500 brightness-110 contrast-110"
          onError={() => setHasError(true)}
        />
      ) : (
        <div className="relative z-10 w-full h-full rounded-full bg-[#bc13fe]/10 border border-[#bc13fe]/30 flex items-center justify-center">
          <span className="text-[10px] font-black text-[#bc13fe]">{getInitials(teamName)}</span>
        </div>
      )}
    </div>
  );
};

export default TeamLogo;