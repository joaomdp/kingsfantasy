
import React, { useState } from 'react';
import { UserTeam } from '../types';

interface ProfileProps {
  userTeam: UserTeam;
  onUpdate: (data: Partial<UserTeam>) => void;
  onLogout: () => void;
}

const Profile: React.FC<ProfileProps> = ({ userTeam, onUpdate, onLogout }) => {
  const [formData, setFormData] = useState({
    name: userTeam.name,
    userName: userTeam.userName,
    avatar: userTeam.avatar,
    language: 'pt-BR',
    marketNotifications: userTeam.preferences?.marketNotifications ?? true
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      onUpdate({
        name: formData.name,
        userName: formData.userName,
        avatar: formData.avatar,
        preferences: {
          ...userTeam.preferences!,
          marketNotifications: formData.marketNotifications
        }
      });
      setIsSaving(false);
      alert("Nexus atualizado! Suas configurações foram salvas.");
    }, 600);
  };

  const handleAvatarChange = () => {
    const newUrl = prompt("URL da nova imagem de perfil:", formData.avatar);
    if (newUrl) setFormData({ ...formData, avatar: newUrl });
  };

  return (
    <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 pb-32 px-4 md:px-0">
      
      {/* PROFILE HEADER / BANNER */}
      <div className="relative h-64 md:h-80 w-full rounded-[40px] overflow-hidden border border-white/5 shadow-2xl mb-16">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[#0a0a0a]">
           <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
           <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-transparent"></div>
           <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#c89b3c]/10 to-transparent"></div>
        </div>

        {/* Floating Actions on Header */}
        <div className="absolute top-8 right-8 z-30">
           <button 
             onClick={onLogout}
             className="px-6 py-2.5 bg-black/60 backdrop-blur-md border border-red-500/30 text-red-500 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all active:scale-95"
           >
             <i className="fa-solid fa-power-off mr-2"></i>
             Sair da Conta
           </button>
        </div>

        {/* PROFILE INFO OVERLAY - REPOSICIONADO PARA MELHOR ALINHAMENTO */}
        <div className="absolute bottom-8 left-8 right-8 flex flex-col md:flex-row items-center md:items-end gap-6 z-20 text-center md:text-left">
          <div className="relative group">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl border-4 border-[#020202] bg-black p-1 shadow-2xl overflow-hidden">
               <img src={formData.avatar} className="w-full h-full object-cover rounded-2xl" alt="Avatar" />
            </div>
            <button 
              onClick={handleAvatarChange}
              className="absolute -bottom-2 -right-2 w-10 h-10 bg-[#c89b3c] text-black rounded-xl flex items-center justify-center border-4 border-[#020202] hover:scale-110 transition-transform shadow-lg"
              title="Editar Foto"
            >
              <i className="fa-solid fa-camera text-sm"></i>
            </button>
          </div>
          
          <div className="mb-2">
            <h1 className="text-4xl md:text-6xl font-orbitron font-black text-white uppercase tracking-tighter leading-none mb-3 drop-shadow-lg">
              {formData.name}
            </h1>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
              <span className="text-[11px] font-black text-gold uppercase tracking-[0.2em]">{formData.userName}</span>
              <div className="hidden md:block h-4 w-px bg-white/20"></div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">PATENTE: {userTeam.rank}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: STATS & INFO */}
        <div className="lg:col-span-4 space-y-6">
           <div className="glass-card rounded-[32px] p-8 border border-white/5 space-y-8 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
               <i className="fa-solid fa-shield-halved text-6xl text-white"></i>
             </div>
             
             <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">RESUMO DO PERFIL</h3>
             
             <div className="space-y-6">
                <div className="flex justify-between items-center py-4 border-b border-white/5">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">MEMBRO DESDE</span>
                  <span className="text-xs font-bold text-white">JAN 2026</span>
                </div>
                <div className="flex justify-between items-center py-4 border-b border-white/5">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">CONQUISTAS</span>
                  <span className="text-xs font-bold text-gold">ELITE ALPHA</span>
                </div>
                <div className="flex justify-between items-center py-4">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">STATUS NEXUS</span>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full shadow-[0_0_8px_#22c55e]"></div>
                    <span className="text-[10px] font-black text-green-500 uppercase">ONLINE</span>
                  </div>
                </div>
             </div>
           </div>

           <div className="p-6 bg-gold/5 border border-gold/10 rounded-2xl flex items-center gap-4 group">
              <i className="fa-solid fa-circle-info text-gold text-lg"></i>
              <p className="text-[10px] font-medium text-gold/80 leading-relaxed uppercase tracking-tighter">
                O NOME DO SEU TIME É EXIBIDO PUBLICAMENTE EM TODAS AS LIGAS QUE VOCÊ PARTICIPA.
              </p>
           </div>
        </div>

        {/* RIGHT COLUMN: FORM & SETTINGS */}
        <div className="lg:col-span-8 space-y-8">
           <div className="glass-card rounded-[32px] p-8 md:p-12 border border-white/5 space-y-12 shadow-xl">
              
              {/* SECTION: IDENTIDADE */}
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <div className="w-1.5 h-6 bg-gold rounded-full shadow-[0_0_10px_rgba(200,155,60,0.5)]"></div>
                  <h2 className="text-xs font-black text-white uppercase tracking-[0.4em]">IDENTIDADE COMPETITIVA</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[9px] font-black text-gray-600 uppercase tracking-widest">NOME DO TIME</label>
                    <div className="relative group">
                      <i className="fa-solid fa-shield absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-gold transition-colors"></i>
                      <input 
                        type="text" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-5 pl-14 pr-7 text-white font-bold focus:outline-none focus:border-gold/40 transition-all focus:bg-white/[0.05]"
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[9px] font-black text-gray-600 uppercase tracking-widest">INVOCADOR (NICKNAME)</label>
                    <div className="relative group">
                      <i className="fa-solid fa-user absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-gold transition-colors"></i>
                      <input 
                        type="text" 
                        value={formData.userName}
                        onChange={(e) => setFormData({...formData, userName: e.target.value})}
                        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-5 pl-14 pr-7 text-white font-bold focus:outline-none focus:border-gold/40 transition-all focus:bg-white/[0.05]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION: PREFERÊNCIAS */}
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <div className="w-1.5 h-6 bg-white/20 rounded-full"></div>
                  <h2 className="text-xs font-black text-white uppercase tracking-[0.4em]">PREFERÊNCIAS DO SISTEMA</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[9px] font-black text-gray-600 uppercase tracking-widest">IDIOMA PRINCIPAL</label>
                    <div className="relative">
                      <select 
                        value={formData.language}
                        onChange={(e) => setFormData({...formData, language: e.target.value})}
                        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-5 px-7 text-white font-bold focus:outline-none focus:border-gold/40 transition-all appearance-none cursor-pointer"
                      >
                        <option value="pt-BR" className="bg-[#121212]">PORTUGUÊS (BRASIL)</option>
                        <option value="en-US" className="bg-[#121212]">ENGLISH (UNITED STATES)</option>
                      </select>
                      <i className="fa-solid fa-chevron-down absolute right-6 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none"></i>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-6 bg-white/[0.01] border border-white/5 rounded-2xl group hover:border-white/10 transition-all cursor-pointer" onClick={() => setFormData({...formData, marketNotifications: !formData.marketNotifications})}>
                    <div className="space-y-1">
                      <span className="text-[10px] font-black text-white uppercase tracking-widest block">ALERTAS DE MERCADO</span>
                      <span className="text-[8px] font-bold text-gray-600 uppercase">NOTIFICAÇÕES VIA NEXUS</span>
                    </div>
                    <button 
                      className={`w-14 h-7 rounded-full relative transition-all duration-300 pointer-events-none ${formData.marketNotifications ? 'bg-gold shadow-[0_0_15px_rgba(200,155,60,0.4)]' : 'bg-white/10'}`}
                    >
                      <div className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-all duration-300 ${formData.marketNotifications ? 'left-8' : 'left-1'}`}></div>
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button 
                  onClick={handleSave}
                  disabled={isSaving}
                  className="w-full py-6 bg-gold text-black font-black text-xs rounded-2xl uppercase tracking-[0.2em] hover:scale-[1.01] transition-all disabled:opacity-50 shadow-2xl active:scale-95 flex items-center justify-center gap-3 group"
                >
                  <i className={`fa-solid ${isSaving ? 'fa-circle-notch animate-spin' : 'fa-check group-hover:scale-125 transition-transform'}`}></i>
                  {isSaving ? 'PROCESSANDO...' : 'ATUALIZAR CONFIGURAÇÕES'}
                </button>
              </div>

           </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;
