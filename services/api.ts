
import { Player, UserTeam } from '../types';
import { MOCK_PLAYERS } from '../constants';

const SUPABASE_URL = 'https://xfkjdzeclvdyjxjpllbb.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhma2pkemVjbHZkeWp4anBsbGJiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc2NDUzMDUsImV4cCI6MjA4MzIyMTMwNX0.szByBteMU7eQEj4so-4L4jWWgrhB2f5JU82oludfZfc'; 

export const DataService = {
  /**
   * Helper para gerar a URL pública de um arquivo no Supabase Storage.
   * Certifique-se de que o bucket está definido como PUBLIC no painel do Supabase.
   */
  getStorageUrl(bucket: 'players' | 'teams' | 'avatars', path: string): string {
    if (!path) return '';
    // Se já for uma URL completa, não altera
    if (path.startsWith('http')) return path;
    
    // Remove possíveis barras iniciais para evitar URLs malformadas
    const cleanPath = path.startsWith('/') ? path.substring(1) : path;
    const url = `${SUPABASE_URL}/storage/v1/object/public/${bucket}/${cleanPath}`;
    
    return url;
  },

  /**
   * Busca jogadores convertendo caminhos do banco em URLs do Storage.
   * Se a tabela 'players' não existir ou estiver vazia, retorna array vazio.
   */
  async getPlayers(): Promise<Player[]> {
    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/players?select=*,team:teams(*)`, {
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        console.warn("API Supabase retornou erro. Verifique se as tabelas 'players' e 'teams' existem.");
        return [];
      }
      
      const data = await response.json();
      
      if (!data || data.length === 0) {
        console.info("Nenhum jogador encontrado na tabela 'players'. Usando dados locais.");
        return [];
      }
      
      return data.map((item: any) => ({
        id: item.id?.toString() || Math.random().toString(),
        name: item.name,
        role: item.role,
        team: item.team?.name || 'Sem Time',
        teamLogo: this.getStorageUrl('teams', item.team?.logo_url || ''),
        price: Number(item.price) || 0,
        points: Number(item.points) || 0,
        avgPoints: Number(item.avg_points) || 0,
        kda: item.kda || '0.0',
        image: this.getStorageUrl('players', item.image)
      }));
    } catch (error) {
      console.error("Erro crítico de conexão com Supabase:", error);
      return [];
    }
  },

  async saveUserTeam(team: UserTeam): Promise<boolean> {
    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/user_teams`, {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': 'resolution=merge-duplicates'
        },
        body: JSON.stringify({
          user_id: team.userId,
          team_name: team.name,
          budget: team.budget,
          total_points: team.totalPoints,
          lineup: team.players,
          avatar_url: team.avatar
        })
      });
      return response.ok;
    } catch (error) {
      return false;
    }
  }
};
