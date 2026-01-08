
import React, { useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { UserTeam } from '../types';
import { CHAMPIONS_LIST } from '../constants';

interface ProfileProps {
  userTeam: UserTeam;
  onUpdate: (data: Partial<UserTeam>) => void;
  onLogout: () => void;
}

const Profile: React.FC<ProfileProps> = ({ userTeam, onUpdate, onLogout }) => {
  const [isChangingAvatar, setIsChangingAvatar] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isEditTeamModalOpen, setIsEditTeamModalOpen] = useState(false);
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const [champSearch, setChampSearch] = useState('');
  const [tempTeamName, setTempTeamName] = useState(userTeam.name);
  const [currentLang, setCurrentLang] = useState<'PT' | 'EN'>('PT');
  const [formData, setFormData] = useState({
    name: userTeam.name,
    userName: userTeam.userName,
    avatar: userTeam.avatar,
  });

  const handleSaveAvatar = (url: string) => {
    setFormData(prev => ({ ...prev, avatar: url }));
    onUpdate({ avatar: url });
    setIsChangingAvatar(false);
    setChampSearch('');
  };

  const handleSaveTeamName = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    const lowerName = tempTeamName.toLowerCase().trim();
    if (!lowerName) return;

    const existingTeams = ["t1", "loud", "paiN", "furia", "fluxo", "red canids", "kabum", "intz", "los grandes", "itafantasy"];
    
    if (existingTeams.includes(lowerName) && lowerName !== userTeam.name.toLowerCase()) {
      alert("ERRO DE IDENTIDADE: Este nome de time já foi reivindicado na Ilha das Lendas!");
      return;
    }

    setFormData(prev => ({ ...prev, name: tempTeamName }));
    onUpdate({ name: tempTeamName });
    setIsEditTeamModalOpen(false);
  };

  const filteredChampions = useMemo(() => {
    return CHAMPIONS_LIST
      .filter(id => {
        const displayName = id === 'MonkeyKing' ? 'Wukong' : id;
        return displayName.toLowerCase().includes(champSearch.toLowerCase()) || id.toLowerCase().includes(champSearch.toLowerCase());
      })
      .map(id => ({
        id,
        name: id === 'MonkeyKing' ? 'Wukong' : id,
        url: `https://ddragon.leagueoflegends.com/cdn/14.21.1/img/champion/${id}.png`
      }));
  }, [champSearch]);

  const SettingItem = ({ icon, label, value, onClick, color = "text-gray-400", delay = "0" }: { icon: string, label: string, value?: string, onClick?: () => void, color?: string, delay?: string }) => (
    <div 
      onClick={onClick}
      className={`flex items-center justify-between p-8 hover:bg-white/[0.04] transition-all duration-500 cursor-pointer group border-b border-white/5 last:border-0 animate-in fade-in slide-in-from-right-10 fill-mode-both`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center gap-6">
        <div className={`w-14 h-14 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-center ${color} group-hover:bg-white/10 group-hover:text-white group-hover:scale-110 transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]`}>
          <i className={`fa-solid ${icon} text-xl transition-transform duration-500 group-hover:rotate-12`}></i>
        </div>
        <div>
          <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em] block mb-1.5 group-hover:text-[#5E6CFF] transition-colors">{label}</span>
          <span className="text-[15px] font-black text-white uppercase tracking-tight group-hover:translate-x-1 transition-transform inline-block">{value}</span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full flex items-center justify-center group-hover:bg-[#5E6CFF]/20 transition-all duration-500">
          <i className="fa-solid fa-chevron-right text-[12px] text-gray-700 group-hover:text-[#5E6CFF] group-hover:translate-x-1 transition-all"></i>
        </div>
      </div>
    </div>
  );

  const ModalBackdrop = ({ children, onClose }: { children?: React.ReactNode, onClose: () => void }) => createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-6 bg-black/70 backdrop-blur-[40px] animate-in fade-in duration-700">
      <div className="absolute inset-0" onClick={onClose}></div>
      <div className="relative w-full flex items-center justify-center animate-in zoom-in-95 slide-in-from-bottom-12 duration-700 cubic-bezier(0.16, 1, 0.3, 1)">
        {children}
      </div>
    </div>,
    document.body
  );

  return (
    <div className="max-w-3xl mx-auto pb-32 overflow-visible">
      
      {/* MODAL: LOGOUT */}
      {isLogoutModalOpen && (
        <ModalBackdrop onClose={() => setIsLogoutModalOpen(false)}>
          <div className="bg-[#0B0411] border border-white/10 rounded-[48px] w-full max-w-sm p-12 space-y-10 shadow-[0_0_150px_rgba(0,0,0,1)] text-center">
            <div className="relative w-28 h-28 mx-auto">
              <div className="absolute inset-0 bg-red-500/20 blur-[40px] animate-pulse rounded-full"></div>
              <div className="relative z-10 w-full h-full bg-red-500/10 rounded-[2.5rem] flex items-center justify-center text-red-500 border border-red-500/20">
                <i className="fa-solid fa-power-off text-5xl"></i>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-orbitron font-black text-3xl text-white uppercase tracking-tighter">ENCERRAR SESSÃO?</h3>
              <p className="text-[11px] font-bold text-gray-500 uppercase tracking-[0.2em] leading-relaxed">VOCÊ SERÁ DESCONECTADO DA ILHA DAS LENDAS.</p>
            </div>
            <div className="flex flex-col gap-4">
              <button onClick={onLogout} className="w-full py-6 bg-red-500 text-white rounded-[20px] text-[11px] font-black uppercase tracking-[0.4em] hover:bg-red-600 transition-all shadow-[0_15px_40px_rgba(239,68,68,0.3)] active:scale-95">SAIR AGORA</button>
              <button onClick={() => setIsLogoutModalOpen(false)} className="w-full py-6 bg-white/5 border border-white/10 text-gray-400 rounded-[20px] text-[11px] font-black uppercase tracking-[0.4em] hover:text-white hover:bg-white/10 transition-all">CANCELAR</button>
            </div>
          </div>
        </ModalBackdrop>
      )}

      {/* MODAL: EDIT TEAM */}
      {isEditTeamModalOpen && (
        <ModalBackdrop onClose={() => setIsEditTeamModalOpen(false)}>
          <form onSubmit={handleSaveTeamName} className="bg-[#0B0411] border border-white/10 rounded-[48px] w-full max-w-md p-12 space-y-10 shadow-[0_0_150px_rgba(0,0,0,1)] text-center">
            <div className="relative w-28 h-28 mx-auto">
              <div className="absolute inset-0 bg-[#5E6CFF]/20 blur-[40px] animate-pulse rounded-full"></div>
              <div className="relative z-10 w-full h-full bg-[#5E6CFF]/10 rounded-[2.5rem] flex items-center justify-center text-[#5E6CFF] border border-[#5E6CFF]/20">
                <i className="fa-solid fa-shield-halved text-5xl"></i>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-orbitron font-black text-3xl text-white uppercase tracking-tighter">ALTERAR NOME</h3>
              <p className="text-[11px] font-bold text-gray-500 uppercase tracking-[0.2em] leading-relaxed">ESCOLHA UMA NOVA IDENTIDADE PARA SUA EQUIPE.</p>
            </div>
            <input 
              type="text" 
              value={tempTeamName}
              onChange={(e) => setTempTeamName(e.target.value.toUpperCase())}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-6 px-8 text-[14px] font-black text-white uppercase text-center focus:outline-none focus:border-[#5E6CFF]/60 transition-all shadow-inner"
              autoFocus
            />
            <div className="flex flex-col gap-4">
              <button type="submit" className="w-full py-6 bg-[#5E6CFF] text-black rounded-[20px] text-[11px] font-black uppercase tracking-[0.4em] hover:scale-[1.02] transition-all shadow-[0_15px_40px_rgba(94,108,255,0.3)]">SALVAR NOME</button>
              <button type="button" onClick={() => setIsEditTeamModalOpen(false)} className="w-full py-6 bg-white/5 border border-white/10 text-gray-400 rounded-[20px] text-[11px] font-black uppercase tracking-[0.4em] hover:text-white hover:bg-white/10 transition-all">CANCELAR</button>
            </div>
          </form>
        </ModalBackdrop>
      )}

      {/* MODAL: LANGUAGE */}
      {isLanguageModalOpen && (
        <ModalBackdrop onClose={() => setIsLanguageModalOpen(false)}>
          <div className="bg-[#0B0411] border border-white/10 rounded-[48px] w-full max-w-sm p-12 space-y-10 shadow-[0_0_150px_rgba(0,0,0,1)] text-center">
            <div className="relative w-28 h-28 mx-auto">
              <div className="absolute inset-0 bg-emerald-500/20 blur-[40px] animate-pulse rounded-full"></div>
              <div className="relative z-10 w-full h-full bg-emerald-500/10 rounded-[2.5rem] flex items-center justify-center text-emerald-500 border border-emerald-500/20">
                <i className="fa-solid fa-language text-5xl"></i>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-orbitron font-black text-3xl text-white uppercase tracking-tighter">SISTEMA</h3>
              <p className="text-[11px] font-bold text-gray-500 uppercase tracking-[0.2em] leading-relaxed">SELECIONE O IDIOMA DE PREFERÊNCIA.</p>
            </div>
            <div className="flex flex-col gap-4">
              <button onClick={() => { setCurrentLang('PT'); setIsLanguageModalOpen(false); }} className={`w-full py-6 rounded-[20px] text-[11px] font-black uppercase tracking-[0.4em] transition-all flex items-center justify-center gap-4 ${currentLang === 'PT' ? 'bg-[#5E6CFF] text-black shadow-[0_0_30px_rgba(94,108,255,0.4)]' : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10'}`}>
                <img src="https://flagcdn.com/w40/br.png" className="w-5 h-auto rounded-sm" alt="BR" /> PORTUGUÊS (BR)
              </button>
              <button onClick={() => { setCurrentLang('EN'); setIsLanguageModalOpen(false); }} className={`w-full py-6 rounded-[20px] text-[11px] font-black uppercase tracking-[0.4em] transition-all flex items-center justify-center gap-4 ${currentLang === 'EN' ? 'bg-[#5E6CFF] text-black shadow-[0_0_30px_rgba(94,108,255,0.4)]' : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10'}`}>
                <img src="https://flagcdn.com/w40/us.png" className="w-5 h-auto rounded-sm" alt="US" /> ENGLISH (US)
              </button>
            </div>
          </div>
        </ModalBackdrop>
      )}

      {/* MODAL: AVATAR SELECTOR */}
      {isChangingAvatar && (
        <ModalBackdrop onClose={() => setIsChangingAvatar(false)}>
          <div className="bg-[#0B0411] border border-white/10 rounded-[56px] w-full max-w-2xl overflow-hidden shadow-[0_0_150px_rgba(0,0,0,1)] flex flex-col max-h-[85vh]">
            <div className="p-10 border-b border-white/5 shrink-0 bg-gradient-to-r from-[#5E6CFF]/10 to-transparent flex items-center justify-between">
              <div>
                <h3 className="font-orbitron font-black text-2xl text-white uppercase tracking-tighter">ESCOLHER LENDA</h3>
                <p className="text-[10px] font-black text-[#5E6CFF] uppercase tracking-[0.3em] mt-2">DEFINA SEU AVATAR DE PERFIL</p>
              </div>
              <button onClick={() => setIsChangingAvatar(false)} className="w-14 h-14 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-gray-500 hover:text-white transition-all group">
                <i className="fa-solid fa-xmark text-xl group-hover:rotate-90 transition-transform"></i>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-10 custom-scrollbar bg-black/40">
              <div className="space-y-10">
                <div className="relative group">
                  <i className="fa-solid fa-magnifying-glass absolute left-6 top-1/2 -translate-y-1/2 text-gray-700 text-sm group-focus-within:text-[#5E6CFF] transition-colors"></i>
                  <input type="text" placeholder="BUSCAR CAMPEÃO..." className="w-full bg-white/5 border border-white/10 rounded-2xl py-6 pl-16 pr-8 text-[12px] font-black text-white uppercase focus:outline-none focus:border-[#5E6CFF]/60 transition-all shadow-inner" value={champSearch} onChange={(e) => setChampSearch(e.target.value)} autoFocus />
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-5 gap-8">
                  {filteredChampions.map(champ => (
                    <button key={champ.id} onClick={() => handleSaveAvatar(champ.url)} className={`group relative aspect-square rounded-[2rem] overflow-hidden border-2 transition-all active:scale-95 ${formData.avatar === champ.url ? 'border-[#5E6CFF] shadow-[0_0_40px_rgba(94,108,255,0.4)] scale-110 z-10' : 'border-white/5 hover:border-white/20'}`}>
                      <img src={champ.url} className={`w-full h-full object-cover transition-all duration-700 ${formData.avatar === champ.url ? 'grayscale-0' : 'grayscale-[0.6] group-hover:grayscale-0 group-hover:scale-115'}`} alt={champ.name} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 flex items-end justify-center p-4 transition-opacity">
                         <span className="text-[10px] font-black text-white uppercase tracking-tighter truncate w-full text-center">{champ.name}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ModalBackdrop>
      )}

      {/* PAGE CONTENT */}
      <div className="space-y-24">
        
        {/* AVATAR HEADER */}
        <div className="relative py-16 px-4 text-center animate-in fade-in zoom-in-90 duration-1000 ease-out">
           <div className="relative inline-block group mb-12" onClick={() => setIsChangingAvatar(true)}>
             {/* Efeitos de Glow Aprimorados */}
             <div className="absolute inset-[-40px] bg-[#5E6CFF]/15 blur-[100px] rounded-full animate-[pulse_6s_infinite] opacity-50"></div>
             <div className="absolute inset-[-20px] bg-gradient-to-tr from-[#5E6CFF]/30 to-purple-600/30 blur-[60px] rounded-full animate-[spin_15s_linear_infinite] opacity-40"></div>
             
             <div className="relative w-52 h-52 rounded-[4rem] bg-black border-[6px] border-[#5E6CFF]/30 overflow-hidden cursor-pointer group-hover:border-[#5E6CFF] transition-all duration-700 shadow-[0_50px_100px_rgba(0,0,0,0.9)]">
                <img src={formData.avatar} className="w-full h-full object-cover p-2 scale-105 group-hover:scale-125 transition-transform duration-[1200ms] cubic-bezier(0.16, 1, 0.3, 1)" alt="Avatar" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-500 backdrop-blur-[3px]">
                   <i className="fa-solid fa-camera-retro text-white text-4xl group-hover:scale-110 transition-transform duration-500"></i>
                </div>
             </div>
             
             {/* Badge de edição com micro-animação */}
             <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-[#5E6CFF] rounded-3xl border-[8px] border-[#0B0411] flex items-center justify-center text-black text-2xl shadow-[0_15px_40px_rgba(94,108,255,0.5)] group-hover:scale-115 group-hover:rotate-12 transition-all duration-700">
               <i className="fa-solid fa-pen-nib"></i>
             </div>
           </div>
           
           <div className="space-y-5 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-200 fill-mode-both">
             <h1 className="text-6xl font-orbitron font-black text-white uppercase tracking-tighter drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]">{formData.userName}</h1>
             <div className="flex items-center justify-center gap-4">
               <div className="h-[2px] w-12 bg-gradient-to-r from-transparent to-[#5E6CFF]/40 rounded-full"></div>
               <p className="text-[13px] font-black text-[#5E6CFF] uppercase tracking-[0.6em] drop-shadow-[0_0_10px_rgba(94,108,255,0.4)]">PERFIL VERIFICADO</p>
               <div className="h-[2px] w-12 bg-gradient-to-l from-transparent to-[#5E6CFF]/40 rounded-full"></div>
             </div>
           </div>
        </div>

        {/* SETTINGS LIST */}
        <section className="space-y-12">
          <div className="flex items-center gap-10 px-8 animate-in fade-in slide-in-from-left-20 duration-1000 delay-500 fill-mode-both">
            <h2 className="text-[12px] font-black text-gray-600 uppercase tracking-[0.8em] whitespace-nowrap">PREFERÊNCIAS DO SISTEMA</h2>
            <div className="h-px flex-1 bg-gradient-to-r from-white/10 via-white/5 to-transparent"></div>
          </div>
          
          <div className="glass-card rounded-[56px] overflow-hidden border border-white/5 shadow-[0_60px_150px_rgba(0,0,0,0.7)]">
            <SettingItem 
              icon="fa-user-lock" 
              label="SEGURANÇA DA CONTA" 
              value={`${formData.userName.toUpperCase()} (VERIFICADO)`} 
              onClick={() => setIsLogoutModalOpen(true)} 
              color="text-red-500/80"
              delay="600"
            />
            
            <SettingItem 
              icon="fa-shield-halved" 
              label="IDENTIDADE DA EQUIPE" 
              value={formData.name} 
              onClick={() => {
                setTempTeamName(formData.name);
                setIsEditTeamModalOpen(true);
              }} 
              color="text-[#5E6CFF]"
              delay="800"
            />

            <SettingItem 
              icon="fa-language" 
              label="LOCALIZAÇÃO E LÍNGUA" 
              value={currentLang === 'PT' ? "PORTUGUÊS (BRASIL)" : "ENGLISH (USA)"} 
              onClick={() => setIsLanguageModalOpen(true)} 
              color="text-emerald-400"
              delay="1000"
            />
          </div>
        </section>

        {/* FOOTER DECORATION - LI1 REMOVIDO */}
        <div className="text-center pt-24 pb-12 animate-in fade-in duration-1000 delay-1200 fill-mode-both">
           <div className="relative inline-block px-12 group">
              <div className="absolute inset-0 bg-[#5E6CFF]/5 blur-[50px] rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
              <div className="relative">
                <div className="w-20 h-[3px] bg-gradient-to-r from-transparent via-[#5E6CFF] to-transparent mx-auto mb-10 rounded-full group-hover:w-40 transition-all duration-1000 ease-out"></div>
                <p className="text-[10px] font-black text-gray-800 uppercase tracking-[1em] opacity-40 group-hover:opacity-80 transition-opacity duration-700">PROTOCOLO NEXUS</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
