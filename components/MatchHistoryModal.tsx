
import React, { useState, useEffect, useRef } from 'react';
import { Player } from '../types';
import PlayerImage from './PlayerImage';

interface MatchHistoryModalProps {
  player: Player;
  onClose: () => void;
}

interface MatchHistoryEntry {
  champion: string;
  championIcon: string;
  points: number;
  result: 'win' | 'loss';
  date: string;
}

const MatchHistoryModal: React.FC<MatchHistoryModalProps> = ({ player, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const mockHistory: MatchHistoryEntry[] = [
    { champion: 'Lee Sin', championIcon: 'https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/LeeSin.png', points: 18.5, result: 'win', date: '15/03' },
    { champion: 'Jarvan IV', championIcon: 'https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/JarvanIV.png', points: -2.1, result: 'loss', date: '12/03' },
    { champion: 'Sejuani', championIcon: 'https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/Sejuani.png', points: 12.4, result: 'win', date: '08/03' },
    { champion: 'Vi', championIcon: 'https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/Vi.png', points: 25.8, result: 'win', date: '01/03' },
  ];

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const progress = (target.scrollTop / (target.scrollHeight - target.clientHeight)) * 100;
    setScrollProgress(isNaN(progress) ? 0 : progress);
  };

  const triggerClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      onScroll={handleScroll}
      className={`fixed left-0 right-0 bottom-0 top-28 z-[300] overflow-y-auto transition-all duration-300 flex justify-center py-12 md:py-20
        ${isClosing ? 'bg-black/0 backdrop-blur-0' : 'bg-black/85 backdrop-blur-md'}`}
    >
      {/* Overlay clicável para fechar */}
      <div className="fixed inset-0 top-28" onClick={triggerClose}></div>

      <div 
        className={`relative w-full max-w-md h-fit bg-[#090909] rounded-[40px] shadow-[0_40px_100px_rgba(0,0,0,0.8)] transition-all duration-500 overflow-hidden
          ${isClosing ? 'opacity-0 scale-95 translate-y-12' : 'opacity-100 scale-100 translate-y-0 animate-in zoom-in-95'}`}
      >
        {/* Efeito de Borda Brilhante Reativa ao Scroll */}
        <div 
          className="absolute inset-0 pointer-events-none transition-opacity duration-500" 
          style={{ 
            padding: '2px', 
            borderRadius: 'inherit',
            background: `conic-gradient(from ${scrollProgress * 3}deg, transparent 0%, rgba(200, 155, 60, 0.4) 15%, rgba(200, 155, 60, 0.7) 20%, transparent 40%)`,
            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            maskComposite: 'exclude',
            WebkitMaskComposite: 'xor',
            opacity: 0.6,
          }}
        ></div>

        {/* Header - Identidade da Lenda */}
        <div className="p-8 border-b border-white/5 flex items-center justify-between bg-gradient-to-br from-[#c89b3c]/10 to-transparent relative z-10">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl border-2 border-[#c89b3c]/30 overflow-hidden bg-black shadow-2xl">
               <PlayerImage player={player} className="w-full h-full" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-black text-[#c89b3c] uppercase tracking-widest">{player.role}</span>
              </div>
              <h3 className="font-orbitron font-black text-2xl text-white uppercase tracking-tighter leading-none">{player.name}</h3>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1 opacity-60">{player.team}</p>
            </div>
          </div>
          <button onClick={triggerClose} className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/5 transition-all group active:scale-90">
            <i className="fa-solid fa-xmark text-gray-500 group-hover:text-white text-lg"></i>
          </button>
        </div>
        
        {/* Lista de Partidas - Conteúdo Fixo (Sem scroll interno) */}
        <div className="p-8 space-y-6 relative z-10">
          <div className="flex justify-between items-center">
            <h4 className="text-[10px] font-black text-gray-600 uppercase tracking-[0.3em]">ÚLTIMOS JOGOS</h4>
            <div className="px-2 py-0.5 rounded-sm bg-white/5 text-[8px] font-black text-gray-500 uppercase tracking-widest">RANKING PRO</div>
          </div>

          <div className="space-y-4">
            {mockHistory.map((match, idx) => (
              <div 
                key={idx} 
                className="flex items-center justify-between p-5 bg-white/[0.02] rounded-3xl border border-white/5 group hover:border-[#c89b3c]/20 hover:bg-white/[0.04] transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img src={match.championIcon} className="w-11 h-11 rounded-xl border border-white/10" alt="" />
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-black flex items-center justify-center text-[7px] font-black text-white shadow-lg ${match.result === 'win' ? 'bg-green-500' : 'bg-red-500'}`}>
                      {match.result === 'win' ? 'V' : 'D'}
                    </div>
                  </div>
                  <div>
                    <p className="text-[13px] font-black text-white uppercase tracking-tight group-hover:text-[#c89b3c] transition-colors">{match.champion}</p>
                    <span className="text-[9px] font-bold text-gray-600 uppercase tracking-widest">{match.date} • RD {10 - idx}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-orbitron font-black text-xl tracking-tighter ${match.points >= 0 ? 'text-white' : 'text-red-500'}`}>
                    {match.points > 0 ? '+' : ''}{match.points.toFixed(1).replace('.', ',')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Estatísticas e Botão de Fechar */}
        <div className="px-8 pb-10 pt-2 relative z-10 text-center">
          <div className="grid grid-cols-2 gap-4 mb-10">
             <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 text-center">
                <p className="text-[8px] font-black text-gray-700 uppercase tracking-widest mb-1">MÉDIA SEASON</p>
                <p className="text-lg font-orbitron font-black text-white">{player.avgPoints.toFixed(1)}</p>
             </div>
             <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 text-center">
                <p className="text-[8px] font-black text-gray-700 uppercase tracking-widest mb-1">KDA GERAL</p>
                <p className="text-lg font-orbitron font-black text-[#c89b3c]">{player.kda}</p>
             </div>
          </div>
          
          <button 
            onClick={triggerClose}
            className="inline-block text-white/20 hover:text-white/40 text-[9px] font-black uppercase tracking-[0.4em] transition-all active:scale-95 py-2"
          >
            FECHAR RELATÓRIO
          </button>
        </div>
      </div>
    </div>
  );
};

export default MatchHistoryModal;
