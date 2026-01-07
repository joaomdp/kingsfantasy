
import { Player, UserTeam, Role } from '../types';

/**
 * CONFIGURAÇÃO DO BACKEND
 * Cole sua 'anon public' key aqui para que o site conecte automaticamente para todos.
 */
const SUPABASE_URL = 'https://xfkjdzeclvdyjxjpllbb.supabase.co';
// Explicitly typed as string to prevent literal type inference and subsequent 'never' type error when checking length
const SUPABASE_ANON_KEY: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhma2pkemVjbHZkeWp4anBsbGJiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc2NDUzMDUsImV4cCI6MjA4MzIyMTMwNX0.szByBteMU7eQEj4so-4L4jWWgrhB2f5JU82oludfZfc'; // <--- COLE SUA CHAVE AQUI (Começa com 'ey...')

// Função para obter a chave ativa
const getActiveKey = () => {
  // 1. Tenta a chave hardcoded acima
  if (SUPABASE_ANON_KEY && SUPABASE_ANON_KEY.length > 20) return SUPABASE_ANON_KEY;
  // 2. Tenta localStorage (fallback para testes do dev)
  const localKey = localStorage.getItem('supabase_anon_key');
  if (localKey) return localKey;
  // 3. Tenta variável de ambiente
  return process.env.SUPABASE_ANON_KEY || '';
};

export const DataService = {
  getStorageUrl(bucket: 'players' | 'teams' | 'avatars', path: string): string {
    if (!path || !SUPABASE_URL) return '';
    if (path.startsWith('http')) return path;
    const cleanPath = path.startsWith('/') ? path.substring(1) : path;
    return `${SUPABASE_URL}/storage/v1/object/public/${bucket}/${cleanPath}`;
  },

  // Método para o desenvolvedor setar a chave via console se necessário
  setDevKey(key: string) {
    localStorage.setItem('supabase_anon_key', key);
    window.location.reload();
  },

  // Added setLocalKey method to fix the missing property error in App.tsx
  setLocalKey(key: string) {
    localStorage.setItem('supabase_anon_key', key);
  },

  async checkConnection(): Promise<{ok: boolean, error?: string}> {
    const key = getActiveKey();
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
    const key = getActiveKey();
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
      if (!Array.isArray(rawData)) return [];

      return rawData.map((item: any) => {
        const teamData = item.teams || item.team || {};
        
        let mappedRole = Role.TOP;
        const dbRole = (item.role || 'TOP').toUpperCase();
        if (dbRole.includes('JNG') || dbRole.includes('JUNGLE')) mappedRole = Role.JNG;
        else if (dbRole.includes('MID')) mappedRole = Role.MID;
        else if (dbRole.includes('ADC') || dbRole.includes('BOT')) mappedRole = Role.ADC;
        else if (dbRole.includes('SUP') || dbRole.includes('SUPORTE')) mappedRole = Role.SUP;

        return {
          id: item.id.toString(),
          name: item.name || 'Invocador',
          role: mappedRole,
          price: Number(item.price || 0),
          points: Number(item.points || 0),
          avgPoints: Number(item.avg_points || 0),
          kda: item.kda || '0.0',
          image: this.getStorageUrl('players', item.image || ''),
          team: teamData.name || 'Sem Time',
          teamLogo: this.getStorageUrl('teams', teamData.logo_url || teamData.logo || '')
        };
      });
    } catch (error) {
      return [];
    }
  },

  async saveUserTeam(team: UserTeam): Promise<boolean> {
    const key = getActiveKey();
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
