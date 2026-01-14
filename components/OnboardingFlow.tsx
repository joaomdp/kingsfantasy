
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { CHAMPIONS_LIST } from '../constants';

interface OnboardingFlowProps {
  userEmail: string;
  onComplete: (data: { teamName: string; avatar: string; favoriteTeam: string }) => void;
}

const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ userEmail, onComplete }) => {
  const [step, setStep] = useState<'verify' | 'setup-name' | 'setup-avatar' | 'setup-fav'>('verify');
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [teamName, setTeamName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('');
  const [selectedFavTeam, setSelectedFavTeam] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isCheckingName, setIsCheckingName] = useState(false);
  const [champSearch, setChampSearch] = useState('');

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Mock de nomes indisponíveis
  const TAKEN_NAMES = ["T1", "PAIN", "LOUD", "LOS GRANDES", "KABUM", "ILHA"];

  const handleCodeChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newCode = [...code];
    newCode[index] = value.substring(value.length - 1);
    setCode(newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const verifyCode = () => {
    const fullCode = code.join('');
    if (fullCode === '123456') {
      setStep('setup-name');
      setError(null);
    } else {
      setError("CÓDIGO INVÁLIDO. TENTE '123456'");
    }
  };

  const checkNameAvailability = () => {
    setIsCheckingName(true);
    setTimeout(() => {
      if (TAKEN_NAMES.includes(teamName.trim().toUpperCase())) {
        setError("NOME JÁ REIVINDICADO NA ILHA.");
      } else if (teamName.length < 3) {
        setError("NOME MUITO CURTO.");
      } else {
        setError(null);
        setStep('setup-avatar');
      }
      setIsCheckingName(false);
    }, 800);
  };

  const filteredChampions = useMemo(() => {
    return CHAMPIONS_LIST
      .filter(id => id.toLowerCase().includes(champSearch.toLowerCase()))
      .map(id => ({
        id,
        url: `https://ddragon.leagueoflegends.com/cdn/14.21.1/img/champion/${id}.png`
      }));
  }, [champSearch]);

  const klgTeams = [
    { name: 'PAIN GAMING', logo: 'pain-logo.png', color: 'from-red-900/40 to-black', border: 'border-red-500/30' },
    { name: 'LOUD', logo: 'loud-logo.png', color: 'from-green-900/40 to-black', border: 'border-green-500/30' },
    { name: 'T1', logo: 't1-logo.png', color: 'from-red-800/40 to-black', border: 'border-red-600/30' },
    { name: 'GEN GG', logo: 'gen-gg-logo.png', color: 'from-yellow-900/40 to-black', border: 'border-yellow-500/30' },
    { name: 'KARMINE COSPE', logo: 'karmine-cospe-logo.png', color: 'from-blue-900/40 to-black', border: 'border-blue-500/30' },
    { name: 'ÉanDG', logo: 'eandg-logo.png', color: 'from-orange-900/40 to-black', border: 'border-orange-500/30' }
  ];

  const getTeamLogoUrl = (logo: string) => {
    return `https://raw.githubusercontent.com/joaomdp/kingsfantasy/main/times/${logo}`;
  };

  const selectedChampName = useMemo(() => {
    const parts = selectedAvatar.split('/');
    const lastPart = parts[parts.length - 1];
    return lastPart ? lastPart.split('.')[0].toUpperCase() : '';
  }, [selectedAvatar]);

  return (
    <div className="fixed inset-0 z-[6000] bg-[#0B0411] flex items-center justify-center p-6 overflow-hidden">
      <div className="bg-pattern-halftone absolute inset-0 opacity-10"></div>
      
      {/* Background Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#5E6CFF]/10 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-600/5 blur-[120px] rounded-full animate-pulse delay-700"></div>
      </div>

      <div className="relative w-full max-w-4xl glass-card rounded-[56px] border border-white/5 shadow-[0_0_150px_rgba(0,0,0,0.9)] overflow-hidden animate-in zoom-in-95 duration-700">
        
        {/* Progress Bar Top */}
        <div className="absolute top-0 left-0 w-full h-1.5 flex gap-1 px-1 pt-1 z-50">
           {['verify', 'setup-name', 'setup-avatar', 'setup-fav'].map((s, idx) => {
             const steps = ['verify', 'setup-name', 'setup-avatar', 'setup-fav'];
             const currentIdx = steps.indexOf(step);
             const isComplete = idx < currentIdx;
             const isCurrent = idx === currentIdx;
             return (
               <div key={s} className={`flex-1 h-full rounded-full transition-all duration-1000 ${
                 isComplete ? 'bg-green-500' : isCurrent ? 'bg-[#5E6CFF] shadow-[0_0_10px_#5E6CFF]' : 'bg-white/5'
               }`}></div>
             );
           })}
        </div>

        <div className="flex flex-col h-[650px]">
          {/* STEP: VERIFY */}
          {step === 'verify' && (
            <div className="flex-1 flex flex-col items-center justify-center p-12 space-y-12 animate-in fade-in slide-in-from-bottom-10 duration-700">
              <div className="relative group">
                <div className="absolute inset-0 bg-[#5E6CFF]/20 blur-[30px] rounded-full animate-pulse"></div>
                <div className="relative w-28 h-28 bg-[#5E6CFF]/10 rounded-[3rem] border border-[#5E6CFF]/30 flex items-center justify-center text-[#5E6CFF] shadow-inner">
                  <i className="fa-solid fa-user-shield text-4xl"></i>
                </div>
              </div>
              
              <div className="text-center space-y-4">
                <h2 className="font-orbitron font-black text-4xl text-white uppercase tracking-tighter">VERIFICAÇÃO DA <span className="text-[#5E6CFF]">ILHA</span></h2>
                <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest leading-relaxed">
                  ENVIAMOS UM CÓDIGO DE ACESSO PARA<br/>
                  <span className="text-[#5E6CFF] font-black">{userEmail}</span>
                </p>
              </div>
              
              <div className="flex justify-center gap-3">
                {code.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={el => inputRefs.current[idx] = el}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={e => handleCodeChange(idx, e.target.value)}
                    onKeyDown={e => handleKeyDown(idx, e)}
                    className="w-16 h-24 bg-white/5 border border-white/10 rounded-3xl text-center text-4xl font-orbitron font-black text-white focus:outline-none focus:border-[#5E6CFF] focus:bg-[#5E6CFF]/5 transition-all shadow-inner"
                  />
                ))}
              </div>

              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl animate-in zoom-in-95">
                  <p className="text-[10px] font-black text-red-500 uppercase tracking-widest">{error}</p>
                </div>
              )}

              <button 
                onClick={verifyCode}
                className="w-full max-w-sm py-6 bg-[#5E6CFF] text-black rounded-[2rem] font-orbitron font-black text-sm uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-[0_20px_50px_rgba(94,108,255,0.3)]"
              >
                AUTENTICAR
              </button>
            </div>
          )}

          {/* STEP: NAME */}
          {step === 'setup-name' && (
            <div className="flex-1 flex flex-col items-center justify-center p-12 space-y-12 animate-in fade-in slide-in-from-right-10 duration-700">
              <div className="text-center space-y-4">
                <h2 className="font-orbitron font-black text-5xl text-white uppercase tracking-tighter leading-none">NOME DO <span className="text-[#5E6CFF]">TIME</span></h2>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest leading-relaxed max-w-sm mx-auto">COMO SUA LENDA SERÁ CONHECIDA NO RANKING GLOBAL DA KINGS LENDAS?</p>
              </div>

              <div className="w-full max-w-lg relative group">
                <div className="absolute inset-0 bg-[#5E6CFF]/10 blur-[50px] opacity-0 group-focus-within:opacity-100 transition-opacity rounded-full"></div>
                <input 
                  type="text" 
                  placeholder="EX: T1 DA SHOPEE"
                  value={teamName}
                  onChange={e => {
                    setTeamName(e.target.value.toUpperCase());
                    setError(null);
                  }}
                  className={`relative w-full bg-white/5 border rounded-[2.5rem] py-10 px-12 text-center text-3xl font-orbitron font-black text-white focus:outline-none transition-all ${error ? 'border-red-500' : 'border-white/10 focus:border-[#5E6CFF] focus:bg-white/[0.08]'}`}
                />
                {isCheckingName && (
                  <div className="absolute right-10 top-1/2 -translate-y-1/2">
                    <div className="w-8 h-8 border-4 border-[#5E6CFF] border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
              </div>

              {error && (
                <div className="p-5 bg-red-500/10 border border-red-500/20 rounded-3xl">
                  <p className="text-[11px] font-black text-red-500 uppercase tracking-widest">{error}</p>
                </div>
              )}

              <button 
                onClick={checkNameAvailability}
                disabled={!teamName || isCheckingName}
                className="w-full max-w-sm py-6 bg-[#5E6CFF] text-black rounded-[2rem] font-orbitron font-black text-sm uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-[0_20px_50px_rgba(94,108,255,0.3)] disabled:opacity-50"
              >
                {isCheckingName ? 'VERIFICANDO...' : 'PRÓXIMO PASSO'}
              </button>
            </div>
          )}

          {/* STEP: AVATAR */}
          {step === 'setup-avatar' && (
            <div className="flex-1 flex flex-col animate-in fade-in slide-in-from-right-10 duration-700">
               <div className="p-10 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                  <div className="space-y-1">
                    <h2 className="font-orbitron font-black text-3xl text-white uppercase tracking-tighter">ESCOLHER <span className="text-[#5E6CFF]">AVATAR</span></h2>
                    <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">SELECIONE SEU CAMPEÃO REPRESENTATIVO</p>
                  </div>
                  <div className="relative w-64">
                    <i className="fa-solid fa-magnifying-glass absolute left-5 top-1/2 -translate-y-1/2 text-gray-600 text-xs"></i>
                    <input 
                      type="text"
                      placeholder="FILTRAR..."
                      value={champSearch}
                      onChange={e => setChampSearch(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-[11px] text-white font-black uppercase focus:outline-none focus:border-[#5E6CFF]/50 transition-all"
                    />
                  </div>
               </div>

               <div className="flex-1 overflow-y-auto p-10 custom-scrollbar bg-black/40">
                  <div className="grid grid-cols-5 md:grid-cols-8 gap-6">
                    {filteredChampions.map(champ => (
                      <button 
                        key={champ.id}
                        onClick={() => setSelectedAvatar(champ.url)}
                        className={`group relative aspect-square rounded-2xl overflow-hidden border-2 transition-all duration-500 ${
                          selectedAvatar === champ.url 
                          ? 'border-[#5E6CFF] scale-110 shadow-[0_0_30px_rgba(94,108,255,0.5)] z-10' 
                          : 'border-white/5 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 hover:border-white/30'
                        }`}
                      >
                        <img src={champ.url} className="w-full h-full object-cover transition-transform group-hover:scale-125 duration-700" alt={champ.id} />
                        {selectedAvatar === champ.url && (
                          <div className="absolute inset-0 bg-[#5E6CFF]/20 flex items-center justify-center backdrop-blur-[2px]">
                            <i className="fa-solid fa-check text-[#5E6CFF] text-2xl drop-shadow-[0_0_10px_rgba(0,0,0,0.8)]"></i>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
               </div>

               <div className="p-10 border-t border-white/5 bg-white/[0.02] flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-2xl border-2 border-white/10 overflow-hidden bg-black shadow-2xl">
                      {selectedAvatar && <img src={selectedAvatar} className="w-full h-full object-cover animate-in zoom-in-50" alt="" />}
                    </div>
                    <div>
                       <span className="text-[10px] font-black text-[#5E6CFF] uppercase tracking-[0.2em] mb-1 block">SELECIONADO:</span>
                       <h3 className="font-orbitron font-black text-xl text-white uppercase tracking-tighter leading-none">{selectedChampName || 'NENHUM'}</h3>
                    </div>
                  </div>
                  <button 
                    onClick={() => setStep('setup-fav')}
                    disabled={!selectedAvatar}
                    className="px-12 py-5 bg-[#5E6CFF] text-black rounded-2xl font-orbitron font-black text-sm uppercase tracking-widest hover:scale-[1.05] active:scale-95 transition-all shadow-[0_15px_30px_rgba(94,108,255,0.3)] disabled:opacity-50"
                  >
                    CONTINUAR
                  </button>
               </div>
            </div>
          )}

          {/* STEP: FAVORITE TEAM */}
          {step === 'setup-fav' && (
            <div className="flex-1 flex flex-col animate-in fade-in slide-in-from-right-10 duration-700">
               <div className="p-10 text-center space-y-4 bg-white/[0.02] border-b border-white/5">
                  <h2 className="font-orbitron font-black text-4xl text-white uppercase tracking-tighter">TIME DO <span className="text-[#5E6CFF]">CORAÇÃO</span></h2>
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest leading-relaxed">ESCOLHA SEU TIME E ENTRE AUTOMATICAMENTE NA LIGA OFICIAL DELE.</p>
               </div>

               <div className="flex-1 overflow-y-auto p-12 custom-scrollbar bg-black/40">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {klgTeams.map(t => (
                      <button
                        key={t.name}
                        onClick={() => setSelectedFavTeam(t.name)}
                        className={`group relative flex flex-col items-center gap-8 p-10 rounded-[3rem] border-2 transition-all duration-500 overflow-hidden ${
                          selectedFavTeam === t.name 
                          ? `bg-gradient-to-br ${t.color} border-[#5E6CFF] shadow-[0_20px_50px_rgba(0,0,0,0.5)] scale-105` 
                          : `bg-white/[0.02] border-white/5 hover:border-white/20`
                        }`}
                      >
                        <div className={`w-32 h-32 rounded-[2.5rem] bg-black/40 flex items-center justify-center p-6 border transition-all duration-700 ${selectedFavTeam === t.name ? 'border-[#5E6CFF]/40 shadow-[0_0_30px_rgba(94,108,255,0.2)]' : 'border-white/5 group-hover:scale-110'}`}>
                          <img 
                            src={getTeamLogoUrl(t.logo)} 
                            className="w-full h-full object-contain filter drop-shadow-2xl" 
                            alt={t.name} 
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://raw.githubusercontent.com/joaomdp/kingsfantasy/main/times/logo.png';
                            }}
                          />
                        </div>
                        <span className={`font-orbitron font-black text-sm text-center leading-tight transition-all duration-500 ${selectedFavTeam === t.name ? 'text-white translate-y-[-4px]' : 'text-gray-500 group-hover:text-white'}`}>
                          {t.name}
                        </span>
                        
                        {selectedFavTeam === t.name && (
                          <div className="absolute top-6 right-6 w-8 h-8 bg-[#5E6CFF] rounded-full flex items-center justify-center text-black text-xs shadow-lg animate-in zoom-in duration-500">
                            <i className="fa-solid fa-check"></i>
                          </div>
                        )}
                        
                        {/* Hover Gradient Overlay */}
                        <div className={`absolute inset-0 bg-gradient-to-t from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none`}></div>
                      </button>
                    ))}
                  </div>
               </div>

               <div className="p-10 border-t border-white/5 bg-white/[0.02] flex items-center justify-center">
                  <button 
                    onClick={() => onComplete({ teamName, avatar: selectedAvatar, favoriteTeam: selectedFavTeam })}
                    disabled={!selectedFavTeam}
                    className="w-full max-w-sm py-6 bg-[#5E6CFF] text-black rounded-[2rem] font-orbitron font-black text-sm uppercase tracking-widest hover:scale-[1.05] active:scale-95 transition-all shadow-[0_20px_50px_rgba(94,108,255,0.4)] disabled:opacity-50"
                  >
                    FINALIZAR ESCALAÇÃO
                  </button>
               </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default OnboardingFlow;
