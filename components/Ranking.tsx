
import React, { useState, useRef, useEffect } from 'react';
import { MOCK_RANKING } from '../constants';

interface League {
  id: string;
  name: string;
  members: string;
  icon: string;
  color: string;
  isVerified: boolean;
}

const VerifiedSeal: React.FC<{ size?: string }> = ({ size = "text-[12px]" }) => (
  <div className={`relative flex items-center justify-center ${size} drop-shadow-[0_0_8px_rgba(200,155,60,0.6)]`}>
    <i className="fa-solid fa-certificate text-[#c89b3c]"></i>
    <i className="fa-solid fa-check absolute text-[0.55em] text-black font-black"></i>
  </div>
);

const CustomDropdown: React.FC<{
  label: string;
  options: string[];
  selected: string;
  onSelect: (val: string) => void;
  icon: string;
  showScroll?: boolean;
}> = ({ label, options, selected, onSelect, icon, showScroll }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 group px-2 py-1 transition-all"
      >
        <i className={`fa-solid ${icon} text-[10px] text-gray-600 group-hover:text-white transition-colors`}></i>
        <span className="text-[10px] font-black text-white uppercase tracking-widest">{label}</span>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-medium text-gray-500 group-hover:text-gray-300">{selected}</span>
          <i className={`fa-solid fa-chevron-down text-[8px] text-gray-600 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}></i>
        </div>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-[#121212] border border-white/5 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] z-[100] py-2 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          <div className={`max-h-60 overflow-y-auto ${showScroll ? 'pr-1' : ''} custom-scrollbar`}>
            {options.map((opt) => (
              <button
                key={opt}
                onClick={() => {
                  onSelect(opt);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-[11px] font-medium transition-all hover:bg-white/[0.03] text-left
                  ${selected === opt ? 'text-white bg-white/[0.02]' : 'text-gray-400 hover:text-white'}`}
              >
                <div className="w-4 flex items-center justify-center">
                  {selected === opt && <i className="fa-solid fa-check text-[#c89b3c] text-[9px]"></i>}
                </div>
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const Ranking: React.FC = () => {
  const [selectedLeague, setSelectedLeague] = useState<League | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [copiedInvite, setCopiedInvite] = useState(false);
  
  const [tipoFiltro, setTipoFiltro] = useState('Temporada');
  const [rodadaFiltro, setRodadaFiltro] = useState('Rodada 10');

  const [newLeagueName, setNewLeagueName] = useState('');
  const [leagueFormat, setLeagueFormat] = useState<'continuo' | 'limitado'>('continuo');
  const [leagueImage, setLeagueImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [imageError, setImageError] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const modalScrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (isCreateModalOpen) {
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '0px';
      setScrollProgress(0);
    }
  }, [isCreateModalOpen]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const progress = (target.scrollTop / (target.scrollHeight - target.clientHeight)) * 100;
    setScrollProgress(isNaN(progress) ? 0 : progress);
  };

  const myLeagues: League[] = [
    { id: 'l1', name: "Américas Global", icon: "fa-earth-americas", color: "bg-blue-500/10 text-blue-400", isVerified: true, members: "128.4k" },
    { id: 'l2', name: "Kings Cup Pro", icon: "fa-trophy", color: "bg-[#c89b3c]/10 text-[#c89b3c]", isVerified: true, members: "12.5k" },
    { id: 'l3', name: "paiN Gaming Fan", icon: "fa-shield-halved", color: "bg-red-600/10 text-red-500", isVerified: true, members: "51.2k" },
    { id: 'l4', name: "Ilha das Lendas", icon: "fa-shuttle-space", color: "bg-purple-600/10 text-purple-400", isVerified: true, members: "16.5k" },
    { id: 'l5', name: "GoaTeam Arena", icon: "fa-crown", color: "bg-cyan-600/10 text-cyan-400", isVerified: true, members: "7.1k" },
  ];

  const handleOpenModal = () => {
    setIsCreateModalOpen(true);
  };

  const handleCopyInvite = () => {
    if (!selectedLeague) return;
    const inviteLink = `${window.location.origin}/invite/${selectedLeague.id}`;
    navigator.clipboard.writeText(inviteLink);
    setCopiedInvite(true);
    setTimeout(() => setCopiedInvite(false), 2000);
  };

  const triggerClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsCreateModalOpen(false);
      setIsClosing(false);
      setNewLeagueName('');
      setLeagueFormat('continuo');
      setLeagueImage(null);
      setImageError(false);
      setSubmitStatus('idle');
      setIsSubmitting(false);
    }, 250);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setLeagueImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleCreateLeague = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leagueImage) { setImageError(true); return; }
    setIsSubmitting(true);
    setSubmitStatus('loading');
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSubmitStatus('success');
    setTimeout(() => triggerClose(), 1000);
  };

  if (selectedLeague) {
    return (
      <div className="max-w-[1200px] mx-auto space-y-10 animate-in fade-in duration-500 pb-20">
        {/* Banner Hero */}
        <div className="relative h-[240px] md:h-[320px] rounded-[48px] overflow-hidden group shadow-[0_20px_60px_rgba(0,0,0,0.6)] border border-white/5">
          <div className="absolute inset-0 bg-[#080808]">
             <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
             <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, #c89b3c 0%, transparent 70%)' }}></div>
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20 space-y-6">
            <div className={`w-28 h-28 md:w-36 md:h-36 rounded-[2.5rem] ${selectedLeague.color} flex items-center justify-center shadow-[0_0_50px_rgba(200,155,60,0.15)] border border-white/10 group-hover:scale-110 transition-transform duration-1000 ease-out`}>
              <i className={`fa-solid ${selectedLeague.icon} text-4xl md:text-5xl`}></i>
            </div>
            <div className="flex items-center gap-4">
              <h1 className="font-orbitron font-black text-3xl md:text-5xl text-white uppercase tracking-tighter drop-shadow-2xl">{selectedLeague.name}</h1>
              {selectedLeague.isVerified && <VerifiedSeal size="text-[20px] md:text-[28px]" />}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4 space-y-6">
            <div className="glass-card rounded-[32px] p-8 border border-white/5">
              <div className="flex justify-between items-start mb-6">
                <div className="space-y-1">
                   <div className="flex items-center gap-2">
                     <h3 className="font-orbitron font-black text-xl text-white uppercase tracking-tight">{selectedLeague.name}</h3>
                     {selectedLeague.isVerified && <VerifiedSeal size="text-[12px]" />}
                   </div>
                   <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.15em]">{selectedLeague.members} MEMBROS</p>
                </div>
                
                {/* Botões de Ação da Liga (Convite e Saída) */}
                <div className="flex items-center gap-2.5">
                  <button 
                    onClick={handleCopyInvite}
                    className="w-10 h-10 flex items-center justify-center bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-[#c89b3c] hover:border-[#c89b3c]/30 transition-all shadow-xl group/share"
                    title="Copiar link de convite"
                  >
                    <i className={`fa-solid ${copiedInvite ? 'fa-check text-green-500' : 'fa-share-nodes'} text-xs group-hover/share:scale-110 transition-transform`}></i>
                  </button>
                  <button className="px-4 py-2.5 bg-red-600/10 text-red-500 border border-red-500/10 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all shadow-lg">SAIR</button>
                </div>
              </div>
              
              <p className="text-[11px] text-gray-500 leading-relaxed font-medium">
                Participe da maior liga amadora de League of Legends! Dispute contra os melhores invocadores da season e mostre que você também é uma Lenda.
              </p>

              <div className="mt-8 pt-8 border-t border-white/5 space-y-6">
                 <h4 className="text-[9px] font-black text-gray-600 uppercase tracking-widest">MEU TIME</h4>
                 <div className="flex items-center justify-between p-5 bg-white/[0.02] rounded-2xl border border-white/5 group hover:border-[#c89b3c]/30 transition-all cursor-pointer">
                    <div className="flex items-center gap-4">
                       <span className="font-orbitron font-black text-lg text-[#c89b3c] w-10">1458</span>
                       <div className="w-11 h-11 rounded-xl bg-black border border-white/10 flex items-center justify-center text-[#c89b3c] shadow-lg">
                         <i className="fa-solid fa-shield-halved text-sm"></i>
                       </div>
                       <div>
                          <p className="text-[13px] font-black text-white uppercase tracking-tight leading-none mb-1 group-hover:text-[#c89b3c] transition-colors">GOATEAM</p>
                          <p className="text-[9px] font-bold text-gray-600 uppercase tracking-widest">HAKKAI</p>
                       </div>
                    </div>
                    <p className="font-orbitron font-black text-white text-base">897.58</p>
                 </div>
              </div>

              <button 
                onClick={() => setSelectedLeague(null)}
                className="w-full mt-8 py-4 bg-white/[0.01] border border-white/5 rounded-xl text-[9px] font-black text-gray-600 uppercase tracking-[0.2em] hover:text-white hover:bg-white/5 transition-all"
              >
                VOLTAR PARA LIGAS
              </button>
            </div>

            <div className="glass-card rounded-[32px] p-8 border border-white/5 space-y-6">
               <h4 className="text-[9px] font-black text-gray-600 uppercase tracking-widest">MEMBROS EM DESTAQUE</h4>
               <div className="space-y-5">
                  {[1, 2, 3, 4].map(rank => (
                    <div key={rank} className="flex items-center justify-between group cursor-pointer">
                       <div className="flex items-center gap-4">
                          <span className="w-6 text-[11px] font-orbitron font-black text-gray-700 group-hover:text-[#c89b3c]">{790 + rank}</span>
                          <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/5 overflow-hidden group-hover:border-[#c89b3c]/40 transition-all">
                             <img src={`https://picsum.photos/seed/user${rank + 10}/100`} className="w-full h-full object-cover" alt="" />
                          </div>
                          <div>
                             <p className="text-[11px] font-black text-white uppercase tracking-tighter group-hover:text-[#c89b3c] transition-colors">PLAYER PRO {rank}</p>
                             <p className="text-[8px] font-bold text-gray-600 uppercase tracking-widest">TEAM KINGS</p>
                          </div>
                       </div>
                       <p className="text-[10px] font-orbitron font-black text-gray-400 group-hover:text-white">986.77</p>
                    </div>
                  ))}
               </div>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="glass-card rounded-[32px] overflow-hidden border border-white/5 shadow-2xl">
              <div className="p-8 border-b border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
                 <h2 className="font-orbitron font-black text-xl text-white uppercase tracking-tight">RANKING</h2>
                 
                 <div className="flex items-center gap-8">
                    <CustomDropdown 
                      label="TIPO"
                      icon="fa-list-ul"
                      options={['Temporada', 'Rodada']}
                      selected={tipoFiltro}
                      onSelect={setTipoFiltro}
                    />
                    <CustomDropdown 
                      label="RODADA"
                      icon="fa-sliders"
                      options={['Rodada 10', 'Rodada 09', 'Rodada 08', 'Rodada 07', 'Rodada 06', 'Rodada 05', 'Rodada 04', 'Rodada 03', 'Rodada 02']}
                      selected={rodadaFiltro}
                      onSelect={setRodadaFiltro}
                      showScroll
                    />
                 </div>
              </div>

              <div className="divide-y divide-white/[0.03]">
                 {MOCK_RANKING.map((entry, idx) => {
                   const isUser = entry.userName === 'HAKKAI';
                   return (
                     <div key={idx} className={`flex items-center p-6 px-10 gap-10 hover:bg-white/[0.02] transition-all group cursor-pointer ${isUser ? 'bg-[#c89b3c]/[0.03]' : ''}`}>
                        <div className="w-8 text-center shrink-0">
                           <span className={`font-orbitron font-black text-base ${idx < 3 ? 'text-[#c89b3c]' : 'text-gray-700'}`}>
                             {entry.rank}
                           </span>
                        </div>
                        
                        <div className="relative w-12 h-12 shrink-0">
                           <div className="absolute inset-0 bg-gradient-to-br from-[#c89b3c]/20 to-transparent rounded-xl border border-white/5 group-hover:rotate-6 transition-transform"></div>
                           <img src={`https://picsum.photos/seed/${entry.userName}/100`} className="relative z-10 w-full h-full object-cover rounded-xl border border-white/10 shadow-xl" alt="" />
                        </div>

                        <div className="flex-1">
                           <h4 className="font-black text-white text-[15px] uppercase tracking-tighter group-hover:text-[#c89b3c] transition-colors leading-none mb-1.5">{entry.teamName}</h4>
                           <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">{entry.userName}</p>
                        </div>

                        <div className="text-right">
                           <p className="font-orbitron font-black text-white text-xl tracking-tight leading-none">{entry.points.toFixed(2)}</p>
                        </div>
                     </div>
                   );
                 })}
                 {[...Array(6)].map((_, i) => (
                   <div key={i + 10} className="flex items-center p-6 px-10 gap-10 opacity-40 hover:opacity-60 transition-all cursor-not-allowed">
                      <div className="w-8 text-center shrink-0">
                         <span className="font-orbitron font-black text-base text-gray-800">{i + 6}</span>
                      </div>
                      <div className="w-12 h-12 shrink-0 rounded-xl bg-white/5 border border-white/5"></div>
                      <div className="flex-1 space-y-2">
                         <div className="h-4 w-40 bg-white/5 rounded-md"></div>
                         <div className="h-3 w-20 bg-white/5 rounded-sm"></div>
                      </div>
                      <div className="text-right">
                         <div className="h-6 w-20 bg-white/5 rounded-md"></div>
                      </div>
                   </div>
                 ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1000px] mx-auto animate-in fade-in duration-700 space-y-8">
      
      {isCreateModalOpen && (
        <div 
          ref={modalScrollRef}
          onScroll={handleScroll}
          className={`fixed left-0 right-0 bottom-0 top-28 z-[1000] overflow-y-auto transition-all duration-300
            ${isClosing ? 'bg-black/0 backdrop-blur-0' : 'bg-black/85 backdrop-blur-xl'}`}
        >
          <div className="min-h-full flex items-start justify-center p-4 py-12 md:p-10 md:py-20 relative">
            <div className="fixed inset-0 top-28" onClick={() => !isSubmitting && triggerClose()}></div>
            <div className={`relative w-full max-w-[500px] bg-[#070707] rounded-[40px] shadow-[0_50px_150px_rgba(0,0,0,1)] transition-all duration-500 overflow-hidden
              ${isClosing ? 'opacity-0 scale-95 translate-y-12' : 'opacity-100 scale-100 translate-y-0 animate-in zoom-in-95 slide-in-from-top-20'}`}
              style={{ transitionTimingFunction: isClosing ? 'ease-in' : 'cubic-bezier(0.34, 1.56, 0.64, 1)' }}
            >
              <div 
                className="absolute inset-0 pointer-events-none transition-opacity duration-500" 
                style={{ 
                  padding: '2px', 
                  borderRadius: 'inherit',
                  background: `conic-gradient(from ${scrollProgress * 2.0}deg, transparent 0%, rgba(200, 155, 60, 0.6) 15%, rgba(200, 155, 60, 0.8) 20%, transparent 40%)`,
                  mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  maskComposite: 'exclude',
                  WebkitMaskComposite: 'xor',
                  opacity: isClosing ? 0 : 0.5,
                  filter: 'blur(1px)'
                }}
              ></div>

              <div className="p-10 md:p-14 relative z-10">
                <div className="text-center mb-12 relative">
                  <h2 className="font-orbitron font-black text-3xl md:text-4xl text-white uppercase tracking-[0.2em] leading-none mb-5">CRIAR LIGA</h2>
                  <p className="text-[10px] font-black text-gray-700 uppercase tracking-tighter opacity-40">SEASON 2026</p>
                  {!isSubmitting && (
                    <button 
                      onClick={triggerClose}
                      className="absolute -top-6 -right-6 w-12 h-12 flex items-center justify-center text-gray-700 hover:text-[#c89b3c] transition-all duration-500 hover:rotate-90 z-[70]"
                    >
                      <i className="fa-solid fa-xmark text-2xl"></i>
                    </button>
                  )}
                </div>

                <form onSubmit={handleCreateLeague} className="space-y-10">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-tighter block">
                      BRASÃO DA COMPETIÇÃO <span className="text-[#c89b3c] ml-1">*</span>
                    </label>
                    <div 
                      onClick={() => !isSubmitting && fileInputRef.current?.click()}
                      className={`relative w-full aspect-[21/9] rounded-3xl border transition-all duration-500 flex flex-col items-center justify-center cursor-pointer overflow-hidden group 
                        ${leagueImage ? 'border-[#c89b3c]/50 bg-black' : 'border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-[#c89b3c]/30'}
                        ${imageError && !leagueImage ? 'border-red-500/50 bg-red-500/[0.02]' : ''}`}
                    >
                      {leagueImage ? (
                        <img src={leagueImage} className="w-full h-full object-cover animate-in fade-in zoom-in-110 duration-700" alt="Preview" />
                      ) : (
                        <div className="text-center p-6">
                          <i className={`fa-solid fa-shield-halved text-2xl mb-3 transition-transform group-hover:scale-110 duration-500 ${imageError ? 'text-red-500' : 'text-gray-800'}`}></i>
                          <p className="text-[9px] font-black text-gray-600 uppercase tracking-tighter mb-1">CARREGAR BRASÃO</p>
                          <p className="text-[8px] font-bold text-gray-800 uppercase tracking-tighter opacity-20">PNG/JPG • MAX 500KB</p>
                        </div>
                      )}
                      <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-tighter block">
                      NOME DA LIGA <span className="text-[#c89b3c] ml-1">*</span>
                    </label>
                    <input 
                      type="text" 
                      placeholder="EX: COPA DAS LENDAS 2026"
                      value={newLeagueName}
                      onChange={(e) => setNewLeagueName(e.target.value.toUpperCase())}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-7 text-[13px] text-white font-black tracking-tighter focus:outline-none focus:border-[#c89b3c]/40 transition-all placeholder:text-gray-800"
                      required
                    />
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-tighter block">
                      SISTEMA DE PONTUAÇÃO <span className="text-[#c89b3c] ml-1">*</span>
                    </label>
                    <div className="grid grid-cols-1 gap-3">
                      <div 
                        onClick={() => !isSubmitting && setLeagueFormat('continuo')}
                        className={`cursor-pointer p-5 rounded-2xl border transition-all duration-500 flex items-start gap-4 ${leagueFormat === 'continuo' ? 'bg-[#c89b3c]/10 border-[#c89b3c]/40' : 'bg-white/[0.01] border-white/5 hover:border-white/10'}`}
                      >
                        <div className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${leagueFormat === 'continuo' ? 'border-[#c89b3c]' : 'border-gray-800'}`}>
                          {leagueFormat === 'continuo' && <div className="w-2.5 h-2.5 rounded-full bg-[#c89b3c] shadow-[0_0_8px_rgba(200,155,60,0.6)]"></div>}
                        </div>
                        <div>
                          <p className={`text-[10px] font-black uppercase tracking-tighter mb-1 ${leagueFormat === 'continuo' ? 'text-[#c89b3c]' : 'text-gray-500'}`}>TEMPORADA REGULAR</p>
                          <p className="text-[9px] font-bold text-gray-700 uppercase leading-tight tracking-tighter">Ranking contínuo durante toda a season 2026.</p>
                        </div>
                      </div>
                      <div 
                        onClick={() => !isSubmitting && setLeagueFormat('limitado')}
                        className={`cursor-pointer p-5 rounded-2xl border transition-all duration-500 flex items-start gap-4 ${leagueFormat === 'limitado' ? 'bg-[#c89b3c]/10 border-[#c89b3c]/40' : 'bg-white/[0.01] border-white/5 hover:border-white/10'}`}
                      >
                        <div className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${leagueFormat === 'limitado' ? 'border-[#c89b3c]' : 'border-gray-800'}`}>
                          {leagueFormat === 'limitado' && <div className="w-2.5 h-2.5 rounded-full bg-[#c89b3c] shadow-[0_0_8px_rgba(200,155,60,0.6)]"></div>}
                        </div>
                        <div>
                          <p className={`text-[10px] font-black uppercase tracking-tighter mb-1 ${leagueFormat === 'limitado' ? 'text-[#c89b3c]' : 'text-gray-500'}`}>EVENTO DE TIRO CURTO</p>
                          <p className="text-[9px] font-bold text-gray-700 uppercase leading-tight tracking-tighter">Disputa rápida por rodada única ou final de semana.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-8 flex flex-col items-center">
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full py-4 rounded-2xl font-orbitron font-black text-sm tracking-[0.2em] uppercase transition-all duration-500 shadow-2xl relative overflow-hidden group/btn ${
                        submitStatus === 'success' ? 'bg-green-600 text-white' : 'bg-[#c89b3c] text-black hover:brightness-110 active:scale-[0.98]'
                      }`}
                    >
                      <span className="relative z-10">{submitStatus === 'loading' ? 'ENVIANDO...' : submitStatus === 'success' ? 'SUCESSO' : 'ENVIAR SOLICITAÇÃO'}</span>
                    </button>
                    <p className="text-[9px] font-black text-gray-500 uppercase tracking-[0.15em] mt-8 text-center leading-relaxed max-w-[320px] opacity-60">
                      Sua solicitação será analisada manualmente pela equipe técnica da Kings Lendas.
                    </p>
                    <button type="button" onClick={triggerClose} className="mt-14 mb-2 text-[12px] font-black text-gray-600 uppercase tracking-tighter hover:text-white transition-all">CANCELAR</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
        <div className="text-center sm:text-left">
          <h2 className="text-[10px] font-black text-[#c89b3c] uppercase tracking-wider mb-2 animate-in slide-in-from-left duration-700">MODO COMPETITIVO</h2>
          <h1 className="text-4xl md:text-5xl font-orbitron font-black text-white uppercase tracking-tighter leading-none animate-in slide-in-from-left duration-700 delay-100">
            MINHAS <span className="text-[#c89b3c]">LIGAS</span>
          </h1>
        </div>
        <button 
          onClick={handleOpenModal}
          className="group flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black text-white uppercase tracking-[0.1em] hover:bg-[#c89b3c] hover:text-black transition-all duration-500 shadow-2xl hover:shadow-[#c89b3c]/30 relative z-10"
        >
          <i className="fa-solid fa-plus text-[11px] group-hover:rotate-180 transition-transform duration-700"></i>
          CRIAR LIGA
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {myLeagues.map((league, idx) => (
          <div 
            key={league.id} 
            onClick={() => setSelectedLeague(league)} 
            className="group glass-card hover-shine rounded-[28px] p-5 flex flex-col sm:flex-row items-center justify-between border border-white/5 hover:border-[#c89b3c]/50 hover:bg-white/[0.04] transition-all duration-500 cursor-pointer relative overflow-hidden animate-in slide-in-from-bottom-8"
            style={{ animationDelay: `${idx * 60}ms`, animationFillMode: 'backwards' }}
          >
            <div className="flex items-center gap-6 relative z-20">
              <div className={`w-14 h-14 rounded-2xl ${league.color} flex items-center justify-center shadow-2xl transition-all duration-700 border border-transparent group-hover:border-[#c89b3c]/30 group-hover:scale-110 group-hover:rotate-3`}>
                <i className={`fa-solid ${league.icon} text-xl`}></i>
              </div>
              <div className="text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-3 mb-1">
                  <h3 className="font-orbitron font-black text-xl text-white group-hover:text-[#c89b3c] transition-colors uppercase tracking-tighter">{league.name}</h3>
                  {league.isVerified && <VerifiedSeal />}
                </div>
                <div className="flex items-center justify-center sm:justify-start gap-2.5 text-[11px] font-bold uppercase text-gray-500 group-hover:text-gray-300 transition-colors tracking-widest">
                  <i className="fa-solid fa-users text-[9px]"></i>
                  {league.members} MEMBROS
                </div>
              </div>
            </div>
            <div className="flex items-center gap-10 mt-5 sm:mt-0 relative z-20 sm:border-l border-white/10 sm:pl-10">
               <div className="text-right hidden md:block opacity-30 group-hover:opacity-100 transition-all duration-500">
                  <p className="text-[9px] font-black text-gray-700 uppercase tracking-widest mb-1">PONTOS LÍDER</p>
                  <p className="text-lg font-orbitron font-black text-white">1,250.5</p>
               </div>
               <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-500 group-hover:bg-white/10 group-hover:border-[#c89b3c]/60 group-hover:shadow-[0_0_20px_rgba(200,155,60,0.2)] relative z-20">
                  <i className="fa-solid fa-arrow-right-long text-sm text-gray-500 group-hover:text-white transition-all"></i>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ranking;
