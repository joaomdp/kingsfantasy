
import React from 'react';
import { Page } from '../types';

interface HeaderProps {
  activePage: Page;
  onNavigate: (page: Page) => void;
  userName: string;
  avatar: string;
}

const Logo: React.FC = () => {
  const [error, setError] = React.useState(false);

  return (
    <div className="flex items-center gap-4 group">
      <div className="relative h-14 md:h-16 flex items-center transition-all duration-500 group-hover:drop-shadow-[0_0_15px_rgba(200,155,60,0.5)] group-hover:scale-105">
        {!error ? (
          <img 
            src="logo.png" 
            alt="Kings Lendas Logo" 
            className="h-full w-auto object-contain"
            onError={() => setError(true)}
          />
        ) : (
          <div className="flex flex-col">
            <span className="font-orbitron font-black text-white text-xl tracking-tighter leading-none group-hover:text-gold transition-colors">KINGS LENDAS</span>
            <span className="text-[10px] font-black text-gold tracking-[0.3em] uppercase">FANTASY</span>
          </div>
        )}
      </div>
      
      <div className="hidden sm:flex flex-col border-l border-white/10 pl-4 py-1">
        <div className="flex items-center gap-2">
          <span className="font-orbitron font-black text-white text-sm tracking-widest leading-none">OFFICIAL</span>
          <div className="bg-gold/10 px-1.5 py-0.5 rounded text-[7px] font-black text-gold border border-gold/20">2025</div>
        </div>
        <span className="text-[8px] font-black text-gray-500 tracking-[0.3em] uppercase mt-1">League of Legends Amateur</span>
      </div>
    </div>
  );
};

const Header: React.FC<HeaderProps> = ({ activePage, onNavigate, userName, avatar }) => {
  const navItems: { id: Page; label: string }[] = [
    { id: 'dashboard', label: 'Início' },
    { id: 'ranking', label: 'Ligas' },
    { id: 'squad', label: 'Meu Time' },
    { id: 'market', label: 'Mercado' },
    { id: 'ai-coach', label: 'Coach AI' },
  ];

  return (
    <header className="bg-black/90 border-b border-white/5 sticky top-0 z-50 backdrop-blur-3xl h-24">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 h-full flex items-center justify-between">
        <div 
          className="flex items-center cursor-pointer py-2" 
          onClick={() => onNavigate('dashboard')}
        >
          <Logo />
        </div>

        <nav className="hidden lg:flex items-center gap-2 h-full">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`h-full px-6 flex flex-col justify-center items-center text-[11px] font-black uppercase tracking-[0.2em] relative transition-all duration-300 group ${
                activePage === item.id ? 'text-white' : 'text-gray-500 hover:text-gray-200'
              }`}
            >
              <span className="relative z-10">{item.label}</span>
              {activePage === item.id && (
                <div className="absolute bottom-0 left-4 right-4 h-1 bg-gold shadow-[0_0_20px_rgba(200,155,60,1)] rounded-t-full"></div>
              )}
              <div className="absolute inset-0 bg-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-4 md:gap-8">
          <div className="hidden xl:flex flex-col text-right border-r border-white/10 pr-8">
             <span className="text-[10px] font-black text-gold tracking-widest uppercase">SEASON ONE</span>
             <div className="flex items-center justify-end gap-1.5 mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-[9px] font-bold text-gray-500 uppercase">Live Stats</span>
             </div>
          </div>
          
          <div 
            className={`flex items-center gap-4 cursor-pointer group px-4 py-2 rounded-2xl transition-all border ${activePage === 'profile' ? 'bg-white/5 border-white/10' : 'border-transparent hover:bg-white/5'}`}
            onClick={() => onNavigate('profile')}
          >
             <div className="relative">
               <img src={avatar} className={`w-11 h-11 rounded-xl object-cover border-2 transition-all ${activePage === 'profile' ? 'border-gold shadow-[0_0_20px_rgba(200,155,60,0.4)]' : 'border-white/10 group-hover:border-gold/50'}`} alt="User Avatar" />
               <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-black rounded-full shadow-lg"></div>
             </div>
             <div className="hidden sm:block text-left">
                <p className="text-[11px] font-black text-white uppercase tracking-tight leading-none mb-1">{userName}</p>
                <p className="text-[9px] text-gold font-bold uppercase tracking-widest">Level 42</p>
             </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
