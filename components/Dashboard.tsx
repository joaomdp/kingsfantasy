
import React, { useState } from 'react';
import { UserTeam, Role } from '../types';
import { MOCK_PLAYERS } from '../constants';
import PlayerImage from './PlayerImage';

interface DashboardProps {
  userTeam: UserTeam;
  onNavigate: (page: any) => void;
}

/**
 * CONFIGURAÇÃO DO MEDIA HUB
 */
const MEDIA_HUB_CONFIG = {
  videoId: "9c90Q9qZlh8",
  videoTitle: "CONHECEMOS o FAKER e DEIXAMOS O CAEDREL CARECA no REDBULL LEAGUE OF IT OWN",
  customThumbnail: "",
  channelName: "Cortes da Ilha",
  channelIcon: "https://i.imgur.com/4ilaY1c.png"
};

const Dashboard: React.FC<DashboardProps> = ({ userTeam, onNavigate }) => {
  const [pickedFilter, setPickedFilter] = useState<Role | 'TODOS'>('TODOS');
  
  const rolesList = [Role.TOP, Role.JNG, Role.MID, Role.ADC, Role.SUP];

  const roleMetadata: Record<string, { label: string; icon: string }> = {
    TODOS: { 
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

  const PaiCoin = ({ size = "md" }: { size?: "sm" | "md" | "lg" }) => {
    const dims = size === "sm" ? "w-5 h-5" : size === "md" ? "w-8 h-8" : "w-12 h-12";
    return (
      <img 
        src="https://i.imgur.com/4odZyzF.png" 
        className={`${dims} object-contain invert-[0.1] sepia-[1] saturate-[5] hue-rotate-[210deg]`}
        alt="Moeda PAI"
      />
    );
  };

  const formatValue = (val: number) => {
    if (Number.isInteger(val)) return val.toString();
    return val.toFixed(1).replace(',', '.');
  };

  const trending = [...MOCK_PLAYERS]
    .filter(p => pickedFilter === 'TODOS' || p.role === pickedFilter)
    .sort((a, b) => b.points - a.points)
    .slice(0, 5)
    .map((p, idx) => ({ ...p, choices: Math.floor(5000 - (idx * 380)) }));

  const videoThumbnail = MEDIA_HUB_CONFIG.customThumbnail || `https://i.ytimg.com/vi/${MEDIA_HUB_CONFIG.videoId}/maxresdefault.jpg`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
      <div className="lg:col-span-3 space-y-8">
        <section>
          <h2 className="text-[13px] font-black text-gray-500 uppercase tracking-tight mb-6">MEU TIME</h2>
          <div className="glass-card rounded-[32px] p-8 border border-white/5 relative overflow-hidden group">
            <div className="relative z-10">
              <div className="flex items-center gap-5 mb-10">
                <div className="w-16 h-16 bg-black rounded-2xl border border-[#5E6CFF]/20 flex items-center justify-center text-[#5E6CFF] shadow-2xl">
                  <i className="fa-solid fa-crown text-2xl"></i>
                </div>
                <div>
                  <h3 className="font-orbitron font-black text-lg text-white leading-tight">{userTeam.name}</h3>
                  <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{userTeam.rank}</span>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center text-[10px] font-black text-gray-400 tracking-wider uppercase mb-3">
                    <span>SALDO ATUAL</span>
                    <div className="flex items-center gap-2">
                       <PaiCoin size="sm" />
                       <span className="text-xl font-orbitron font-black text-white">{formatValue(userTeam.budget)}</span>
                    </div>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-[#5E6CFF]" style={{ width: `${(userTeam.budget / 100) * 100}%` }}></div>
                  </div>
                </div>
                <div className="flex justify-between items-center py-4 border-y border-white/5">
                  <span className="text-[11px] font-bold text-gray-400">PONTOS TOTAIS</span>
                  <span className="text-xl font-orbitron font-black text-white">{userTeam.totalPoints}</span>
                </div>
              </div>

              <div 
                onClick={() => onNavigate('squad')}
                className="mt-10 space-y-4 cursor-pointer group/lineup"
              >
                <div className="flex justify-between items-center px-1">
                  <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">MINHA ESCALAÇÃO</span>
                  <i className="fa-solid fa-arrow-right text-[10px] text-[#5E6CFF] opacity-0 group-hover/lineup:opacity-100 group-hover/lineup:translate-x-1 transition-all"></i>
                </div>
                
                <div className="grid grid-cols-5 gap-2">
                  {rolesList.map(role => {
                    const player = userTeam.players[role];
                    const champ = player?.selectedChampion || player?.lastChampion;
                    return (
                      <div key={role} className="flex flex-col gap-1.5 items-center">
                        <div className={`aspect-square w-full rounded-xl border transition-all duration-500 relative ${player ? 'border-[#5E6CFF]/40 bg-black' : 'border-white/5 bg-white/[0.02]'}`}>
                          {player ? (
                            <>
                              <div className="w-full h-full p-0.5 rounded-xl overflow-hidden">
                                <PlayerImage player={player} priority className="w-full h-full rounded-lg" />
                              </div>
                              {champ && (
                                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full border border-black bg-black overflow-hidden shadow-lg z-10">
                                  <img src={champ.image} className="w-full h-full object-cover" alt="" />
                                </div>
                              )}
                            </>
                          ) : (
                            <div className="w-full h-full flex items-center justify-center opacity-10">
                              <img src={roleMetadata[role].icon} className="w-2.5 h-2.5 brightness-0 invert" alt="" />
                            </div>
                          )}
                        </div>
                        <span className={`text-[6px] font-black text-center uppercase tracking-tighter truncate w-full ${player ? 'text-[#5E6CFF]' : 'text-gray-700'}`}>
                          {player ? player.name : roleMetadata[role].label.substring(0,3)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-[13px] font-black text-gray-500 uppercase tracking-tight mb-6">LIGAS</h2>
          <div className="space-y-3">
            {[{ name: "Américas Elite", icon: "fa-earth-americas", color: "text-blue-400" }, { name: "Kings Cup", icon: "fa-trophy", color: "text-[#5E6CFF]" }].map(league => (
              <div key={league.name} onClick={() => onNavigate('ranking')} className="glass-card p-5 rounded-2xl flex items-center justify-between cursor-pointer border border-white/5 hover:border-[#5E6CFF]/40 transition-all group">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:bg-[#5E6CFF]/10 ${league.color}`}>
                    <i className={`fa-solid ${league.icon} text-sm`}></i>
                  </div>
                  <span className="text-sm font-bold text-gray-300 group-hover:text-white">{league.name}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="lg:col-span-9 space-y-12">
        <section className="relative h-[420px] rounded-[40px] overflow-hidden group border border-[#5E6CFF]/20 shadow-[0_0_60px_rgba(0,0,0,0.5)] bg-black">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0B0411] via-[#3A2380] to-[#3E46C1] opacity-60"></div>
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute inset-0 p-12 flex flex-col justify-end">
            <h1 className="text-7xl font-orbitron font-black text-white uppercase tracking-tighter leading-none mb-4 animate-in fade-in slide-in-from-bottom-10 duration-1000">O DESPERTAR DAS <span className="text-[#5E6CFF]">LENDAS</span></h1>
            <p className="text-gray-200 max-w-lg font-medium animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-200">A temporada competitiva começou. Domine o draft, escale seu time e conquiste o topo da Ilha das Lendas.</p>
          </div>
        </section>

        <section>
          <div className="flex items-center gap-6 mb-8">
            <div className="flex items-center gap-3">
              <h2 className="text-[11px] font-black text-gray-500 uppercase tracking-widest whitespace-nowrap">MEDIA HUB</h2>
              <div className="px-2 py-0.5 bg-red-600 rounded flex items-center gap-1.5">
                <div className="w-1 h-1 bg-white rounded-full animate-ping"></div>
                <span className="text-[8px] font-black text-white uppercase tracking-tighter">DESTAQUE</span>
              </div>
            </div>
            <div className="h-px flex-1 bg-white/10"></div>
          </div>

          <a 
            href={`https://www.youtube.com/watch?v=${MEDIA_HUB_CONFIG.videoId}`} 
            target="_blank" 
            className="block relative aspect-video rounded-[32px] overflow-hidden border border-white/10 group bg-black shadow-2xl transition-all duration-500 hover:border-[#5E6CFF]/40"
          >
            <img 
              src={videoThumbnail} 
              className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-all duration-700 group-hover:scale-105" 
              alt="Video Thumbnail" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
            
            <div className="absolute inset-0 p-10 flex flex-col justify-end">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-2xl border-2 border-[#5E6CFF] bg-black p-0.5 shadow-[0_0_30px_rgba(94,108,255,0.3)] overflow-hidden shrink-0 flex items-center justify-center">
                  <img 
                    src={MEDIA_HUB_CONFIG.channelIcon} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain bg-black" 
                    alt="Channel Logo" 
                  />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] font-black text-[#5E6CFF] uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                     <i className="fa-brands fa-youtube"></i>
                     {MEDIA_HUB_CONFIG.channelName}
                  </p>
                  <h3 className="text-3xl md:text-4xl font-orbitron font-black text-white uppercase tracking-tight leading-tight line-clamp-2">
                    {MEDIA_HUB_CONFIG.videoTitle}
                  </h3>
                </div>
              </div>
            </div>

            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="w-24 h-24 rounded-full bg-[#5E6CFF] flex items-center justify-center text-black text-3xl shadow-[0_0_50px_rgba(94,108,255,0.6)]">
                 <i className="fa-solid fa-play ml-1"></i>
              </div>
            </div>
          </a>
        </section>

        <section>
          <div className="flex items-center gap-6 mb-8">
            <h2 className="text-[11px] font-black text-gray-500 uppercase tracking-widest">MAIS ESCALADOS</h2>
            <div className="h-px flex-1 bg-white/10"></div>
          </div>
          <div className="bg-black/30 rounded-3xl border border-white/5 overflow-hidden shadow-2xl">
            <div className="flex bg-white/5 border-b border-white/5 overflow-x-auto no-scrollbar">
              {Object.entries(roleMetadata).map(([key, data]) => (
                <button key={key} onClick={() => setPickedFilter(key as any)} className={`flex-1 min-w-[120px] py-4 flex items-center justify-center gap-2 border-b-2 transition-all ${pickedFilter === key ? 'border-[#5E6CFF] bg-white/5 text-white' : 'border-transparent text-gray-500 hover:text-gray-300'}`}>
                  <img src={data.icon} className={`w-4 h-4 ${pickedFilter === key ? 'brightness-150' : 'brightness-50 opacity-50'}`} alt="" />
                  <span className="text-[10px] font-black uppercase">{data.label}</span>
                </button>
              ))}
            </div>
            <div className="divide-y divide-white/5">
              {trending.map((p, i) => (
                <div key={p.id} className="flex items-center p-6 hover:bg-white/[0.01] transition-colors group cursor-pointer">
                  <div className="w-10 text-center text-white font-orbitron font-black text-lg mr-6 opacity-30 group-hover:opacity-100 transition-opacity">{i + 1}</div>
                  <div className="w-14 h-14 bg-black rounded-xl border border-white/10 mr-6 group-hover:border-[#5E6CFF]/50 transition-colors overflow-hidden">
                    <PlayerImage player={p} className="w-full h-full" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-orbitron font-black text-[#5E6CFF] text-xl uppercase leading-none mb-1">{p.name}</h4>
                    <p className="text-gray-500 text-sm font-medium">{p.choices.toLocaleString()} convocações</p>
                  </div>
                  <i className="fa-solid fa-chevron-right text-gray-800 mr-4 opacity-0 group-hover:opacity-100 transition-all"></i>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
