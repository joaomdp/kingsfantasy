
import React, { useState, useEffect } from 'react';
import { AuthService } from '../services/auth';
import { DataService } from '../services/api';

interface LoginProps {
  onLoginSuccess: (userData: any) => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const savedEmail = localStorage.getItem('remembered_email');
    if (savedEmail) {
      setEmail(savedEmail);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSignUp && password !== confirmPassword) {
      setErrorMsg("AS SENHAS NÃO COINCIDEM");
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    if (rememberMe) {
      localStorage.setItem('remembered_email', email);
    } else {
      localStorage.removeItem('remembered_email');
    }

    let result;
    if (isSignUp) {
      result = await AuthService.signUp(email, password, userName);
    } else {
      result = await AuthService.signIn(email, password);
    }

    if (result.error) {
      setErrorMsg(result.error);
      setLoading(false);
    } else {
      const userPayload = {
        userName: result.data.user?.user_metadata?.user_name || userName || 'Invocador',
        email: result.data.user?.email || email,
        avatar: result.data.user?.user_metadata?.avatar_url
      };
      onLoginSuccess(userPayload);
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'discord') => {
    setErrorMsg(null);
    setLoading(true);
    try {
      await AuthService.signInWithSocial(provider);
    } catch (err: any) {
      setErrorMsg(`Erro ao conectar com ${provider}.`);
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[5000] bg-[#0B0411] flex items-center justify-center p-4 md:p-8 overflow-hidden font-inter">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
      </div>

      <div className="relative w-full max-w-[1200px] h-full max-h-[800px] glass-card rounded-[48px] overflow-hidden flex shadow-[0_0_120px_rgba(0,0,0,0.8)] border border-white/5 animate-in fade-in zoom-in-95 duration-700">
        
        {/* Lado Esquerdo */}
        <div className="hidden lg:block w-1/2 p-6 h-full">
          <div className="relative w-full h-full rounded-[40px] overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#5E6CFF]/40 to-purple-600/40 mix-blend-overlay z-10"></div>
            <img 
              src="https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Sylas_0.jpg" 
              className="w-full h-full object-cover grayscale-[0.2]"
              alt="LoL Splash"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0411] via-transparent z-20"></div>
            <div className="absolute bottom-12 left-12 z-30 space-y-4">
               <div className="w-16 h-1 bg-[#5E6CFF] rounded-full"></div>
               <h2 className="font-orbitron font-black text-4xl text-white uppercase tracking-tighter">
                 FANTASY <span className="text-[#5E6CFF]">KINGS LENDAS</span>
               </h2>
            </div>
          </div>
        </div>

        {/* Lado Direito */}
        <div className="w-full lg:w-1/2 h-full flex flex-col p-8 md:p-16 overflow-y-auto no-scrollbar relative">
          
          <div className="absolute top-10 right-10 text-right">
            <button 
              onClick={() => {
                setIsSignUp(!isSignUp);
                setErrorMsg(null);
                setPassword('');
                setConfirmPassword('');
              }}
              className="text-[10px] font-black text-white uppercase tracking-widest hover:text-[#5E6CFF] transition-colors border-b border-white/20"
            >
              {isSignUp ? 'JÁ TENHO CONTA' : 'CRIAR CONTA'}
            </button>
          </div>

          <div className="flex-1 flex flex-col justify-center max-w-[400px] mx-auto w-full py-20">
            <h1 className="font-orbitron font-black text-4xl text-white uppercase tracking-tighter mb-8">
              {isSignUp ? 'REGISTRAR' : 'ENTRAR'}
            </h1>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <button 
                type="button"
                onClick={() => handleSocialLogin('discord')}
                className="flex items-center justify-center gap-3 py-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-[#5865F2]/20 hover:border-[#5865F2]/50 transition-all"
              >
                <i className="fa-brands fa-discord text-[#5865F2] text-xl"></i>
                <span className="text-[10px] font-black text-white">DISCORD</span>
              </button>
              <button 
                type="button"
                onClick={() => handleSocialLogin('google')}
                className="flex items-center justify-center gap-3 py-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-red-500/20 hover:border-red-500/50 transition-all"
              >
                <i className="fa-brands fa-google text-red-500 text-xl"></i>
                <span className="text-[10px] font-black text-white">GOOGLE</span>
              </button>
            </div>

            <div className="relative flex items-center gap-4 mb-8">
               <div className="h-px flex-1 bg-white/5"></div>
               <span className="text-[9px] font-black text-gray-700 uppercase">OU E-MAIL</span>
               <div className="h-px flex-1 bg-white/5"></div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <input 
                  type="text" 
                  placeholder="NICKNAME"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value.toUpperCase())}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-[13px] text-white focus:outline-none focus:border-[#5E6CFF]/50 transition-all"
                  required={isSignUp}
                />
              )}
              <input 
                type="email" 
                placeholder="E-MAIL"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-[13px] text-white focus:outline-none focus:border-[#5E6CFF]/50 transition-all"
                required
              />
              
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="SENHA"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-6 pr-14 text-[13px] text-white focus:outline-none focus:border-[#5E6CFF]/50 transition-all"
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-600 hover:text-[#5E6CFF] transition-colors"
                >
                  <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'} text-sm`}></i>
                </button>
              </div>

              {isSignUp && (
                <div className="space-y-1 animate-in slide-in-from-top-2 duration-300">
                  <div className="relative">
                    <input 
                      type={showPassword ? "text" : "password"} 
                      placeholder="CONFIRMAR SENHA"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={`w-full bg-white/5 border rounded-2xl py-4 pl-6 pr-14 text-[13px] text-white focus:outline-none transition-all ${
                        confirmPassword && password !== confirmPassword 
                          ? 'border-red-500/50 focus:border-red-500' 
                          : 'border-white/10 focus:border-[#5E6CFF]/50'
                      }`}
                      required={isSignUp}
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-600 hover:text-[#5E6CFF] transition-colors"
                    >
                      <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'} text-sm`}></i>
                    </button>
                  </div>
                  {confirmPassword && password !== confirmPassword && (
                    <div className="px-2">
                       <span className="text-[8px] font-black text-red-500 uppercase tracking-widest">Senhas diferentes</span>
                    </div>
                  )}
                </div>
              )}

              <div className="flex items-center gap-3 py-2">
                <label className="relative flex items-center cursor-pointer group">
                  <input 
                    type="checkbox" 
                    checked={rememberMe} 
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="peer sr-only" 
                  />
                  <div className="w-5 h-5 bg-white/5 border border-white/10 rounded-md peer-checked:bg-[#5E6CFF] peer-checked:border-[#5E6CFF] transition-all flex items-center justify-center">
                    <i className="fa-solid fa-check text-black text-[10px] opacity-0 peer-checked:opacity-100 transition-opacity"></i>
                  </div>
                  <span className="ml-3 text-[10px] font-black text-gray-500 uppercase tracking-widest group-hover:text-white transition-colors">Lembrar de mim</span>
                </label>
              </div>
              
              {errorMsg && (
                <div className="pt-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <p className="text-[10px] font-black text-red-500 uppercase text-center bg-red-500/10 py-3 px-4 rounded-xl border border-red-500/20">
                    {errorMsg}
                  </p>
                </div>
              )}

              <button 
                type="submit" 
                disabled={loading || (isSignUp && confirmPassword !== '' && password !== confirmPassword)}
                className="w-full py-5 bg-[#5E6CFF] text-black rounded-2xl font-orbitron font-black text-sm uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-[0_15px_40px_rgba(94,108,255,0.3)] disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed mt-4"
              >
                {loading ? 'CARREGANDO...' : isSignUp ? 'CRIAR CONTA' : 'ENTRAR'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
