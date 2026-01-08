
import React, { useState, useRef } from 'react';

interface CreateLeagueModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

const CreateLeagueModal: React.FC<CreateLeagueModalProps> = ({ onClose, onSuccess }) => {
  const [newLeagueName, setNewLeagueName] = useState('');
  const [newLeagueFormat, setNewLeagueFormat] = useState<'continuo' | 'limitado'>('continuo');
  const [leagueImage, setLeagueImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [isClosing, setIsClosing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const triggerClose = () => {
    setIsClosing(true);
    setTimeout(() => onClose(), 300);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setLeagueImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('loading');
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSubmitStatus('success');
    setTimeout(() => {
      onSuccess();
      triggerClose();
    }, 1000);
  };

  return (
    <div className={`fixed inset-0 z-[2000] flex items-center justify-center p-4 md:p-10 transition-all duration-300 ${isClosing ? 'bg-black/0' : 'bg-black/95 backdrop-blur-xl animate-in fade-in'}`}>
      <div className="absolute inset-0" onClick={() => !isSubmitting && triggerClose()}></div>
      
      <div className={`relative w-full max-w-2xl bg-[#0B0411] rounded-[40px] border border-white/10 shadow-[0_0_100px_rgba(0,0,0,1)] flex flex-col max-h-[90vh] transition-all duration-500 overflow-hidden ${isClosing ? 'opacity-0 scale-95 translate-y-12' : 'opacity-100 scale-100 translate-y-0 animate-in zoom-in-95'}`}>
        
        {/* Cabeçalho - Reforçado com cantos arredondados explicitos */}
        <div className="p-8 md:p-10 border-b border-white/5 bg-gradient-to-r from-[#5E6CFF]/10 to-transparent shrink-0 flex items-center justify-between rounded-t-[40px]">
          <div>
            <h2 className="font-orbitron font-black text-2xl md:text-3xl text-white uppercase tracking-tight mb-2">NOVA LIGA</h2>
            <span className="text-[10px] font-black text-[#5E6CFF] uppercase tracking-widest">SISTEMA DE FUNDAÇÃO DE COMUNIDADES</span>
          </div>
          {!isSubmitting && (
            <button onClick={triggerClose} className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-gray-500 hover:text-[#5E6CFF] hover:border-[#5E6CFF]/40 transition-all">
              <i className="fa-solid fa-xmark text-xl"></i>
            </button>
          )}
        </div>

        {/* Conteúdo com Scroll Invisível (no-scrollbar) */}
        <div className="flex-1 overflow-y-auto p-8 md:p-10 no-scrollbar bg-black/30">
          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="space-y-4">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] px-1 block">NOME DA LIGA *</label>
              <input 
                type="text" 
                placeholder="EX: LIGA DOS POROS" 
                value={newLeagueName} 
                onChange={(e) => setNewLeagueName(e.target.value.toUpperCase())} 
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-8 text-[14px] text-white font-black tracking-tight focus:outline-none focus:border-[#5E6CFF]/60 transition-all placeholder:text-gray-800" 
                required 
                disabled={isSubmitting}
              />
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] px-1 block">IDENTIDADE (BRASÃO)</label>
              <div 
                onClick={() => !isSubmitting && fileInputRef.current?.click()}
                className={`w-full bg-white/5 border-2 border-dashed rounded-[2.5rem] p-10 flex flex-col items-center justify-center gap-6 cursor-pointer transition-all group ${leagueImage ? 'border-[#5E6CFF]/50' : 'border-white/5 hover:border-[#5E6CFF]/40'}`}
              >
                <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />
                {leagueImage ? (
                  <div className="w-24 h-24 rounded-3xl overflow-hidden border-2 border-black bg-black shadow-lg">
                    <img src={leagueImage} className="w-full h-full object-cover" alt="Preview" />
                  </div>
                ) : (
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto group-hover:scale-110 group-hover:bg-[#5E6CFF]/10 transition-all">
                      <i className="fa-solid fa-upload text-xl text-gray-700 group-hover:text-[#5E6CFF]"></i>
                    </div>
                    <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest">SUBIR PNG / JPG</p>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] px-1 block">MECÂNICA DE DISPUTA</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div onClick={() => !isSubmitting && setNewLeagueFormat('continuo')} className={`relative p-6 rounded-3xl border-2 transition-all cursor-pointer ${newLeagueFormat === 'continuo' ? 'bg-[#5E6CFF]/[0.06] border-[#5E6CFF]/60 shadow-[0_0_20px_rgba(94,108,255,0.05)]' : 'bg-white/5 border-transparent hover:border-white/10'}`}>
                  <div className="flex items-start gap-4">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${newLeagueFormat === 'continuo' ? 'border-[#5E6CFF]' : 'border-gray-800'}`}>
                      {newLeagueFormat === 'continuo' && <div className="w-2.5 h-2.5 bg-[#5E6CFF] rounded-full animate-pulse shadow-[0_0_8px_#5E6CFF]"></div>}
                    </div>
                    <div>
                      <h4 className={`text-[13px] font-orbitron font-black uppercase mb-1 ${newLeagueFormat === 'continuo' ? 'text-white' : 'text-gray-600'}`}>CONTÍNUO</h4>
                      <p className="text-[10px] font-medium text-gray-500 leading-snug uppercase tracking-tight">Soma todas as pontuações ao longo da Etapa.</p>
                    </div>
                  </div>
                </div>
                <div onClick={() => !isSubmitting && setNewLeagueFormat('limitado')} className={`relative p-6 rounded-3xl border-2 transition-all cursor-pointer ${newLeagueFormat === 'limitado' ? 'bg-[#5E6CFF]/[0.06] border-[#5E6CFF]/60 shadow-[0_0_20px_rgba(94,108,255,0.05)]' : 'bg-white/5 border-transparent hover:border-white/10'}`}>
                  <div className="flex items-start gap-4">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${newLeagueFormat === 'limitado' ? 'border-[#5E6CFF]' : 'border-gray-800'}`}>
                      {newLeagueFormat === 'limitado' && <div className="w-2.5 h-2.5 bg-[#5E6CFF] rounded-full animate-pulse shadow-[0_0_8px_#5E6CFF]"></div>}
                    </div>
                    <div>
                      <h4 className={`text-[13px] font-orbitron font-black uppercase mb-1 ${newLeagueFormat === 'limitado' ? 'text-white' : 'text-gray-600'}`}>LIMITADO</h4>
                      <p className="text-[10px] font-medium text-gray-500 leading-snug uppercase tracking-tight">Conta apenas após o ingresso na Liga.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 flex flex-col items-center gap-6 pb-6">
              <button 
                type="submit" 
                disabled={isSubmitting || !newLeagueName}
                className={`group relative w-full py-6 rounded-2xl font-orbitron font-black text-sm md:text-base uppercase tracking-[0.4em] transition-all duration-500 ${
                  submitStatus === 'success' ? 'bg-green-600 text-white' : isSubmitting ? 'bg-gray-800 text-gray-600' : 'bg-[#5E6CFF] text-black shadow-[0_20px_50px_rgba(94,108,255,0.4)] hover:scale-[1.01] active:scale-95'
                }`}
              >
                {submitStatus === 'loading' ? 'PROCESSANDO...' : submitStatus === 'success' ? 'LIGA FUNDADA!' : 'CONFIRMAR FUNDAÇÃO'}
              </button>
              <button type="button" onClick={triggerClose} className="text-[10px] font-black text-gray-700 uppercase tracking-[0.4em] hover:text-white transition-all underline underline-offset-8 decoration-[#5E6CFF]/20">ABORTAR OPERAÇÃO</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateLeagueModal;
