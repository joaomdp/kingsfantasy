
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
      {/* COLUNA LATERAL - AUMENTADA PARA LG:COL-SPAN-4 */}
      <div className="lg:col-span-4 space-y-10">
        <section>
          <h2 className="text-[13px] font-black text-gray-500 uppercase tracking-tight mb-6 px-1">MEU TIME</h2>
          <div className="glass-card rounded-[40px] p-8 md:p-10 border border-white/5 relative overflow-hidden group">
            <div className="relative z-10">
              <div className="flex items-center gap-6 mb-12">
                <div className="w-20 h-20 bg-black rounded-3xl border border-[#5E6CFF]/20 flex items-center justify-center text-[#5E6CFF] shadow-2xl">
                  <i className="fa-solid fa-crown text-3xl"></i>
                </div>
                <div>
                  <h3 className="font-orbitron font-black text-2xl text-white leading-tight uppercase tracking-tighter">{userTeam.name}</h3>
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <div className="flex justify-between items-center text-[10px] font-black text-gray-400 tracking-wider uppercase mb-3 px-1">
                    <span>PAITRIMÔNIO ATUAL</span>
                    <div className="flex items-center gap-2">
                       <PaiCoin size="sm" />
                       <span className="text-2xl font-orbitron font-black text-white">{formatValue(userTeam.budget)}</span>
                    </div>
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-[#5E6CFF] shadow-[0_0_10px_rgba(94,108,255,0.5)]" style={{ width: `${(userTeam.budget / 100) * 100}%` }}></div>
                  </div>
                </div>
                <div className="flex justify-between items-center py-5 border-y border-white/5">
                  <span className="text-[12px] font-black text-gray-400 uppercase tracking-widest">PONTOS TOTAIS</span>
                  <span className="text-2xl font-orbitron font-black text-white">{userTeam.totalPoints}</span>
                </div>
              </div>

              <div 
                onClick={() => onNavigate('squad')}
                className="mt-12 space-y-6 cursor-pointer group/lineup"
              >
                <div className="flex justify-between items-center px-1">
                  <span className="text-[11px] font-black text-gray-400 uppercase tracking-[0.3em]">MINHA ESCALAÇÃO</span>
                  <div className="flex items-center gap-2 text-[#5E6CFF] opacity-0 group-hover/lineup:opacity-100 transition-all">
                     <span className="text-[9px] font-black uppercase tracking-widest">VER TUDO</span>
                     <i className="fa-solid fa-arrow-right text-[10px] group-hover/lineup:translate-x-1 transition-all"></i>
                  </div>
                </div>
                
                {/* GRID DE JOGADORES - AUMENTADO */}
                <div className="grid grid-cols-5 gap-4">
                  {rolesList.map(role => {
                    const player = userTeam.players[role];
                    const champ = player?.selectedChampion || player?.lastChampion;
                    return (
                      <div key={role} className="flex flex-col gap-3 items-center">
                        <div className={`aspect-square w-full rounded-2xl border transition-all duration-500 relative ${player ? 'border-[#5E6CFF]/60 bg-black shadow-[0_0_25px_rgba(94,108,255,0.15)]' : 'border-white/5 bg-white/[0.02]'}`}>
                          {player ? (
                            <>
                              <div className="w-full h-full p-1 rounded-2xl overflow-hidden">
                                <PlayerImage player={player} priority className="w-full h-full rounded-xl scale-105" />
                              </div>
                              {champ && (
                                <div className="absolute -bottom-2 -right-2 w-9 h-9 rounded-full border-2 border-black bg-black overflow-hidden shadow-2xl z-20">
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
                        <span className={`text-[10px] font-black text-center uppercase tracking-tighter truncate w-full px-1 ${player ? 'text-[#5E6CFF]' : 'text-gray-700'}`}>
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
          <h2 className="text-[13px] font-black text-gray-500 uppercase tracking-tight mb-6 px-1">LIGAS</h2>
          <div className="space-y-3">
            {[{ name: "Américas Elite", icon: "fa-earth-americas", color: "text-blue-400" }, { name: "Kings Cup", icon: "fa-trophy", color: "text-[#5E6CFF]" }].map(league => (
              <div key={league.name} onClick={() => onNavigate('ranking')} className="glass-card p-6 rounded-[24px] flex items-center justify-between cursor-pointer border border-white/5 hover:border-[#5E6CFF]/40 transition-all group">
                <div className="flex items-center gap-5">
                  <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:bg-[#5E6CFF]/10 ${league.color}`}>
                    <i className={`fa-solid ${league.icon} text-lg`}></i>
                  </div>
                  <span className="text-[15px] font-bold text-gray-300 group-hover:text-white uppercase tracking-tight">{league.name}</span>
                </div>
                <i className="fa-solid fa-chevron-right text-[10px] text-gray-700 group-hover:text-white group-hover:translate-x-1 transition-all"></i>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* COLUNA PRINCIPAL - AJUSTADA PARA LG:COL-SPAN-8 */}
      <div className="lg:col-span-8 space-y-12">
        <section className="relative h-[480px] rounded-[48px] overflow-hidden group border border-[#5E6CFF]/20 shadow-[0_0_80px_rgba(0,0,0,0.6)] bg-black">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0B0411] via-[#3A2380] to-[#3E46C1] opacity-60"></div>
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute inset-0 p-16 flex flex-col justify-end">
            <h1 className="text-8xl font-orbitron font-black text-white uppercase tracking-tighter leading-[0.85] mb-6 animate-in fade-in slide-in-from-bottom-10 duration-1000">O DESPERTAR DAS <span className="text-[#5E6CFF]">LENDAS</span></h1>
            <p className="text-gray-200 max-w-lg font-medium text-lg opacity-80 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-200">A temporada competitiva começou. Domine o draft, escale seu time e conquiste o topo da Ilha das Lendas.</p>
          </div>
        </section>

        <section>
          <div className="flex items-center gap-6 mb-8">
            <h2 className="text-[12px] font-black text-gray-500 uppercase tracking-[0.4em] whitespace-nowrap">MEDIA HUB</h2>
            <div className="h-px flex-1 bg-white/10"></div>
          </div>

          <a 
            href={`https://www.youtube.com/watch?v=${MEDIA_HUB_CONFIG.videoId}`} 
            target="_blank" 
            className="block relative aspect-video rounded-[40px] overflow-hidden border border-white/10 group bg-black shadow-2xl transition-all duration-500 hover:border-[#5E6CFF]/40"
          >
            <img 
              src={videoThumbnail} 
              className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-all duration-700 group-hover:scale-105" 
              alt="Video Thumbnail" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
            
            <div className="absolute inset-0 p-12 flex flex-col justify-end">
              <div className="flex items-center gap-8">
                <div className="w-24 h-24 rounded-3xl border-2 border-[#5E6CFF] bg-black p-0.5 shadow-[0_0_40px_rgba(94,108,255,0.4)] overflow-hidden shrink-0 flex items-center justify-center">
                  <img 
                    src={MEDIA_HUB_CONFIG.channelIcon} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain bg-black" 
                    alt="Channel Logo" 
                  />
                </div>
                <div className="flex-1">
                  <p className="text-[11px] font-black text-[#5E6CFF] uppercase tracking-[0.3em] mb-3 flex items-center gap-3">
                     <i className="fa-brands fa-youtube text-lg"></i>
                     {MEDIA_HUB_CONFIG.channelName}
                  </p>
                  <h3 className="text-4xl md:text-5xl font-orbitron font-black text-white uppercase tracking-tight leading-tight line-clamp-2">
                    {MEDIA_HUB_CONFIG.videoTitle}
                  </h3>
                </div>
              </div>
            </div>

            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="w-28 h-28 rounded-full bg-[#5E6CFF] flex items-center justify-center text-black text-4xl shadow-[0_0_60px_rgba(94,108,255,0.7)]">
                 <i className="fa-solid fa-play ml-2"></i>
              </div>
            </div>
          </a>
        </section>

        <section>
          <div className="flex items-center gap-6 mb-8">
            <h2 className="text-[12px] font-black text-gray-500 uppercase tracking-[0.4em]">MAIS ESCALADOS</h2>
            <div className="h-px flex-1 bg-white/10"></div>
          </div>
          <div className="bg-black/40 rounded-[40px] border border-white/5 overflow-hidden shadow-2xl backdrop-blur-xl">
            <div className="flex bg-white/5 border-b border-white/5 overflow-x-auto no-scrollbar">
              {Object.entries(roleMetadata).map(([key, data]) => (
                <button key={key} onClick={() => setPickedFilter(key as any)} className={`flex-1 min-w-[140px] py-5 flex items-center justify-center gap-3 border-b-2 transition-all ${pickedFilter === key ? 'border-[#5E6CFF] bg-white/10 text-white' : 'border-transparent text-gray-500 hover:text-gray-300'}`}>
                  <img src={data.icon} className={`w-5 h-5 ${pickedFilter === key ? 'brightness-150' : 'brightness-50 opacity-50'}`} alt="" />
                  <span className="text-[11px] font-black uppercase tracking-widest">{data.label}</span>
                </button>
              ))}
            </div>
            <div className="divide-y divide-white/5">
              {trending.map((p, i) => (
                <div key={p.id} className="flex items-center p-8 hover:bg-white/[0.02] transition-colors group cursor-pointer">
                  <div className="w-12 text-center text-white font-orbitron font-black text-2xl mr-8 opacity-30 group-hover:opacity-100 transition-opacity">{i + 1}</div>
                  <div className="w-20 h-20 bg-black rounded-2xl border border-white/10 mr-8 group-hover:border-[#5E6CFF]/50 transition-colors overflow-hidden">
                    <PlayerImage player={p} className="w-full h-full scale-110" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-orbitron font-black text-[#5E6CFF] text-2xl uppercase leading-none mb-2">{p.name}</h4>
                    <p className="text-gray-500 text-sm font-bold uppercase tracking-widest opacity-60">{p.choices.toLocaleString()} CONVOCAÇÕES</p>
                  </div>
                  <div className="text-right mr-6">
                    <span className="text-[10px] font-black text-gray-700 block mb-1">MÉDIA</span>
                    <span className="text-2xl font-orbitron font-black text-white">{p.avgPoints.toFixed(1)}</span>
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
