
import React, { useState } from 'react';
import { Page } from '../types';

interface HeaderProps {
  activePage: Page;
  onNavigate: (page: Page) => void;
  userName: string;
  rank: string;
  avatar: string;
  dbConnected?: boolean;
}

const Logo: React.FC = () => {
  const [hasError, setHasError] = useState(false);
  const logoUrl = "https://raw.githubusercontent.com/joaomdp/kingsfantasy/main/times/logo.png"; 

  return (
    <div className="flex items-center gap-6 group">
      <div className="relative h-16 md:h-20 flex items-center transition-all duration-500 group-hover:scale-105">
        {!hasError ? (
          <div className="relative h-full flex items-center">
            <div className="absolute inset-0 bg-gold/10 blur-[40px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <img 
              src={logoUrl} 
              alt="Kings Lendas Fantasy Logo" 
              className="relative z-10 h-full w-auto object-contain transition-all duration-500 drop-shadow-[0_0_15px_rgba(200,155,60,0.25)] group-hover:drop-shadow-[0_0_25px_rgba(200,155,60,0.45)]"
              onError={() => setHasError(true)}
            />
          </div>
        ) : (
          <div className="flex flex-col">
            <span className="font-orbitron font-black text-white text-2xl tracking-tighter leading-none group-hover:text-gold transition-colors uppercase">KINGS LENDAS</span>
            <span className="text-[11px] font-black text-gold tracking-[0.1em] uppercase">FANTASY</span>
          </div>
        )}
      </div>
    </div>
  );
};

const Header: React.FC<HeaderProps> = ({ activePage, onNavigate, userName, rank, avatar, dbConnected = true }) => {
  const navItems: { id: Page; label: string }[] = [
    { id: 'dashboard', label: 'Início' },
    { id: 'ranking', label: 'Ligas' },
    { id: 'squad', label: 'Time' },
    { id: 'market', label: 'Mercado' },
    { id: 'ai-coach', label: 'Coach' },
  ];

  return (
    <header className="bg-black/95 border-b border-white/5 sticky top-0 z-50 backdrop-blur-md h-28">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 h-full flex items-center justify-between">
        
        <div 
          className="flex items-center cursor-pointer shrink-0 h-full" 
          onClick={() => onNavigate('dashboard')}
        >
          <Logo />
        </div>

        <nav className="hidden lg:flex items-center h-full">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`h-full px-7 flex items-center justify-center text-[13px] font-black uppercase tracking-[0.1em] transition-all duration-300 ${
                activePage === item.id 
                  ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]' 
                  : 'text-gray-500 hover:text-gray-200'
              }`}
            >
              <span className="relative z-10">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-10">
          <div className="hidden xl:flex flex-col text-right border-r border-white/10 pr-10">
             <span className="text-[10px] font-black text-gold tracking-wider uppercase">
               {dbConnected ? 'CONEXÃO ATIVA' : 'MODO OFFLINE'}
             </span>
             <div className="flex items-center justify-end gap-1.5 mt-1.5">
                <span className={`w-2 h-2 rounded-full animate-pulse shadow-lg ${dbConnected ? 'bg-green-500 shadow-green-500/50' : 'bg-red-500 shadow-red-500/50'}`}></span>
                <span className="text-[10px] font-bold text-gray-600 uppercase tracking-tight">
                  {dbConnected ? 'Database Sync' : 'Reconectando...'}
                </span>
             </div>
          </div>
          
          <div 
            className={`flex items-center gap-5 cursor-pointer group p-2.5 rounded-2xl transition-all border ${activePage === 'profile' ? 'bg-white/5 border-white/10' : 'border-transparent hover:bg-white/5'}`}
            onClick={() => onNavigate('profile')}
          >
             <div className="relative shrink-0">
               <img 
                 src={avatar} 
                 className={`w-11 h-11 rounded-xl object-cover border-2 transition-all ${activePage === 'profile' ? 'border-gold shadow-[0_0_20px_rgba(200,155,60,0.4)]' : 'border-white/10 group-hover:border-gold/50'}`} 
                 alt="Avatar" 
               />
               <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-black rounded-full shadow-lg"></div>
             </div>
             <div className="hidden sm:block text-left">
                <p className="text-[12px] font-black text-white uppercase tracking-tight leading-none mb-1 group-hover:text-gold transition-colors">{userName}</p>
                <div className="flex items-center gap-1.5">
                  <i className="fa-solid fa-medal text-[9px] text-gold/80"></i>
                  <span className="text-[10px] text-gold font-black uppercase tracking-widest">{rank}</span>
                </div>
             </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
