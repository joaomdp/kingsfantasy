
import React, { useState } from 'react';
import { UserTeam, Role } from '../types';
import { MOCK_PLAYERS } from '../constants';

interface DashboardProps {
  userTeam: UserTeam;
  onNavigate: (page: any) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ userTeam, onNavigate }) => {
  const [pickedFilter, setPickedFilter] = useState<Role | 'TODOS'>('TODOS');
  
  // URLs dos ícones oficiais do LoL (Community Dragon)
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

  const iconFilterStyle = (isActive: boolean) => ({
    filter: isActive 
      ? 'invert(69%) sepia(48%) saturate(543%) hue-rotate(3deg) brightness(92%) contrast(87%)' 
      : 'invert(30%) brightness(1.2)' 
  });

  const trending = [...MOCK_PLAYERS]
    .filter(p => pickedFilter === 'TODOS' || p.role === pickedFilter)
    .sort((a, b) => b.points - a.points)
    .slice(0, 5)
    .map((p, idx) => ({
      ...p,
      choices: Math.floor(5000 - (idx * 380) - (p.price / 150))
    }));

  const newsItems = [
    {
      id: 1,
      category: 'MERCADO',
      title: 'JANELA DE TRANSFERÊNCIAS: QUEM SOBE PARA A ELITE?',
      description: 'Analistas debutam os nomes que prometem abalar a tabela na segunda etapa da Kings Lendas.',
      image: 'https://picsum.photos/seed/news1/600/400',
      date: '12 MAR'
    },
    {
      id: 2,
      category: 'COMPETITIVO',
      title: 'GUIA DE SCOUTING: COMO MONTAR SEU TIME PARA AS FINAIS',
      description: 'Confira as métricas essenciais de KDA e Farm que os top 10 do ranking global estão utilizando.',
      image: 'https://picsum.photos/seed/news2/600/400',
      date: '10 MAR'
    },
    {
      id: 3,
      category: 'PATCH NOTES',
      title: 'MUDANÇAS NO META: O RETORNO DOS ASSASSINOS NO MEIO',
      description: 'Como as novas mudanças impactam a pontuação do seu Fantasy na rota central.',
      image: 'https://picsum.photos/seed/news3/600/400',
      date: '08 MAR'
    }
  ];

  const sidebarLeagues = [
    { name: "Américas Elite", icon: "fa-earth-americas", color: "text-blue-400" },
    { name: "Kings Cup", icon: "fa-trophy", color: "text-gold" },
    { name: "Proving Grounds", icon: "fa-bolt", color: "text-purple-400" }
  ];

  // Valor do Paitrimônio formatado (ex: 100000 -> 100.0)
  const paitrimonioValue = (userTeam.budget / 1000).toFixed(1);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
      
      {/* MEU TIME (Lateral Esquerda) */}
      <div className="lg:col-span-3 space-y-8">
        <section>
          <h2 className="text-[11px] font-black text-gray-500 uppercase tracking-[0.5em] mb-6">MEU TIME</h2>
          <div className="glass-card rounded-[32px] p-8 border border-white/5 relative overflow-hidden group">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#c89b3c]/5 blur-[60px] rounded-full group-hover:bg-[#c89b3c]/10 transition-all"></div>
            
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
                  <div className="flex justify-between text-[10px] font-black text-gray-400 tracking-widest uppercase mb-3">
                    <span>PAITRIMÔNIO</span>
                    <span className="text-[#c89b3c]">{paitrimonioValue}</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#c89b3c] transition-all duration-1000 shadow-[0_0_10px_rgba(200,155,60,0.4)]"
                      style={{ width: `${(userTeam.budget / 100000) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex justify-between items-center py-4 border-y border-white/5">
                  <span className="text-[11px] font-bold text-gray-400">PONTOS TOTAIS</span>
                  <span className="text-xl font-orbitron font-black text-white">{userTeam.totalPoints}</span>
                </div>
              </div>

              <button 
                onClick={() => onNavigate('squad')}
                className="w-full mt-10 py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black text-white uppercase tracking-[0.3em] hover:bg-[#c89b3c] hover:text-black transition-all duration-500"
              >
                EDITAR LINE-UP
              </button>
            </div>
          </div>
        </section>

        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-[11px] font-black text-gray-500 uppercase tracking-[0.5em]">LIGAS</h2>
            <button onClick={() => onNavigate('ranking')} className="text-[9px] font-black text-[#c89b3c] uppercase tracking-widest hover:underline transition-all">Ver Todas</button>
          </div>
          <div className="space-y-3">
            {sidebarLeagues.map(league => (
              <div 
                key={league.name} 
                onClick={() => onNavigate('ranking')}
                className="glass-card p-5 rounded-2xl flex items-center justify-between cursor-pointer border border-white/5 hover:border-[#c89b3c]/40 hover:bg-white/[0.02] transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:bg-[#c89b3c]/10 group-hover:border-[#c89b3c]/20 transition-all ${league.color}`}>
                    <i className={`fa-solid ${league.icon} text-sm`}></i>
                  </div>
                  <span className="text-sm font-bold text-gray-300 group-hover:text-white transition-colors">{league.name}</span>
                </div>
                <i className="fa-solid fa-chevron-right text-[10px] text-gray-700 group-hover:text-[#c89b3c] transition-transform group-hover:translate-x-1"></i>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* FEED PRINCIPAL */}
      <div className="lg:col-span-9 space-y-12">
        
        {/* BANNER HERO - KINGS LENDAS STAGE UPDATED */}
        <section className="relative h-[420px] rounded-[32px] overflow-hidden group cursor-pointer border border-[#c89b3c]/20 shadow-[0_0_60px_rgba(200,155,60,0.15)] bg-black">
          <img 
            src="https://mirs3-cdn-cf.behance.net/project_modules/max_1200/5e0e0a239268265.68f8e02b74844.png" 
            className="absolute inset-0 w-full h-full object-cover opacity-80 transition-transform duration-[4s] group-hover:scale-110" 
            alt="Kings Lendas Stage Arena" 
            onError={(e) => {
              e.currentTarget.src = "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop";
              e.currentTarget.className = "absolute inset-0 w-full h-full object-cover opacity-30 grayscale saturate-0 brightness-50";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent"></div>
          
          <div className="absolute inset-0 p-12 flex flex-col justify-end">
            <div className="max-w-2xl space-y-5">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-lg bg-[#c89b3c] text-black text-[10px] font-black tracking-[0.4em] uppercase shadow-[0_0_30px_rgba(200,155,60,0.4)]">
                <i className="fa-solid fa-crown animate-bounce"></i>
                KINGS LENDAS BROADCAST
              </div>
              <h1 className="text-7xl font-orbitron font-black text-white leading-[0.8] tracking-tighter uppercase drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)]">
                O DESPERTAR DAS <span className="text-[#c89b3c] block">LENDAS</span>
              </h1>
              <p className="text-gray-200 text-base font-medium leading-relaxed max-w-lg drop-shadow-md">
                As luzes do palco se acenderam. Sua jornada para o topo do ranking começa agora no palco oficial.
              </p>
            </div>
          </div>
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{backgroundImage: 'radial-gradient(#c89b3c 1px, transparent 1px)', backgroundSize: '40px 40px'}}></div>
          <div className="absolute inset-0 opacity-20 pointer-events-none scanline"></div>
        </section>

        {/* MEDIA HUB */}
        <section className="animate-in fade-in duration-1000">
          <div className="flex items-center gap-6 mb-8">
            <h2 className="text-[11px] font-black text-gray-500 uppercase tracking-[0.5em] whitespace-nowrap">MEDIA HUB</h2>
            <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent"></div>
          </div>
          
          <a 
            href="https://www.youtube.com/watch?v=jWYN_Z9mmrc" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block group relative aspect-video rounded-[32px] overflow-hidden border border-white/10 shadow-2xl bg-black"
          >
            <img 
              src="https://img.youtube.com/vi/jWYN_Z9mmrc/maxresdefault.jpg" 
              className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-all duration-700"
              alt="Cortes da Ilha"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-10 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-red-600/20 border border-red-600/30 text-[9px] font-black text-red-500 uppercase tracking-widest">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                  Destaque Kings Lendas
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                   <div className="relative shrink-0">
                     <img src="https://yt3.googleusercontent.com/0gsNYNH2bm_Xv8jhSkpr7yYJQqqeX5YDYmm3H3rFU7x4IKMB02vO7O2OPqa2297L9vbYxXyptw=s160-c-k-c0x00ffffff-no-rj" className="w-14 h-14 rounded-xl border-2 border-[#c89b3c] bg-[#050505] p-0.5 shadow-xl" alt="Cortes da Ilha" />
                   </div>
                   <div>
                      <p className="text-[9px] font-black text-[#c89b3c] uppercase tracking-[0.4em] mb-1">CORTES DA ILHA</p>
                      <h3 className="text-2xl md:text-3xl font-orbitron font-black text-white uppercase tracking-tight leading-none max-w-2xl">
                        O DIA QUE O ESA FEZ HISTÓRIA na KINGS LENDAS
                      </h3>
                   </div>
                </div>
              </div>
            </div>
          </a>
        </section>

        {/* JOGADORES MAIS ESCOLHIDOS */}
        <section className="animate-in fade-in duration-700">
          <div className="mb-4">
            <h2 className="text-lg font-bold text-white uppercase tracking-tight">
              JOGADORES MAIS ESCOLHIDOS - <span className="text-gray-500 font-medium">RODADA 10</span>
            </h2>
          </div>

          <div className="bg-[#121212] rounded-xl border border-white/5 overflow-hidden shadow-2xl">
            <div className="flex bg-[#1a1a1a] border-b border-white/5 overflow-x-auto no-scrollbar">
              {Object.entries(roleMetadata).map(([key, data]) => {
                const isActive = pickedFilter === key;
                return (
                  <button
                    key={key}
                    onClick={() => setPickedFilter(key as any)}
                    className={`flex-1 min-w-[110px] flex items-center justify-center gap-3 py-4 border-b-2 transition-all duration-300 ${
                      isActive 
                        ? 'border-[#c89b3c] bg-white/[0.02]' 
                        : 'border-transparent text-gray-500 hover:text-gray-300 hover:bg-white/[0.01]'
                    }`}
                  >
                    <img 
                      src={data.icon} 
                      style={iconFilterStyle(isActive)} 
                      className="w-4 h-4 object-contain transition-all duration-300" 
                      alt={data.label} 
                    />
                    <span className={`text-[10px] font-bold uppercase tracking-widest ${isActive ? 'text-[#c89b3c]' : 'text-gray-500'}`}>
                      {data.label}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="divide-y divide-white/5">
              {trending.length > 0 ? trending.map((p, i) => (
                <div 
                  key={p.id} 
                  className="flex items-center group py-4 px-6 hover:bg-white/[0.01] transition-colors cursor-pointer"
                  onClick={() => onNavigate('market')}
                >
                  <div className="w-10 text-center text-white font-orbitron font-black text-lg mr-6">
                    {i + 1}
                  </div>
                  <div className="relative w-14 h-14 shrink-0 mr-6">
                    <img src={p.image} className="w-full h-full object-cover rounded-lg border border-white/10 group-hover:border-[#c89b3c]/40 transition-colors" alt={p.name} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <img 
                        src={roleMetadata[p.role].icon} 
                        style={iconFilterStyle(false)} 
                        className="w-3.5 h-3.5 object-contain opacity-40" 
                        alt="" 
                      />
                      <h4 className="font-orbitron font-black text-[#bda06d] text-xl tracking-tight uppercase group-hover:text-[#c89b3c] transition-colors leading-none">
                        {p.name}
                      </h4>
                    </div>
                    <p className="text-gray-400 text-sm font-medium">
                      {p.choices.toLocaleString('pt-BR')} escolhas
                    </p>
                  </div>
                </div>
              )) : (
                <div className="py-16 text-center text-gray-600 font-bold uppercase tracking-widest text-xs">Nenhum dado disponível</div>
              )}
            </div>
          </div>
        </section>

        {/* ÚLTIMAS NOTÍCIAS */}
        <section className="animate-in fade-in duration-1000">
          <div className="flex items-center gap-6 mb-8">
            <h2 className="text-[11px] font-black text-gray-500 uppercase tracking-[0.5em] whitespace-nowrap">ÚLTIMAS NOTÍCIAS</h2>
            <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {newsItems.map((item) => (
              <div 
                key={item.id} 
                className="glass-card rounded-[24px] overflow-hidden group cursor-pointer border border-white/5 hover:border-[#c89b3c]/30 transition-all flex flex-col"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img src={item.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={item.title} />
                  <div className="absolute top-4 left-4 px-2 py-1 rounded bg-black/80 border border-white/10 text-[8px] font-black text-[#c89b3c] tracking-widest uppercase">
                    {item.category}
                  </div>
                </div>
                <div className="p-6 space-y-3 flex-1 flex flex-col">
                  <span className="text-[9px] font-black text-gray-600 tracking-widest uppercase">{item.date}</span>
                  <h3 className="font-orbitron font-black text-white text-base leading-tight group-hover:text-[#c89b3c] transition-colors uppercase tracking-tight">{item.title}</h3>
                  <p className="text-gray-400 text-[11px] leading-relaxed line-clamp-2">{item.description}</p>
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
