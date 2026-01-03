
import React, { useState, useMemo } from 'react';
import { Champion, Role } from '../types';

interface ChampionSelectorProps {
  playerName: string;
  onSelect: (champion: Champion) => void;
  onClose: () => void;
}

// Lista estática dos principais campeões
const CHAMPIONS_LIST = [
  "Aatrox", "Ahri", "Akali", "Akshan", "Alistar", "Amumu", "Anivia", "Annie", "Aphelios", "Ashe", "AurelionSol", "Azir", "Bard", "Belveth", "Blitzcrank", "Brand", "Braum", "Briar", "Caitlyn", "Camille", "Cassiopeia", "Chogath", "Corki", "Darius", "Diana", "DrMundo", "Draven", "Ekko", "Elise", "Evelynn", "Ezreal", "Fiddlesticks", "Fiora", "Fizz", "Galio", "Gangplank", "Garen", "Gnar", "Gragas", "Graves", "Gwen", "Hecarim", "Heimerdinger", "Hwei", "Illaoi", "Irelia", "Ivern", "Janna", "JarvanIV", "Jax", "Jayce", "Jhin", "Jinx", "Kaisa", "Kalista", "Karma", "Karthus", "Kassadin", "Katarina", "Kayle", "Kayn", "Kennen", "Khazix", "Kindred", "Kled", "KogMaw", "Leblanc", "LeeSin", "Leona", "Lillia", "Lissandra", "Lucian", "Lulu", "Lux", "Malphite", "Malzahar", "Maokai", "MasterYi", "Milio", "MissFortune", "Mordekaiser", "Morgana", "Naafiri", "Nami", "Nasus", "Nautilus", "Neeko", "Nidalee", "Nilah", "Nocturne", "Nunu", "Olaf", "Orianna", "Ornn", "Pantheon", "Poppy", "Pyke", "Qiyana", "Quinn", "Rakan", "Rammus", "RekSai", "Rell", "Renata", "Renekton", "Rengar", "Riven", "Rumble", "Ryze", "Samira", "Sejuani", "Senna", "Seraphine", "Sett", "Shaco", "Shen", "Shyvana", "Singed", "Sion", "Sivir", "Skarner", "Smolder", "Sona", "Soraka", "Swain", "Sylas", "Syndra", "TahmKench", "Taliyah", "Talon", "Taric", "Teemo", "Thresh", "Tristana", "Trundle", "Tryndamere", "TwistedFate", "Twitch", "Udyr", "Urgot", "Varus", "Vayne", "Veigar", "Velkoz", "Vex", "Vi", "Viego", "Viktor", "Vladimir", "Volibear", "Warwick", "Wukong", "Xayah", "Xerath", "XinZhao", "Yasuo", "Yone", "Yorick", "Yuumi", "Zac", "Zed", "Zeri", "Ziggs", "Zilean", "Zoe", "Zyra"
];

// Mapeamento simplificado de rotas para filtragem (Principais campeões de cada rota)
const CHAMPION_ROLES: Record<string, string[]> = {
  [Role.TOP]: ["Aatrox", "Camille", "Darius", "Fiora", "Garen", "Gnar", "Gwen", "Illaoi", "Irelia", "Jax", "Kayle", "Kled", "Malphite", "Mordekaiser", "Nasus", "Olaf", "Ornn", "Pantheon", "Poppy", "Quinn", "Renekton", "Riven", "Rumble", "Sett", "Shen", "Singed", "Sion", "Teemo", "Tryndamere", "Urgot", "Volibear", "Yorick"],
  [Role.JNG]: ["Amumu", "Belveth", "Briar", "Diana", "DrMundo", "Ekko", "Elise", "Evelynn", "Fiddlesticks", "Gragas", "Graves", "Hecarim", "Ivern", "JarvanIV", "Karthus", "Kayn", "Khazix", "Kindred", "LeeSin", "Lillia", "MasterYi", "Nidalee", "Nocturne", "Nunu", "Rammus", "RekSai", "Rengar", "Sejuani", "Shaco", "Shyvana", "Skarner", "Trundle", "Udyr", "Vi", "Viego", "Warwick", "Wukong", "Zac"],
  [Role.MID]: ["Ahri", "Akali", "Akshan", "Anivia", "Annie", "AurelionSol", "Azir", "Cassiopeia", "Corki", "Fizz", "Galio", "Heimerdinger", "Hwei", "Kassadin", "Katarina", "Leblanc", "Lissandra", "Lux", "Malzahar", "Naafiri", "Neeko", "Orianna", "Ryze", "Swain", "Sylas", "Syndra", "Taliyah", "Talon", "TwistedFate", "Veigar", "Velkoz", "Vex", "Viktor", "Vladimir", "Xerath", "Yasuo", "Yone", "Zed", "Zigis", "Zoe"],
  [Role.ADC]: ["Aphelios", "Ashe", "Caitlyn", "Draven", "Ezreal", "Jhin", "Jinx", "Kaisa", "Kalista", "KogMaw", "Lucian", "MissFortune", "Nilah", "Samira", "Sivir", "Smolder", "Tristana", "Twitch", "Varus", "Vayne", "Xayah", "Zeri"],
  [Role.SUP]: ["Alistar", "Bard", "Blitzcrank", "Brand", "Braum", "Janna", "Karma", "Leona", "Lulu", "Milio", "Morgana", "Nami", "Nautilus", "Pyke", "Rakan", "Rell", "Renata", "Senna", "Seraphine", "Sona", "Soraka", "TahmKench", "Taric", "Thresh", "Yuumi", "Zilean", "Zyra"]
};

const ChampionSelector: React.FC<ChampionSelectorProps> = ({ playerName, onSelect, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<Role | 'ALL'>('ALL');

  const roleFilters = [
    { id: 'ALL', label: 'TODOS', icon: 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-fill.png' },
    { id: Role.TOP, label: 'TOPO', icon: 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-top.png' },
    { id: Role.JNG, label: 'CAÇADOR', icon: 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-jungle.png' },
    { id: Role.MID, label: 'MEIO', icon: 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-middle.png' },
    { id: Role.ADC, label: 'ATIRADOR', icon: 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-bottom.png' },
    { id: Role.SUP, label: 'SUPORTE', icon: 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-utility.png' },
  ];

  const filteredChampions = useMemo(() => {
    return CHAMPIONS_LIST.filter(name => {
      const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = selectedRole === 'ALL' || (CHAMPION_ROLES[selectedRole] || []).includes(name);
      return matchesSearch && matchesRole;
    }).map(name => ({
      name,
      image: `https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/${name}.png`
    }));
  }, [searchTerm, selectedRole]);

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10 animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={onClose}></div>
      
      <div className="relative w-full max-w-5xl bg-[#070707] rounded-[40px] border border-white/10 overflow-hidden shadow-[0_0_100px_rgba(0,0,0,1)] flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-500">
        
        {/* HEADER AREA */}
        <div className="p-10 border-b border-white/5 bg-gradient-to-r from-[#c89b3c]/10 to-transparent shrink-0">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-10">
            <div>
              <h2 className="font-orbitron font-black text-3xl text-white uppercase tracking-tight mb-2">ESCOLHER CAMPEÃO</h2>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">DEFININDO PARA:</span>
                <span className="text-[10px] font-black text-[#c89b3c] uppercase tracking-widest">{playerName}</span>
              </div>
            </div>
            
            <div className="relative w-full md:w-96">
              <i className="fa-solid fa-magnifying-glass absolute left-6 top-1/2 -translate-y-1/2 text-gray-600 text-sm"></i>
              <input 
                type="text" 
                placeholder="BUSCAR CAMPEÃO..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-8 text-[11px] font-black text-white uppercase placeholder:text-gray-700 focus:outline-none focus:border-[#c89b3c]/40 transition-all shadow-inner"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus
              />
            </div>
          </div>

          {/* ROLE FILTERS */}
          <div className="flex flex-wrap gap-3">
            {roleFilters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedRole(filter.id as any)}
                className={`flex items-center gap-3 px-6 py-3 rounded-xl border transition-all relative overflow-hidden group ${
                  selectedRole === filter.id 
                    ? 'bg-[#c89b3c] border-[#c89b3c] text-black shadow-[0_0_20px_rgba(200,155,60,0.3)]' 
                    : 'bg-white/5 border-white/5 text-gray-500 hover:text-white hover:border-white/10'
                }`}
              >
                <img 
                  src={filter.icon} 
                  className={`w-4 h-4 transition-all ${selectedRole === filter.id ? 'brightness-0' : 'brightness-50 group-hover:brightness-100 group-hover:opacity-100'}`} 
                  alt="" 
                />
                <span className="text-[9px] font-black uppercase tracking-widest">{filter.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* CHAMPIONS GRID */}
        <div className="flex-1 overflow-y-auto p-10 custom-scrollbar bg-[#050505]/50">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-8">
            {filteredChampions.map((champ) => (
              <button 
                key={champ.name}
                onClick={() => onSelect(champ)}
                className="group flex flex-col items-center gap-4 transition-all active:scale-95"
              >
                <div className="relative w-full aspect-square rounded-3xl overflow-hidden border-2 border-white/5 group-hover:border-[#c89b3c] transition-all duration-500 shadow-xl">
                  <img 
                    src={champ.image} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-115" 
                    alt={champ.name} 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-3">
                     <span className="text-[8px] font-black text-white uppercase tracking-tighter">SELECIONAR</span>
                  </div>
                </div>
                <span className="text-[10px] font-black text-gray-600 group-hover:text-white uppercase tracking-widest transition-colors text-center truncate w-full">
                  {champ.name}
                </span>
              </button>
            ))}
          </div>
          
          {filteredChampions.length === 0 && (
            <div className="flex flex-col items-center justify-center py-32 text-center space-y-6">
              <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center border border-white/5">
                <i className="fa-solid fa-ghost text-2xl text-gray-700"></i>
              </div>
              <div>
                <p className="text-[12px] font-black text-white uppercase tracking-widest mb-2">Nenhum campeão encontrado</p>
                <p className="text-[10px] font-medium text-gray-600 uppercase tracking-tight">Tente ajustar sua busca ou filtro de rota</p>
              </div>
              <button 
                onClick={() => { setSearchTerm(''); setSelectedRole('ALL'); }}
                className="text-[10px] font-black text-[#c89b3c] uppercase tracking-widest hover:underline"
              >
                Limpar Filtros
              </button>
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="p-8 border-t border-white/5 bg-black/40 flex justify-between items-center shrink-0">
          <p className="text-[9px] font-bold text-gray-700 uppercase tracking-widest">
            MOSTRANDO {filteredChampions.length} CAMPEÕES
          </p>
          <button 
            onClick={onClose} 
            className="px-8 py-3 bg-white/5 text-[10px] font-black text-gray-400 uppercase tracking-widest rounded-xl hover:bg-white/10 hover:text-white transition-all border border-white/5"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChampionSelector;
