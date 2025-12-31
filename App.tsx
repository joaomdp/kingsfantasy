
import React, { useState, useEffect } from 'react';
import { Page, UserTeam, Player, Role } from './types';
import { INITIAL_BUDGET, MOCK_PLAYERS } from './constants';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Market from './components/Market';
import SquadBuilder from './components/SquadBuilder';
import Ranking from './components/Ranking';
import AICoach from './components/AICoach';
import Profile from './components/Profile';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [userTeam, setUserTeam] = useState<UserTeam>({
    id: 'u1',
    userId: 'current-user',
    userName: 'HAKKAI',
    name: 'GOATEAM',
    avatar: 'https://picsum.photos/seed/user/100',
    rank: 'PLATINA I',
    players: {},
    budget: INITIAL_BUDGET,
    totalPoints: 897.58,
  });

  // Resetar scroll ao mudar de página - Forçado para o topo
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handleHirePlayer = (player: Player) => {
    if (userTeam.budget < player.price) {
      alert('Orçamento insuficiente!');
      return;
    }
    const currentPlayerInRole = userTeam.players[player.role];
    let newBudget = userTeam.budget;
    if (currentPlayerInRole) {
      newBudget += currentPlayerInRole.price;
    }
    newBudget -= player.price;
    setUserTeam({
      ...userTeam,
      players: { ...userTeam.players, [player.role]: player },
      budget: newBudget,
    });
  };

  const handleFirePlayer = (role: Role) => {
    const playerToFire = userTeam.players[role];
    if (!playerToFire) return;
    setUserTeam({
      ...userTeam,
      budget: userTeam.budget + playerToFire.price,
      players: { ...userTeam.players, [role]: undefined },
    });
  };

  const handleUpdateProfile = (data: Partial<UserTeam>) => {
    setUserTeam({ ...userTeam, ...data });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard userTeam={userTeam} onNavigate={setCurrentPage} />;
      case 'market':
        return <Market players={MOCK_PLAYERS} userTeam={userTeam} onHire={handleHirePlayer} onFire={handleFirePlayer} />;
      case 'squad':
        return <SquadBuilder userTeam={userTeam} onFire={handleFirePlayer} onNavigateToMarket={() => setCurrentPage('market')} />;
      case 'ranking':
        return <Ranking />;
      case 'ai-coach':
        return <AICoach userTeam={userTeam} />;
      case 'profile':
        return <Profile userTeam={userTeam} onUpdate={handleUpdateProfile} />;
      default:
        return <Dashboard userTeam={userTeam} onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#050505] text-[#f0f0f0]">
      <Header 
        activePage={currentPage} 
        onNavigate={setCurrentPage} 
        teamName={userTeam.name}
        rank={userTeam.rank}
        avatar={userTeam.avatar}
      />
      
      <main className="flex-1 w-full max-w-[1440px] mx-auto px-6 md:px-12 py-12">
        <div key={currentPage} className="page-transition-container">
          {renderPage()}
        </div>
      </main>

      <footer className="py-20 border-t border-white/5 text-center bg-black/40">
        <div className="max-w-[1440px] mx-auto px-8">
          <div className="flex flex-wrap justify-center gap-12 mb-10 font-black text-gray-500 text-xs tracking-[0.1em] uppercase">
            <a href="#" className="hover:text-gold transition-colors">Regras</a>
            <a href="#" className="hover:text-gold transition-colors">Privacidade</a>
            <a href="#" className="hover:text-gold transition-colors">Termos de Uso</a>
            <a href="#" className="hover:text-gold transition-colors">Suporte</a>
          </div>
          <p className="text-[11px] text-gray-700 max-w-3xl mx-auto leading-loose font-medium">
            O KINGS LENDAS FANTASY É OPERADO DE FORMA INDEPENDENTE. 
            © 2026 KINGS LENDAS. LEAGUE OF LEGENDS E MARCAS ASSOCIADAS SÃO PROPRIEDADES DA RIOT GAMES, INC.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
