
import React, { useState, useEffect } from 'react';
import { Player } from '../types';
import { DataService } from '../services/api';

interface PlayerImageProps {
  player: Player;
  className?: string;
  priority?: boolean;
}

const PlayerImage: React.FC<PlayerImageProps> = ({ player, className, priority = false }) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Se a URL já for HTTP (como as da Wikia/Riot), usa ela diretamente
  const imageUrl = player.image && player.image.startsWith('http') 
    ? player.image 
    : player.image ? DataService.getStorageUrl('players', player.image) : '';

  const fallbackAvatar = `https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${player.name}&backgroundColor=0a0a0a&eyes=closed,shade&mouth=smile`;

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
  }, [imageUrl]);

  return (
    <div className={`${className} relative overflow-hidden bg-[#050505] flex items-center justify-center`}>
      {isLoading && (
        <div className="absolute inset-0 z-10 bg-[#0a0a0a]">
          <div className="w-full h-full bg-gradient-to-r from-transparent via-white/[0.03] to-transparent bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]"></div>
        </div>
      )}
      
      <img 
        src={hasError ? fallbackAvatar : imageUrl} 
        className={`w-full h-full object-cover object-top 
          ${isLoading ? 'opacity-0 scale-105' : 'opacity-100 scale-100 transition-all duration-700'} 
          ${hasError ? 'p-4 opacity-50 grayscale' : ''}`}
        alt={player.name}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setHasError(true);
          setIsLoading(false);
        }}
        loading={priority ? "eager" : "lazy"}
      />
      
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
};

export default PlayerImage;
