
export enum Role {
  TOP = 'TOP',
  JNG = 'JUNGLE',
  MID = 'MID',
  ADC = 'ADC',
  SUP = 'SUPPORT'
}

export interface Player {
  id: string;
  name: string;
  role: Role;
  team: string;
  price: number;
  points: number;
  avgPoints: number;
  kda: string;
  image: string;
}

export interface UserTeam {
  id: string;
  userId: string;
  userName: string;
  name: string;
  avatar: string;
  rank: string;
  players: {
    [key in Role]?: Player;
  };
  budget: number;
  totalPoints: number;
}

export interface RankingEntry {
  rank: number;
  userName: string;
  teamName: string;
  points: number;
  trend: 'up' | 'down' | 'stable';
}

export type Page = 'dashboard' | 'market' | 'squad' | 'ranking' | 'ai-coach' | 'profile';
