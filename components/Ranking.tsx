
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

interface RankingProps {
  onOpenCreateLeague?: () => void;
}

const VerifiedSeal: React.FC<{ size?: string }> = ({ size = "text-[12px]" }) => (
  <div className={`relative flex items-center justify-center ${size} drop-shadow-[0_0_8px_rgba(94,108,255,0.6)]`}>
    <i className="fa-solid fa-certificate text-[#5E6CFF]"></i>
    <i className="fa-solid fa-check absolute text-[0.55em] text-black font-black"></i>
  </div>
);

const CustomDropdown: React.FC<{
  label: string;
  options: string[];
  selected: string;
  onSelect: (val: string) => void;
  icon: string;
}> = ({ label, options, selected, onSelect, icon }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-3 group px-2 py-1 transition-all">
        <i className={`fa-solid ${icon} text-[10px] text-gray-600 group-hover:text-white transition-colors`}></i>
        <span className="text-[10px] font-black text-white uppercase tracking-widest">{label}</span>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-medium text-gray-500 group-hover:text-gray-300">{selected}</span>
          <i className={`fa-solid fa-chevron-down text-[8px] text-gray-600 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}></i>
        </div>
      </button>
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-[#0B0411] border border-white/10 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] z-[100] py-2 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          <div className="max-h-60 overflow-y-auto custom-scrollbar">
            {options.map((opt) => (
              <button key={opt} onClick={() => { onSelect(opt); setIsOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-2.5 text-[11px] font-medium transition-all hover:bg-white/[0.03] text-left ${selected === opt ? 'text-white bg-white/[0.02]' : 'text-gray-400 hover:text-white'}`}>
                <div className="w-4 flex items-center justify-center">{selected === opt && <i className="fa-solid fa-check text-[#5E6CFF] text-[9px]"></i>}</div>
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const Ranking: React.FC<RankingProps> = ({ onOpenCreateLeague }) => {
  const [selectedLeague, setSelectedLeague] = useState<League | null>(null);
  const [copiedInvite, setCopiedInvite] = useState(false);
  const [tipoFiltro, setTipoFiltro] = useState('Temporada');
  const [rodadaFiltro, setRodadaFiltro] = useState('Rodada 10');

  const myLeagues: League[] = [
    { id: 'l1', name: "Américas Global", icon: "fa-earth-americas", color: "bg-blue-500/10 text-blue-400", isVerified: true, members: "128.4k" },
    { id: 'l2', name: "Kings Cup Pro", icon: "fa-trophy", color: "bg-[#5E6CFF]/10 text-[#5E6CFF]", isVerified: true, members: "12.5k" },
    { id: 'l3', name: "paiN Gaming Fan", icon: "fa-shield-halved", color: "bg-red-600/10 text-red-500", isVerified: true, members: "51.2k" },
    { id: 'l4', name: "Ilha das Lendas", icon: "fa-shuttle-space", color: "bg-purple-600/10 text-purple-400", isVerified: true, members: "16.5k" },
    { id: 'l5', name: "GoaTeam Arena", icon: "fa-crown", color: "bg-cyan-600/10 text-cyan-400", isVerified: true, members: "7.1k" },
  ];

  const handleCopyInvite = () => {
    if (!selectedLeague) return;
    const inviteLink = `${window.location.origin}/invite/${selectedLeague.id}`;
    navigator.clipboard.writeText(inviteLink);
    setCopiedInvite(true);
    setTimeout(() => setCopiedInvite(false), 2000);
  };

  if (selectedLeague) {
    return (
      <div className="max-w-[1200px] mx-auto space-y-10 animate-in fade-in duration-500 pb-20">
        <div className="relative h-[240px] md:h-[320px] rounded-[48px] overflow-hidden group shadow-[0_20px_60px_rgba(0,0,0,0.6)] border border-white/5">
          <div className="absolute inset-0 bg-[#0B0411]">
             <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
             <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, #5E6CFF 0%, transparent 70%)' }}></div>
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20 space-y-6">
            <div className={`w-28 h-28 md:w-36 md:h-36 rounded-[2.5rem] ${selectedLeague.color} flex items-center justify-center shadow-[0_0_50px_rgba(94,108,255,0.25)] border border-white/10 group-hover:scale-110 transition-transform duration-1000 ease-out`}>
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
                <div className="flex items-center gap-2.5">
                  <button onClick={handleCopyInvite} className="w-10 h-10 flex items-center justify-center bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-[#5E6CFF] hover:border-[#5E6CFF]/30 transition-all shadow-xl">
                    <i className={`fa-solid ${copiedInvite ? 'fa-check text-green-500' : 'fa-share-nodes'} text-xs`}></i>
                  </button>
                  <button className="px-4 py-2.5 bg-red-600/10 text-red-500 border border-red-500/10 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all">SAIR</button>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-white/5 space-y-6">
                 <h4 className="text-[9px] font-black text-gray-600 uppercase tracking-widest">MEU TIME</h4>
                 <div className="flex items-center justify-between p-5 bg-white/[0.02] rounded-2xl border border-white/5 group hover:border-[#5E6CFF]/30 transition-all cursor-pointer">
                    <div className="flex items-center gap-4">
                       <span className="font-orbitron font-black text-lg text-[#5E6CFF] w-10">1458</span>
                       <div className="w-11 h-11 rounded-xl bg-black border border-white/10 flex items-center justify-center text-[#5E6CFF]">
                         <i className="fa-solid fa-shield-halved text-sm"></i>
                       </div>
                       <div>
                          <p className="text-[13px] font-black text-white uppercase tracking-tight leading-none mb-1 group-hover:text-[#5E6CFF] transition-colors">GOATEAM</p>
                          <p className="text-[9px] font-bold text-gray-600 uppercase tracking-widest">HAKKAI</p>
                       </div>
                    </div>
                    <p className="font-orbitron font-black text-white text-base">897.58</p>
                 </div>
              </div>
              <button onClick={() => setSelectedLeague(null)} className="w-full mt-8 py-4 bg-white/[0.01] border border-white/5 rounded-xl text-[9px] font-black text-gray-600 uppercase tracking-[0.2em] hover:text-white hover:bg-white/5 transition-all">VOLTAR PARA LIGAS</button>
            </div>
          </div>
          <div className="lg:col-span-8">
            <div className="glass-card rounded-[32px] overflow-hidden border border-white/5 shadow-2xl">
              <div className="p-8 border-b border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
                 <h2 className="font-orbitron font-black text-xl text-white uppercase tracking-tight">RANKING</h2>
                 <div className="flex items-center gap-8">
                    <CustomDropdown label="TIPO" icon="fa-list-ul" options={['Temporada', 'Rodada']} selected={tipoFiltro} onSelect={setTipoFiltro} />
                    <CustomDropdown label="RODADA" icon="fa-sliders" options={['Rodada 10', 'Rodada 09']} selected={rodadaFiltro} onSelect={setRodadaFiltro} />
                 </div>
              </div>
              <div className="divide-y divide-white/[0.03]">
                 {MOCK_RANKING.map((entry, idx) => {
                   const isUser = entry.userName === 'HAKKAI';
                   return (
                     <div key={idx} className={`flex items-center p-6 px-10 gap-10 hover:bg-white/[0.02] transition-all group cursor-pointer ${isUser ? 'bg-[#5E6CFF]/[0.05]' : ''}`}>
                        <div className="w-8 text-center shrink-0"><span className={`font-orbitron font-black text-base ${idx < 3 ? 'text-[#5E6CFF]' : 'text-gray-700'}`}>{entry.rank}</span></div>
                        <div className="relative w-12 h-12 shrink-0"><img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${entry.userName}`} className="relative z-10 w-full h-full object-cover rounded-xl border border-white/10 bg-black" alt="" /></div>
                        <div className="flex-1">
                           <h4 className="font-black text-white text-[15px] uppercase tracking-tighter group-hover:text-[#5E6CFF] transition-colors leading-none mb-1.5">{entry.teamName}</h4>
                           <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">{entry.userName}</p>
                        </div>
                        <div className="text-right"><p className="font-orbitron font-black text-white text-xl tracking-tight leading-none">{entry.points.toFixed(2)}</p></div>
                     </div>
                   );
                 })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1000px] mx-auto animate-in fade-in duration-700 space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
        <div>
          <h2 className="text-[10px] font-black text-[#5E6CFF] uppercase tracking-wider mb-2">MODO COMPETITIVO</h2>
          <h1 className="text-4xl md:text-5xl font-orbitron font-black text-white uppercase tracking-tighter leading-none">MINHAS <span className="text-[#5E6CFF]">LIGAS</span></h1>
        </div>
        <button onClick={onOpenCreateLeague} className="group flex items-center gap-3 px-8 py-4 bg-[#5E6CFF] border border-[#5E6CFF]/50 rounded-2xl text-[10px] font-black text-black uppercase tracking-[0.1em] hover:scale-105 transition-all shadow-[0_0_30px_rgba(94,108,255,0.4)]">
          <i className="fa-solid fa-plus text-[11px]"></i>
          CRIAR LIGA
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {myLeagues.map((league) => (
          <div key={league.id} onClick={() => setSelectedLeague(league)} className="group glass-card rounded-[28px] p-5 flex flex-col sm:flex-row items-center justify-between border border-white/5 hover:border-[#5E6CFF]/50 hover:bg-white/[0.04] transition-all duration-500 cursor-pointer">
            <div className="flex items-center gap-6 relative z-20">
              <div className={`w-14 h-14 rounded-2xl ${league.color} flex items-center justify-center shadow-2xl transition-all duration-700 border border-transparent group-hover:border-[#5E6CFF]/30`}>
                <i className={`fa-solid ${league.icon} text-xl`}></i>
              </div>
              <div className="text-center sm:text-left">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-orbitron font-black text-xl text-white group-hover:text-[#5E6CFF] transition-colors uppercase tracking-tighter">{league.name}</h3>
                  {league.isVerified && <VerifiedSeal />}
                </div>
                <div className="flex items-center gap-2.5 text-[11px] font-bold uppercase text-gray-500 group-hover:text-gray-300"><i className="fa-solid fa-users text-[9px]"></i> {league.members} MEMBROS</div>
              </div>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center transition-all group-hover:border-[#5E6CFF]/60 group-hover:shadow-[0_0_20px_rgba(94,108,255,0.2)]">
              <i className="fa-solid fa-arrow-right-long text-sm text-gray-500 group-hover:text-white transition-all"></i>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ranking;
