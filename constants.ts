
import { Player, Role, RankingEntry } from './types';

export const INITIAL_BUDGET = 100.0;

export const MOCK_RANKING: RankingEntry[] = [
  { rank: 1, userName: 'BAIANO', teamName: 'ILHA DAS LENDAS', points: 1342.5, trend: 'stable' },
  { rank: 2, userName: 'TitaN BR', teamName: 'MAQUINA DE PONTOS', points: 1250.2, trend: 'up' },
];

export const CHAMPION_ROLES_MAP: Record<string, Role[]> = {
  "Aatrox": [Role.TOP], "Ahri": [Role.MID], "Akali": [Role.TOP, Role.MID], "Alistar": [Role.SUP], "Amumu": [Role.JNG, Role.SUP], 
  "Aphelios": [Role.ADC], "Ashe": [Role.ADC, Role.SUP], "Azir": [Role.MID], "Blitzcrank": [Role.SUP], "Braum": [Role.SUP],
  "Caitlyn": [Role.ADC], "Draven": [Role.ADC], "Ezreal": [Role.ADC], "Garen": [Role.TOP], "Jinx": [Role.ADC],
  "Kaisa": [Role.ADC], "LeeSin": [Role.JNG], "Leona": [Role.SUP], "Lucian": [Role.ADC], "Lulu": [Role.SUP],
  "Lux": [Role.MID, Role.SUP], "Nautilus": [Role.SUP], "Orianna": [Role.MID], "Pyke": [Role.SUP], "Rakan": [Role.SUP],
  "Senna": [Role.SUP, Role.ADC], "Thresh": [Role.SUP], "Vayne": [Role.ADC], "Yasuo": [Role.MID], "Yone": [Role.MID]
};

export const CHAMPIONS_LIST = Object.keys(CHAMPION_ROLES_MAP);
export const INITIAL_BUDGET_DISPLAY = 100.0;

// O MOCK_PLAYERS será substituído pelo fetch real do Supabase no App.tsx
export const MOCK_PLAYERS: Player[] = [];
