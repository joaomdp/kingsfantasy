
import React, { useState } from 'react';
import { UserTeam } from '../types';

interface ProfileProps {
  userTeam: UserTeam;
  onUpdate: (data: Partial<UserTeam>) => void;
}

const Profile: React.FC<ProfileProps> = ({ userTeam, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: userTeam.name,
    userName: userTeam.userName,
    avatar: userTeam.avatar
  });

  const [isSaving, setIsSaving] = useState(false);

  const avatars = [
    "https://picsum.photos/seed/user/200",
    "https://picsum.photos/seed/riot1/200",
    "https://picsum.photos/seed/riot2/200",
    "https://picsum.photos/seed/riot3/200",
    "https://picsum.photos/seed/riot4/200",
  ];

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      onUpdate(formData);
      setIsSaving(false);
      alert("Perfil atualizado com sucesso!");
    }, 800);
  };

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="flex items-center gap-6 mb-12">
        <h1 className="text-4xl font-orbitron font-black text-white uppercase tracking-tighter">Configurações de Invocador</h1>
        <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Lado Esquerdo: Preview */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-card rounded-[40px] p-8 border border-white/5 relative overflow-hidden group shadow-[0_0_50px_rgba(0,0,0,0.5)]">
            <div className="absolute inset-0 bg-gradient-to-b from-[#c89b3c]/5 to-transparent pointer-events-none"></div>
            
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="relative w-40 h-40 mb-6">
                <div className="absolute inset-0 rounded-full border-4 border-[#c89b3c] border-t-transparent animate-spin duration-[3s]"></div>
                <img 
                  src={formData.avatar} 
                  className="w-full h-full object-cover rounded-full border-4 border-black p-1" 
                  alt="Avatar" 
                />
                <div className="absolute -bottom-2 right-0 bg-[#c89b3c] text-black w-10 h-10 rounded-xl flex items-center justify-center shadow-2xl">
                  <i className="fa-solid fa-camera text-xs"></i>
                </div>
              </div>

              <h2 className="text-2xl font-orbitron font-black text-white uppercase tracking-tight mb-1">{formData.name}</h2>
              <p className="text-[10px] font-black text-[#c89b3c] uppercase tracking-[0.4em] mb-8">{formData.userName}</p>

              <div className="grid grid-cols-2 gap-4 w-full">
                <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4">
                  <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest mb-1">RANKING</p>
                  <p className="text-sm font-orbitron font-bold text-white">#1.242</p>
                </div>
                <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4">
                  <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest mb-1">ELO</p>
                  <p className="text-sm font-orbitron font-bold text-[#0ac8b9]">PLATINA I</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lado Direito: Editor */}
        <div className="lg:col-span-7 space-y-8">
          <div className="glass-card rounded-[40px] p-10 border border-white/5 space-y-10">
            
            {/* Campos de Texto */}
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">NOME DO TIME</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white font-bold focus:outline-none focus:border-[#c89b3c]/50 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">NOME DE INVOCADOR</label>
                <input 
                  type="text" 
                  value={formData.userName}
                  onChange={(e) => setFormData({...formData, userName: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white font-bold focus:outline-none focus:border-[#c89b3c]/50 transition-all"
                />
              </div>
            </div>

            {/* Seleção de Avatar */}
            <div className="space-y-4">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">ESCOLHER AVATAR</label>
              <div className="flex flex-wrap gap-4">
                {avatars.map((url, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setFormData({...formData, avatar: url})}
                    className={`w-16 h-16 rounded-2xl overflow-hidden border-2 transition-all ${formData.avatar === url ? 'border-[#c89b3c] scale-110 shadow-[0_0_20px_rgba(200,155,60,0.3)]' : 'border-white/10 grayscale opacity-50 hover:grayscale-0 hover:opacity-100'}`}
                  >
                    <img src={url} className="w-full h-full object-cover" alt="" />
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={handleSave}
              disabled={isSaving}
              className="w-full py-5 bg-[#c89b3c] text-black font-black text-[11px] rounded-2xl tracking-[0.3em] uppercase hover:scale-[1.02] active:scale-[0.98] transition-all shadow-2xl shadow-[#c89b3c]/20 disabled:opacity-50"
            >
              {isSaving ? 'SALVANDO PROTOCOLO...' : 'CONFIRMAR ALTERAÇÕES'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
