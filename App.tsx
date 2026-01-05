
import React, { useState, useEffect } from 'react';
import { Page, UserTeam, Player, Role, Champion } from './types';
import { INITIAL_BUDGET, MOCK_PLAYERS } from './constants'; 
import { DataService } from './services/api';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Market from './components/Market';
import SquadBuilder from './components/SquadBuilder';
import Ranking from './components/Ranking';
import AICoach from './components/AICoach';
import Profile from './components/Profile';
import ChampionSelector from './components/ChampionSelector';
import LoadingScreen from './components/LoadingScreen';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [players, setPlayers] = useState<Player[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDbConnected, setIsDbConnected] = useState(false);

  const [userTeam, setUserTeam] = useState<UserTeam>({
    id: 'u1',
    userId: 'current-user',
    userName: 'HAKKAI',
    name: 'GOATEAM',
    avatar: 'https://picsum.photos/seed/user/100',
    rank: 'PLATINA I',
    level: 42,
    honor: 3,
    players: {},
    budget: INITIAL_BUDGET,
    totalPoints: 897.58,
    preferences: {
      publicProfile: true,
      marketNotifications: true,
      compactMode: false
    }
  });

  const [pendingPlayer, setPendingPlayer] = useState<Player | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await DataService.getPlayers();
        
        if (data && data.length > 0) {
          setPlayers(data);
          setIsDbConnected(true);
        } else {
          setPlayers(MOCK_PLAYERS);
          setIsDbConnected(false);
        }
      } catch (error) {
        setPlayers(MOCK_PLAYERS);
        setIsDbConnected(false);
      } finally {
        setTimeout(() => setIsLoading(false), 1500);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handleOpenChampionSelector = (player: Player) => {
    const currentPlayerInRole = userTeam.players[player.role];
    const availableFunds = userTeam.budget + (currentPlayerInRole?.price || 0);
    
    if (availableFunds < player.price) return; 
    setPendingPlayer(player);
  };

  const handleHirePlayer = (champion: Champion) => {
    if (!pendingPlayer) return;

    const playerToHire = { ...pendingPlayer, selectedChampion: champion };
    const currentPlayerInRole = userTeam.players[playerToHire.role];
    let newBudget = userTeam.budget;
    
    if (currentPlayerInRole) {
      newBudget += currentPlayerInRole.price;
    }
    
    newBudget -= playerToHire.price;

    const updatedTeam = {
      ...userTeam,
      players: { ...userTeam.players, [playerToHire.role]: playerToHire },
      budget: newBudget,
    };

    setUserTeam(updatedTeam);
    DataService.saveUserTeam(updatedTeam);
    setPendingPlayer(null);
  };

  const handleFirePlayer = (role: Role) => {
    const playerToFire = userTeam.players[role];
    if (!playerToFire) return;
    
    const updatedTeam = {
      ...userTeam,
      budget: userTeam.budget + playerToFire.price,
      players: { ...userTeam.players, [role]: undefined },
    };
    
    setUserTeam(updatedTeam);
    DataService.saveUserTeam(updatedTeam);
  };

  const handleClearLineup = () => {
    if (Object.keys(userTeam.players).length === 0) return;
    if (window.confirm("Deseja realmente limpar toda a sua escalação?")) {
      const resetTeam = {
        ...userTeam,
        budget: INITIAL_BUDGET,
        players: {},
      };
      setUserTeam(resetTeam);
      DataService.saveUserTeam(resetTeam);
    }
  };

  const handleConfirmLineup = () => {
    const hiredCount = Object.values(userTeam.players).filter(p => !!p).length;
    if (hiredCount < 5) {
      alert("Sua escalação ainda não está completa!");
      return;
    }
    alert("Escalação confirmada com sucesso! Boa sorte na rodada.");
    setCurrentPage('dashboard');
  };

  const handleUpdateProfile = (data: Partial<UserTeam>) => {
    const updated = { ...userTeam, ...data };
    setUserTeam(updated);
    DataService.saveUserTeam(updated);
  };

  const handleLogout = () => {
    if (window.confirm("Tem certeza que deseja sair da conta?")) {
      alert("Deslogado com sucesso.");
      setCurrentPage('dashboard');
    }
  };

  if (isLoading) return <LoadingScreen />;

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard userTeam={userTeam} onNavigate={setCurrentPage} />;
      case 'market':
        return (
          <Market 
            players={players} 
            userTeam={userTeam} 
            onHire={handleOpenChampionSelector} 
            onFire={handleFirePlayer} 
            onClear={handleClearLineup}
            onConfirm={handleConfirmLineup}
          />
        );
      case 'squad':
        return <SquadBuilder userTeam={userTeam} onFire={handleFirePlayer} onNavigateToMarket={() => setCurrentPage('market')} />;
      case 'ranking':
        return <Ranking />;
      case 'ai-coach':
        return <AICoach userTeam={userTeam} />;
      case 'profile':
        return <Profile userTeam={userTeam} onUpdate={handleUpdateProfile} onLogout={handleLogout} />;
      default:
        return <Dashboard userTeam={userTeam} onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-transparent text-[#f0f0f0]">
      {pendingPlayer && (
        <ChampionSelector 
          playerName={pendingPlayer.name}
          onSelect={handleHirePlayer}
          onClose={() => setPendingPlayer(null)}
        />
      )}

      <Header 
        activePage={currentPage} 
        onNavigate={setCurrentPage} 
        userName={userTeam.userName}
        rank={userTeam.rank}
        avatar={userTeam.avatar}
        dbConnected={isDbConnected}
      />
      
      <main className="flex-1 w-full max-w-[1440px] mx-auto px-6 md:px-12 py-12">
        <div key={currentPage} className="page-transition-container">
          {renderPage()}
        </div>
      </main>

      <footer className="py-20 border-t border-white/5 text-center bg-black/60 backdrop-blur-md">
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
