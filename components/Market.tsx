
import React, { useState, useMemo } from 'react';
import { Player, Role, UserTeam } from '../types';
import { INITIAL_BUDGET } from '../constants';

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

  const uniqueTeams = useMemo(() => {
    const teams = players.map(p => p.team);
    return Array.from(new Set(teams)).sort();
  }, [players]);

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

  const rolePositions: Record<string, { top: string; left: string }> = {
    [Role.TOP]: { top: '15%', left: '15%' },
    [Role.JNG]: { top: '38%', left: '38%' },
    [Role.MID]: { top: '51%', left: '51%' },
    [Role.ADC]: { top: '85%', left: '82%' },
    [Role.SUP]: { top: '75%', left: '92%' }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 animate-in fade-in duration-700">
      <div className="lg:col-span-4 space-y-8">
        <div className="glass-card rounded-[40px] p-8 border border-white/5 sticky top-24">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-[11px] font-black tracking-[0.1em] uppercase text-gray-500">RELATÓRIO DE MERCADO</h2>
            <div className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-[9px] font-black text-green-500 uppercase tracking-widest">Aberto</div>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-12">
            <div className="bg-white/[0.02] p-6 rounded-3xl border border-white/5">
              <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest mb-2">SALDO DISP.</p>
              <div className="flex items-center gap-2">
                <PaiCoin size="md" />
                <p className="text-2xl font-orbitron font-black text-[#c89b3c]">{(userTeam.budget / 1000).toFixed(1)}k</p>
              </div>
            </div>
            <div className="bg-white/[0.02] p-6 rounded-3xl border border-white/5">
              <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest mb-2">INVESTIDO</p>
              <div className="flex items-center gap-2">
                <PaiCoin size="md" variant="gray" />
                <p className="text-2xl font-orbitron font-black text-white">{((INITIAL_BUDGET - userTeam.budget) / 1000).toFixed(1)}k</p>
              </div>
            </div>
          </div>

          <div className="relative aspect-square bg-[#050505] rounded-[32px] border border-white/10 overflow-hidden mb-12 shadow-2xl group">
             <img src="https://ddragon.leagueoflegends.com/cdn/13.24.1/img/map/map11.png" className="w-full h-full object-cover opacity-80" style={{ filter: 'brightness(0.5) contrast(1.2)' }} alt="" />
             <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20 pointer-events-none"></div>
             {Object.entries(rolePositions).map(([role, pos]) => {
                const p = userTeam.players[role as Role];
                return (
                  <div key={role} className="absolute -translate-x-1/2 -translate-y-1/2 z-20" style={{ top: pos.top, left: pos.left }}>
                    <div className={`w-10 h-10 rounded-full border-2 p-0.5 transition-all ${p ? 'border-[#c89b3c] bg-black scale-110 shadow-[0_0_15px_rgba(200,155,60,0.4)]' : 'border-white/10 bg-black/80'}`}>
                      {p ? <img src={p.image} className="w-full h-full object-cover rounded-full" alt="" /> : <div className="w-full h-full flex items-center justify-center text-[7px] font-black text-white/20 uppercase">{role === Role.JNG ? 'JUN' : role.slice(0,3)}</div>}
                    </div>
                  </div>
                );
             })}
          </div>

          <div className="space-y-4">
             <div className="flex justify-between items-center text-[10px] font-black text-gray-500 tracking-widest uppercase">
                <span>VAGAS PREENCHIDAS</span>
                <span className="text-[#c89b3c]">{hiredCount}/5</span>
             </div>
             <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-[#c89b3c]" style={{ width: `${(hiredCount/5)*100}%` }}></div>
             </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-8 space-y-8">
        <div className="flex flex-col gap-6">
           <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                 <i className="fa-solid fa-search absolute left-6 top-1/2 -translate-y-1/2 text-gray-600 text-sm"></i>
                 <input type="text" placeholder="BUSCAR LENDA POR NOME..." className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-[11px] font-black text-white uppercase placeholder:text-gray-700 focus:outline-none focus:border-[#c89b3c]/40 transition-all shadow-2xl" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              </div>
              <select value={filterTeam} onChange={(e) => setFilterTeam(e.target.value)} className="bg-white/5 border border-white/10 rounded-2xl py-5 px-8 text-[11px] font-black text-white uppercase cursor-pointer min-w-[180px]">
                <option value="ALL">TODOS OS TIMES</option>
                {uniqueTeams.map(team => <option key={team} value={team}>{team}</option>)}
              </select>
           </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
           {filteredPlayers.map(player => {
              const isHired = userTeam.players[player.role]?.id === player.id;
              return (
                <div key={player.id} className="glass-card rounded-[32px] overflow-hidden group hover:bg-white/[0.04] transition-all border border-white/5">
                   <div className="flex items-center p-6 gap-8">
                      <div className="w-20 h-20 shrink-0 rounded-2xl overflow-hidden bg-black border border-white/10 relative">
                         <img src={player.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                      </div>
                      <div className="flex-1">
                         <div className="flex items-center gap-3 mb-1">
                            <span className="text-[10px] font-black text-[#c89b3c] uppercase tracking-widest">{player.role}</span>
                            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{player.team}</span>
                         </div>
                         <h3 className="text-2xl font-bold text-white tracking-tight uppercase group-hover:text-[#c89b3c] transition-colors leading-none">{player.name}</h3>
                         <div className="flex items-center gap-6 mt-4">
                            <div className="flex flex-col"><span className="text-xs font-orbitron font-bold text-white leading-none">{player.points.toFixed(1)}</span><span className="text-[8px] font-black text-gray-600 uppercase tracking-widest mt-1">Pontos</span></div>
                            <div className="flex flex-col"><span className="text-xs font-orbitron font-bold text-white leading-none">{player.kda}</span><span className="text-[8px] font-black text-gray-600 uppercase tracking-widest mt-1">KDA</span></div>
                         </div>
                      </div>
                      <div className="flex items-center gap-12">
                         <div className="text-right">
                            <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest mb-1">CUSTO</p>
                            <div className="flex items-center justify-end gap-2">
                               <PaiCoin size="md" />
                               <span className="text-3xl font-orbitron font-black text-white leading-none">{(player.price / 1000).toFixed(1)}k</span>
                            </div>
                         </div>
                         <button onClick={() => isHired ? onFire(player.role) : onHire(player)} className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all ${isHired ? 'bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white' : 'bg-[#c89b3c]/5 text-[#c89b3c] hover:bg-[#c89b3c] hover:text-black border border-[#c89b3c]/20'}`}>
                           <i className={`fa-solid ${isHired ? 'fa-xmark' : 'fa-plus'} text-lg`}></i>
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
