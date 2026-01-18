
import React, { useState, useRef, useMemo, useEffect } from 'react';
import { CHAMPIONS_LIST } from '../constants';
import { DataService } from '../services/api';

interface OnboardingFlowProps {
  userEmail: string;
  onComplete: (data: { teamName: string; avatar: string; favoriteTeam: string; shield: any }) => void;
}

const SHIELD_SHAPES = ['fa-shield', 'fa-shield-halved', 'fa-shield-heart', 'fa-certificate', 'fa-clapperboard'];
const SHIELD_SYMBOLS = ['fa-bolt', 'fa-fire', 'fa-crown', 'fa-skull', 'fa-dragon', 'fa-ghost', 'fa-hand-fist'];
const COLORS = ['#FFFFFF', '#5E6CFF', '#FFB800', '#00FF94', '#00E0FF', '#FF4655', '#B05EFF', '#FF5EB0'];

const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ userEmail, onComplete }) => {
  const [step, setStep] = useState<'verify' | 'fav-team' | 'team-name' | 'shield' | 'avatar'>('verify');
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [teamName, setTeamName] = useState('');
  const [dbTeams, setDbTeams] = useState<{id: string, name: string, logo: string}[]>([]);
  const [selectedFavTeam, setSelectedFavTeam] = useState<any>(null);
  const [selectedAvatar, setSelectedAvatar] = useState('');
  const [champSearch, setChampSearch] = useState('');
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
  const [isLoadingTeams, setIsLoadingTeams] = useState(false);
  
  const [shieldShape, setShieldShape] = useState(SHIELD_SHAPES[0]);
  const [shieldColor, setShieldColor] = useState('#5E6CFF');
  const [shieldSymbol, setShieldSymbol] = useState(SHIELD_SYMBOLS[2]);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const fetchTeams = async () => {
      setIsLoadingTeams(true);
      const teams = await DataService.getTeams();
      setDbTeams(teams);
      setIsLoadingTeams(false);
    };
    fetchTeams();
  }, []);

  const handleCodeChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newCode = [...code];
    newCode[index] = value.substring(value.length - 1);
    setCode(newCode);
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const filteredChampions = useMemo(() => {
    return CHAMPIONS_LIST
      .filter(id => id.toLowerCase().includes(champSearch.toLowerCase()))
      .slice(0, 50)
      .map(id => ({
        id,
        url: `https://ddragon.leagueoflegends.com/cdn/14.21.1/img/champion/${id}.png`
      }));
  }, [champSearch]);

  const renderProgress = () => {
    const steps = ['fav-team', 'team-name', 'shield', 'avatar'];
    const currentIdx = steps.indexOf(step);
    return (
      <div className="w-full flex gap-2 px-10 mb-10">
        {steps.map((_, i) => (
          <div key={i} className={`h-1 flex-1 transition-all duration-500 ${i <= currentIdx ? 'bg-[#5E6CFF] shadow-[0_0_10px_rgba(94,108,255,0.5)]' : 'bg-white/10'}`}></div>
        ))}
      </div>
    );
  };

  const handleImageLoad = (id: string) => {
    setLoadedImages(prev => ({ ...prev, [id]: true }));
  };

  const fallbackLogo = "https://raw.githubusercontent.com/joaomdp/kingsfantasy/main/times/logo.png";

  return (
    <div className="fixed inset-0 z-[6000] bg-[#0B0411] flex flex-col items-center justify-center overflow-hidden font-inter">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#5E6CFF]/5 via-transparent to-transparent pointer-events-none"></div>

      {step === 'verify' && (
        <div className="w-full max-w-md p-10 space-y-12 animate-in fade-in relative z-10">
           <div className="text-center space-y-4">
             <h2 className="text-white font-orbitron font-black text-3xl uppercase tracking-tighter">VERIFICAÇÃO</h2>
             <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest leading-relaxed">DIGITE O CÓDIGO ENVIADO PARA<br/>{userEmail}</p>
           </div>
           <div className="flex justify-center gap-3">
             {code.map((digit, idx) => (
               <input key={idx} ref={el => inputRefs.current[idx] = el} type="text" maxLength={1} value={digit} onChange={e => handleCodeChange(idx, e.target.value)} className="w-14 h-20 bg-white/5 border border-white/10 rounded-2xl text-center text-3xl font-orbitron font-black text-white focus:outline-none focus:border-[#5E6CFF] transition-all shadow-inner" />
             ))}
           </div>
           <button onClick={() => setStep('fav-team')} disabled={code.join('').length < 6} className="w-full py-6 bg-[#5E6CFF] text-black font-black text-sm uppercase tracking-widest rounded-2xl hover:scale-[1.02] active:scale-95 transition-all shadow-[0_20px_50px_rgba(94,108,255,0.3)] disabled:opacity-20">CONECTAR NEXUS</button>
        </div>
      )}

      {step === 'fav-team' && (
        <div className="w-full max-w-4xl flex flex-col items-center animate-in fade-in relative z-10 h-full pt-10">
          <div className="w-full text-center mb-8 shrink-0">
            <h3 className="text-white text-[12px] font-bold uppercase tracking-[0.4em] mb-10">TIME FAVORITO</h3>
            {renderProgress()}
            <p className="text-gray-400 text-[14px] font-medium px-4 uppercase tracking-tight">SELECIONE SEU TIME KINGS LENDAS 2026</p>
          </div>
          
          {isLoadingTeams ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-4">
              <div className="w-12 h-12 border-4 border-[#5E6CFF]/20 border-t-[#5E6CFF] rounded-full animate-spin"></div>
              <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Sincronizando Banco de Dados...</span>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full px-10 overflow-y-auto no-scrollbar pb-40">
              {dbTeams.map(team => (
                <button 
                  key={team.id} 
                  onClick={() => setSelectedFavTeam(team)}
                  className={`aspect-square p-8 flex flex-col items-center justify-center border-2 transition-all duration-500 rounded-[2.5rem] relative overflow-hidden ${selectedFavTeam?.id === team.id ? 'border-[#5E6CFF] bg-[#5E6CFF]/10 shadow-[0_0_30px_rgba(94,108,255,0.2)]' : 'border-white/5 bg-white/[0.02] hover:bg-white/[0.05]'}`}
                >
                  <div className={`w-full h-full flex items-center justify-center transition-opacity duration-500`}>
                    <img 
                      src={team.logo} 
                      className={`w-full h-full object-contain transition-all duration-700 ${selectedFavTeam?.id === team.id ? 'scale-110 brightness-110' : 'grayscale opacity-40'}`} 
                      alt={team.name}
                      onLoad={() => handleImageLoad(team.id)}
                      onError={(e) => { (e.target as HTMLImageElement).src = fallbackLogo; }}
                    />
                  </div>
                  <span className={`text-[9px] font-black uppercase tracking-tighter mt-4 text-center ${selectedFavTeam?.id === team.id ? 'text-[#5E6CFF]' : 'text-gray-600'}`}>{team.name}</span>
                </button>
              ))}
            </div>
          )}

          <div className="fixed bottom-0 left-0 w-full p-10 bg-[#0B0411]/90 backdrop-blur-xl border-t border-white/5 z-50">
            <div className="max-w-md mx-auto space-y-6">
              {selectedFavTeam && (
                <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10 animate-in slide-in-from-bottom-4">
                  <div className="w-10 h-10 flex items-center justify-center">
                    <img src={selectedFavTeam.logo} className="w-full h-full object-contain" alt="" onError={(e) => { (e.target as HTMLImageElement).src = fallbackLogo; }} />
                  </div>
                  <span className="text-white text-[11px] font-black uppercase tracking-widest">VOCÊ É TORCEDOR DA {selectedFavTeam.name}</span>
                </div>
              )}
              <button 
                disabled={!selectedFavTeam} 
                onClick={() => setStep('team-name')} 
                className="w-full py-5 bg-[#5E6CFF] text-black font-black text-sm uppercase tracking-widest rounded-2xl shadow-[0_20px_40px_rgba(94,108,255,0.3)] hover:scale-[1.02] transition-all disabled:opacity-20"
              >
                PRÓXIMO PASSO
              </button>
            </div>
          </div>
        </div>
      )}

      {step === 'team-name' && (
        <div className="w-full max-w-2xl flex flex-col items-center animate-in slide-in-from-right-10 px-10">
          <div className="w-full text-center mb-16">
            <h3 className="text-white text-[12px] font-bold uppercase tracking-[0.4em] mb-10">IDENTIDADE</h3>
            {renderProgress()}
            <p className="text-gray-400 text-[14px] font-medium max-w-md mx-auto uppercase tracking-tight">Qual será o nome da sua organização na Ilha das Lendas?</p>
          </div>

          <div className="w-full max-w-md space-y-6">
            <label className="text-[10px] font-black text-gray-600 uppercase tracking-widest block text-left">NOME DO TIME</label>
            <input 
              type="text" 
              value={teamName}
              onChange={e => setTeamName(e.target.value.toUpperCase())}
              className="w-full bg-white/5 border border-white/10 rounded-[2rem] p-6 text-white font-orbitron font-black text-xl text-center focus:outline-none focus:border-[#5E6CFF] transition-all shadow-inner"
              placeholder="RANGERNATION"
              autoFocus
            />
          </div>

          <div className="fixed bottom-10 left-0 w-full px-10">
            <button 
              onClick={() => setStep('shield')} 
              disabled={!teamName || teamName.length < 3} 
              className="max-w-md mx-auto block w-full py-6 bg-[#5E6CFF] text-black font-black text-sm uppercase tracking-widest rounded-2xl shadow-[0_20px_40px_rgba(94,108,255,0.3)] transition-all disabled:opacity-20"
            >
              PRÓXIMO
            </button>
          </div>
        </div>
      )}

      {step === 'shield' && (
        <div className="w-full max-w-2xl flex flex-col items-center animate-in slide-in-from-right-10 overflow-y-auto no-scrollbar pb-40">
          <div className="w-full text-center mb-10">
            <h3 className="text-white text-[12px] font-bold uppercase tracking-[0.4em] mb-10">BRASÃO</h3>
            {renderProgress()}
            <p className="text-gray-400 text-[14px] font-medium uppercase tracking-tight">Customize sua marca oficial.</p>
          </div>

          <div className="relative w-48 h-48 mb-12 flex items-center justify-center">
            <div className="absolute inset-0 bg-[#5E6CFF]/20 blur-[60px] rounded-full animate-pulse"></div>
            <div className="relative transition-all duration-500 drop-shadow-[0_0_20px_rgba(94,108,255,0.5)]" style={{ color: shieldColor }}>
              <i className={`fa-solid ${shieldShape} text-[10rem]`}></i>
              <i className={`fa-solid ${shieldSymbol} absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl text-black`}></i>
            </div>
          </div>

          <div className="w-full max-w-md space-y-8">
            <div className="flex gap-4 overflow-x-auto no-scrollbar py-2 px-4">
              {SHIELD_SHAPES.map(s => (
                <button key={s} onClick={() => setShieldShape(s)} className={`w-14 h-14 shrink-0 rounded-2xl border border-white/5 flex items-center justify-center transition-all ${shieldShape === s ? 'bg-[#5E6CFF] text-black shadow-[0_0_20px_#5E6CFF]' : 'bg-white/5 text-gray-600 hover:text-white'}`}>
                  <i className={`fa-solid ${s} text-xl`}></i>
                </button>
              ))}
            </div>
            <div className="flex gap-4 overflow-x-auto no-scrollbar py-2 px-4">
              {COLORS.map(c => (
                <button key={c} onClick={() => setShieldColor(c)} className={`w-10 h-10 rounded-full shrink-0 border-2 transition-all ${shieldColor === c ? 'border-white scale-125 shadow-lg' : 'border-transparent'}`} style={{ backgroundColor: c }}></button>
              ))}
            </div>
            <div className="flex gap-6 overflow-x-auto no-scrollbar py-2 px-4">
              {SHIELD_SYMBOLS.map(s => (
                <button key={s} onClick={() => setShieldSymbol(s)} className={`w-14 h-14 shrink-0 rounded-2xl border border-white/5 flex items-center justify-center transition-all ${shieldSymbol === s ? 'bg-[#5E6CFF] text-black shadow-[0_0_20px_#5E6CFF]' : 'bg-white/5 text-gray-600 hover:text-white'}`}>
                  <i className={`fa-solid ${s} text-xl`}></i>
                </button>
              ))}
            </div>
          </div>

          <div className="fixed bottom-10 left-0 w-full px-10">
            <button onClick={() => setStep('avatar')} className="max-w-md mx-auto block w-full py-6 bg-[#5E6CFF] text-black font-black text-sm uppercase tracking-widest rounded-2xl shadow-[0_20px_40px_rgba(94,108,255,0.3)] transition-all">PRÓXIMO PASSO</button>
          </div>
        </div>
      )}

      {step === 'avatar' && (
        <div className="w-full max-w-5xl flex flex-col items-center animate-in fade-in h-full pt-20 relative z-10">
          <div className="w-full text-center mb-8 px-10 shrink-0">
            <h3 className="text-white text-[12px] font-bold uppercase tracking-[0.4em] mb-10">REPRESENTANTE</h3>
            {renderProgress()}
            <p className="text-gray-400 text-[14px] font-medium uppercase tracking-tight">Escolha o campeão que será seu rosto na arena.</p>
          </div>

          <div className="w-full max-w-md px-10 mb-8 shrink-0">
            <div className="relative">
              <i className="fa-solid fa-magnifying-glass absolute left-6 top-1/2 -translate-y-1/2 text-gray-700"></i>
              <input 
                type="text" 
                placeholder="BUSCAR LENDA..." 
                value={champSearch}
                onChange={e => setChampSearch(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-8 text-[11px] font-black text-white uppercase focus:outline-none focus:border-[#5E6CFF] transition-all"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto w-full px-10 no-scrollbar pb-40">
             <div className="grid grid-cols-4 md:grid-cols-10 gap-4">
                {filteredChampions.map(champ => (
                  <button key={champ.id} onClick={() => setSelectedAvatar(champ.url)} className={`aspect-square border-2 transition-all duration-500 rounded-3xl overflow-hidden ${selectedAvatar === champ.url ? 'border-[#5E6CFF] scale-110 shadow-[0_0_30px_rgba(94,108,255,0.4)] z-10' : 'border-white/5 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 hover:border-white/20'}`}>
                    <img src={champ.url} className="w-full h-full object-cover" alt="" />
                  </button>
                ))}
             </div>
          </div>

          {selectedAvatar && (
            <div className="fixed bottom-0 left-0 w-full p-10 bg-[#0B0411]/90 backdrop-blur-xl border-t border-white/5 z-50">
              <button onClick={() => onComplete({ teamName, avatar: selectedAvatar, favoriteTeam: selectedFavTeam?.name, shield: { shape: shieldShape, color: shieldColor, symbol: shieldSymbol } })} className="max-w-md mx-auto block w-full py-6 bg-[#5E6CFF] text-black font-black text-sm uppercase tracking-widest rounded-2xl shadow-[0_20px_60px_rgba(94,108,255,0.4)]">FINALIZAR ORGANIZAÇÃO</button>
            </div>
          )}
        </div>
      )}

    </div>
  );
};

export default OnboardingFlow;
