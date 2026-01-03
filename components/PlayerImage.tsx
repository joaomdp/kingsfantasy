
import React, { useState, useEffect } from 'react';
import { Player } from '../types';

interface PlayerImageProps {
  player: Player;
  className?: string;
  priority?: boolean;
}

const PlayerImage: React.FC<PlayerImageProps> = ({ player, className, priority = false }) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fallback visual caso o GitHub bloqueie o acesso (Repo Privado)
  const fallbackAvatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${player.name}&backgroundColor=0a0a0a&top=shortHair,shortCurly,flat701`;

  useEffect(() => {
    // Reset state when player changes
    setHasError(false);
    setIsLoading(true);
  }, [player.id, player.image]);

  return (
    <div className={`${className} relative overflow-hidden bg-[#0a0a0a] flex items-center justify-center`}>
      {/* Shimmer Effect - Perceptual Performance Improvement */}
      {isLoading && (
        <div className="absolute inset-0 z-10">
          <div className="w-full h-full bg-gradient-to-r from-transparent via-white/[0.03] to-transparent bg-[length:200%_100%] animate-[shimmer_1.5s_infinite] bg-no-repeat"></div>
          <style>{`
            @keyframes shimmer {
              0% { background-position: -200% 0; }
              100% { background-position: 200% 0; }
            }
          `}</style>
        </div>
      )}
      
      <img 
        src={hasError ? fallbackAvatar : player.image} 
        className={`w-full h-full object-cover object-center transition-all duration-700 
          ${isLoading ? 'opacity-0 scale-105' : 'opacity-100 scale-100'} 
          ${hasError ? 'p-2 brightness-75 scale-90' : ''}`}
        alt={player.name}
        onLoad={() => setIsLoading(false)}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchpriority={priority ? "high" : "auto"}
        onError={() => {
          if (!hasError) {
            console.warn(`[Kings] A imagem de ${player.name} falhou. Verifique se o repo é PÚBLICO: ${player.image}`);
            setHasError(true);
            setIsLoading(false);
          }
        }}
      />

      {/* Selo de Erro Discreto */}
      {hasError && (
        <div className="absolute top-1 right-1 z-30 opacity-20 hover:opacity-100 transition-opacity">
           <i className="fa-solid fa-circle-exclamation text-[8px] text-red-500" title="Link Quebrado ou Privado"></i>
        </div>
      )}
    </div>
  );
};

export default PlayerImage;
