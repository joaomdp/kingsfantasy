
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
  // Se for prioridade, começamos como "não carregando" para evitar o flash do shimmer
  const [isLoading, setIsLoading] = useState(!priority);

  const imageUrl = player.image && player.image.startsWith('http') 
    ? player.image 
    : player.image ? DataService.getStorageUrl('players', player.image) : '';

  const fallbackAvatar = `https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${player.name}&backgroundColor=0a0a0a&eyes=closed,shade&mouth=smile`;

  useEffect(() => {
    // Apenas reinicia o loading se não for prioridade
    if (!priority) {
      setIsLoading(true);
    }
    setHasError(false);

    if (!imageUrl) {
      setHasError(true);
      setIsLoading(false);
    }
  }, [imageUrl, priority]);

  return (
    <div className={`${className} relative overflow-hidden bg-[#050505] flex items-center justify-center`}>
      {/* Shimmer apenas para imagens de baixa prioridade (lista do mercado) */}
      {isLoading && !priority && (
        <div className="absolute inset-0 z-10 bg-[#0a0a0a]">
          <div className="w-full h-full bg-gradient-to-r from-transparent via-white/[0.03] to-transparent bg-[length:200%_100%] animate-[shimmer_1s_infinite]"></div>
        </div>
      )}
      
      <img 
        src={hasError ? fallbackAvatar : imageUrl} 
        className={`w-full h-full object-cover object-center 
          ${priority ? 'opacity-100 scale-100' : 'transition-all duration-300'} 
          ${!priority && isLoading ? 'opacity-0 scale-105' : 'opacity-100 scale-100'} 
          ${hasError ? 'p-2 opacity-50 grayscale' : ''}`}
        alt={player.name}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setHasError(true);
          setIsLoading(false);
        }}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
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
