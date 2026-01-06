import React, { useState } from 'react';
import { UserTeam } from '../types';
import { DataService } from '../services/api';

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

  const avatarUrl = formData.avatar.startsWith('http') 
    ? formData.avatar 
    : DataService.getStorageUrl('avatars', formData.avatar);

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
    const newPath = prompt("Insira o nome do arquivo no storage (ex: user-123.png) ou uma URL externa:", formData.avatar);
    if (newPath) setFormData({ ...formData, avatar: newPath });
  };

  return (
    <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 pb-32 px-4 md:px-0">
      
      {/* PROFILE HEADER / BANNER */}
      <div className="relative h-64 md:h-80 w-full rounded-[40px] overflow-hidden border border-white/5 shadow-2xl mb-16">
        <div className="absolute inset-0 bg-[#0a0a0a]">
           <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
           <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-transparent"></div>
           <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#bc13fe]/10 to-transparent"></div>
        </div>

        <div className="absolute top-8 right-8 z-30">
           <button 
             onClick={onLogout}
             className="px-6 py-2.5 bg-black/60 backdrop-blur-md border border-red-500/30 text-red-500 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all active:scale-95"
           >
             <i className="fa-solid fa-power-off mr-2"></i>
             Sair da Conta
           </button>
        </div>

        <div className="absolute bottom-8 left-8 right-8 flex flex-col md:flex-row items-center md:items-end gap-6 z-20 text-center md:text-left">
          <div className="relative group">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl border-4 border-[#020202] bg-black p-1 shadow-2xl overflow-hidden">
               <img src={avatarUrl} className="w-full h-full object-cover rounded-2xl" alt="Avatar" />
            </div>
            <button 
              onClick={handleAvatarChange}
              className="absolute -bottom-2 -right-2 w-10 h-10 bg-[#bc13fe] text-black rounded-xl flex items-center justify-center border-4 border-[#020202] hover:scale-110 transition-transform shadow-lg"
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
              <span className="text-[11px] font-black text-[#bc13fe] uppercase tracking-[0.2em]">{formData.userName}</span>
              <div className="hidden md:block h-4 w-px bg-white/20"></div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">PATENTE: {userTeam.rank}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
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
                  <span className="text-xs font-bold text-[#bc13fe]">ELITE ALPHA</span>
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
        </div>

        <div className="lg:col-span-8 space-y-8">
           <div className="glass-card rounded-[32px] p-8 md:p-12 border border-white/5 space-y-12 shadow-xl">
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <div className="w-1.5 h-6 bg-[#bc13fe] rounded-full shadow-[0_0_10px_rgba(188,19,254,0.5)]"></div>
                  <h2 className="text-xs font-black text-white uppercase tracking-[0.4em]">IDENTIDADE COMPETITIVA</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[9px] font-black text-gray-600 uppercase tracking-widest">NOME DO TIME</label>
                    <input 
                      type="text" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-5 px-7 text-white font-bold focus:outline-none focus:border-[#bc13fe]/40 transition-all"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[9px] font-black text-gray-600 uppercase tracking-widest">INVOCADOR (NICKNAME)</label>
                    <input 
                      type="text" 
                      value={formData.userName}
                      onChange={(e) => setFormData({...formData, userName: e.target.value})}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-5 px-7 text-white font-bold focus:outline-none focus:border-[#bc13fe]/40 transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <div className="w-1.5 h-6 bg-white/20 rounded-full"></div>
                  <h2 className="text-xs font-black text-white uppercase tracking-[0.4em]">PREFERÊNCIAS</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[9px] font-black text-gray-600 uppercase tracking-widest">IDIOMA PRINCIPAL</label>
                    <select 
                      value={formData.language}
                      onChange={(e) => setFormData({...formData, language: e.target.value})}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-5 px-7 text-white font-bold focus:outline-none focus:border-[#bc13fe]/40 transition-all appearance-none cursor-pointer"
                    >
                      <option value="pt-BR" className="bg-[#121212]">PORTUGUÊS (BRASIL)</option>
                      <option value="en-US" className="bg-[#121212]">ENGLISH (UNITED STATES)</option>
                    </select>
                  </div>
                </div>
              </div>

              <button 
                onClick={handleSave}
                disabled={isSaving}
                className="w-full py-6 bg-[#bc13fe] text-black font-black text-xs rounded-2xl uppercase tracking-[0.2em] hover:scale-[1.01] transition-all disabled:opacity-50 shadow-2xl active:scale-95 flex items-center justify-center gap-3 group"
              >
                <i className={`fa-solid ${isSaving ? 'fa-circle-notch animate-spin' : 'fa-check'}`}></i>
                {isSaving ? 'PROCESSANDO...' : 'ATUALIZAR CONFIGURAÇÕES'}
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;