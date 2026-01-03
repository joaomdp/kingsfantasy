
import React, { useState } from 'react';
import { UserTeam, Role, Player } from '../types';
import PlayerImage from './PlayerImage';
import MatchHistoryModal from './MatchHistoryModal';

interface SquadBuilderProps {
  userTeam: UserTeam;
  onFire: (role: Role) => void;
  onNavigateToMarket: () => void;
}

const SquadBuilder: React.FC<SquadBuilderProps> = ({ userTeam, onFire, onNavigateToMarket }) => {
  const [historyPlayer, setHistoryPlayer] = useState<Player | null>(null);
  
  const roles = [
    { id: Role.TOP, label: 'TOP', top: '22%', left: '18%', labelPos: 'bottom-[-34px]' },
    { id: Role.JNG, label: 'JUN', top: '38%', left: '35%', labelPos: 'bottom-[-34px]' },
    { id: Role.MID, label: 'MID', top: '54%', left: '52%', labelPos: 'bottom-[-34px]' },
    { id: Role.ADC, label: 'ADC', top: '86%', left: '78%', labelPos: 'bottom-[-34px]' },
    { id: Role.SUP, label: 'SUP', top: '76%', left: '90%', labelPos: 'bottom-[-34px]' },
  ];

  const formatValue = (val: number) => {
    if (Number.isInteger(val)) return val.toString();
    return val.toFixed(1).replace(',', '.');
  };

  const roleIcons: Record<string, string> = {
    [Role.TOP]: 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-top.png',
    [Role.JNG]: 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-jungle.png',
    [Role.MID]: 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-middle.png',
    [Role.ADC]: 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-bottom.png',
    [Role.SUP]: 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-utility.png',
  };

  return (
    <div className="max-w-[1240px] mx-auto space-y-16 animate-in fade-in duration-1000 pb-32">
      {/* MODAL DE HISTÓRICO REUTILIZÁVEL */}
      {historyPlayer && (
        <MatchHistoryModal player={historyPlayer} onClose={() => setHistoryPlayer(null)} />
      )}

      {/* SEÇÃO HERO */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start pt-4">
        <div className="lg:col-span-6 space-y-10 pt-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-[#c89b3c]/20 bg-[#c89b3c]/5 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c89b3c] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#c89b3c]"></span>
              </span>
              <span className="text-[10px] font-black text-[#c89b3c] uppercase tracking-[0.3em]">Status: Operacional</span>
            </div>
            <h1 className="text-9xl font-orbitron font-black text-white uppercase tracking-tighter leading-[0.8] drop-shadow-2xl">
              {userTeam.name}
            </h1>
            <p className="text-gray-500 text-lg max-w-lg font-medium leading-relaxed">
              Interface avançada de gestão para a <span className="text-gray-300">Kings Lendas</span>. 
              Sincronize sua estratégia e maximize seu rendimento tático.
            </p>
          </div>

          <div className="flex gap-20">
            <div className="group cursor-default">
              <span className="text-[10px] font-black text-gray-700 uppercase tracking-[0.2em] group-hover:text-gray-500 transition-colors">RANKING LIGA</span>
              <p className="text-6xl font-orbitron font-black text-white tracking-tighter mt-2">{formatValue(userTeam.totalPoints)}</p>
            </div>
            <div className="group cursor-default">
              <span className="text-[10px] font-black text-gray-700 uppercase tracking-[0.2em] group-hover:text-gray-500 transition-colors">PAITRIMÔNIO</span>
              <div className="flex items-center gap-5 mt-2">
                <img src="https://i.imgur.com/4odZyzF.png" className="w-10 h-10 object-contain" alt="" />
                <p className="text-6xl font-orbitron font-black text-white tracking-tighter group-hover:text-[#c89b3c] transition-colors">{formatValue(userTeam.budget)}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 flex justify-end">
          <div className="relative w-full max-w-[560px] aspect-square rounded-[50px] overflow-hidden bg-[#020202] border border-white/5 shadow-[0_40px_100px_rgba(0,0,0,0.8)]">
            <img 
              src="https://i.imgur.com/myc9dfj.png" 
              className="w-full h-full object-cover opacity-70 contrast-[1.2] brightness-75 transition-transform duration-[10s] hover:scale-105" 
              alt="Tactical Map" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40 pointer-events-none"></div>
            <div className="absolute top-8 left-8 border-l border-[#c89b3c]/40 pl-4 py-2 opacity-50">
              <p className="text-[8px] font-black text-white uppercase tracking-widest">MAPA TÁTICO V3.1</p>
              <p className="text-[7px] font-medium text-gray-500 uppercase">SUMMONER'S RIFT SECTOR</p>
            </div>

            {roles.map(role => {
              const p = userTeam.players[role.id];
              return (
                <div key={role.id} className="absolute -translate-x-1/2 -translate-y-1/2 z-20" style={{ top: role.top, left: role.left }}>
                  <div className="relative group cursor-pointer" onClick={() => p ? setHistoryPlayer(p) : onNavigateToMarket()}>
                    <div className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-700 relative border-2 ${
                      p ? 'border-[#c89b3c] bg-black scale-110 shadow-[0_0_40px_rgba(200,155,60,0.5)]' : 'border-white/10 bg-black/80 hover:border-white/30'
                    }`}>
                      {p ? (
                        <div className="w-full h-full rounded-full overflow-hidden p-1">
                          <PlayerImage player={p} className="w-full h-full rounded-full" />
                        </div>
                      ) : (
                        <i className="fa-solid fa-plus text-white/20 text-sm group-hover:text-white/60 transition-colors"></i>
                      )}
                      
                      {p?.selectedChampion && (
                        <div className="absolute bottom-[-10%] right-[-10%] w-10 h-10 rounded-full border-2 border-black bg-black p-0.5 z-40 shadow-2xl scale-110">
                          <img src={p.selectedChampion.image} className="w-full h-full rounded-full object-cover" alt="" />
                        </div>
                      )}
                      
                      {p && <div className="absolute -inset-2 border border-[#c89b3c]/20 rounded-full animate-[spin_8s_linear_infinite] pointer-events-none"></div>}
                    </div>
                    <div className={`absolute ${role.labelPos} left-1/2 -translate-x-1/2 bg-black/90 px-3 py-1 rounded-sm border border-white/10 text-[9px] font-black text-white uppercase tracking-widest backdrop-blur-md opacity-80 group-hover:opacity-100 transition-opacity`}>
                      {role.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* LINE-UP SECTION */}
      <div className="space-y-12 pt-10">
        <div className="flex items-center gap-10">
          <h2 className="text-[12px] font-black text-gray-700 uppercase tracking-[0.5em] whitespace-nowrap">LINE-UP</h2>
          <div className="h-[2px] flex-1 bg-gradient-to-r from-white/10 via-white/[0.02] to-transparent"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {roles.map((role) => {
            const p = userTeam.players[role.id];
            const displayChampion = p?.selectedChampion || p?.lastChampion;
            
            return (
              <div key={role.id} className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-b from-[#c89b3c]/20 to-transparent rounded-[42px] blur opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                
                <div className="glass-card rounded-[40px] border border-white/5 flex flex-col overflow-hidden hover:border-[#c89b3c]/40 transition-all duration-700 relative bg-[#050505]">
                  
                  <div className="px-6 pt-6 flex justify-between items-center z-10">
                    <span className="text-[9px] font-black text-[#c89b3c] uppercase tracking-[0.2em]">{role.label === 'JUN' ? 'JUNGLE' : role.id}</span>
                    {p && (
                      <button 
                        onClick={(e) => { e.stopPropagation(); onFire(role.id); }}
                        className="w-7 h-7 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500/60 hover:bg-red-500 hover:text-white transition-all scale-90 group-hover:scale-100"
                      >
                        <i className="fa-solid fa-trash-can text-[10px]"></i>
                      </button>
                    )}
                  </div>

                  <div 
                    className="relative w-full aspect-[1/1.2] cursor-pointer group/avatar" 
                    onClick={() => p ? setHistoryPlayer(p) : onNavigateToMarket()}
                  >
                    {p ? (
                      <>
                        <PlayerImage player={p} className="w-full h-full transition-all duration-[2s] grayscale-[0.2] group-hover:grayscale-0" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80"></div>
                        
                        <div className="absolute top-4 left-6 transition-transform duration-500">
                           <div className="w-10 h-10 bg-black/60 backdrop-blur-md rounded-xl border border-white/10 p-2 shadow-2xl overflow-hidden">
                              <img src={p.teamLogo} className="w-full h-full object-contain" alt={p.team} />
                           </div>
                        </div>

                        {/* BADGE DO CAMPEÃO */}
                        {displayChampion && (
                          <div className="absolute bottom-2 right-2 z-40 transform translate-x-1 translate-y-1">
                            <div className="relative w-16 h-16 rounded-full p-1 bg-black border border-white/10 shadow-[0_12px_30px_rgba(0,0,0,0.9)] overflow-hidden group-hover:scale-110 transition-transform duration-500">
                               <div className="absolute inset-0 bg-gradient-to-tr from-[#c89b3c]/30 to-transparent pointer-events-none"></div>
                               <img 
                                 src={displayChampion.image} 
                                 className="w-full h-full object-cover rounded-full border border-black" 
                                 alt={displayChampion.name} 
                                 title={displayChampion.name}
                               />
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center space-y-4 border-2 border-dashed border-white/5 m-4 rounded-[30px] bg-white/[0.01] group-hover:border-[#c89b3c]/20 group-hover:bg-[#c89b3c]/5 transition-all">
                        <i className="fa-solid fa-user-plus text-3xl text-white/5 group-hover:text-[#c89b3c]/40 transition-all"></i>
                        <p className="text-[10px] font-black text-gray-800 uppercase tracking-widest group-hover:text-[#c89b3c]/60">CONTRATAR</p>
                      </div>
                    )}
                  </div>

                  <div className="p-6 pt-4 space-y-2 relative z-10 cursor-pointer" onClick={() => p && setHistoryPlayer(p)}>
                    <div className="flex items-center gap-3">
                       <img src={roleIcons[role.id]} className="w-4 h-4 brightness-200 opacity-60" alt="" />
                       <h3 className={`font-orbitron font-black text-lg truncate uppercase tracking-tighter transition-colors ${p ? 'text-white group-hover:text-[#c89b3c]' : 'text-gray-800'}`}>
                         {p ? p.name : 'SLOT VAZIO'}
                       </h3>
                    </div>
                    
                    <div className="flex items-center justify-between">
                       <p className={`text-[9px] font-bold uppercase tracking-[0.2em] ${p ? 'text-gray-600' : 'text-gray-900'}`}>
                         {p ? p.team : 'DISPONÍVEL'}
                       </p>
                       {p && (
                         <span className="text-[9px] font-black text-[#c89b3c] hover:text-white uppercase tracking-widest transition-colors flex items-center gap-2">
                           <i className="fa-solid fa-chart-simple"></i>
                           Dados
                         </span>
                       )}
                    </div>
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
