
import React, { useState, useMemo } from 'react';
import { Champion, Role } from '../types';
import { CHAMPIONS_LIST, CHAMPION_ROLES_MAP } from '../constants';

interface ChampionSelectorProps {
  playerName: string;
  onSelect: (champ: Champion) => void;
  onClose: () => void;
}

const ChampionSelector: React.FC<ChampionSelectorProps> = ({ playerName, onSelect, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<Role | 'ALL'>('ALL');
  const [isConfirming, setIsConfirming] = useState(false);
  const [confirmingChamp, setConfirmingChamp] = useState<Champion | null>(null);

  const roleFilters = [
    { id: 'ALL', label: 'TODOS', icon: 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-fill.png' },
    { id: Role.TOP, label: 'TOPO', icon: 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-top.png' },
    { id: Role.JNG, label: 'CAÇADOR', icon: 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-jungle.png' },
    { id: Role.MID, label: 'MEIO', icon: 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-middle.png' },
    { id: Role.ADC, label: 'ATIRADOR', icon: 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-bottom.png' },
    { id: Role.SUP, label: 'SUPORTE', icon: 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-utility.png' },
  ];

  const filteredChampions = useMemo(() => {
    return CHAMPIONS_LIST
      .filter(id => {
        const displayName = id === 'MonkeyKing' ? 'Wukong' : id;
        const matchesSearch = displayName.toLowerCase().includes(searchTerm.toLowerCase()) || id.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = selectedRole === 'ALL' || (CHAMPION_ROLES_MAP[id] && CHAMPION_ROLES_MAP[id].includes(selectedRole as Role));
        return matchesSearch && matchesRole;
      })
      .map(id => ({
        id,
        name: id === 'MonkeyKing' ? 'Wukong' : id,
        image: `https://ddragon.leagueoflegends.com/cdn/15.1.1/img/champion/${id}.png`
      }));
  }, [searchTerm, selectedRole]);

  const handleSelect = (champ: Champion) => {
    setIsConfirming(true);
    setConfirmingChamp(champ);
    setTimeout(() => onSelect(champ), 150);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10 animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={() => !isConfirming && onClose()}></div>
      <div className="relative w-full max-w-5xl bg-[#0B0411] rounded-[40px] border border-white/10 overflow-hidden shadow-[0_0_100px_rgba(0,0,0,1)] flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-500">
        {isConfirming && (
          <div className="absolute inset-0 z-[300] bg-black/80 backdrop-blur-2xl flex flex-col items-center justify-center animate-in fade-in duration-300">
             {confirmingChamp && (
               <div className="relative w-40 h-40 rounded-full border-4 border-[#5E6CFF] overflow-hidden shadow-[0_0_50px_rgba(94,108,255,0.6)]">
                  <img src={confirmingChamp.image} className="w-full h-full object-cover" alt="" />
               </div>
             )}
             <h3 className="font-orbitron font-black text-white text-2xl uppercase tracking-[0.3em] mt-8 animate-pulse">SINCRO</h3>
          </div>
        )}
        <div className="p-10 border-b border-white/5 bg-gradient-to-r from-[#5E6CFF]/10 to-transparent shrink-0">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-10">
            <div>
              <h2 className="font-orbitron font-black text-3xl text-white uppercase tracking-tight mb-2">ESCOLHER CAMPEÃO</h2>
              <span className="text-[10px] font-black text-[#5E6CFF] uppercase tracking-widest">DEFININDO PARA: {playerName}</span>
            </div>
            <div className="relative w-full md:w-96">
              <i className="fa-solid fa-magnifying-glass absolute left-6 top-1/2 -translate-y-1/2 text-gray-600 text-sm"></i>
              <input type="text" placeholder="BUSCAR CAMPEÃO..." className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-8 text-[11px] font-black text-white uppercase placeholder:text-gray-700 focus:outline-none focus:border-[#5E6CFF]/40 transition-all shadow-inner" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            {roleFilters.map((filter) => (
              <button key={filter.id} onClick={() => setSelectedRole(filter.id as any)} className={`flex items-center gap-3 px-6 py-3 rounded-xl border transition-all ${selectedRole === filter.id ? 'bg-[#5E6CFF] border-[#5E6CFF] text-black shadow-[0_0_20px_rgba(94,108,255,0.4)]' : 'bg-white/5 border-white/5 text-gray-500 hover:text-white'}`}>
                <img src={filter.icon} className={`w-4 h-4 ${selectedRole === filter.id ? 'brightness-0' : 'brightness-50'}`} alt="" />
                <span className="text-[9px] font-black uppercase tracking-widest">{filter.label}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-10 custom-scrollbar bg-black/30">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-8">
            {filteredChampions.map((champ) => (
              <button key={champ.id} onClick={() => !isConfirming && handleSelect(champ)} className="group flex flex-col items-center gap-4 transition-all active:scale-95">
                <div className="relative w-full aspect-square rounded-3xl overflow-hidden border-2 border-white/5 group-hover:border-[#5E6CFF] transition-all duration-500 shadow-xl">
                  <img src={champ.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-115" alt={champ.name} />
                </div>
                <span className="text-[10px] font-black text-gray-600 group-hover:text-white uppercase tracking-widest transition-colors">{champ.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChampionSelector;
