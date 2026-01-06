
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

  // Se a imagem for apenas um path (ex: ayel.webp), resolvemos via Supabase
  const imageUrl = player.image.startsWith('http') 
    ? player.image 
    : DataService.getStorageUrl('players', player.image);

  // Avatar de contingência de alta qualidade usando DiceBear
  const fallbackAvatar = `https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${player.name}&backgroundColor=0a0a0a&eyes=closed,shade&mouth=smile`;

  useEffect(() => {
    setHasError(false);
    setIsLoading(true);
  }, [imageUrl]);

  return (
    <div className={`${className} relative overflow-hidden bg-[#0a0a0a] flex items-center justify-center`}>
      {isLoading && (
        <div className="absolute inset-0 z-10 bg-[#0a0a0a]">
          <div className="w-full h-full bg-gradient-to-r from-transparent via-white/[0.05] to-transparent bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]"></div>
        </div>
      )}
      
      <img 
        src={hasError ? fallbackAvatar : imageUrl} 
        className={`w-full h-full object-cover object-center transition-all duration-700 
          ${isLoading ? 'opacity-0 scale-110' : 'opacity-100 scale-100'} 
          ${hasError ? 'p-3 brightness-90 grayscale-[0.5]' : ''}`}
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
