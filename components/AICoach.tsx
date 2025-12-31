
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
      // Initialize GoogleGenAI with apiKey from process.env.API_KEY using correctly named parameter
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      // Fixed type error by explicitly casting Object.values results and using a type guard for filtering
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

      // Using gemini-3-flash-preview for general text tasks and accessing .text property directly
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
          <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center border border-gold/30 shrink-0">
            <i className="fa-solid fa-robot text-gold text-xl"></i>
          </div>
          <div className="card-glass p-4 rounded-2xl rounded-tl-none border-l-4 border-gold">
            <p className="text-white text-sm leading-relaxed">
              Saudações, Invocador! Eu sou o <strong>Coach AI Kings</strong>. 
              Posso analisar sua escalação, prever desempenhos da próxima rodada ou te indicar quem está dominando o meta da Kings Lendas. 
              Em que posso te ajudar hoje?
            </p>
          </div>
        </div>

        {response && (
          <div className="flex gap-4">
            <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center border border-gold/30 shrink-0">
              <i className="fa-solid fa-robot text-gold text-xl"></i>
            </div>
            <div className="card-glass p-4 rounded-2xl rounded-tl-none border-l-4 border-gold">
              <p className="text-white text-sm leading-relaxed whitespace-pre-wrap">
                {response}
              </p>
            </div>
          </div>
        )}

        {loading && (
          <div className="flex gap-4 animate-pulse">
            <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center border border-gray-700 shrink-0"></div>
            <div className="bg-gray-800/50 p-4 rounded-2xl w-2/3 h-12"></div>
          </div>
        )}
      </div>

      <div className="relative">
        <input 
          type="text"
          className="w-full bg-[#0a141e] border-2 border-[#c89b3c]/20 rounded-2xl py-4 pl-6 pr-20 focus:outline-none focus:border-gold transition-all text-white placeholder-gray-500 shadow-xl"
          placeholder="Pergunte ao coach (ex: 'Quem é o melhor mid custo-benefício?')..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && askCoach()}
        />
        <button 
          onClick={askCoach}
          disabled={loading}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-gold text-[#010a13] p-3 rounded-xl font-bold hover:scale-105 active:scale-95 transition-all shadow-lg shadow-gold/20 disabled:opacity-50"
        >
          <i className="fa-solid fa-paper-plane"></i>
        </button>
      </div>
    </div>
  );
};

export default AICoach;
