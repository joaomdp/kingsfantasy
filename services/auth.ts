
import { DataService } from './api';

export const AuthService = {
  async signUp(email: string, pass: string, userName: string) {
    const key = DataService.getActiveKey();
    try {
      const res = await fetch(`${DataService.SUPABASE_URL}/auth/v1/signup`, {
        method: 'POST',
        headers: { 
          'apikey': key, 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ 
          email, 
          password: pass, 
          data: { user_name: userName } 
        })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.msg || data.error_description || 'Erro ao criar conta.');
      }
      
      if (data.access_token) {
        localStorage.setItem('nexus_session', JSON.stringify(data));
      }
      
      return { data, error: null };
    } catch (e: any) {
      return { data: null, error: e.message };
    }
  },

  async signIn(email: string, pass: string) {
    const key = DataService.getActiveKey();
    try {
      const res = await fetch(`${DataService.SUPABASE_URL}/auth/v1/token?grant_type=password`, {
        method: 'POST',
        headers: { 
          'apikey': key, 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ email, password: pass })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error_description || 'E-mail ou senha inválidos.');
      }

      if (data.access_token) {
        localStorage.setItem('nexus_session', JSON.stringify(data));
      }
      
      return { data, error: null };
    } catch (e: any) {
      return { data: null, error: e.message };
    }
  },

  async signInWithSocial(provider: 'google' | 'discord') {
    const key = DataService.getActiveKey();
    // Normalização rigorosa: Garante que NÃO haja barra no final
    const redirectTo = window.location.origin.replace(/\/$/, ""); 
    
    console.group(`🛠️ Diagnóstico de Login: ${provider.toUpperCase()}`);
    console.log("1. Vá ao Supabase em Authentication > URL Configuration");
    console.log("2. Verifique se o 'Site URL' é EXATAMENTE:", redirectTo);
    console.log("3. Verifique se o mesmo valor está em 'Redirect URLs'");
    console.groupEnd();

    const params = new URLSearchParams({
      provider: provider,
      redirect_to: redirectTo,
    });

    const authUrl = `${DataService.SUPABASE_URL}/auth/v1/authorize?${params.toString()}&apikey=${key}`;
    window.location.href = authUrl;
  },

  handleAuthCallback() {
    const hash = window.location.hash;
    const urlParams = new URLSearchParams(window.location.search);
    
    const error = urlParams.get('error_description') || urlParams.get('error');
    if (error) {
      return { error };
    }

    if (!hash || !hash.includes('access_token')) return null;

    try {
      const params = new URLSearchParams(hash.substring(1));
      const accessToken = params.get('access_token');
      
      if (accessToken) {
        const session = {
          access_token: accessToken,
          refresh_token: params.get('refresh_token'),
          user: {
            id: params.get('sub'),
            email: params.get('email'),
            user_metadata: {
              full_name: params.get('full_name'),
              avatar_url: params.get('avatar_url'),
              user_name: params.get('user_name') || params.get('full_name') || 'INVOCADOR'
            }
          }
        };

        localStorage.setItem('nexus_session', JSON.stringify(session));
        window.history.replaceState(null, '', window.location.origin);
        return session;
      }
    } catch (e) {
      console.error("Erro ao processar tokens:", e);
    }
    return null;
  },

  signOut() {
    localStorage.removeItem('nexus_session');
    window.location.reload();
  },

  getSession() {
    const sessionStr = localStorage.getItem('nexus_session');
    if (!sessionStr) return null;
    try {
      return JSON.parse(sessionStr);
    } catch (e) {
      return null;
    }
  }
};
