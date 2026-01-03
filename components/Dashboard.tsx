
import React, { useState } from 'react';
import { UserTeam, Role } from '../types';
import { MOCK_PLAYERS } from '../constants';

interface DashboardProps {
  userTeam: UserTeam;
  onNavigate: (page: any) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ userTeam, onNavigate }) => {
  const [pickedFilter, setPickedFilter] = useState<Role | 'TODOS'>('TODOS');
  
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
        className={`${dims} object-contain`}
        alt="Moeda PAI"
      />
    );
  };

  const trending = [...MOCK_PLAYERS]
    .filter(p => pickedFilter === 'TODOS' || p.role === pickedFilter)
    .sort((a, b) => b.points - a.points)
    .slice(0, 5)
    .map((p, idx) => ({ ...p, choices: Math.floor(5000 - (idx * 380)) }));

  const newsItems = [
    { id: 1, category: 'MERCADO', title: 'JANELA DE TRANSFERÊNCIAS: QUEM SOBE?', description: 'Analistas debutam nomes que prometem abalar a tabela.', image: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Kaisa_0.jpg', date: '12 MAR' },
    { id: 2, category: 'COMPETITIVO', title: 'GUIA DE SCOUTING: COMO MONTAR SEU TIME', description: 'Confira as métricas essenciais de KDA e Farm.', image: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Aatrox_0.jpg', date: '10 MAR' },
    { id: 3, category: 'PATCH', title: 'MUDANÇAS NO META: ASSASSINOS VOLTAM?', description: 'Como as mudanças impactam a pontuação.', image: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Naafiri_0.jpg', date: '08 MAR' }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
      <div className="lg:col-span-3 space-y-8">
        <section>
          <h2 className="text-[13px] font-black text-gray-500 uppercase tracking-tight mb-6">MEU TIME</h2>
          <div className="glass-card rounded-[32px] p-8 border border-white/5 relative overflow-hidden group">
            <div className="relative z-10">
              <div className="flex items-center gap-5 mb-10">
                <div className="w-16 h-16 bg-black rounded-2xl border border-[#c89b3c]/20 flex items-center justify-center text-[#c89b3c] shadow-2xl">
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
                       <span className="text-[#c89b3c] font-orbitron font-black text-sm">{(userTeam.budget / 1000).toFixed(1)}k</span>
                    </div>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-[#c89b3c]" style={{ width: `${(userTeam.budget / 100000) * 100}%` }}></div>
                  </div>
                </div>
                <div className="flex justify-between items-center py-4 border-y border-white/5">
                  <span className="text-[11px] font-bold text-gray-400">PONTOS TOTAIS</span>
                  <span className="text-xl font-orbitron font-black text-white">{userTeam.totalPoints}</span>
                </div>
              </div>
              <button onClick={() => onNavigate('squad')} className="w-full mt-10 py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black text-white uppercase hover:bg-[#c89b3c] hover:text-black transition-all">EDITAR LINE-UP</button>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-[13px] font-black text-gray-500 uppercase tracking-tight mb-6">LIGAS</h2>
          <div className="space-y-3">
            {[{ name: "Américas Elite", icon: "fa-earth-americas", color: "text-blue-400" }, { name: "Kings Cup", icon: "fa-trophy", color: "text-gold" }].map(league => (
              <div key={league.name} onClick={() => onNavigate('ranking')} className="glass-card p-5 rounded-2xl flex items-center justify-between cursor-pointer border border-white/5 hover:border-[#c89b3c]/40 transition-all group">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:bg-[#c89b3c]/10 ${league.color}`}>
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
        <section className="relative h-[420px] rounded-[40px] overflow-hidden group border border-[#c89b3c]/20 shadow-[0_0_60px_rgba(0,0,0,0.5)] bg-black">
          <img src="https://images.contentstack.io/v3/assets/blt73110590efcfd130/blt3f38096a67f15309/638977a41e582810a9905959/SS23_Sizzle_Wallpaper.jpg" className="absolute inset-0 w-full h-full object-cover opacity-80 transition-transform duration-1000 group-hover:scale-105" alt="Kings Lendas Banner" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
          <div className="absolute inset-0 p-12 flex flex-col justify-end">
            <h1 className="text-7xl font-orbitron font-black text-white uppercase tracking-tighter leading-none mb-4 animate-in fade-in slide-in-from-bottom-10 duration-1000">O DESPERTAR DAS <span className="text-[#c89b3c]">LENDAS</span></h1>
            <p className="text-gray-300 max-w-lg font-medium animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-200">As luzes do palco se acenderam. Sua jornada para o topo da liga amadora começa agora.</p>
          </div>
        </section>

        <section>
          <div className="flex items-center gap-6 mb-8">
            <h2 className="text-[11px] font-black text-gray-500 uppercase tracking-widest whitespace-nowrap">MEDIA HUB</h2>
            <div className="h-px flex-1 bg-white/10"></div>
          </div>
          <a href="https://www.youtube.com/watch?v=jWYN_Z9mmrc" target="_blank" className="block relative aspect-video rounded-[32px] overflow-hidden border border-white/10 group bg-black shadow-2xl">
            <img src="https://i.ytimg.com/vi/jWYN_Z9mmrc/maxresdefault.jpg" className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-all duration-700" alt="Video Thumbnail" />
            <div className="absolute inset-0 p-10 flex flex-col justify-end">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-2xl border-2 border-[#c89b3c] bg-black p-0.5 shadow-[0_0_30px_rgba(200,155,60,0.3)] overflow-hidden">
                  <img src="https://i.imgur.com/ubXmpdn.png" className="w-full h-full object-contain bg-[#050505]" alt="Channel Logo" />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] font-black text-[#c89b3c] uppercase tracking-[0.2em] mb-1">CORTES DA ILHA</p>
                  <h3 className="text-3xl md:text-4xl font-orbitron font-black text-white uppercase tracking-tight leading-tight">O DIA QUE O ESA FEZ HISTÓRIA na KINGS LENDAS | GENGG vs KCP</h3>
                </div>
              </div>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-75 group-hover:scale-100 shadow-2xl">
               <i className="fa-solid fa-play text-black text-2xl ml-1"></i>
            </div>
          </a>
        </section>

        <section>
          <div className="flex items-center gap-6 mb-8">
            <h2 className="text-[11px] font-black text-gray-500 uppercase tracking-widest">MAIS ESCALADOS</h2>
            <div className="h-px flex-1 bg-white/10"></div>
          </div>
          <div className="bg-[#121212] rounded-3xl border border-white/5 overflow-hidden shadow-2xl">
            <div className="flex bg-[#1a1a1a] border-b border-white/5 overflow-x-auto no-scrollbar">
              {Object.entries(roleMetadata).map(([key, data]) => (
                <button key={key} onClick={() => setPickedFilter(key as any)} className={`flex-1 min-w-[120px] py-4 flex items-center justify-center gap-2 border-b-2 transition-all ${pickedFilter === key ? 'border-[#c89b3c] bg-white/5 text-white' : 'border-transparent text-gray-500 hover:text-gray-300'}`}>
                  <img src={data.icon} className={`w-4 h-4 ${pickedFilter === key ? 'brightness-150' : 'brightness-50 opacity-50'}`} alt="" />
                  <span className="text-[10px] font-black uppercase">{data.label}</span>
                </button>
              ))}
            </div>
            <div className="divide-y divide-white/5">
              {trending.map((p, i) => (
                <div key={p.id} className="flex items-center p-6 hover:bg-white/[0.01] transition-colors group cursor-pointer">
                  <div className="w-10 text-center text-white font-orbitron font-black text-lg mr-6 opacity-30 group-hover:opacity-100 transition-opacity">{i + 1}</div>
                  <img src={p.image} className="w-14 h-14 object-cover rounded-xl border border-white/10 mr-6 group-hover:border-[#c89b3c]/50 transition-colors" alt="" />
                  <div className="flex-1">
                    <h4 className="font-orbitron font-black text-[#c89b3c] text-xl uppercase leading-none mb-1">{p.name}</h4>
                    <p className="text-gray-500 text-sm font-medium">{p.choices.toLocaleString()} convocações</p>
                  </div>
                  <i className="fa-solid fa-chevron-right text-gray-800 mr-4 opacity-0 group-hover:opacity-100 transition-all"></i>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section>
          <div className="flex items-center gap-6 mb-8">
            <h2 className="text-[11px] font-black text-gray-500 uppercase tracking-widest">NOTÍCIAS TÁTICAS</h2>
            <div className="h-px flex-1 bg-white/10"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {newsItems.map(item => (
              <div key={item.id} className="glass-card rounded-[32px] overflow-hidden group border border-white/5 hover:border-[#c89b3c]/30 transition-all cursor-pointer">
                <div className="relative aspect-video overflow-hidden">
                  <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                  <div className="absolute top-4 right-4 px-3 py-1 bg-black/60 backdrop-blur-md rounded-lg text-[9px] font-black text-white">{item.date}</div>
                </div>
                <div className="p-8 space-y-4">
                  <span className="text-[9px] font-black text-[#c89b3c] tracking-[0.2em] uppercase">{item.category}</span>
                  <h3 className="font-orbitron font-black text-white text-lg leading-tight uppercase group-hover:text-[#c89b3c] transition-colors">{item.title}</h3>
                  <p className="text-gray-400 text-[12px] font-medium leading-relaxed line-clamp-2">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
