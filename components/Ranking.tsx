
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

const Ranking: React.FC = () => {
  const [selectedLeague, setSelectedLeague] = useState<League | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [newLeagueName, setNewLeagueName] = useState('');
  const [leagueFormat, setLeagueFormat] = useState<'continuo' | 'limitado'>('continuo');
  const [leagueImage, setLeagueImage] = useState<string | null>(null);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [error, setError] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Trava o scroll do body mas mantém a largura para evitar "pulo" da tela
  useEffect(() => {
    if (isCreateModalOpen) {
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '0px';
    }
    return () => { 
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '0px';
    };
  }, [isCreateModalOpen]);

  const myLeagues: League[] = [
    { id: 'l1', name: "Américas Global", icon: "fa-earth-americas", color: "bg-blue-500/10 text-blue-400", isVerified: true, members: "128.4k" },
    { id: 'l2', name: "Kings Cup Pro", icon: "fa-trophy", color: "bg-[#c89b3c]/10 text-[#c89b3c]", isVerified: true, members: "12.5k" },
    { id: 'l3', name: "paiN Gaming Fan", icon: "fa-shield-halved", color: "bg-red-600/10 text-red-500", isVerified: true, members: "51.2k" },
    { id: 'l4', name: "Ilha das Lendas", icon: "fa-shuttle-space", color: "bg-purple-600/10 text-purple-400", isVerified: true, members: "16.5k" },
    { id: 'l5', name: "GoaTeam Arena", icon: "fa-crown", color: "bg-cyan-600/10 text-cyan-400", isVerified: false, members: "7.1k" },
  ];

  const handleOpenModal = () => {
    setIsCreateModalOpen(true);
    setIsClosing(false);
  };

  const triggerClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsCreateModalOpen(false);
      setIsClosing(false);
      setNewLeagueName('');
      setLeagueFormat('continuo');
      setLeagueImage(null);
      setError(null);
      setImageError(false);
      setSubmitStatus('idle');
      setIsSubmitting(false);
    }, 250);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 512000) {
      setError('Imagem muito pesada! Max 500KB.');
      setImageError(true);
      return;
    }
    setError(null);
    setImageError(false);
    const reader = new FileReader();
    reader.onloadend = () => setLeagueImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleCreateLeague = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newLeagueName.trim().length < 3) {
      setError('Nome muito curto.');
      return;
    }
    if (!leagueImage) {
      setError('Brasão obrigatório.');
      setImageError(true);
      return;
    }
    setIsSubmitting(true);
    setSubmitStatus('loading');
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSubmitStatus('success');
    setTimeout(() => triggerClose(), 1000);
  };

  if (selectedLeague) {
    return (
      <div className="max-w-[1000px] mx-auto space-y-6 animate-in fade-in duration-500">
        <button 
          onClick={() => setSelectedLeague(null)}
          className="flex items-center gap-2.5 text-gray-600 hover:text-[#c89b3c] transition-all font-black text-[9px] uppercase tracking-[0.08em] group"
        >
          <div className="w-7 h-7 rounded-full border border-white/5 flex items-center justify-center group-hover:bg-[#c89b3c]/5 group-hover:border-[#c89b3c]/30">
            <i className="fa-solid fa-arrow-left text-[8px] transition-transform group-hover:-translate-x-0.5"></i>
          </div>
          VOLTAR
        </button>

        <div className="glass-card rounded-[28px] p-6 flex flex-col md:flex-row items-center justify-between gap-5 border border-white/5 relative overflow-hidden">
          <div className="flex items-center gap-5 relative z-20">
            <div className={`w-14 h-14 rounded-xl ${selectedLeague.color} border border-white/5 flex items-center justify-center shadow-xl`}>
              <i className={`fa-solid ${selectedLeague.icon} text-xl`}></i>
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-xl md:text-2xl font-orbitron font-black text-white uppercase tracking-tight">{selectedLeague.name}</h1>
                {selectedLeague.isVerified && (
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#c89b3c]/10 border border-[#c89b3c]/20">
                    <i className="fa-solid fa-circle-check text-[#c89b3c] text-[10px]"></i>
                    <span className="text-[8px] font-black text-[#c89b3c] uppercase tracking-tighter">OFICIAL</span>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2 mt-1 text-gray-500 text-[10px] font-black uppercase tracking-[0.08em]">
                 <i className="fa-solid fa-users text-[8px]"></i>
                 {selectedLeague.members} MEMBROS
              </div>
            </div>
          </div>
          <div className="flex gap-2 relative z-20">
            <button className="px-5 py-2.5 bg-[#c89b3c] text-black rounded-lg text-[9px] font-black uppercase tracking-widest hover:brightness-110 transition-all shadow-lg shadow-[#c89b3c]/10">
              CONVIDAR
            </button>
          </div>
        </div>

        <div className="space-y-1.5">
           {MOCK_RANKING.map((entry, idx) => {
             const isTop3 = entry.rank <= 3;
             const isUser = entry.userName === 'HAKKAI';
             return (
               <div key={entry.rank} className={`glass-card rounded-xl p-3 flex items-center gap-5 border transition-all hover:bg-white/[0.04] group hover-shine relative overflow-hidden ${isTop3 ? 'border-[#c89b3c]/10' : 'border-white/5'} ${isUser ? 'bg-[#c89b3c]/[0.03] border-[#c89b3c]/30' : ''}`} style={{ animationDelay: `${idx * 40}ms` }}>
                 <div className="w-8 text-center relative z-20">
                    <span className={`font-orbitron font-black text-sm ${isTop3 ? 'text-[#c89b3c]' : 'text-gray-700'}`}>
                      {entry.rank.toString().padStart(2, '0')}
                    </span>
                 </div>
                 <div className="relative w-10 h-10 shrink-0 z-20">
                    <img src={`https://picsum.photos/seed/${entry.userName}/100`} className="w-full h-full object-cover rounded-lg border border-white/5 group-hover:border-[#c89b3c]/30 transition-colors" alt="" />
                 </div>
                 <div className="flex-1 relative z-20">
                    <h4 className="font-orbitron font-black text-white text-sm tracking-tight uppercase group-hover:text-[#c89b3c] transition-colors leading-none">{entry.userName}</h4>
                    <p className="text-[8px] font-bold text-gray-600 uppercase tracking-widest mt-1">{entry.teamName}</p>
                 </div>
                 <div className="text-right min-w-[80px] relative z-20">
                    <span className="text-[8px] font-black text-gray-700 uppercase tracking-widest block">PONTOS</span>
                    <span className="text-lg font-orbitron font-black text-white leading-none">{entry.points.toFixed(1)}</span>
                 </div>
               </div>
             );
           })}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1000px] mx-auto animate-in fade-in duration-700 space-y-8">
      
      {/* Modal de Criação - Ajustado para Navbar top-28 */}
      {isCreateModalOpen && (
        <div 
          className={`fixed left-0 right-0 bottom-0 top-28 z-[1000] overflow-y-auto transition-all duration-300
            ${isClosing ? 'bg-black/0 backdrop-blur-0' : 'bg-black/85 backdrop-blur-xl'}`}
        >
          {/* Container que inicia abaixo da navbar e permite scroll interno */}
          <div className="min-h-full flex items-start justify-center p-4 py-8 md:p-10 md:py-16">
            
            {/* Overlay de clique para fechar (somente na área de fundo) */}
            <div className="fixed inset-0 top-28" onClick={() => !isSubmitting && triggerClose()}></div>
            
            {/* Corpo do Modal */}
            <div className={`relative w-full max-w-[480px] bg-[#0c0c0c] border border-white/10 rounded-[40px] shadow-[0_50px_150px_rgba(0,0,0,1)] overflow-hidden transition-all duration-500
              ${isClosing 
                ? 'opacity-0 scale-95 translate-y-12' 
                : 'opacity-100 scale-100 translate-y-0 animate-in zoom-in-95 slide-in-from-top-20'
              }`}
              style={{ transitionTimingFunction: isClosing ? 'ease-in' : 'cubic-bezier(0.34, 1.56, 0.64, 1)' }}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#c89b3c] to-transparent"></div>
              
              <div className="p-10 md:p-14">
                <div className="text-center mb-10 relative">
                  <h2 className="font-orbitron font-black text-2xl text-white uppercase tracking-[0.35em] leading-none mb-4">CRIAR LIGA</h2>
                  <p className="text-[10px] font-black text-gray-600 uppercase tracking-[0.45em]">SEASON 2026</p>
                  
                  {!isSubmitting && (
                    <button 
                      onClick={triggerClose}
                      className="absolute -top-6 -right-6 w-12 h-12 flex items-center justify-center text-gray-700 hover:text-[#c89b3c] transition-all duration-500 hover:rotate-90"
                    >
                      <i className="fa-solid fa-xmark text-2xl"></i>
                    </button>
                  )}
                </div>

                <form onSubmit={handleCreateLeague} className="space-y-8">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block">BRASÃO DA COMPETIÇÃO <span className="text-[#c89b3c]">*</span></label>
                    <div 
                      onClick={() => !isSubmitting && fileInputRef.current?.click()}
                      className={`relative w-full aspect-[21/9] rounded-3xl border-2 border-dashed transition-all duration-500 flex flex-col items-center justify-center cursor-pointer overflow-hidden group 
                        ${leagueImage ? 'border-[#c89b3c]/50 bg-black' : 'border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-[#c89b3c]/40'}
                        ${imageError && !leagueImage ? 'border-red-500/50 bg-red-500/[0.02]' : ''}`}
                    >
                      {leagueImage ? (
                        <img src={leagueImage} className="w-full h-full object-cover animate-in fade-in zoom-in-110 duration-700" alt="Preview" />
                      ) : (
                        <div className="text-center p-6">
                          <i className={`fa-solid fa-shield-halved text-2xl mb-3 transition-transform group-hover:scale-110 duration-500 ${imageError ? 'text-red-500' : 'text-gray-700'}`}></i>
                          <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">CLIQUE PARA ENVIAR</p>
                          <p className="text-[8px] font-bold text-gray-800 uppercase tracking-widest">LIMITE: 500KB</p>
                        </div>
                      )}
                      <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block">NOME DA LIGA <span className="text-[#c89b3c]">*</span></label>
                    <input 
                      type="text" 
                      placeholder="EX: ARENA KINGS 2026"
                      value={newLeagueName}
                      onChange={(e) => setNewLeagueName(e.target.value.toUpperCase())}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-5 px-7 text-xs text-white font-black tracking-[0.2em] focus:outline-none focus:border-[#c89b3c]/50 transition-all placeholder:text-gray-800"
                      required
                    />
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block">SISTEMA DE PONTUAÇÃO</label>
                    <div className="grid grid-cols-1 gap-4">
                      <div 
                        onClick={() => !isSubmitting && setLeagueFormat('continuo')}
                        className={`cursor-pointer p-5 rounded-2xl border transition-all duration-500 flex items-start gap-4 ${leagueFormat === 'continuo' ? 'bg-[#c89b3c]/10 border-[#c89b3c]/40 shadow-[0_0_20px_rgba(200,155,60,0.05)]' : 'bg-white/[0.01] border-white/5 hover:border-white/10'}`}
                      >
                        <div className={`mt-1 w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${leagueFormat === 'continuo' ? 'border-[#c89b3c]' : 'border-gray-800'}`}>
                          {leagueFormat === 'continuo' && <div className="w-1.5 h-1.5 rounded-full bg-[#c89b3c]"></div>}
                        </div>
                        <div>
                          <p className={`text-[10px] font-black uppercase tracking-widest mb-1.5 ${leagueFormat === 'continuo' ? 'text-[#c89b3c]' : 'text-gray-400'}`}>CONTÍNUO</p>
                          <p className="text-[9px] font-bold text-gray-600 uppercase leading-relaxed tracking-wider">Acumule pontos durante toda a temporada global.</p>
                        </div>
                      </div>
                      
                      <div 
                        onClick={() => !isSubmitting && setLeagueFormat('limitado')}
                        className={`cursor-pointer p-5 rounded-2xl border transition-all duration-500 flex items-start gap-4 ${leagueFormat === 'limitado' ? 'bg-[#c89b3c]/10 border-[#c89b3c]/40 shadow-[0_0_20px_rgba(200,155,60,0.05)]' : 'bg-white/[0.01] border-white/5 hover:border-white/10'}`}
                      >
                        <div className={`mt-1 w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${leagueFormat === 'limitado' ? 'border-[#c89b3c]' : 'border-gray-800'}`}>
                          {leagueFormat === 'limitado' && <div className="w-1.5 h-1.5 rounded-full bg-[#c89b3c]"></div>}
                        </div>
                        <div>
                          <p className={`text-[10px] font-black uppercase tracking-widest mb-1.5 ${leagueFormat === 'limitado' ? 'text-[#c89b3c]' : 'text-gray-400'}`}>TIRO CURTO</p>
                          <p className="text-[9px] font-bold text-gray-600 uppercase leading-relaxed tracking-wider">Disputa rápida por rodadas ou eventos de final de semana.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-8 flex flex-col items-center">
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full py-6 rounded-2xl font-orbitron font-black text-[12px] tracking-[0.4em] uppercase transition-all duration-500 shadow-2xl overflow-hidden relative group/btn ${
                        submitStatus === 'success' 
                          ? 'bg-green-600 text-white shadow-green-500/20' 
                          : 'bg-[#c89b3c] text-black hover:brightness-110 active:scale-[0.98]'
                      }`}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-3">
                        {submitStatus === 'loading' ? 'SOLICITANDO...' : submitStatus === 'success' ? 'SOLICITAÇÃO ENVIADA' : 'ENVIAR'}
                      </span>
                      <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700 pointer-events-none"></div>
                    </button>
                    
                    <p className="text-[8px] font-bold text-gray-700 uppercase tracking-[0.2em] mt-6 text-center leading-loose max-w-[300px]">
                      Seu pedido passará por análise da administração Kings Lendas.
                    </p>

                    <button 
                      type="button" 
                      onClick={triggerClose} 
                      className="mt-16 mb-4 text-[11px] font-black text-gray-600 uppercase tracking-[0.4em] hover:text-white transition-all duration-300 hover:tracking-[0.5em] active:scale-90"
                    >
                      CANCELAR
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header das Ligas */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
        <div className="text-center sm:text-left">
          <h2 className="text-[10px] font-black text-[#c89b3c] uppercase tracking-[0.2em] mb-2 animate-in slide-in-from-left duration-700">MODO COMPETITIVO</h2>
          <h1 className="text-4xl md:text-5xl font-orbitron font-black text-white uppercase tracking-tighter leading-none animate-in slide-in-from-left duration-700 delay-100">
            MINHAS <span className="text-[#c89b3c]">LIGAS</span>
          </h1>
        </div>
        
        <button 
          onClick={handleOpenModal}
          className="group flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black text-white uppercase tracking-[0.12em] hover:bg-[#c89b3c] hover:text-black transition-all duration-500 shadow-2xl hover:shadow-[#c89b3c]/30 relative z-10 active:scale-90 active:bg-white/20 overflow-hidden outline-none"
        >
          <div className="absolute inset-0 bg-white opacity-0 group-active:opacity-10 transition-opacity duration-100 pointer-events-none"></div>
          <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 pointer-events-none"></div>
          <i className="fa-solid fa-plus text-[11px] group-hover:rotate-180 transition-transform duration-700 ease-out"></i>
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
                  <h3 className="font-orbitron font-black text-xl text-white group-hover:text-[#c89b3c] transition-colors uppercase tracking-tight">{league.name}</h3>
                  {league.isVerified && <i className="fa-solid fa-circle-check text-[#c89b3c] text-[12px] drop-shadow-[0_0_8px_rgba(200,155,60,0.6)]"></i>}
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
                  <i className="fa-solid fa-arrow-right-long text-sm text-gray-500 group-hover:text-white transition-all group-hover:translate-x-1"></i>
               </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 glass-card rounded-[32px] p-8 text-center border-dashed border-white/10 group relative overflow-hidden hover-shine animate-in fade-in duration-1000">
        <div className="relative z-20 max-w-md mx-auto flex flex-col items-center gap-4">
          <p className="text-gray-600 text-[11px] font-black uppercase tracking-[0.1em] leading-tight">Quer competir em arenas globais?</p>
          <button className="px-8 py-3 bg-[#c89b3c]/5 text-[#c89b3c] border border-[#c89b3c]/20 rounded-xl text-[9px] font-black uppercase tracking-[0.15em] hover:bg-[#c89b3c] hover:text-black transition-all active:scale-95 shadow-lg">EXPLORAR LIGAS PÚBLICAS</button>
        </div>
      </div>
    </div>
  );
};

export default Ranking;
