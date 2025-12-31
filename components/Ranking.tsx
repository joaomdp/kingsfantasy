
import React, { useState } from 'react';
import { MOCK_RANKING } from '../constants';

interface League {
  id: string;
  name: string;
  members?: string;
  icon: string;
  color: string;
  isVerified: boolean;
}

const Ranking: React.FC = () => {
  const [selectedLeague, setSelectedLeague] = useState<League | null>(null);

  const myLeagues: League[] = [
    { id: 'l1', name: "Americas Global", icon: "fa-earth-americas", color: "bg-[#e5e5e5] text-black", isVerified: true },
    { id: 'l2', name: "LTA Sul Pro", icon: "fa-trophy", color: "bg-[#ff4b50] text-white", isVerified: true },
    { id: 'l3', name: "paiN Gaming Official", members: "51.225 membros", icon: "fa-shield", color: "bg-[#cc0000] text-white", isVerified: true },
    { id: 'l4', name: "Ilha das Lendas", members: "16.596 membros", icon: "fa-island-tropical", color: "bg-[#7c3aed] text-white", isVerified: true },
    { id: 'l5', name: "Brucesa Arena", members: "7.117 membros", icon: "fa-crown", color: "bg-[#3b82f6] text-white", isVerified: true },
  ];

  if (selectedLeague) {
    return (
      <div className="max-w-[1200px] mx-auto space-y-8 animate-in fade-in duration-500">
        <button 
          onClick={() => setSelectedLeague(null)}
          className="flex items-center gap-3 text-gray-500 hover:text-[#c89b3c] transition-all font-black text-[11px] uppercase tracking-[0.3em] mb-4 group"
        >
          <i className="fa-solid fa-arrow-left transition-transform group-hover:-translate-x-1"></i>
          Voltar para minhas ligas
        </button>

        <div className="flex items-center gap-6 mb-12">
          <div className={`w-16 h-16 rounded-[20px] ${selectedLeague.color} flex items-center justify-center shadow-[0_0_30px_rgba(200,155,60,0.2)]`}>
            <i className={`fa-solid ${selectedLeague.icon} text-2xl`}></i>
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-4xl font-orbitron font-black text-white uppercase tracking-tight leading-none">{selectedLeague.name}</h1>
              {selectedLeague.isVerified && <i className="fa-solid fa-circle-check text-[#c89b3c] text-xl"></i>}
            </div>
            <p className="text-sm text-gray-500 font-black uppercase tracking-[0.4em] mt-2">{selectedLeague.members || 'LIGA OFICIAL KINGS'}</p>
          </div>
        </div>

        <div className="bg-[#0a0a0a] rounded-[32px] border border-white/5 overflow-hidden shadow-[0_32px_64px_rgba(0,0,0,0.5)]">
          <table className="w-full text-left border-collapse">
            <thead className="bg-white/[0.02] text-xs text-gray-500 uppercase tracking-[0.4em] border-b border-white/5">
              <tr>
                <th className="px-8 py-7 font-black text-center w-24">Pos</th>
                <th className="px-8 py-7 font-black">Invocador / Time</th>
                <th className="px-8 py-7 font-black text-right">Pontuação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {MOCK_RANKING.map((entry) => (
                <tr key={entry.rank} className="hover:bg-white/[0.02] transition-colors group cursor-default">
                  <td className="px-8 py-6">
                    <div className={`w-10 h-10 mx-auto rounded-xl flex items-center justify-center font-black font-orbitron text-base
                      ${entry.rank === 1 ? 'bg-[#c89b3c] text-black shadow-[0_0_20px_rgba(200,155,60,0.4)]' : 'text-gray-400 group-hover:text-white transition-colors'}`}>
                      {entry.rank}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 rounded-xl bg-black border border-white/10 overflow-hidden relative">
                        <img src={`https://picsum.photos/seed/${entry.userName}/60`} className="w-full h-full object-cover" alt="" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-orbitron font-black text-lg text-white group-hover:text-[#c89b3c] transition-colors uppercase tracking-tight">{entry.userName}</span>
                        <span className="text-[11px] text-gray-500 font-bold uppercase tracking-widest">{entry.teamName}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex flex-col items-end">
                      <span className="text-2xl font-orbitron font-black text-white">{entry.points.toFixed(1)}</span>
                      <span className="text-[10px] text-green-500 font-black uppercase tracking-widest mt-0.5">ESTÁVEL</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1100px] mx-auto animate-in fade-in duration-700">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-[11px] font-black text-[#c89b3c] uppercase tracking-[0.5em] mb-2">LOBBY DE COMPETIÇÃO</h2>
          <h1 className="text-4xl font-orbitron font-black text-white uppercase tracking-tighter">Minhas Ligas</h1>
        </div>
        <button className="flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black text-white uppercase tracking-widest hover:bg-[#c89b3c] hover:text-black transition-all">
          <i className="fa-solid fa-plus"></i>
          Criar Nova Liga
        </button>
      </div>

      <div className="grid grid-cols-1 gap-5">
        {myLeagues.map((league) => (
          <div 
            key={league.id}
            onClick={() => setSelectedLeague(league)}
            className="group relative flex items-center justify-between p-8 bg-[#0a0a0a] rounded-[28px] border border-white/5 hover:border-[#c89b3c]/40 transition-all cursor-pointer shadow-[0_20px_40px_rgba(0,0,0,0.3)] overflow-hidden"
          >
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[100px] rounded-full -mr-32 -mt-32 pointer-events-none group-hover:bg-[#c89b3c]/10 transition-all"></div>
            
            <div className="flex items-center gap-8 relative z-10">
              <div className={`w-16 h-16 rounded-2xl ${league.color} flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                <i className={`fa-solid ${league.icon} text-2xl`}></i>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-3">
                  <span className="font-orbitron font-black text-2xl text-white group-hover:text-[#c89b3c] transition-colors uppercase tracking-tight leading-none">
                    {league.name}
                  </span>
                  {league.isVerified && (
                    <i className="fa-solid fa-circle-check text-[#c89b3c] text-sm"></i>
                  )}
                </div>
                <div className="flex items-center gap-3 text-gray-500">
                   <p className="text-[11px] font-black uppercase tracking-[0.2em] group-hover:text-gray-300 transition-colors">
                      {league.members || 'LIGA OFICIAL KINGS'}
                   </p>
                   <span className="w-1 h-1 rounded-full bg-white/10"></span>
                   <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#c89b3c]">PLATINA I</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4 relative z-10">
               <div className="hidden md:flex flex-col items-end mr-6">
                  <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest">PONTOS LÍDER</span>
                  <span className="text-lg font-orbitron font-black text-white">1,250.5</span>
               </div>
               <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-[#c89b3c] group-hover:text-black transition-all">
                  <i className="fa-solid fa-chevron-right"></i>
               </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 p-12 border border-dashed border-white/10 rounded-[40px] text-center bg-white/[0.01] relative overflow-hidden group">
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(circle at center, rgba(200, 155, 60, 0.05) 0%, transparent 70%)' }}></div>
        <div className="relative z-10">
          <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="fa-solid fa-magnifying-glass text-3xl text-gray-700"></i>
          </div>
          <h3 className="text-xl font-orbitron font-black text-white uppercase tracking-tight mb-3">Expandir Horizontes?</h3>
          <p className="text-gray-500 text-sm font-medium mb-8 max-w-sm mx-auto">Encontre outras competições e comunidades para testar suas habilidades contra os melhores do servidor.</p>
          <button className="px-8 py-4 bg-[#c89b3c]/10 text-[#c89b3c] border border-[#c89b3c]/30 rounded-2xl text-xs font-black uppercase tracking-[0.3em] hover:bg-[#c89b3c] hover:text-black transition-all">
            Explorar Ligas Públicas
          </button>
        </div>
      </div>
    </div>
  );
};

export default Ranking;
