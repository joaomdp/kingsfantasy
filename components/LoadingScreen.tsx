
import React from 'react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[1000] bg-[#020202] flex flex-col items-center justify-center overflow-hidden">
      {/* Background Patterns for continuity */}
      <div className="bg-pattern-halftone absolute inset-0 opacity-10"></div>
      <div className="bg-pattern-grid absolute inset-0 opacity-5"></div>
      
      <div className="relative flex flex-col items-center">
        {/* Logo Container with Glow */}
        <div className="relative group mb-12">
          <div className="absolute inset-0 bg-[#bc13fe]/20 blur-[60px] rounded-full animate-pulse"></div>
          <img 
            src="https://raw.githubusercontent.com/joaomdp/kingsfantasy/main/times/logo.png" 
            className="relative z-10 w-24 h-24 md:w-32 md:h-32 object-contain invert-[0.1] sepia-[1] saturate-[5] hue-rotate-[240deg] drop-shadow-[0_0_20px_rgba(188,19,254,0.4)]" 
            alt="Kings Lendas Logo" 
          />
        </div>

        {/* Text and Simple Loader */}
        <div className="text-center space-y-6 relative z-10">
          <div className="flex flex-col items-center">
            <h2 className="font-orbitron font-black text-white text-xl md:text-2xl tracking-[0.4em] uppercase opacity-90">
              KINGS <span className="text-[#bc13fe]">LENDAS</span>
            </h2>
            <div className="flex items-center gap-1 mt-2">
               <span className="text-[10px] font-black text-gray-600 uppercase tracking-[0.3em]">Carregando</span>
               <span className="flex gap-1">
                 <span className="w-0.5 h-0.5 bg-[#bc13fe] rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                 <span className="w-0.5 h-0.5 bg-[#bc13fe] rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                 <span className="w-0.5 h-0.5 bg-[#bc13fe] rounded-full animate-bounce"></span>
               </span>
            </div>
          </div>
        </div>
      </div>

      {/* Modern Slim Progress Bar at Bottom */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/5">
        <div className="h-full bg-[#bc13fe] shadow-[0_0_15px_#bc13fe] animate-[progress_2s_ease-in-out_infinite]"></div>
      </div>

      <style>{`
        @keyframes progress {
          0% { width: 0%; left: 0%; }
          50% { width: 30%; left: 35%; }
          100% { width: 0%; left: 100%; }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
