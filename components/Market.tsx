
import React, { useState, useMemo, useEffect } from 'react';
import { Player, Role, UserTeam } from '../types';
import { INITIAL_BUDGET } from '../constants';
import PlayerImage from './PlayerImage';
import MatchHistoryModal from './MatchHistoryModal';

interface MarketProps {
  players: Player[];
  userTeam: UserTeam;
  onHire: (player: Player) => void;
  onFire: (role: Role) => void;
}

const Market: React.FC<MarketProps> = ({ players, userTeam, onHire, onFire }) => {
  const [filterRole, setFilterRole] = useState<Role | 'ALL'>('ALL');
  const [filterTeam, setFilterTeam] = useState<string | 'ALL'>('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [historyPlayer, setHistoryPlayer] = useState<Player | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Efeito de transição ao mudar filtros
  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => setIsTransitioning(false), 300);
    return () => clearTimeout(timer);
  }, [filterRole, filterTeam]);

  const roles = [
    { id: Role.TOP, label: 'TOP', top: '22%', left: '18%', labelPos: 'bottom-[-26px]' },
    { id: Role.JNG, label: 'JUN', top: '38%', left: '35%', labelPos: 'bottom-[-26px]' },
    { id: Role.MID, label: 'MID', top: '54%', left: '52%', labelPos: 'bottom-[-26px]' },
    { id: Role.ADC, label: 'ADC', top: '86%', left: '78%', labelPos: 'bottom-[-26px]' },
    { id: Role.SUP, label: 'SUP', top: '76%', left: '90%', labelPos: 'bottom-[-26px]' },
  ];

  const roleMetadata: Record<string, { label: string; icon: string }> = {
    ALL: { 
      label: 'TODOS', 
      icon: 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-fill.png' 
    },
    [Role.TOP]: { 
      label: 'TOPO', 
      icon: 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-top.png' 
    },
    [Role.JNG]: { 
      label: 'CAÇADOR', 
      icon: 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-jungle.png' 
    },
    [Role.MID]: { 
      label: 'MEIO', 
      icon: 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-middle.png' 
    },
    [Role.ADC]: { 
      label: 'ATIRADOR', 
      icon: 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-bottom.png' 
    },
    [Role.SUP]: { 
      label: 'SUPORTE', 
      icon: 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-utility.png' 
    }
  };

  const formatValue = (val: number) => {
    if (Number.isInteger(val)) return val.toString();
    return val.toFixed(1).replace(',', '.');
  };

  const filteredPlayers = useMemo(() => {
    return players.filter(p => {
      const matchesRole = filterRole === 'ALL' || p.role === filterRole;
      const matchesTeam = filterTeam === 'ALL' || p.team === filterTeam;
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesRole && matchesTeam && matchesSearch;
    });
  }, [players, filterRole, filterTeam, searchTerm]);

  const hiredCount = Object.values(userTeam.players).filter(p => !!p).length;

  const PaiCoin = ({ size = "md", variant = "gold" }: { size?: "sm" | "md"; variant?: "gold" | "gray" }) => {
    const dims = size === "sm" ? "w-5 h-5" : "w-8 h-8";
    return (
      <img 
        src="https://i.imgur.com/4odZyzF.png" 
        className={`${dims} object-contain ${variant === 'gray' ? 'grayscale opacity-50' : 'drop-shadow-[0_0_8px_rgba(200,155,60,0.5)]'}`}
        alt="Moeda PAI"
      />
    );
  };

  const PlayerLegendCard = ({ player, isHired, onClick }: { player: Player; isHired: boolean; onClick?: () => void }) => {
    return (
      <div 
        onClick={onClick}
        className={`relative w-24 h-32 shrink-0 rounded-2xl overflow-hidden bg-[#0c0c0c] border transition-all duration-500 shadow-2xl flex items-center justify-center cursor-pointer active:scale-95 group/card
          ${isHired ? 'border-[#c89b3c] shadow-[0_0_30px_rgba(200,155,60,0.2)]' : 'border-white/10 hover:border-white/30'}`}
      >
        <PlayerImage 
          player={player} 
          className={`relative z-10 w-full h-full transition-transform duration-700 ${isHired ? 'scale-110' : 'group-hover/card:scale-105'}`} 
        />
        {player.selectedChampion && (
          <div className="absolute bottom-1 right-1 z-30 w-10 h-10 rounded-full border-2 border-black bg-black p-0.5 shadow-2xl scale-110 animate-in zoom-in-50">
            <img src={player.selectedChampion.image} className="w-full h-full rounded-full object-cover" alt="" />
          </div>
        )}
        <div className="absolute bottom-1 left-0 right-0 z-20 text-center opacity-0 group-hover/card:opacity-100 transition-opacity">
           <span className="text-[7px] font-black text-[#c89b3c] tracking-widest uppercase bg-black/80 px-2 py-0.5 rounded-full border border-[#c89b3c]/20">DETALHES</span>
        </div>
        {isHired && (
           <div className="absolute top-1 left-1 z-30">
              <i className="fa-solid fa-check-circle text-[#c89b3c] text-[10px] drop-shadow-lg"></i>
           </div>
        )}
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {historyPlayer && (
        <MatchHistoryModal player={historyPlayer} onClose={() => setHistoryPlayer(null)} />
      )}

      <div className="lg:col-span-4">
        <div className="sticky top-32 space-y-8">
          {/* MAPA TÁTICO MINI - Agora com slots pulsantes */}
          <div className="glass-card rounded-[40px] overflow-hidden border border-white/5 relative group aspect-square shadow-2xl">
              <img 
                src="https://i.imgur.com/myc9dfj.png" 
                className="w-full h-full object-cover opacity-30 contrast-[1.1] brightness-75 transition-all duration-1000 group-hover:opacity-40" 
                alt="Tactical Map" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20 pointer-events-none"></div>
              
              <div className="absolute top-6 left-6 z-30">
                <p className="text-[8px] font-black text-[#c89b3c] uppercase tracking-[0.2em] mb-1">VISUALIZAÇÃO TÁTICA</p>
                <div className="h-[1px] w-8 bg-[#c89b3c]/40 group-hover:w-12 transition-all"></div>
              </div>

              {roles.map(role => {
                const p = userTeam.players[role.id];
                return (
                  <div key={role.id} className="absolute -translate-x-1/2 -translate-y-1/2 z-20" style={{ top: role.top, left: role.left }}>
                    <div className="relative cursor-pointer" onClick={() => p && setHistoryPlayer(p)}>
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-700 relative border ${
                        p ? 'border-[#c89b3c] bg-black scale-110 shadow-[0_0_20px_rgba(200,155,60,0.4)]' : 'border-white/10 bg-black/80 hover:scale-105'
                      }`}>
                        {p ? (
                          <>
                            <div className="w-full h-full rounded-full overflow-hidden p-0.5">
                              <PlayerImage player={p} className="w-full h-full rounded-full" />
                            </div>
                            <div className="absolute -inset-1 border border-[#c89b3c]/30 rounded-full animate-ping opacity-20"></div>
                          </>
                        ) : (
                          <i className="fa-solid fa-plus text-[10px] text-white/10 group-hover:text-white/30"></i>
                        )}
                        
                        {p?.selectedChampion && (
                          <div className="absolute bottom-[-5%] right-[-5%] w-7 h-7 rounded-full border border-black bg-black p-0.5 z-40 shadow-xl">
                            <img src={p.selectedChampion.image} className="w-full h-full rounded-full object-cover" alt="" />
                          </div>
                        )}
                      </div>
                      <div className={`absolute ${role.labelPos} left-1/2 -translate-x-1/2 text-[7px] font-black uppercase tracking-widest whitespace-nowrap transition-colors ${p ? 'text-[#c89b3c]' : 'text-white/20'}`}>
                        {role.label}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          
          <div className="glass-card rounded-[40px] p-8 border border-white/5 shadow-2xl">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-[11px] font-black tracking-[0.1em] uppercase text-gray-500">RELATÓRIO DE MERCADO</h2>
              <div className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-[9px] font-black text-green-500 uppercase tracking-widest">Aberto</div>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-12">
              <div className="bg-white/[0.02] p-6 rounded-3xl border border-white/5 hover:border-white/10 transition-colors">
                <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest mb-2">SALDO DISP.</p>
                <div className="flex items-center gap-2">
                  <PaiCoin size="md" />
                  <p className="text-2xl font-orbitron font-black text-[#c89b3c] tracking-tighter">{formatValue(userTeam.budget)}</p>
                </div>
              </div>
              <div className="bg-white/[0.02] p-6 rounded-3xl border border-white/5 hover:border-white/10 transition-colors">
                <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest mb-2">INVESTIDO</p>
                <div className="flex items-center gap-2">
                  <PaiCoin size="md" variant="gray" />
                  <p className="text-2xl font-orbitron font-black text-white tracking-tighter">{formatValue(INITIAL_BUDGET - userTeam.budget)}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
               <div className="flex justify-between items-center text-[10px] font-black text-gray-500 tracking-widest uppercase">
                  <span>VAGAS PREENCHIDAS</span>
                  <span className="text-[#c89b3c]">{hiredCount}/5</span>
               </div>
               <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-[#c89b3c] transition-all duration-700 ease-out" style={{ width: `${(hiredCount/5)*100}%` }}></div>
               </div>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-8 space-y-8">
        <div className="glass-card rounded-[32px] p-3 border border-white/5 shadow-2xl flex flex-col md:flex-row items-center gap-6">
           <div className="flex bg-white/5 p-1.5 rounded-2xl border border-white/5 w-full md:w-auto overflow-x-auto no-scrollbar shrink-0">
              {Object.entries(roleMetadata).map(([key, data]) => (
                <button 
                  key={key} 
                  onClick={() => setFilterRole(key as any)} 
                  className={`flex-1 md:flex-none px-6 py-3.5 rounded-xl flex items-center justify-center gap-3 transition-all relative overflow-hidden group ${filterRole === key ? 'bg-[#c89b3c] text-black shadow-[0_0_20px_rgba(200,155,60,0.3)]' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
                >
                  <img src={data.icon} className={`w-4 h-4 transition-all duration-300 ${filterRole === key ? 'brightness-0' : 'brightness-50 opacity-40 group-hover:opacity-100 group-hover:brightness-100'}`} alt="" />
                  <span className="text-[9px] font-black uppercase tracking-widest whitespace-nowrap">{data.label}</span>
                </button>
              ))}
           </div>

           <div className="relative flex-1 w-full h-full group">
              <i className={`fa-solid fa-search absolute left-7 top-1/2 -translate-y-1/2 text-sm transition-colors ${searchTerm ? 'text-[#c89b3c]' : 'text-gray-600 group-hover:text-gray-400'}`}></i>
              <input 
                type="text" 
                placeholder="BUSCAR LENDA POR NOME..." 
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-16 pr-8 text-[11px] font-black text-white uppercase placeholder:text-gray-700 focus:outline-none focus:border-[#c89b3c]/50 focus:bg-white/[0.08] transition-all shadow-inner" 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
              />
           </div>
        </div>

        <div className={`grid grid-cols-1 gap-5 transition-all duration-500 ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
           {filteredPlayers.map((player, idx) => {
              const hiredPlayer = userTeam.players[player.role];
              const isHired = hiredPlayer?.id === player.id;
              const playerToShow = isHired ? hiredPlayer : player;

              return (
                <div 
                  key={player.id} 
                  className={`glass-card rounded-[32px] overflow-hidden group hover:bg-white/[0.04] transition-all duration-500 border border-white/5 animate-in fade-in slide-in-from-bottom-4`}
                  style={{ animationDelay: `${idx * 50}ms`, animationFillMode: 'backwards' }}
                >
                   <div className="flex items-center p-6 md:p-8 gap-10">
                      <PlayerLegendCard 
                        player={playerToShow} 
                        isHired={isHired}
                        onClick={() => setHistoryPlayer(playerToShow)} 
                      />
                      
                      <div className="flex-1 cursor-pointer" onClick={() => setHistoryPlayer(playerToShow)}>
                         <div className="flex items-center gap-3 mb-2">
                            <span className="text-[10px] font-black text-[#c89b3c] uppercase tracking-widest">{player.role}</span>
                            <div className="h-1 w-1 rounded-full bg-gray-700"></div>
                            <div className="flex items-center gap-2">
                               <img src={player.teamLogo} className="w-4 h-4 object-contain opacity-60 group-hover:opacity-100 transition-opacity" alt="" />
                               <span className="text-[10px] font-bold text-gray-500 group-hover:text-gray-300 transition-colors uppercase tracking-widest">{player.team}</span>
                            </div>
                         </div>
                         <h3 className="text-3xl font-black text-white tracking-tight uppercase group-hover:text-[#c89b3c] transition-colors leading-none">{player.name}</h3>
                         <div className="flex items-center gap-8 mt-5">
                            <div className="flex flex-col">
                              <span className="text-xs font-orbitron font-bold text-white leading-none group-hover:translate-x-1 transition-transform">{formatValue(player.points)}</span>
                              <span className="text-[8px] font-black text-gray-700 uppercase tracking-widest mt-1.5">PTS MÉDIA</span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-xs font-orbitron font-bold text-white leading-none group-hover:translate-x-1 transition-transform">{player.kda}</span>
                              <span className="text-[8px] font-black text-gray-700 uppercase tracking-widest mt-1.5">KDA SEASON</span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-xs font-orbitron font-bold text-[#c89b3c] leading-none group-hover:translate-x-1 transition-transform">TOP 4%</span>
                              <span className="text-[8px] font-black text-gray-700 uppercase tracking-widest mt-1.5">PERCENTIL</span>
                            </div>
                         </div>
                      </div>

                      <div className="flex items-center gap-12">
                         <div className="text-right hidden sm:block">
                            <p className="text-[9px] font-black text-gray-700 uppercase tracking-widest mb-1.5">CUSTO MERCADO</p>
                            <div className="flex items-center justify-end gap-2.5">
                               <PaiCoin size="md" />
                               <span className="text-4xl font-orbitron font-black text-white leading-none tracking-tighter drop-shadow-lg">{formatValue(player.price)}</span>
                            </div>
                         </div>
                         
                         <button 
                           onClick={() => isHired ? onFire(player.role) : onHire(player)} 
                           className={`w-20 h-20 rounded-2xl flex flex-col items-center justify-center gap-2 transition-all duration-500 relative overflow-hidden group/btn ${isHired ? 'bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white' : 'bg-[#c89b3c]/5 text-[#c89b3c] hover:bg-[#c89b3c] hover:text-black border border-[#c89b3c]/20 shadow-[0_10px_30px_rgba(0,0,0,0.3)]'}`}
                         >
                           <i className={`fa-solid ${isHired ? 'fa-user-xmark' : 'fa-user-plus'} text-xl transition-transform group-hover/btn:scale-110`}></i>
                           <span className="text-[8px] font-black uppercase tracking-tighter">{isHired ? 'DEMITIR' : 'CONTRATAR'}</span>
                           {!isHired && (
                             <div className="absolute inset-0 bg-white/10 translate-y-full group-hover/btn:translate-y-0 transition-transform"></div>
                           )}
                         </button>
                      </div>
                   </div>
                </div>
              );
           })}
        </div>

        {filteredPlayers.length === 0 && !isTransitioning && (
          <div className="py-32 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in-95">
             <div className="w-24 h-24 rounded-full bg-white/[0.02] border border-white/5 flex items-center justify-center mb-6">
                <i className="fa-solid fa-users-slash text-2xl text-gray-700"></i>
             </div>
             <h3 className="text-xl font-orbitron font-black text-white uppercase mb-2">Sem resultados</h3>
             <p className="text-sm text-gray-600 max-w-xs uppercase tracking-widest font-bold">Nenhuma lenda foi encontrada com os critérios selecionados.</p>
             <button 
                onClick={() => {setFilterRole('ALL'); setSearchTerm('');}}
                className="mt-8 text-[#c89b3c] text-[10px] font-black uppercase tracking-widest hover:underline"
              >
                Resetar Filtros
              </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Market;
