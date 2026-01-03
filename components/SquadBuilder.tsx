
import React, { useState } from 'react';
import { UserTeam, Role, Player } from '../types';

interface SquadBuilderProps {
  userTeam: UserTeam;
  onFire: (role: Role) => void;
  onNavigateToMarket: () => void;
}

interface MatchHistory {
  champion: string;
  points: number;
  icon: string;
  result: 'win' | 'loss';
}

const SquadBuilder: React.FC<SquadBuilderProps> = ({ userTeam, onFire, onNavigateToMarket }) => {
  const [selectedRound, setSelectedRound] = useState(10);
  const [historyPlayer, setHistoryPlayer] = useState<Player | null>(null);
  
  const roundHistory = [
    { round: 1, points: 135.43, fill: '85%' }, { round: 2, points: 95.71, fill: '60%' }, { round: 3, points: 108.84, fill: '70%' }, { round: 4, points: 91.55, fill: '58%' }, { round: 5, points: 119.42, fill: '75%' }, { round: 6, points: 94.97, fill: '60%' }, { round: 7, points: 56.59, fill: '40%' }, { round: 8, points: 77.84, fill: '50%' }, { round: 9, points: 31.98, fill: '25%' }, { round: 10, points: 85.28, fill: '55%' },
  ];

  const roles = [
    { id: Role.TOP, label: 'TOP', top: '22%', left: '18%', labelPos: 'bottom-[-26px]' },
    { id: Role.JNG, label: 'JUN', top: '38%', left: '35%', labelPos: 'bottom-[-26px]' },
    { id: Role.MID, label: 'MID', top: '54%', left: '52%', labelPos: 'bottom-[-26px]' },
    { id: Role.ADC, label: 'ADC', top: '86%', left: '78%', labelPos: 'bottom-[-26px]' },
    { id: Role.SUP, label: 'SUP', top: '76%', left: '90%', labelPos: 'bottom-[-26px]' },
  ];

  // Mock de histórico para o modal
  const mockHistory: MatchHistory[] = [
    { champion: 'Lee Sin', points: 18.5, result: 'win', icon: 'https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/LeeSin.png' },
    { champion: 'Jarvan IV', points: -2.1, result: 'loss', icon: 'https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/JarvanIV.png' },
    { champion: 'Sejuani', points: 12.4, result: 'win', icon: 'https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/Sejuani.png' },
    { champion: 'Vi', points: 25.8, result: 'win', icon: 'https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/Vi.png' },
  ];

  const formatValue = (val: number) => {
    if (Number.isInteger(val)) {
      return val.toLocaleString('pt-BR');
    }
    return val.toLocaleString('pt-BR', { 
      minimumFractionDigits: 0, 
      maximumFractionDigits: 2 
    });
  };

  return (
    <div className="max-w-[1240px] mx-auto space-y-16 animate-in fade-in duration-1000 pb-32">
      {/* MODAL DE HISTÓRICO */}
      {historyPlayer && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={() => setHistoryPlayer(null)}></div>
          <div className="relative w-full max-w-lg bg-[#0a0a0a] rounded-[40px] border border-white/10 overflow-hidden shadow-2xl animate-in zoom-in-95 duration-500">
            <div className="p-10 border-b border-white/5 flex items-center justify-between bg-gradient-to-r from-[#c89b3c]/10 to-transparent">
              <div className="flex items-center gap-5">
                <img src={historyPlayer.image} className="w-16 h-16 rounded-2xl border border-[#c89b3c]/30 object-cover" alt="" />
                <div>
                  <h3 className="font-orbitron font-black text-xl text-white uppercase tracking-tighter leading-none mb-1">{historyPlayer.name}</h3>
                  <p className="text-[10px] font-black text-[#c89b3c] uppercase tracking-widest">{historyPlayer.team}</p>
                </div>
              </div>
              <button onClick={() => setHistoryPlayer(null)} className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/5 transition-colors">
                <i className="fa-solid fa-xmark text-gray-500"></i>
              </button>
            </div>
            
            <div className="p-10 space-y-6">
              <h4 className="text-[10px] font-black text-gray-600 uppercase tracking-[0.3em]">ÚLTIMAS PARTIDAS</h4>
              <div className="space-y-3">
                {mockHistory.map((match, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-white/[0.02] rounded-2xl border border-white/5 group hover:bg-white/[0.04] transition-all">
                    <div className="flex items-center gap-4">
                      <img src={match.icon} className="w-10 h-10 rounded-lg border border-white/10" alt="" />
                      <div>
                        <p className="text-[12px] font-black text-white uppercase tracking-tight">{match.champion}</p>
                        <span className={`text-[8px] font-black uppercase tracking-widest ${match.result === 'win' ? 'text-green-500' : 'text-red-500'}`}>
                          {match.result === 'win' ? 'VITÓRIA' : 'DERROTA'}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-orbitron font-black text-lg ${match.points >= 0 ? 'text-white' : 'text-red-500'}`}>
                        {match.points > 0 ? '+' : ''}{formatValue(match.points)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <button 
                onClick={() => setHistoryPlayer(null)}
                className="w-full mt-4 py-4 bg-white/5 text-gray-400 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all"
              >
                Fechar Detalhes
              </button>
            </div>
          </div>
        </div>
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
                <p className="text-6xl font-orbitron font-black text-white tracking-tighter group-hover:text-[#c89b3c] transition-colors">{formatValue(userTeam.budget / 1000)}k</p>
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
                  <div className="relative group cursor-pointer" onClick={() => !p && onNavigateToMarket()}>
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-700 relative border-2 ${
                      p ? 'border-[#c89b3c] bg-black scale-110 shadow-[0_0_30px_rgba(200,155,60,0.4)]' : 'border-white/10 bg-black/80 hover:border-white/30'
                    }`}>
                      {p ? (
                        <img src={p.image} className="w-full h-full object-cover rounded-full p-1" alt="" />
                      ) : (
                        <i className="fa-solid fa-plus text-white/20 text-sm group-hover:text-white/60 transition-colors"></i>
                      )}
                      {p && <div className="absolute -inset-2 border border-[#c89b3c]/20 rounded-full animate-[spin_8s_linear_infinite]"></div>}
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

      {/* GRÁFICO DE HISTÓRICO */}
      <div className="bg-[#050505] rounded-[40px] border border-white/5 overflow-hidden shadow-2xl group/chart">
        <div className="p-10 border-b border-white/5 flex flex-wrap items-center justify-between gap-10">
          <div className="space-y-2">
            <h2 className="text-[10px] font-black text-gray-600 uppercase tracking-[0.4em]">LOG DE PERFORMANCE</h2>
            <div className="flex items-center gap-6">
              <div className="flex items-center bg-white/5 rounded-2xl p-1.5 border border-white/5">
                <button onClick={() => setSelectedRound(Math.max(1, selectedRound - 1))} className="w-10 h-10 flex items-center justify-center hover:bg-[#c89b3c] hover:text-black text-gray-500 rounded-xl transition-all duration-300">
                  <i className="fa-solid fa-chevron-left text-xs"></i>
                </button>
                <span className="font-orbitron font-black text-white text-base px-8 uppercase tracking-widest">
                  RODADA {selectedRound.toString().padStart(2, '0')}
                </span>
                <button onClick={() => setSelectedRound(Math.min(10, selectedRound + 1))} className="w-10 h-10 flex items-center justify-center hover:bg-[#c89b3c] hover:text-black text-gray-500 rounded-xl transition-all duration-300">
                  <i className="fa-solid fa-chevron-right text-xs"></i>
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-16">
            <div className="text-right">
              <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest mb-1">PONTUAÇÃO RECORD</p>
              <div className="flex items-center justify-end gap-3">
                <div className="w-1 h-1 rounded-full bg-[#c89b3c]"></div>
                <p className="font-orbitron font-black text-[#c89b3c] text-2xl tracking-tighter">{formatValue(135.43)}</p>
              </div>
            </div>
            <div className="w-px h-12 bg-white/5"></div>
            <div className="text-right">
              <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest mb-1">MÉDIA TEMPORADA</p>
              <p className="font-orbitron font-black text-white/20 text-2xl tracking-tighter">{formatValue(92.10)}</p>
            </div>
          </div>
        </div>

        <div className="p-12 pb-16 flex items-end justify-between gap-3 overflow-x-auto no-scrollbar">
          {roundHistory.map((rh) => {
            const isSelected = selectedRound === rh.round;
            return (
              <div 
                key={rh.round} 
                onClick={() => setSelectedRound(rh.round)}
                className="flex-1 min-w-[90px] flex flex-col items-center group cursor-pointer transition-all duration-500 relative"
              >
                <div className={`mb-4 transition-all duration-500 ${isSelected ? 'scale-110 translate-y-0' : 'scale-90 opacity-40 translate-y-1'}`}>
                  <span className={`text-[10px] font-orbitron font-black ${isSelected ? 'text-[#c89b3c]' : 'text-gray-400'}`}>
                    {formatValue(rh.points)}
                  </span>
                </div>
                <div className={`w-12 h-48 rounded-t-2xl transition-all duration-700 relative overflow-hidden border ${
                  isSelected 
                    ? 'bg-[#c89b3c]/5 border-[#c89b3c]/60 shadow-[0_0_15px_rgba(200,155,60,0.08)]' 
                    : 'bg-white/[0.01] border-white/5 hover:border-white/20'
                }`}>
                  <div 
                    className={`absolute bottom-0 left-0 right-0 transition-all duration-1000 cubic-bezier(0.23, 1, 0.32, 1) ${
                      isSelected ? 'bg-gradient-to-t from-[#c89b3c] to-[#f0e6d2] opacity-100' : 'bg-gray-800 opacity-20 group-hover:opacity-40'
                    }`} 
                    style={{ height: rh.fill }}
                  >
                    {isSelected && <div className="absolute top-0 left-0 right-0 h-[1px] bg-white opacity-40"></div>}
                  </div>
                </div>
                <div className="mt-6 flex flex-col items-center gap-2">
                  <span className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${isSelected ? 'text-[#c89b3c]' : 'text-gray-700'}`}>
                    RD {rh.round.toString().padStart(2, '0')}
                  </span>
                  {isSelected && <div className="w-1 h-1 bg-[#c89b3c] rounded-full scale-100 transition-transform"></div>}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* MÓDULOS DE DADOS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="glass-card rounded-[40px] p-12 border border-white/5 flex flex-col items-center justify-center text-center space-y-4 group hover:border-[#c89b3c]/20 transition-all relative overflow-hidden">
          <img 
            src="https://i.imgur.com/4odZyzF.png" 
            className="absolute -right-8 -bottom-8 w-44 h-44 object-contain opacity-[0.03] grayscale brightness-200 -rotate-12 transition-all duration-700 group-hover:scale-110 group-hover:rotate-0 group-hover:opacity-[0.06]" 
            alt="" 
          />
          <div className="relative z-10 space-y-2">
            <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em]">PAITRIMÔNIO</span>
            <p className="font-orbitron font-black text-5xl text-white tracking-tighter group-hover:text-[#c89b3c] transition-colors">
              {formatValue(userTeam.budget / 1000)}
            </p>
          </div>
        </div>

        <div className="bg-[#0c0c0c] rounded-[40px] p-12 border border-[#c89b3c]/30 flex flex-col items-center justify-center text-center space-y-4 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-[#c89b3c]/50"></div>
          <span className="text-[11px] font-black text-[#c89b3c] uppercase tracking-[0.4em]">ÚLTIMA PERFORMANCE</span>
          <p className="font-orbitron font-black text-7xl text-white tracking-tighter group-hover:scale-105 transition-transform duration-500">
            {formatValue(85.28)}
          </p>
          <div className="px-5 py-2 bg-green-500/10 rounded-full border border-green-500/10">
            <span className="text-[9px] font-black text-green-500 uppercase tracking-[0.2em]">+13% vs GLOBAL</span>
          </div>
        </div>

        <div className="glass-card rounded-[40px] p-12 border border-white/5 flex flex-col items-center justify-center text-center space-y-4 group hover:border-white/20 transition-all relative overflow-hidden">
          <div className="absolute -right-6 -bottom-6 opacity-[0.03] -rotate-12 transition-all duration-700 group-hover:scale-110 group-hover:rotate-0 group-hover:opacity-[0.06]">
            <i className="fa-solid fa-trophy text-[10rem] text-white"></i>
          </div>
          <div className="relative z-10 space-y-2">
            <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em]">SCORE ACUMULADO</span>
            <p className="font-orbitron font-black text-5xl text-white tracking-tighter group-hover:scale-105 transition-transform">
              {formatValue(userTeam.totalPoints)}
            </p>
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
            return (
              <div key={role.id} className="glass-card rounded-[40px] p-8 border border-white/5 group flex flex-col items-center text-center hover:border-[#c89b3c]/40 hover:bg-[#c89b3c]/[0.01] transition-all duration-700 relative">
                <div className="w-full flex justify-between items-start mb-8">
                  <span className="text-[10px] font-black text-[#c89b3c] uppercase tracking-widest">{role.label === 'JUN' ? 'JUNGLE' : role.id}</span>
                  {p && (
                    <button 
                      onClick={() => onFire(role.id)}
                      className="w-8 h-8 rounded-lg bg-red-500/5 border border-red-500/10 flex items-center justify-center text-red-500/40 hover:text-red-500 hover:bg-red-500/20 transition-all"
                      title="Desvincular jogador"
                    >
                      <i className="fa-solid fa-trash-can text-[10px]"></i>
                    </button>
                  )}
                </div>

                <div 
                  className="w-full aspect-[4/5] rounded-[30px] overflow-hidden bg-black border border-white/5 mb-8 relative group-hover:border-[#c89b3c]/20 transition-all cursor-pointer" 
                  onClick={() => !p && onNavigateToMarket()}
                >
                  {p ? (
                    <>
                      <img src={p.image} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000 grayscale-[0.2] group-hover:grayscale-0" alt="" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/5">
                      <i className="fa-solid fa-user-plus text-3xl group-hover:scale-110 transition-transform"></i>
                    </div>
                  )}
                </div>

                <div className="space-y-2 w-full px-2">
                  <h3 className="font-bold text-white text-base truncate uppercase tracking-tighter group-hover:text-[#c89b3c] transition-colors">
                    {p ? p.name : 'Slot Vazio'}
                  </h3>
                  <p className="text-[10px] text-gray-600 font-bold uppercase tracking-[0.15em]">
                    {p ? p.team : 'Disponível'}
                  </p>
                </div>

                <div className="pt-10 w-full min-h-[64px]">
                  {p ? (
                    <button 
                      onClick={() => setHistoryPlayer(p)} 
                      className="w-full py-4 bg-[#c89b3c] text-black rounded-2xl text-[10px] font-black uppercase tracking-widest hover:brightness-110 transition-all border border-[#c89b3c]/20 shadow-[0_10px_30px_rgba(200,155,60,0.2)]"
                    >
                      Histórico
                    </button>
                  ) : (
                    <div className="h-12 w-full"></div>
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
