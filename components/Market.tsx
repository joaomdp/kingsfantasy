
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
}

const Market: React.FC<MarketProps> = ({ players, userTeam, onHire, onFire, onClear, onConfirm }) => {
  const [filterRole, setFilterRole] = useState<Role | 'ALL'>('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [historyPlayer, setHistoryPlayer] = useState<Player | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => setIsTransitioning(false), 200);
    return () => clearTimeout(timer);
  }, [filterRole]);

  const rolesList = [Role.TOP, Role.JNG, Role.MID, Role.ADC, Role.SUP];

  const rolesMap = [
    { id: Role.TOP, label: 'TOP', top: '22%', left: '18%' },
    { id: Role.JNG, label: 'JUN', top: '38%', left: '35%' },
    { id: Role.MID, label: 'MID', top: '54%', left: '52%' },
    { id: Role.ADC, label: 'ADC', top: '86%', left: '78%' },
    { id: Role.SUP, label: 'SUP', top: '76%', left: '90%' },
  ];

  const roleMetadata: Record<string, { label: string; icon: string }> = {
    ALL: { label: 'TODOS', icon: 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-fill.png' },
    [Role.TOP]: { label: 'TOP', icon: 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-top.png' },
    [Role.JNG]: { label: 'SELVA', icon: 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-jungle.png' },
    [Role.MID]: { label: 'MEIO', icon: 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-middle.png' },
    [Role.ADC]: { label: 'ADC', icon: 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-bottom.png' },
    [Role.SUP]: { label: 'SUP', icon: 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-utility.png' }
  };

  const formatValue = (val: number) => Number.isInteger(val) ? val.toString() : val.toFixed(1).replace(',', '.');

  const filteredPlayers = useMemo(() => {
    return players
      .filter(p => {
        const matchesRole = filterRole === 'ALL' || p.role === filterRole;
        const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesRole && matchesSearch;
      })
      .sort((a, b) => b.price - a.price);
  }, [players, filterRole, searchTerm]);

  const hiredCount = Object.values(userTeam.players).filter(p => !!p).length;

  const PaiCoin = ({ size = "sm" }: { size?: "xs" | "sm" | "md" }) => (
    <img 
      src="https://i.imgur.com/4odZyzF.png" 
      className={`${size === "xs" ? "w-3.5 h-3.5" : size === "sm" ? "w-4 h-4" : "w-6 h-6"} object-contain`} 
      alt="P" 
    />
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 animate-in fade-in duration-500 pb-20">
      {historyPlayer && <MatchHistoryModal player={historyPlayer} onClose={() => setHistoryPlayer(null)} />}

      {/* SIDEBAR DASHBOARD */}
      <div className="lg:col-span-3 space-y-8">
        <div className="sticky top-32 space-y-8">
          
          {/* BUDGET HUD */}
          <div className="glass-card rounded-[32px] p-7 border border-white/5 bg-black/40 shadow-2xl relative overflow-hidden">
            <div className="relative z-10 space-y-8">
              <div>
                <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] block mb-2.5">SALDO DISPONÍVEL</span>
                <div className="flex items-center gap-3">
                  <PaiCoin size="md" />
                  <span className="text-3xl font-orbitron font-black text-white">{formatValue(userTeam.budget)}</span>
                </div>
              </div>
              <div className="pt-6 border-t border-white/5">
                <div className="flex justify-between items-end mb-3">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">LINEUP ATUAL</span>
                  <span className="text-xl font-orbitron font-black text-[#c89b3c]">{hiredCount}/5</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-[#c89b3c] transition-all duration-1000" style={{ width: `${(hiredCount/5)*100}%` }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* MAPA HUD */}
          <div className="glass-card rounded-[40px] overflow-hidden border-2 border-white/10 bg-black aspect-square relative hidden lg:block shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
            <img src="https://i.imgur.com/myc9dfj.png" className="absolute inset-0 w-full h-full object-cover opacity-80" alt="Map" />
            {rolesMap.map(role => {
              const p = userTeam.players[role.id];
              return (
                <div key={role.id} className="absolute -translate-x-1/2 -translate-y-1/2 z-20" style={{ top: role.top, left: role.left }}>
                  <div 
                    onClick={() => p ? setHistoryPlayer(p) : setFilterRole(role.id as any)}
                    className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-500 overflow-hidden cursor-pointer
                      ${p ? 'border-[#c89b3c] bg-black shadow-[0_0_15px_rgba(200,155,60,0.8)]' : 'border-white/20 bg-black/60 opacity-60'}`}
                  >
                    {p ? <PlayerImage player={p} className="w-full h-full" /> : <img src={roleMetadata[role.id].icon} className="w-4 h-4 brightness-200 opacity-30" alt="" />}
                  </div>
                </div>
              );
            })}
          </div>

          {/* MINHA ESCALAÇÃO HUD - AJUSTADO PARA TAMANHO EQUILIBRADO */}
          <div className="space-y-4">
            <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] block px-2">MINHA ESCALAÇÃO</span>
            <div className="grid grid-cols-5 gap-3">
              {rolesList.map(role => {
                const player = userTeam.players[role];
                const champ = player?.selectedChampion || player?.lastChampion;
                return (
                  <div key={role} className={`aspect-square rounded-xl border transition-all duration-500 relative overflow-visible group ${player ? 'border-[#c89b3c] bg-black shadow-[0_0_15px_rgba(200,155,60,0.1)]' : 'border-white/5 bg-white/[0.02]'}`}>
                    {player ? (
                      <>
                        <div className="w-full h-full p-0.5 cursor-pointer rounded-xl overflow-hidden relative" onClick={() => setHistoryPlayer(player)}>
                          <PlayerImage player={player} className="w-full h-full rounded-lg" />
                        </div>
                        {champ && (
                          <div className="absolute -bottom-1.5 -right-1.5 w-9 h-9 rounded-full border-2 border-black bg-black overflow-hidden shadow-[0_4px_8px_rgba(0,0,0,0.8)] z-30 group-hover:scale-110 transition-transform duration-300">
                            <div className="absolute inset-0 border border-[#c89b3c]/40 rounded-full z-10 pointer-events-none"></div>
                            <img src={champ.image} className="w-full h-full object-cover" alt="" />
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center opacity-10">
                        <img src={roleMetadata[role].icon} className="w-4 h-4 brightness-0 invert" alt="" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex gap-2.5">
              <button 
                onClick={onClear}
                className="w-14 h-14 flex items-center justify-center bg-red-600/10 border border-red-500/20 text-red-500 rounded-2xl hover:bg-red-600 hover:text-white transition-all shadow-xl active:scale-95 group/clear"
              >
                <i className="fa-solid fa-trash-can text-sm group-hover/clear:rotate-12 transition-transform"></i>
              </button>
              <button 
                onClick={onConfirm}
                disabled={hiredCount < 5}
                className={`flex-1 h-14 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all relative overflow-hidden group/confirm shadow-2xl
                  ${hiredCount === 5 ? 'bg-[#c89b3c] text-black hover:scale-[1.02] active:scale-[0.98]' : 'bg-white/5 text-gray-600 border border-white/5 cursor-not-allowed'}`}
              >
                {hiredCount === 5 ? 'CONFIRMAR TIME' : `FALTAM ${5 - hiredCount}`}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN MARKET CONTENT */}
      <div className="lg:col-span-9 space-y-8">
        
        {/* FILTERS HUD */}
        <div className="sticky top-28 z-40 pt-2 pb-6 bg-transparent">
          <div className="relative space-y-5 p-1 rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-black/30 backdrop-blur-xl border border-white/5 rounded-3xl -z-10"></div>
            <div className="flex items-center gap-2 p-1 bg-white/[0.02] rounded-[1.25rem] border border-white/5 overflow-x-auto no-scrollbar">
              {Object.entries(roleMetadata).map(([key, data]) => (
                <button key={key} onClick={() => setFilterRole(key as any)} className={`flex-1 flex items-center justify-center gap-3 px-5 py-3 rounded-xl transition-all relative group ${filterRole === key ? 'bg-[#c89b3c]/10 text-white border border-[#c89b3c]/40' : 'text-gray-600 hover:text-gray-300'}`}>
                  <img src={data.icon} className={`w-3.5 h-3.5 transition-all ${filterRole === key ? 'brightness-150 drop-shadow-[0_0_5px_#fff]' : 'brightness-50 opacity-30 group-hover:opacity-100'}`} alt="" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">{data.label}</span>
                </button>
              ))}
            </div>
            <div className="relative w-full group">
              <input 
                type="text" 
                placeholder="PROCURAR LENDAS NO MERCADO..." 
                className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-4 pl-14 pr-8 text-[11px] font-black text-white uppercase tracking-[0.1em] focus:outline-none focus:bg-white/[0.05] transition-all placeholder:text-gray-700"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute left-6 top-1/2 -translate-y-1/2"><i className="fa-solid fa-magnifying-glass text-gray-700 text-xs"></i></div>
            </div>
          </div>
        </div>

        {/* PLAYER LIST - AJUSTADO POSIÇÃO CAMPEÃO NO CARD */}
        <div className={`space-y-4 transition-all duration-300 ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
          {filteredPlayers.map((player) => {
            const hiredPlayer = userTeam.players[player.role];
            const isHired = hiredPlayer?.id === player.id;
            const canAfford = isHired || (userTeam.budget + (hiredPlayer?.price || 0) >= player.price);
            const displayChamp = isHired ? (hiredPlayer.selectedChampion || hiredPlayer.lastChampion) : null;

            return (
              <div key={player.id} className={`relative group bg-[#0a0a0a] rounded-[2rem] border transition-all duration-500 overflow-hidden shadow-2xl ${isHired ? 'border-[#c89b3c]/60 shadow-[0_0_30px_rgba(200,155,60,0.1)]' : 'border-white/5 hover:border-white/20'}`}>
                <div className="flex flex-col md:flex-row items-stretch">
                  <div className="relative w-full md:w-36 h-40 md:h-auto shrink-0 cursor-pointer overflow-hidden" style={{ clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0% 100%)' }} onClick={() => setHistoryPlayer(player)}>
                    <PlayerImage player={player} className="w-full h-full grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" />
                    
                    {displayChamp && (
                      <div className="absolute bottom-4 right-6 z-20 group-hover:scale-110 transition-transform duration-500">
                         <div className="relative w-14 h-14">
                            <img src={displayChamp.image} className="w-full h-full rounded-full border-4 border-black bg-black object-cover shadow-[0_0_20px_rgba(0,0,0,0.8)]" alt="" />
                            <div className="absolute inset-0 rounded-full border-2 border-[#c89b3c]/40 animate-pulse"></div>
                         </div>
                      </div>
                    )}

                    <div className="absolute top-4 left-4 z-10 bg-black/80 backdrop-blur-xl p-2 rounded-xl border border-white/10">
                       <TeamLogo logoUrl={player.teamLogo} teamName={player.team} className="w-4 h-4 brightness-150" />
                    </div>
                  </div>

                  <div className="flex-1 p-6 md:p-8 flex flex-col justify-center gap-6">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <img src={roleMetadata[player.role].icon} className="w-3.5 h-3.5 brightness-200 opacity-40" alt="" />
                        <span className="text-[10px] font-black text-gray-600 uppercase tracking-[0.3em]">{player.team}</span>
                      </div>
                      <h3 className="text-3xl font-black text-white uppercase tracking-tighter leading-none group-hover:text-[#c89b3c] transition-colors">{player.name}</h3>
                    </div>
                    <div className="flex items-center gap-10">
                      <div>
                        <div className="flex items-end gap-1.5 mb-1"><span className="text-2xl font-black text-white font-orbitron tracking-tighter leading-none">{player.avgPoints.toFixed(1)}</span><span className="text-[10px] font-black text-[#c89b3c] mb-0.5">PTS</span></div>
                        <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest">MÉDIA SEASON</span>
                      </div>
                      <div>
                        <div className="flex items-end gap-1.5 mb-1"><span className="text-2xl font-black text-white font-orbitron tracking-tighter leading-none">{player.points.toFixed(1)}</span><span className={`text-[10px] font-bold mb-0.5 ${player.points >= player.avgPoints ? 'text-green-500' : 'text-red-500'}`}>{player.points >= player.avgPoints ? '↑' : '↓'}</span></div>
                        <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest">ÚLTIMA RODADA</span>
                      </div>
                    </div>
                  </div>

                  <div className={`w-full md:w-56 shrink-0 flex flex-col justify-between p-6 md:p-8 md:border-l border-white/5 transition-colors ${isHired ? 'bg-[#7a2f2f]/10' : 'bg-white/[0.02] group-hover:bg-[#c89b3c]/[0.03]'}`}>
                    <div className="text-right">
                      <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest block mb-1">VALOR MERCADO</span>
                      <div className="flex items-center justify-end gap-2">
                        <PaiCoin size="sm" />
                        <span className={`text-2xl font-black font-orbitron tracking-tighter leading-none ${!canAfford && !isHired ? 'text-red-500' : 'text-white'}`}>{formatValue(player.price)}</span>
                      </div>
                    </div>
                    <button onClick={() => isHired ? onFire(player.role) : onHire(player)} disabled={!canAfford} className={`w-full py-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] transition-all ${isHired ? 'border border-red-500/40 text-red-500 hover:bg-red-500 hover:text-white' : !canAfford ? 'bg-gray-800 text-gray-600 cursor-not-allowed opacity-50' : 'bg-[#c89b3c] text-black hover:scale-[1.02] shadow-xl shadow-[#c89b3c]/10'}`}>
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
