
import React from 'react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[1000] bg-[#020202] flex flex-col items-center justify-center overflow-hidden">
      <div className="bg-pattern-halftone absolute inset-0 opacity-20"></div>
      
      <div className="relative">
        {/* Hextech Spinner */}
        <div className="w-32 h-32 relative">
          <div className="absolute inset-0 border-4 border-[#c89b3c]/10 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-t-[#c89b3c] rounded-full animate-spin"></div>
          <div className="absolute inset-4 border-2 border-b-cyan-500/50 rounded-full animate-[spin_2s_linear_infinite_reverse]"></div>
          
          <div className="absolute inset-0 flex items-center justify-center">
             <img 
               src="https://raw.githubusercontent.com/joaomdp/kingsfantasy/main/times/logo.png" 
               className="w-12 h-12 object-contain animate-pulse" 
               alt="Logo" 
             />
          </div>
        </div>

        {/* Scan line effect */}
        <div className="absolute -inset-10 pointer-events-none">
          <div className="w-full h-px bg-cyan-500/20 blur-sm animate-[scan_2s_ease-in-out_infinite]"></div>
        </div>
      </div>

      <div className="mt-12 text-center space-y-4 relative z-10">
        <h2 className="font-orbitron font-black text-white text-xl tracking-[0.3em] uppercase">Sincronizando Dados</h2>
        <div className="flex items-center justify-center gap-1.5">
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping"></div>
          <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Conectando ao Kings-DB-01</span>
        </div>
      </div>

      <style>{`
        @keyframes scan {
          0% { transform: translateY(0); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(200px); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
