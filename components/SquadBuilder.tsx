
import React from 'react';
import { UserTeam, Role } from '../types';

interface SquadBuilderProps {
  userTeam: UserTeam;
  onFire: (role: Role) => void;
  onNavigateToMarket: () => void;
}

const SquadBuilder: React.FC<SquadBuilderProps> = ({ userTeam, onFire, onNavigateToMarket }) => {
  const roles = [Role.TOP, Role.JNG, Role.MID, Role.ADC, Role.SUP];

  const rolePositions: Record<string, { top: string; left: string }> = {
    [Role.TOP]: { top: '15%', left: '15%' },
    [Role.JNG]: { top: '38%', left: '38%' },
    [Role.MID]: { top: '51%', left: '51%' },
    [Role.ADC]: { top: '85%', left: '82%' },
    [Role.SUP]: { top: '75%', left: '92%' }
  };

  return (
    <div className="max-w-[1200px] mx-auto space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5 space-y-6">
          <div className="inline-flex items-center gap-3 px-3 py-1.5 rounded-full bg-[#c89b3c]/10 border border-[#c89b3c]/30 text-[10px] font-black text-[#c89b3c] tracking-[0.08em] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c89b3c] animate-pulse"></span>
            Tactical Overview
          </div>
          <h1 className="text-7xl font-orbitron font-black tracking-tighter text-white uppercase leading-[0.9]">
            {userTeam.name}
          </h1>
          <p className="text-gray-400 text-lg font-medium max-w-md leading-relaxed">
            Analise sua formação no mapa oficial da Kings Lendas. Otimize sua composição para a próxima rodada.
          </p>
          
          <div className="flex gap-12 pt-6">
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-gray-500 tracking-[0.12em] uppercase mb-1">PONTUAÇÃO</span>
              <p className="text-4xl font-orbitron font-black text-white">{userTeam.totalPoints.toFixed(1)}</p>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-gray-500 tracking-[0.12em] uppercase mb-1">VALOR TOTAL</span>
              <p className="text-4xl font-orbitron font-black text-[#c89b3c]">C$ 76.5</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 flex justify-center lg:justify-end">
          <div className="relative w-full max-w-[500px] aspect-square rounded-[40px] overflow-hidden border-2 border-white/5 bg-[#050505] shadow-[0_0_80px_rgba(200,155,60,0.15)] group">
            
            <img 
              src="https://ddragon.leagueoflegends.com/cdn/13.24.1/img/map/map11.png" 
              className="w-full h-full object-cover" 
              style={{ 
                filter: 'brightness(0.6) contrast(1.3) grayscale(0.1) saturate(0.9)',
                opacity: 0.85
              }}
              alt="Tactical Map"
              onError={(e) => {
                e.currentTarget.src = "https://static.wikia.nocookie.net/leagueoflegends/images/1/11/Summoner%27s_Rift_Minimap.png";
              }}
            />
            
            <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-black/20 pointer-events-none"></div>
            
            <div className="absolute inset-0 opacity-10 pointer-events-none" 
                 style={{ backgroundImage: 'radial-gradient(rgba(200, 155, 60, 0.3) 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

            {roles.map(role => {
              const p = userTeam.players[role];
              const pos = rolePositions[role];
              return (
                <div 
                  key={role} 
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                  style={{ top: pos.top, left: pos.left }}
                >
                  <div className="flex flex-col items-center group">
                    <div className={`relative w-16 h-16 rounded-full border-2 p-1 transition-all duration-500 ${p ? 'border-[#c89b3c] bg-black shadow-[0_0_30px_rgba(200,155,60,0.5)] scale-110' : 'border-white/10 bg-black/80 backdrop-blur-xl'}`}>
                      {p ? (
                        <img src={p.image} className="w-full h-full object-cover rounded-full" alt="" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-white/5 group-hover:text-white/20 transition-colors">
                          <i className="fa-solid fa-plus text-xs"></i>
                        </div>
                      )}
                    </div>
                    <div className="mt-3 bg-black/90 border border-white/10 px-3 py-1 rounded-full text-[8px] font-black text-gray-400 uppercase tracking-widest shadow-2xl backdrop-blur-md">
                      {role === Role.JNG ? 'JUN' : role.slice(0,3)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-6">
          <h2 className="text-[11px] font-black text-gray-600 uppercase tracking-[0.15em] whitespace-nowrap">ROSTER ATUAL</h2>
          <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {roles.map((role) => {
            const p = userTeam.players[role];
            return (
              <div key={role} className="glass-card rounded-3xl p-5 border border-white/5 hover:border-[#c89b3c]/30 transition-all group relative overflow-hidden">
                {p && <div className="absolute top-0 right-0 w-24 h-24 bg-[#c89b3c]/5 blur-3xl rounded-full -mr-10 -mt-10"></div>}
                
                <div className="relative z-10 space-y-4">
                  <div className="flex justify-between items-start">
                    <span className="text-[9px] font-black text-[#c89b3c] uppercase tracking-widest">{role}</span>
                    {p && <span className="text-[10px] font-orbitron font-bold text-white">{p.points.toFixed(1)}</span>}
                  </div>
                  
                  <div className="w-full aspect-square rounded-2xl overflow-hidden bg-black/40 border border-white/10">
                    {p ? (
                      <img src={p.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={p.name} />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white/5 group-hover:text-white/20 transition-colors">
                        <i className="fa-solid fa-plus text-xl"></i>
                      </div>
                    )}
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-bold text-white text-sm truncate uppercase tracking-tight">
                      {p ? p.name : 'Vazio'}
                    </h3>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                      {p ? p.team : 'Contratar'}
                    </p>
                  </div>

                  <div className="pt-2">
                    {p ? (
                      <button 
                        onClick={() => onFire(role)}
                        className="w-full py-2 bg-red-500/10 text-red-500 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all"
                      >
                        Remover
                      </button>
                    ) : (
                      <button 
                        onClick={onNavigateToMarket}
                        className="w-full py-2 bg-[#c89b3c]/10 text-[#c89b3c] rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-[#c89b3c] hover:text-black transition-all border border-[#c89b3c]/20"
                      >
                        Mercado
                      </button>
                    )}
                  </div>
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
