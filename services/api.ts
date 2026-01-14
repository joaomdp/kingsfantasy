
import { Player, UserTeam, Role } from '../types';

/**
 * CONFIGURAÇÃO DO BACKEND
 */
const SUPABASE_URL = 'https://xfkjdzeclvdyjxjpllbb.supabase.co';
const SUPABASE_ANON_KEY: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhma2pkemVjbHZkeWp4anBsbGJiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc2NDUzMDUsImV4cCI6MjA4MzIyMTMwNX0.szByBteMU7eQEj4so-4L4jWWgrhB2f5JU82oludfZfc';

export const DataService = {
  SUPABASE_URL,
  
  getActiveKey() {
    if (SUPABASE_ANON_KEY && SUPABASE_ANON_KEY.length > 20) return SUPABASE_ANON_KEY;
    const localKey = localStorage.getItem('supabase_anon_key');
    if (localKey) return localKey;
    return process.env.SUPABASE_ANON_KEY || '';
  },

  // Retorna a URL base do site atual (seja localhost ou preview)
  getRedirectUrl() {
    return window.location.origin;
  },

  getStorageUrl(bucket: 'players' | 'teams' | 'avatars', path: string): string {
    if (!path || !SUPABASE_URL) return '';
    if (path.startsWith('http')) return path;
    const cleanPath = path.startsWith('/') ? path.substring(1) : path;
    return `${SUPABASE_URL}/storage/v1/object/public/${bucket}/${cleanPath}`;
  },

  async checkConnection(): Promise<{ok: boolean, error?: string}> {
    const key = this.getActiveKey();
    if (!key) return { ok: false, error: 'Chave não configurada' };

    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/players?select=id&limit=1`, {
        headers: { 'apikey': key, 'Authorization': `Bearer ${key}` }
      });
      return { ok: res.ok };
    } catch (e) {
      return { ok: false, error: 'Erro de rede' };
    }
  },

  async getPlayers(): Promise<Player[]> {
    const key = this.getActiveKey();
    if (!key) return [];

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
          team: teamData.name,
          teamLogo: this.getStorageUrl('teams', teamData.logo_url)
        };
      });
    } catch (error) {
      return [];
    }
  },

  async saveUserTeam(team: UserTeam): Promise<boolean> {
    const key = this.getActiveKey();
    if (!key) return false;
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
          lineup: team.players
        })
      });
      return response.ok;
    } catch (error) {
      return false;
    }
  }
};
