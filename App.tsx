
import React, { useState, useEffect, useCallback } from 'react';
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
import CreateLeagueModal from './components/CreateLeagueModal';
import LoadingScreen from './components/LoadingScreen';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [players, setPlayers] = useState<Player[]>(MOCK_PLAYERS);
  const [isLoading, setIsLoading] = useState(true);
  const [isMarketOpen, setIsMarketOpen] = useState(true);
  const [dbConnected, setDbConnected] = useState(false);
  const [isCreateLeagueOpen, setIsCreateLeagueOpen] = useState(false);

  const [userTeam, setUserTeam] = useState<UserTeam>({
    id: 'u1',
    userId: 'current-user',
    userName: 'HAKKAI',
    name: 'GOATEAM',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Hakkai',
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

  const fetchPlayers = useCallback(async () => {
    try {
      const conn = await DataService.checkConnection();
      setDbConnected(conn.ok);
      if (conn.ok) {
        const data = await DataService.getPlayers();
        if (data && data.length > 0) setPlayers(data);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Falha ao buscar jogadores:", error);
      return false;
    }
  }, []);

  useEffect(() => {
    fetchPlayers();
    setTimeout(() => setIsLoading(false), 300);
  }, [fetchPlayers]);

  const handleOpenChampionSelector = (player: Player) => {
    if (!isMarketOpen) return;
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
    if (currentPlayerInRole) newBudget += currentPlayerInRole.price;
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
    if (!isMarketOpen) return;
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

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard': return <Dashboard userTeam={userTeam} onNavigate={setCurrentPage} />;
      case 'market': return <Market players={players} userTeam={userTeam} onHire={handleOpenChampionSelector} onFire={handleFirePlayer} onClear={() => isMarketOpen && setUserTeam({...userTeam, budget: INITIAL_BUDGET, players: {}})} onConfirm={() => { alert("Time confirmado!"); setCurrentPage('dashboard'); }} onRefresh={fetchPlayers} />;
      case 'squad': return <SquadBuilder userTeam={userTeam} onFire={handleFirePlayer} onNavigateToMarket={() => setCurrentPage('market')} />;
      case 'ranking': return <Ranking onOpenCreateLeague={() => setIsCreateLeagueOpen(true)} />;
      case 'ai-coach': return <AICoach userTeam={userTeam} />;
      case 'profile': return <Profile userTeam={userTeam} onUpdate={(data) => { const updated = { ...userTeam, ...data }; setUserTeam(updated); DataService.saveUserTeam(updated); }} onLogout={() => { if (window.confirm("Tem certeza que deseja sair?")) { DataService.setLocalKey(''); window.location.reload(); } }} />;
      default: return <Dashboard userTeam={userTeam} onNavigate={setCurrentPage} />;
    }
  };

  if (isLoading) return <LoadingScreen />;

  return (
    <div className="flex flex-col min-h-screen bg-transparent text-[#f0f0f0]">
      {/* MODAIS GLOBAIS NA RAIZ - ISSO GARANTE QUE ELES CUBRAM TUDO E O BLUR SEJA PERFEITO */}
      {pendingPlayer && (
        <ChampionSelector 
          playerName={pendingPlayer.name}
          onSelect={handleHirePlayer}
          onClose={() => setPendingPlayer(null)}
        />
      )}

      {isCreateLeagueOpen && (
        <CreateLeagueModal 
          onClose={() => setIsCreateLeagueOpen(false)}
          onSuccess={() => {
            console.log("Liga criada com sucesso!");
            // Aqui você poderia dar refresh nas ligas se necessário
          }}
        />
      )}

      <Header activePage={currentPage} onNavigate={setCurrentPage} userName={userTeam.userName} avatar={userTeam.avatar} dbConnected={dbConnected} />
      
      <main className="flex-1 w-full max-w-[1440px] mx-auto px-6 md:px-12 py-12">
        <div key={currentPage} className="page-transition-container">
          {renderPage()}
        </div>
      </main>

      <footer className="py-20 border-t border-white/5 text-center bg-black/60 backdrop-blur-md">
        <div className="max-w-[1440px] mx-auto px-8">
          <p className="text-[11px] text-gray-700 max-w-3xl mx-auto leading-loose font-medium uppercase tracking-widest">© 2026 KINGS LENDAS FANTASY • AMÉRICA LATINA COMPETITIVA</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
