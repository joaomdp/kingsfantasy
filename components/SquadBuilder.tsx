
import React, { useState, useMemo } from 'react';
import { UserTeam, Role, Player } from '../types';
import PlayerImage from './PlayerImage';
import TeamLogo from './TeamLogo';
import MatchHistoryModal from './MatchHistoryModal';

interface SquadBuilderProps {
  userTeam: UserTeam;
  onFire: (role: Role) => void;
  onNavigateToMarket: () => void;
}

const SquadBuilder: React.FC<SquadBuilderProps> = ({ userTeam, onFire, onNavigateToMarket }) => {
  const [historyPlayer, setHistoryPlayer] = useState<Player | null>(null);
  
  const roles = [
    { id: Role.TOP, label: 'TOP', top: '22%', left: '18%' },
    { id: Role.JNG, label: 'JUN', top: '38%', left: '35%' },
    { id: Role.MID, label: 'MID', top: '54%', left: '52%' },
    { id: Role.ADC, label: 'ADC', top: '86%', left: '78%' },
    { id: Role.SUP, label: 'SUP', top: '76%', left: '90%' },
  ];

  const formatValue = (val: number) => {
    if (Number.isInteger(val)) return val.toString();
    return val.toFixed(1).replace(',', '.');
  };

  const roundPoints = useMemo(() => {
    return Object.values(userTeam.players)
      .filter((p): p is Player => !!p)
      .reduce((sum, p) => sum + p.points, 0);
  }, [userTeam.players]);

  const roleIcons: Record<string, string> = {
    [Role.TOP]: 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-top.png',
    [Role.JNG]: 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-jungle.png',
    [Role.MID]: 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-middle.png',
    [Role.ADC]: 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-bottom.png',
    [Role.SUP]: 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-utility.png',
  };

  const PowerModule = ({ label, value, icon, isCoin = false }: { label: string, value: string | number, icon?: React.ReactNode, isCoin?: boolean }) => (
    <div className="flex-1 group relative flex flex-col items-center justify-center py-8 border-r border-white/5 last:border-r-0 overflow-hidden cursor-pointer">
      {/* HUD Accents */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20"></div>
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20"></div>
      
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

      <div className="flex flex-col items-center gap-2 relative z-10">
        {icon && (
          <div className={`transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
            isCoin 
              ? 'grayscale opacity-20 scale-75 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-[1.8] group-hover:-translate-y-2' 
              : 'opacity-10 group-hover:opacity-100 group-hover:scale-110'
          }`}>
            <div className={`${isCoin ? 'drop-shadow-[0_0_20px_rgba(188,19,254,0)] group-hover:drop-shadow-[0_0_25px_rgba(188,19,254,0.9)]' : ''}`}>
              {icon}
            </div>
          </div>
        )}
        <div className="text-center transform transition-transform duration-500 group-hover:translate-y-1">
          <span className={`text-2xl md:text-4xl font-orbitron font-black tracking-tighter transition-all duration-500 ${isCoin ? 'text-gray-600 group-hover:text-white' : 'text-white'}`}>
            {value}
          </span>
          <div className="flex items-center justify-center gap-2 mt-1">
            <div className="w-1 h-1 rounded-full bg-gray-800 group-hover:bg-[#bc13fe] group-hover:animate-pulse"></div>
            <span className="text-[7px] font-black text-gray-500 uppercase tracking-[0.3em] group-hover:text-[#bc13fe] transition-colors">
              {label}
            </span>
          </div>
        </div>
      </div>

      {/* Activation Line */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-[#bc13fe] group-hover:w-1/2 transition-all duration-700 shadow-[0_0_10px_#bc13fe]"></div>
    </div>
  );

  return (
    <div className="max-w-[1280px] mx-auto space-y-16 animate-in fade-in duration-1000 pb-32">
      {historyPlayer && <MatchHistoryModal player={historyPlayer} onClose={() => setHistoryPlayer(null)} />}

      {/* HEADER TÁTICO */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start pt-10">
        <div className="lg:col-span-8 flex flex-col gap-10">
          <div className="relative">
            {/* Decoração Tech */}
            <div className="absolute -left-10 top-1/2 -translate-y-1/2 w-1 h-24 bg-gradient-to-b from-transparent via-[#bc13fe] to-transparent opacity-50"></div>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="px-3 py-1 bg-white/5 border border-white/10 rounded flex items-center gap-2">
                  <span className="text-[8px] font-black text-gray-500 tracking-[0.2em] uppercase">SISTEMA ONLINE</span>
                  <div className="w-1 h-1 bg-green-500 rounded-full animate-ping"></div>
                </div>
                <div className="h-px w-20 bg-white/10"></div>
              </div>

              <h1 className="text-8xl md:text-[11rem] font-orbitron font-black text-white uppercase tracking-tighter leading-[0.75] mix-blend-difference">
                {userTeam.name}
              </h1>

              <div className="flex items-center gap-8">
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">PATENTE ATUAL</span>
                  <span className="text-xl font-orbitron font-black text-[#bc13fe]">{userTeam.rank}</span>
                </div>
                <div className="w-px h-10 bg-white/5"></div>
                <button 
                  onClick={onNavigateToMarket}
                  className="group relative px-10 py-4 overflow-hidden border border-[#bc13fe]/30 hover:border-[#bc13fe] transition-colors rounded-lg"
                >
                  <div className="absolute inset-0 bg-[#bc13fe] translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                  <span className="relative z-10 text-[10px] font-black text-[#bc13fe] group-hover:text-black uppercase tracking-[0.3em] font-orbitron">ABRIR MERCADO</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* MAPA ESTILO RADAR - AVATARES AUMENTADOS */}
          <div className="relative w-full aspect-square rounded-[2.5rem] overflow-hidden border border-white/10 bg-black shadow-[0_0_80px_rgba(0,0,0,1)] group">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>
            <img src="https://i.imgur.com/myc9dfj.png" className="w-full h-full object-cover opacity-40 contrast-[1.4] transition-all duration-[20s] group-hover:scale-110 group-hover:rotate-2" alt="Tactical Map" />
            
            {roles.map(role => {
              const p = userTeam.players[role.id];
              return (
                <div key={role.id} className="absolute -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center" style={{ top: role.top, left: role.left }}>
                  <div className="relative group/marker cursor-pointer" onClick={() => p ? setHistoryPlayer(p) : onNavigateToMarket()}>
                    <div className={`w-14 h-14 rounded-full border-2 transition-all duration-500 relative flex items-center justify-center ${
                      p ? 'border-[#bc13fe] bg-black shadow-[0_0_25px_rgba(188,19,254,0.6)] scale-110' : 'border-white/10 bg-black/80 hover:border-white/40'
                    }`}>
                      {p ? (
                        <div className="w-full h-full rounded-full overflow-hidden p-0.5 relative">
                          <PlayerImage player={p} className="w-full h-full rounded-full contrast-125 brightness-110" />
                          <div className="absolute inset-0 rounded-full border border-white/10"></div>
                        </div>
                      ) : (
                        <div className="w-0.5 h-0.5 bg-white/20 rounded-full group-hover/marker:scale-[4] group-hover/marker:bg-[#bc13fe] transition-all"></div>
                      )}
                    </div>
                    {p && (
                       <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-black/80 px-2 py-0.5 rounded border border-[#bc13fe]/20 backdrop-blur-sm">
                          <span className="text-[7px] font-orbitron font-black text-white uppercase tracking-tighter whitespace-nowrap">{p.name}</span>
                       </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CORE STATS HUB - PADRONIZADO COM LINEUP HEADER */}
      <div className="space-y-8">
        <div className="flex items-center gap-6">
          <h2 className="text-[10px] font-black text-gray-700 uppercase tracking-[0.6em]">DADOS DA CONTA</h2>
          <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent"></div>
        </div>
        
        <div className="flex items-stretch bg-[#050505] border border-white/5 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-3xl">
          <PowerModule 
            label="PATRIMÔNIO" 
            value={formatValue(userTeam.budget)} 
            isCoin={true}
            icon={<img src="https://i.imgur.com/4odZyzF.png" className="w-8 h-8 object-contain invert-[0.1] sepia-[1] saturate-[5] hue-rotate-[240deg]" alt="Coin" />} 
          />
          <PowerModule 
            label="PONTOS NA RODADA" 
            value={formatValue(roundPoints)} 
            icon={<i className="fa-solid fa-bolt text-xl text-white/5 group-hover:text-purple-400 group-hover:drop-shadow-[0_0_10px_#bc13fe] transition-all"></i>}
          />
          <PowerModule 
            label="PONTOS TOTAIS" 
            value={formatValue(userTeam.totalPoints)} 
            icon={<i className="fa-solid fa-trophy text-xl text-white/5 group-hover:text-purple-400 group-hover:drop-shadow-[0_0_10px_#bc13fe] transition-all"></i>}
          />
        </div>
      </div>

      {/* LINE-UP SECTION */}
      <div className="space-y-12">
        <div className="flex items-center gap-6">
          <h2 className="text-[10px] font-black text-gray-700 uppercase tracking-[0.6em]">LINEUP OFICIAL</h2>
          <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {roles.map((role) => {
            const p = userTeam.players[role.id];
            const displayChampion = p?.selectedChampion || p?.lastChampion;
            return (
              <div key={role.id} className="group relative">
                <div className={`relative flex flex-col transition-all duration-700 bg-black border rounded-2xl overflow-hidden ${
                  p ? 'border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.9)]' : 'border-dashed border-white/5 opacity-30 grayscale hover:opacity-100 hover:grayscale-0'
                }`}>
                  
                  {/* Card Header */}
                  <div className="px-4 py-3 bg-white/[0.02] border-b border-white/5 flex justify-between items-center">
                    <span className="text-[7px] font-orbitron font-black text-gray-500 group-hover:text-[#bc13fe] transition-colors tracking-widest">{role.label}</span>
                    {p && (
                      <button onClick={(e) => { e.stopPropagation(); onFire(role.id); }} className="text-red-500/20 hover:text-red-500 transition-colors">
                        <i className="fa-solid fa-power-off text-[9px]"></i>
                      </button>
                    )}
                  </div>

                  {/* Player Image Module */}
                  <div className="relative aspect-[4/5] overflow-hidden cursor-pointer" onClick={() => p ? setHistoryPlayer(p) : onNavigateToMarket()}>
                    {p ? (
                      <>
                        <PlayerImage player={p} className="w-full h-full object-top transition-all duration-1000 group-hover:scale-105 contrast-110 brightness-110 saturate-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
                        
                        {/* Overlay Glow em volta do Player */}
                        <div className="absolute inset-0 border-[0.5px] border-white/5 pointer-events-none"></div>
                        
                        {/* Team Logo Badge */}
                        <div className="absolute top-2 left-2 z-30 transition-transform duration-300 group-hover:scale-110">
                           <TeamLogo logoUrl={p.teamLogo} teamName={p.team} className="w-7 h-7" />
                        </div>
                        
                        <div className="absolute top-14 left-3">
                          <span className="text-[6px] font-black text-white/50 uppercase bg-black/60 px-1.5 py-0.5 rounded backdrop-blur-md border border-white/5">DADOS ATUALIZADOS</span>
                        </div>
                      </>
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center gap-4 bg-white/[0.01]">
                        <div className="w-12 h-12 rounded-full border border-white/5 flex items-center justify-center">
                          <i className="fa-solid fa-plus text-white/5 text-xs"></i>
                        </div>
                        <span className="text-[8px] font-black text-gray-800 uppercase tracking-widest">VAGA DISPONÍVEL</span>
                      </div>
                    )}

                    {/* Champion Badge */}
                    {p && displayChampion && (
                      <div className="absolute bottom-3 right-3 z-20 group-hover:scale-110 transition-transform duration-500">
                         <div className="relative w-16 h-16">
                            <img src={displayChampion.image} className="w-full h-full rounded-full border-4 border-black bg-black object-cover shadow-[0_0_20px_rgba(0,0,0,1)]" alt="" />
                            <div className="absolute inset-0 rounded-full border-2 border-[#bc13fe]/40 animate-pulse"></div>
                         </div>
                      </div>
                    )}
                  </div>

                  {/* Player Info */}
                  <div className="p-5 space-y-3 relative z-10" onClick={() => p && setHistoryPlayer(p)}>
                    <div className="flex items-center gap-2">
                       <img src={roleIcons[role.id]} className="w-3.5 h-3.5 brightness-200 opacity-20 group-hover:opacity-100 transition-all" alt="" />
                       <h3 className={`font-orbitron font-black text-base truncate uppercase tracking-tighter ${p ? 'text-white' : 'text-gray-800'}`}>
                         {p ? p.name : 'SEM CONVOCAÇÃO'}
                       </h3>
                    </div>
                    {p && (
                      <div className="flex items-center justify-between border-t border-white/5 pt-3">
                         <div className="flex flex-col">
                            <span className="text-[6px] font-black text-gray-600 uppercase tracking-widest leading-none mb-1">VALOR</span>
                            <span className="text-[10px] font-orbitron font-black text-[#bc13fe]">C$ {p.price}</span>
                         </div>
                         <div className="flex flex-col items-end">
                            <span className="text-[6px] font-black text-gray-600 uppercase tracking-widest leading-none mb-1">PONTOS</span>
                            <span className="text-[10px] font-orbitron font-black text-white">{p.points}</span>
                         </div>
                      </div>
                    )}
                  </div>

                  {/* Scan Animation */}
                  <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-10 transition-opacity">
                    <div className="w-full h-px bg-white animate-[scan_2.5s_linear_infinite]"></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      <style>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(500%); }
        }
      `}</style>
    </div>
  );
};

export default SquadBuilder;
