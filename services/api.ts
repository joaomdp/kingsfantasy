
import { Player, UserTeam } from '../types';
import { MOCK_PLAYERS } from '../constants';

const SUPABASE_URL = 'https://xfkjdzeclvdyjxjpllbb.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhma2pkemVjbHZkeWp4anBsbGJiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc2NDUzMDUsImV4cCI6MjA4MzIyMTMwNX0.szByBteMU7eQEj4so-4L4jWWgrhB2f5JU82oludfZfc'; 

export const DataService = {
  /**
   * Busca jogadores fazendo um JOIN com a tabela de times
   */
  async getPlayers(): Promise<Player[]> {
    try {
      // Usando a sintaxe do PostgREST para JOIN: select=*,team:teams(*)
      const response = await fetch(`${SUPABASE_URL}/rest/v1/players?select=*,team:teams(*)`, {
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) return [];
      const data = await response.json();
      
      return data.map((item: any) => ({
        id: item.id,
        name: item.name,
        role: item.role,
        team: item.team?.name || 'Sem Time',
        teamLogo: item.team?.logo_url || '',
        price: item.price,
        points: item.points,
        avgPoints: item.avg_points,
        kda: item.kda,
        image: item.image
      }));
    } catch (error) {
      console.error("Erro ao carregar jogadores:", error);
      return [];
    }
  },

  /**
   * Sincronização Relacional:
   * 1. Insere os times únicos
   * 2. Recupera os IDs dos times
   * 3. Insere os jogadores vinculados aos IDs
   */
  async seedDatabase(): Promise<{success: boolean, error?: string}> {
    try {
      console.log("Iniciando seed relacional...");

      // --- ETAPA 1: INSERIR TIMES ---
      const uniqueTeams = Array.from(new Set(MOCK_PLAYERS.map(p => p.team))).map(teamName => {
        const playerWithTeam = MOCK_PLAYERS.find(p => p.team === teamName);
        return {
          name: teamName,
          logo_url: playerWithTeam?.teamLogo || ''
        };
      });

      console.log(`Enviando ${uniqueTeams.length} times...`);
      const teamResponse = await fetch(`${SUPABASE_URL}/rest/v1/teams`, {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=representation' // Precisamos dos IDs de volta
        },
        body: JSON.stringify(uniqueTeams)
      });

      if (!teamResponse.ok) {
        const err = await teamResponse.text();
        return { success: false, error: `Erro nos times: ${err}` };
      }

      const createdTeams = await teamResponse.json();

      // --- ETAPA 2: INSERIR JOGADORES ---
      const playersPayload = MOCK_PLAYERS.map(p => {
        const teamInDb = createdTeams.find((t: any) => t.name === p.team);
        return {
          name: p.name,
          role: p.role,
          team_id: teamInDb?.id, // Vinculando pelo ID da tabela teams
          price: p.price,
          points: p.points,
          avg_points: p.avgPoints,
          kda: p.kda,
          image: p.image
        };
      });

      console.log(`Enviando ${playersPayload.length} jogadores vinculados...`);
      const playerResponse = await fetch(`${SUPABASE_URL}/rest/v1/players`, {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(playersPayload)
      });

      if (!playerResponse.ok) {
        const err = await playerResponse.text();
        return { success: false, error: `Erro nos jogadores: ${err}` };
      }

      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  async saveUserTeam(team: UserTeam): Promise<boolean> {
    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/user_teams`, {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_id: team.userId,
          team_name: team.name,
          budget: team.budget,
          total_points: team.totalPoints,
          lineup: team.players
        })
      });
      return response.ok;
    } catch (error) {
      return false;
    }
  }
};
