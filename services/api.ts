
import { Player, UserTeam, Role } from '../types';

/**
 * CONFIGURAÇÃO DO BACKEND KINGS LENDAS 2026
 */
const SUPABASE_URL = 'https://xfkjdzeclvdyjxjpllbb.supabase.co';
const SUPABASE_ANON_KEY: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhma2pkemVjbHZkeWp4anBsbGJiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc2NDUzMDUsImV4cCI6MjA4MzIyMTMwNX0.szByBteMU7eQEj4so-4L4jWWgrhB2f5JU82oludfZfc';

export const DataService = {
  SUPABASE_URL,
  
  getActiveKey() {
    return SUPABASE_ANON_KEY;
  },

  getStorageUrl(bucket: 'players' | 'teams' | 'avatars', path: string): string {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    const cleanPath = path.startsWith('/') ? path.substring(1) : path;
    return `${SUPABASE_URL}/storage/v1/object/public/${bucket}/${cleanPath}`;
  },

  async checkConnection(): Promise<{ok: boolean, error?: string}> {
    const key = this.getActiveKey();
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/players?select=id&limit=1`, {
        headers: { 'apikey': key, 'Authorization': `Bearer ${key}` }
      });
      return { ok: res.ok };
    } catch (e) {
      return { ok: false, error: 'Erro de rede' };
    }
  },

  async checkTeamNameExists(name: string): Promise<boolean> {
    const key = this.getActiveKey();
    try {
      // Verifica na tabela user_teams se existe algum time com este nome (case insensitive se possível, ou exato)
      const response = await fetch(`${SUPABASE_URL}/rest/v1/user_teams?team_name=eq.${encodeURIComponent(name)}&select=id`, {
        headers: { 
          'apikey': key, 
          'Authorization': `Bearer ${key}`
        }
      });
      
      if (!response.ok) return false;
      const data = await response.json();
      return data.length > 0;
    } catch (error) {
      console.error("Erro ao verificar nome do time:", error);
      return false;
    }
  },

  async getTeams(): Promise<{id: string, name: string, logo: string}[]> {
    const key = this.getActiveKey();
    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/teams?select=*`, {
        headers: { 'apikey': key, 'Authorization': `Bearer ${key}` }
      });
      if (!response.ok) return [];
      const data = await response.json();
      return data.map((t: any) => ({
        id: t.id.toString(),
        name: t.name,
        logo: this.getStorageUrl('teams', t.logo_url)
      }));
    } catch (e) {
      console.error("Erro ao buscar times:", e);
      return [];
    }
  },

  async getPlayers(): Promise<Player[]> {
    const key = this.getActiveKey();
    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/players?select=*,teams(*)`, {
        headers: {
          'apikey': key,
          'Authorization': `Bearer ${key}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) return [];
      
      const rawData = await response.json();
      return rawData.map((item: any) => {
        const teamData = item.teams || item.team || {};
        let mappedRole = Role.TOP;
        const dbRole = (item.role || 'TOP').toUpperCase();
        if (dbRole.includes('JNG')) mappedRole = Role.JNG;
        else if (dbRole.includes('MID')) mappedRole = Role.MID;
        else if (dbRole.includes('ADC')) mappedRole = Role.ADC;
        else if (dbRole.includes('SUP')) mappedRole = Role.SUP;

        return {
          id: item.id.toString(),
          name: item.name,
          role: mappedRole,
          price: Number(item.price),
          points: Number(item.points),
          avgPoints: Number(item.avg_points),
          kda: item.kda,
          image: this.getStorageUrl('players', item.image),
          team: teamData.name || 'Sem Time',
          teamLogo: this.getStorageUrl('teams', teamData.logo_url)
        };
      });
    } catch (error) {
      return [];
    }
  },

  async saveUserTeam(team: UserTeam): Promise<boolean> {
    const key = this.getActiveKey();
    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/user_teams`, {
        method: 'POST',
        headers: {
          'apikey': key,
          'Authorization': `Bearer ${key}`,
          'Content-Type': 'application/json',
          'Prefer': 'resolution=merge-duplicates'
        },
        body: JSON.stringify({
          user_id: team.userId,
          team_name: team.name,
          budget: team.budget,
          total_points: team.totalPoints,
          lineup: team.players,
          favorite_team: team.favoriteTeam,
          avatar: team.avatar // Garante que o avatar seja salvo também
        })
      });
      return response.ok;
    } catch (error) {
      return false;
    }
  }
};
