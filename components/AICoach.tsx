
import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { UserTeam, Player } from '../types';

interface AICoachProps {
  userTeam: UserTeam;
}

const AICoach: React.FC<AICoachProps> = ({ userTeam }) => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const askCoach = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setResponse(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const playersList = Object.values(userTeam.players) as (Player | undefined)[];
      const playersNames = playersList
        .filter((p): p is Player => !!p)
        .map(p => `${p.name} (${p.role})`)
        .join(', ');

      const prompt = `Você é o Coach AI da liga de League of Legends "Kings Lendas". 
      O usuário tem o time: ${playersNames || 'Ainda não escalou jogadores'}.
      Orçamento atual: C$ ${userTeam.budget}.
      Pergunta do usuário: "${query}"
      
      Dê dicas táticas curtas, analise a escalação dele ou sugira nomes da liga "Kings Lendas" baseados em tendências do meta de 2026. Responda em português de forma entusiasta e gamer.`;

      const result = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });

      setResponse(result.text || 'O Coach está pensando em outra coisa agora...');
    } catch (error) {
      console.error('AI Error:', error);
      setResponse('Ops, a conexão com o servidor caiu. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col h-[calc(100vh-250px)]">
      <div className="flex-1 overflow-y-auto mb-6 space-y-4 pr-2 custom-scrollbar">
        <div className="flex gap-4">
          <div className="w-12 h-12 bg-[#5E6CFF]/10 rounded-full flex items-center justify-center border border-[#5E6CFF]/30 shrink-0">
            <i className="fa-solid fa-robot text-[#5E6CFF] text-xl shadow-[0_0_15px_rgba(94,108,255,0.4)]"></i>
          </div>
          <div className="glass-card p-6 rounded-2xl rounded-tl-none border-l-4 border-[#5E6CFF]">
            <p className="text-white text-sm leading-relaxed">
              Saudações, Invocador! Eu sou o <strong>Coach AI Kings</strong>. 
              Posso analisar sua escalação, prever desempenhos da próxima rodada ou te indicar quem está dominando o meta da Kings Lendas. 
              Em que posso te ajudar hoje?
            </p>
          </div>
        </div>

        {response && (
          <div className="flex gap-4">
            <div className="w-12 h-12 bg-[#5E6CFF]/10 rounded-full flex items-center justify-center border border-[#5E6CFF]/30 shrink-0">
              <i className="fa-solid fa-robot text-[#5E6CFF] text-xl shadow-[0_0_15px_rgba(94,108,255,0.4)]"></i>
            </div>
            <div className="glass-card p-6 rounded-2xl rounded-tl-none border-l-4 border-[#5E6CFF]">
              <p className="text-white text-sm leading-relaxed whitespace-pre-wrap">
                {response}
              </p>
            </div>
          </div>
        )}

        {loading && (
          <div className="flex gap-4 animate-pulse">
            <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center border border-white/10 shrink-0"></div>
            <div className="bg-white/5 p-4 rounded-2xl w-2/3 h-12"></div>
          </div>
        )}
      </div>

      <div className="relative">
        <input 
          type="text"
          className="w-full bg-black/40 border-2 border-white/5 rounded-2xl py-5 pl-8 pr-20 focus:outline-none focus:border-[#5E6CFF]/60 transition-all text-white placeholder-gray-600 shadow-2xl backdrop-blur-xl"
          placeholder="Pergunte ao coach (ex: 'Quem é o melhor mid custo-benefício?')..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && askCoach()}
        />
        <button 
          onClick={askCoach}
          disabled={loading}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#5E6CFF] text-black p-3.5 rounded-xl font-bold hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(94,108,255,0.4)] disabled:opacity-50"
        >
          <i className="fa-solid fa-paper-plane"></i>
        </button>
      </div>
    </div>
  );
};

export default AICoach;
