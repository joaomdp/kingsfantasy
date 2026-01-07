
import React, { useState, useMemo, useEffect } from 'react';
import { Player, Role, UserTeam } from '../types';
import PlayerImage from './PlayerImage';
import TeamLogo from './TeamLogo';
import MatchHistoryModal from './MatchHistoryModal';

interface MarketProps {
  players: Player[];
  userTeam: UserTeam;
  onHire: (player: Player) => void;
  onFire: (role: Role) => void;
  onClear: () => void;
  onConfirm: () => void;
  onRefresh: () => Promise<boolean>;
}

const Market: React.FC<MarketProps> = ({ players, userTeam, onHire, onFire, onClear, onConfirm, onRefresh }) => {
  const [filterRole, setFilterRole] = useState<Role | 'ALL'>('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [historyPlayer, setHistoryPlayer] = useState<Player | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => setIsTransitioning(false), 200);
    return () => clearTimeout(timer);
  }, [filterRole]);

  const rolesList = [
    { id: Role.TOP, label: 'TOP', top: '22%', left: '20%', icon: 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-top.png' },
    { id: Role.JNG, label: 'JNG', top: '38%', left: '36%', icon: 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-jungle.png' },
    { id: Role.MID, label: 'MID', top: '52%', left: '52%', icon: 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-middle.png' },
    { id: Role.ADC, label: 'ADC', top: '82%', left: '80%', icon: 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-bottom.png' },
    { id: Role.SUP, label: 'SUP', top: '75%', left: '88%', icon: 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-utility.png' }
  ];

  const roleMetadata: Record<string, { label: string; icon: string }> = {
    ALL: { label: 'TODOS', icon: 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-fill.png' },
    [Role.TOP]: { label: 'TOP', icon: 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-top.png' },
    [Role.JNG]: { label: 'SELVA', icon: 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-jungle.png' },
    [Role.MID]: { label: 'MEIO', icon: 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-middle.png' },
    [Role.ADC]: { label: 'ADC', icon: 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-bottom.png' },
    [Role.SUP]: { label: 'SUP', icon: 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-utility.png' }
  };

  const filteredPlayers = useMemo(() => {
    return players
      .filter(p => {
        const matchesRole = filterRole === 'ALL' || p.role === filterRole;
        const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesRole && matchesSearch;
      })
      .sort((a, b) => b.price - a.price);
  }, [players, filterRole, searchTerm]);

  const teamValue = useMemo(() => {
    return Object.values(userTeam.players)
      .filter((p): p is Player => !!p)
      .reduce((sum, p) => sum + p.price, 0);
  }, [userTeam.players]);

  const PaiCoin = ({ size = "sm" }: { size?: "xs" | "sm" | "md" }) => (
    <img src="https://i.imgur.com/4odZyzF.png" className={`${size === "xs" ? "w-3.5 h-3.5" : size === "sm" ? "w-4 h-4" : "w-6 h-6"} object-contain invert-[0.1] sepia-[1] saturate-[5] hue-rotate-[210deg]`} alt="P" />
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 animate-in fade-in duration-500 pb-20">
      {historyPlayer && <MatchHistoryModal player={historyPlayer} onClose={() => setHistoryPlayer(null)} />}

      <div className="lg:col-span-4 space-y-8">
        <div className="sticky top-32 space-y-8">
          <div className="relative aspect-square w-full rounded-[2.5rem] overflow-hidden border border-white/10 bg-black shadow-[0_0_50px_rgba(0,0,0,0.8)] group">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>
             <img src="https://i.imgur.com/myc9dfj.png" className="w-full h-full object-cover opacity-40 contrast-[1.2]" alt="Tactical Field" />
             
             {rolesList.map(role => {
               const p = userTeam.players[role.id];
               return (
                 <div key={role.id} className="absolute -translate-x-1/2 -translate-y-1/2 z-20" style={{ top: role.top, left: role.left }}>
                    <div className="relative group/pin cursor-pointer" onClick={() => p && onFire(role.id)}>
                       <div className={`w-12 h-12 rounded-full border-2 transition-all duration-500 flex items-center justify-center ${
                         p ? 'border-[#5E6CFF] bg-black shadow-[0_0_20px_rgba(94,108,255,0.5)] scale-110' : 'border-white/10 bg-black/80 hover:border-white/40'
                       }`}>
                         {p ? (
                           <PlayerImage player={p} priority className="w-full h-full rounded-full p-0.5" />
                         ) : (
                           <div className="w-1.5 h-1.5 bg-white/10 rounded-full animate-pulse"></div>
                         )}
                       </div>
                    </div>
                 </div>
               );
             })}
          </div>

          <div className="glass-card rounded-[32px] p-7 border border-white/5 space-y-8">
            <div className="space-y-4">
              <span className="text-[9px] font-black text-gray-500 uppercase tracking-[0.4em] block px-1">MINHA ESCALAÇÃO</span>
              <div className="grid grid-cols-5 gap-3">
                {rolesList.map(role => {
                  const p = userTeam.players[role.id];
                  const champ = p?.selectedChampion || p?.lastChampion;
                  return (
                    <div key={role.id} className="flex flex-col gap-2 items-center">
                      <div className={`aspect-square w-full rounded-xl border transition-all duration-500 relative flex items-center justify-center ${p ? 'border-[#5E6CFF] bg-black shadow-[0_0_15px_rgba(94,108,255,0.1)]' : 'border-white/5 bg-white/[0.02]'}`}>
                        {p ? (
                          <>
                            <PlayerImage player={p} priority className="w-full h-full rounded-xl p-0.5" />
                            {champ && (
                              <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full border-2 border-black bg-black overflow-hidden shadow-2xl z-20">
                                <img src={champ.image} className="w-full h-full object-cover" alt="" />
                              </div>
                            )}
                          </>
                        ) : (
                          <img src={role.icon} className="w-3.5 h-3.5 brightness-0 invert opacity-10" alt="" />
                        )}
                      </div>
                      <span className={`text-[7px] font-black uppercase truncate w-full text-center ${p ? 'text-[#5E6CFF]' : 'text-gray-700'}`}>
                        {p ? p.name : role.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/5">
              <div className="space-y-1">
                <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest block">SALDO</span>
                <div className="flex items-center gap-2">
                  <PaiCoin size="sm" />
                  <span className="text-2xl font-orbitron font-black text-white">{userTeam.budget.toFixed(1)}</span>
                </div>
              </div>
              <div className="space-y-1 text-right">
                <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest block">VALOR TIME</span>
                <div className="flex items-center justify-end gap-2">
                  <PaiCoin size="sm" />
                  <span className="text-2xl font-orbitron font-black text-[#5E6CFF]">{teamValue.toFixed(1)}</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={onClear}
                className="py-3.5 bg-white/5 border border-white/10 text-gray-400 rounded-xl text-[9px] font-black uppercase tracking-widest hover:text-white transition-all"
              >
                LIMPAR
              </button>
              <button 
                onClick={onConfirm}
                className="py-3.5 bg-[#5E6CFF] text-black rounded-xl text-[9px] font-black uppercase tracking-widest hover:scale-[1.02] transition-all shadow-[0_0_20px_rgba(94,108,255,0.4)]"
              >
                CONFIRMAR
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-8 space-y-8">
        <div className="sticky top-28 z-40 pt-2 pb-6">
          <div className="relative space-y-5 p-1">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-xl border border-white/5 rounded-3xl -z-10"></div>
            <div className="flex items-center gap-2 p-1 bg-white/[0.02] rounded-[1.25rem] border border-white/5 overflow-x-auto no-scrollbar">
              {Object.entries(roleMetadata).map(([key, data]) => (
                <button key={key} onClick={() => setFilterRole(key as any)} className={`flex-1 flex items-center justify-center gap-3 px-5 py-3 rounded-xl transition-all ${filterRole === key ? 'bg-[#5E6CFF]/10 text-white border border-[#5E6CFF]/40' : 'text-gray-600'}`}>
                  <img src={data.icon} className={`w-3.5 h-3.5 ${filterRole === key ? 'brightness-150' : 'brightness-50 opacity-30'}`} alt="" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">{data.label}</span>
                </button>
              ))}
            </div>
            <div className="relative">
              <i className="fa-solid fa-magnifying-glass absolute left-6 top-1/2 -translate-y-1/2 text-gray-700 text-xs"></i>
              <input 
                type="text" placeholder="PROCURAR LENDAS NA ILHA..." 
                className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-5 pl-14 pr-6 text-[11px] font-black text-white uppercase focus:outline-none focus:bg-white/[0.05]"
                value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className={`space-y-4 transition-all duration-300 ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
          {filteredPlayers.map((player) => {
            const hiredPlayer = userTeam.players[player.role];
            const isHired = hiredPlayer?.id === player.id;
            const canAfford = isHired || (userTeam.budget + (hiredPlayer?.price || 0) >= player.price);
            const hiredChamp = isHired ? (hiredPlayer?.selectedChampion || hiredPlayer?.lastChampion) : null;

            return (
              <div key={player.id} className={`relative group bg-black/40 rounded-[2rem] border transition-all duration-500 overflow-hidden ${isHired ? 'border-[#5E6CFF]/60 shadow-[0_0_30px_rgba(94,108,255,0.1)]' : 'border-white/5 hover:border-white/20'}`}>
                
                <div className="absolute -top-12 -right-12 w-64 h-64 pointer-events-none z-0 transition-all duration-1000 ease-out opacity-[0.03] grayscale blur-[2px] group-hover:opacity-[0.15] group-hover:grayscale-0 group-hover:blur-0 group-hover:rotate-12 group-hover:scale-110">
                  <img 
                    src="https://i.imgur.com/4odZyzF.png" 
                    className="w-full h-full object-contain invert-[0.1] sepia-[1] saturate-[5] hue-rotate-[210deg]" 
                    alt="" 
                  />
                </div>

                <div className="flex flex-col md:flex-row items-stretch relative z-10">
                  <div className="relative w-full md:w-48 h-48 md:h-auto shrink-0 overflow-hidden" style={{ clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0% 100%)' }}>
                    <PlayerImage player={player} className="w-full h-full grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" />
                    <div className="absolute top-3 left-3 z-20"><TeamLogo logoUrl={player.teamLogo} teamName={player.team} className="w-8 h-8" /></div>
                    
                    {hiredChamp && (
                      <div className="absolute bottom-2 right-6 z-30 w-14 h-14 rounded-full border-2 border-[#5E6CFF] bg-black shadow-2xl overflow-hidden animate-in zoom-in duration-500">
                         <img src={hiredChamp.image} className="w-full h-full object-cover" alt={hiredChamp.name} />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 p-6 md:p-10 flex flex-col justify-center gap-6">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <img src={roleMetadata[player.role].icon} className="w-3.5 h-3.5 brightness-200 opacity-40" alt="" />
                        <span className="text-[10px] font-black text-gray-600 uppercase tracking-[0.3em]">{player.team}</span>
                      </div>
                      <h3 className="text-4xl font-black text-white uppercase tracking-tighter leading-none group-hover:text-[#5E6CFF] transition-colors">{player.name}</h3>
                    </div>
                    <div className="flex items-center gap-10">
                      <div>
                        <div className="flex items-end gap-1.5 mb-1"><span className="text-2xl font-black text-white font-orbitron tracking-tighter leading-none">{player.avgPoints.toFixed(1)}</span><span className="text-[10px] font-black text-[#5E6CFF] mb-0.5">PTS</span></div>
                        <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest">MÉDIA</span>
                      </div>
                      <div className="w-px h-8 bg-white/5"></div>
                      <div>
                        <div className="flex items-end gap-1.5 mb-1"><span className="text-2xl font-black text-white font-orbitron tracking-tighter leading-none">{player.points.toFixed(1)}</span></div>
                        <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest">ÚLT. JOGO</span>
                      </div>
                    </div>
                  </div>

                  <div className={`w-full md:w-60 shrink-0 flex flex-col justify-between p-8 md:p-10 md:border-l border-white/5 ${isHired ? 'bg-[#5E6CFF]/5' : 'bg-white/[0.01]'}`}>
                    <div className="text-right">
                      <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest block mb-1">VALOR</span>
                      <div className="flex items-center justify-end gap-2">
                        <PaiCoin size="sm" />
                        <span className={`text-2xl font-black font-orbitron tracking-tighter leading-none ${!canAfford && !isHired ? 'text-red-500' : 'text-white'}`}>{player.price.toFixed(1)}</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => isHired ? onFire(player.role) : onHire(player)} 
                      disabled={!canAfford}
                      className={`w-full py-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] transition-all ${isHired ? 'border border-red-500/40 text-red-500 hover:bg-red-500 hover:text-white' : !canAfford ? 'bg-gray-800 text-gray-600 cursor-not-allowed opacity-50' : 'bg-[#5E6CFF] text-black hover:scale-[1.02] shadow-[0_0_20px_rgba(94,108,255,0.3)]'}`}>
                      {isHired ? 'DISPENSAR' : !canAfford ? 'SEM SALDO' : 'ESCALAR'}
                    </button>
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

export default Market;
