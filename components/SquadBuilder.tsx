
import React, { useState } from 'react';
import { UserTeam, Role, Player } from '../types';

interface SquadBuilderProps {
  userTeam: UserTeam;
  onFire: (role: Role) => void;
  onNavigateToMarket: () => void;
}

const SquadBuilder: React.FC<SquadBuilderProps> = ({ userTeam, onFire, onNavigateToMarket }) => {
  const [selectedRound, setSelectedRound] = useState(10);
  
  const roundHistory = [
    { round: 1, points: 135.43, fill: '85%' },
    { round: 2, points: 95.71, fill: '60%' },
    { round: 3, points: 108.84, fill: '70%' },
    { round: 4, points: 91.55, fill: '58%' },
    { round: 5, points: 119.42, fill: '75%' },
    { round: 6, points: 94.97, fill: '60%' },
    { round: 7, points: 56.59, fill: '40%' },
    { round: 8, points: 77.84, fill: '50%' },
    { round: 9, points: 31.98, fill: '25%' },
    { round: 10, points: 85.28, fill: '55%' },
  ];

  // Coordenadas refinadas para o mapa específico enviado pelo usuário
  const roles = [
    { id: Role.TOP, label: 'TOP', top: '15%', left: '16%' },
    { id: Role.JNG, label: 'JUN', top: '44%', left: '33%' },
    { id: Role.MID, label: 'MID', top: '51%', left: '51%' },
    { id: Role.ADC, label: 'ADC', top: '84%', left: '80%' },
    { id: Role.SUP, label: 'SUP', top: '65%', left: '88%' },
  ];

  return (
    <div className="max-w-[1200px] mx-auto space-y-12 animate-in fade-in duration-700 pb-20">
      
      {/* 1. TACTICAL HERO (HIGH-RESOLUTION MAP) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-8">
        <div className="lg:col-span-6 space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#c89b3c]/30 bg-[#c89b3c]/5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#c89b3c]"></div>
            <span className="text-[10px] font-black text-[#c89b3c] uppercase tracking-[0.2em]">TACTICAL OVERVIEW</span>
          </div>
          
          <h1 className="text-8xl font-orbitron font-black text-white uppercase tracking-tighter leading-[0.85]">
            {userTeam.name}
          </h1>
          
          <p className="text-gray-500 text-lg max-w-md font-medium leading-relaxed">
            Analise sua formação no mapa oficial da Kings Lendas. Otimize sua composição para a próxima rodada.
          </p>
          
          <div className="flex gap-16 pt-6">
            <div className="space-y-2">
              <span className="text-[10px] font-black text-gray-700 uppercase tracking-widest">PONTUAÇÃO</span>
              <p className="text-6xl font-orbitron font-black text-white tracking-tighter">897.6</p>
            </div>
            <div className="space-y-2">
              <span className="text-[10px] font-black text-gray-700 uppercase tracking-widest">VALOR TOTAL</span>
              <p className="text-6xl font-orbitron font-black text-[#c89b3c] tracking-tighter">
                <span className="text-2xl mr-1 font-inter italic font-normal">C$</span>76.5
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 flex justify-end">
          <div className="relative w-full max-w-[540px] aspect-square rounded-[40px] overflow-hidden bg-[#1a1a1a] border border-white/10 shadow-[0_40px_120px_rgba(0,0,0,1)]">
            {/* MAPA DO IMGUR COM URL DIRETA E REFERRER POLICY PARA BURLAR HOTLINK BLOCK */}
            <img 
              src="https://i.imgur.com/myc9dfj.png" 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-all duration-1000 contrast-[1.1] brightness-[0.9] saturate-[1.2]" 
              alt="Kings Lendas Tactical Map"
            />
            {/* Vinheta profunda para foco tático */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30 pointer-events-none"></div>
            
            {roles.map(role => {
              const p = userTeam.players[role.id];
              return (
                <div 
                  key={role.id} 
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                  style={{ top: role.top, left: role.left }}
                >
                  <div className="flex flex-col items-center group/marker">
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 relative border-2 ${p ? 'border-[#c89b3c] bg-black shadow-[0_0_30px_rgba(200,155,60,0.6)] scale-110' : 'border-white/20 bg-black/80 backdrop-blur-md hover:border-white/40'}`}>
                      {p ? (
                        <img src={p.image} className="w-full h-full object-cover rounded-full p-0.5" alt="" />
                      ) : (
                        <i className="fa-solid fa-plus text-white/30 text-sm group-hover/marker:text-white transition-colors"></i>
                      )}
                    </div>
                    <div className="mt-2.5 bg-black px-2.5 py-0.5 rounded border border-white/10 text-[9px] font-black text-white uppercase tracking-tighter shadow-2xl min-w-[36px] text-center">
                      {role.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. ROUND FILTER */}
      <div className="bg-[#121212]/40 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/5 shadow-2xl">
        <div className="bg-white/[0.03] border-b border-white/5 p-4 flex items-center justify-between px-10">
          <button className="w-10 h-10 flex items-center justify-center text-gray-700 hover:text-white transition-colors bg-white/5 rounded-lg">
            <i className="fa-solid fa-chevron-left text-xs"></i>
          </button>
          <span className="font-orbitron font-black text-sm text-white uppercase tracking-[0.3em]">RODADA {selectedRound}</span>
          <button className="w-10 h-10 flex items-center justify-center text-gray-700 hover:text-white transition-colors bg-white/5 rounded-lg opacity-30">
            <i className="fa-solid fa-chevron-right text-xs"></i>
          </button>
        </div>
        
        <div className="p-10 flex items-end justify-between gap-1 overflow-x-auto no-scrollbar bg-black/20">
          {roundHistory.map((rh) => (
            <div 
              key={rh.round} 
              className={`flex-1 min-w-[80px] flex flex-col items-center gap-4 cursor-pointer group transition-all ${selectedRound === rh.round ? 'opacity-100 scale-105' : 'opacity-25 hover:opacity-50'}`}
              onClick={() => setSelectedRound(rh.round)}
            >
              <span className="text-[11px] font-black text-white tracking-tighter">{rh.points.toFixed(2)}</span>
              <div className="w-full h-24 bg-white/[0.02] relative" style={{ clipPath: 'polygon(0 0, 85% 0, 100% 15%, 100% 100%, 0 100%)' }}>
                <div 
                  className={`absolute bottom-0 left-0 right-0 transition-all duration-700 ${selectedRound === rh.round ? 'bg-[#c89b3c]/60' : 'bg-[#4a4538]'}`} 
                  style={{ height: rh.fill }}
                ></div>
              </div>
              <span className="text-[10px] font-bold text-gray-600 uppercase tracking-tighter">Rodada {rh.round}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. STATS DASHBOARD */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-1 shadow-2xl">
        <div className="bg-[#1a1a1a] border border-white/5 p-8 text-center group hover:bg-white/[0.02] transition-all" style={{ clipPath: 'polygon(0 0, 95% 0, 100% 20%, 100% 100%, 0 100%)' }}>
           <div className="flex items-center justify-center gap-2 mb-2">
              <i className="fa-solid fa-coins text-[#c89b3c] text-[10px]"></i>
              <p className="text-[10px] font-black text-gray-600 uppercase tracking-[0.2em]">PATRIMÔNIO</p>
           </div>
           <p className="font-orbitron font-black text-3xl text-white">{(userTeam.budget / 1000).toFixed(1)}</p>
        </div>
        <div className="bg-[#121212] border border-white/5 p-8 text-center" style={{ clipPath: 'polygon(5% 0, 95% 0, 100% 20%, 100% 100%, 0 100%, 0 20%)' }}>
           <p className="text-[10px] font-black text-gray-600 uppercase tracking-[0.2em] mb-2">PTS. NA RODADA</p>
           <p className="font-orbitron font-black text-3xl text-white">85.28</p>
        </div>
        <div className="bg-[#1a1a1a] border border-white/5 p-8 text-center group hover:bg-white/[0.02] transition-all" style={{ clipPath: 'polygon(5% 0, 100% 0, 100% 100%, 0 100%, 0 20%)' }}>
           <p className="text-[10px] font-black text-gray-600 uppercase tracking-[0.2em] mb-2">PTS. TOTAL</p>
           <p className="font-orbitron font-black text-3xl text-white">{userTeam.totalPoints.toFixed(1)}</p>
        </div>
      </div>

      {/* 4. ROSTER ATUAL */}
      <div className="space-y-8 pt-10">
        <div className="flex items-center gap-6 px-2">
          <h2 className="text-[12px] font-black text-gray-700 uppercase tracking-[0.3em] whitespace-nowrap">ROSTER ATUAL</h2>
          <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {roles.map((role) => {
            const p = userTeam.players[role.id];
            return (
              <div key={role.id} className="glass-card rounded-[32px] p-6 border border-white/5 hover:border-[#c89b3c]/30 transition-all group relative overflow-hidden flex flex-col items-center text-center">
                <div className="w-full flex justify-between items-start mb-6">
                  <span className="text-[10px] font-black text-[#c89b3c] tracking-widest uppercase">{role.label === 'JUN' ? 'JUNGLE' : role.id}</span>
                  {p && <span className="text-[11px] font-orbitron font-bold text-white">{p.points.toFixed(1)}</span>}
                </div>
                
                <div className="w-full aspect-square rounded-[24px] overflow-hidden bg-black border border-white/10 mb-6 group-hover:shadow-[0_0_30px_rgba(200,155,60,0.15)] transition-all">
                  {p ? (
                    <img src={p.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={p.name} />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/5">
                      <i className="fa-solid fa-plus text-2xl"></i>
                    </div>
                  )}
                </div>

                <div className="space-y-1 w-full px-2">
                  <h3 className="font-bold text-white text-base truncate uppercase tracking-tight">
                    {p ? p.name : 'Vazio'}
                  </h3>
                  <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">
                    {p ? p.team : 'Disponível'}
                  </p>
                </div>

                <div className="pt-6 w-full">
                  {p ? (
                    <button onClick={() => onFire(role.id)} className="w-full py-3 bg-red-500/10 text-red-500 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all">Remover</button>
                  ) : (
                    <button onClick={onNavigateToMarket} className="w-full py-3 bg-[#c89b3c]/5 text-[#c89b3c] rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-[#c89b3c] hover:text-black transition-all border border-[#c89b3c]/20">Mercado</button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SquadBuilder;
