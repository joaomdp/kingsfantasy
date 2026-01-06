
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
  const [dbStatus, setDbStatus] = useState<'connected' | 'offline' | 'loading'>('loading');

  const [userTeam, setUserTeam] = useState<UserTeam>({
    id: 'u1',
    userId: 'current-user',
    userName: 'HAKKAI',
    name: 'GOATEAM',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Hakkai',
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
        setDbStatus('loading');
        const data = await DataService.getPlayers();
        
        if (data && data.length > 0) {
          setPlayers(data);
          setDbStatus('connected');
        } else {
          // Se não houver dados no banco, usa os mocks mas avisa que está offline/mock
          setPlayers(MOCK_PLAYERS);
          setDbStatus('offline');
        }
      } catch (error) {
        setPlayers(MOCK_PLAYERS);
        setDbStatus('offline');
      } finally {
        setTimeout(() => setIsLoading(false), 1200);
      }
    };

    fetchData();
  }, []);

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
            onClear={() => setUserTeam({...userTeam, budget: INITIAL_BUDGET, players: {}})}
            onConfirm={() => { alert("Time confirmado!"); setCurrentPage('dashboard'); }}
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
        dbConnected={dbStatus === 'connected'}
      />
      
      <main className="flex-1 w-full max-w-[1440px] mx-auto px-6 md:px-12 py-12">
        {dbStatus === 'offline' && (
          <div className="mb-8 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <i className="fa-solid fa-triangle-exclamation text-yellow-500"></i>
              <p className="text-[10px] font-black text-yellow-500 uppercase tracking-widest">
                Exibindo jogadores de demonstração. Conecte seu Supabase para ver dados reais.
              </p>
            </div>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-1.5 bg-yellow-500 text-black text-[9px] font-black rounded-lg uppercase tracking-widest hover:scale-105 transition-transform"
            >
              Recarregar
            </button>
          </div>
        )}
        
        <div key={currentPage} className="page-transition-container">
          {renderPage()}
        </div>
      </main>

      <footer className="py-20 border-t border-white/5 text-center bg-black/60 backdrop-blur-md">
        <div className="max-w-[1440px] mx-auto px-8">
          <p className="text-[11px] text-gray-700 max-w-3xl mx-auto leading-loose font-medium uppercase tracking-widest">
            © 2026 KINGS LENDAS FANTASY • SISTEMA SINCRONIZADO VIA SUPABASE CLOUD
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
