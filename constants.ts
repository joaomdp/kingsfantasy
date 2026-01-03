
import { Player, Role, RankingEntry } from './types';

export const INITIAL_BUDGET = 100000;

export const MOCK_PLAYERS: Player[] = [
  // TOP
  { 
    id: '1', name: 'Zezão do Top', role: Role.TOP, team: 'Dragons', price: 22000, points: 15.4, avgPoints: 12.2, kda: '3.5', 
    image: 'https://i.imgur.com/GisLhB0.png', 
    teamLogo: 'https://i.imgur.com/v8tT7sL.png',
    lastChampion: { name: 'Aatrox', image: 'https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/Aatrox.png' }
  },
  { 
    id: '2', name: 'BrTT Fake', role: Role.TOP, team: 'Vikings', price: 18000, points: 10.2, avgPoints: 9.8, kda: '2.1', 
    image: 'https://i.imgur.com/vQ77Pia.png',
    teamLogo: 'https://i.imgur.com/ubXmpdn.png',
    lastChampion: { name: 'Darius', image: 'https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/Darius.png' }
  },
  // JNG
  { 
    id: '3', name: 'Robo Jr', role: Role.JNG, team: 'Kings', price: 25000, points: 22.1, avgPoints: 18.5, kda: '4.8', 
    image: 'https://i.imgur.com/GisLhB0.png',
    teamLogo: 'https://i.imgur.com/ubXmpdn.png',
    lastChampion: { name: 'Lee Sin', image: 'https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/LeeSin.png' }
  },
  { 
    id: '4', name: 'Smite God', role: Role.JNG, team: 'Titans', price: 15000, points: 8.5, avgPoints: 10.1, kda: '1.9', 
    image: 'https://i.imgur.com/vQ77Pia.png',
    teamLogo: 'https://i.imgur.com/v8tT7sL.png',
    lastChampion: { name: 'Jarvan IV', image: 'https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/JarvanIV.png' }
  },
  // MID
  { 
    id: '5', name: 'Kami da Massa', role: Role.MID, team: 'Kings', price: 28000, points: 30.2, avgPoints: 25.4, kda: '6.2', 
    image: 'https://i.imgur.com/GisLhB0.png',
    teamLogo: 'https://i.imgur.com/ubXmpdn.png',
    lastChampion: { name: 'Ahri', image: 'https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/Ahri.png' }
  },
  { 
    id: '6', name: 'Showmaker BR', role: Role.MID, team: 'Dragons', price: 20000, points: 14.8, avgPoints: 15.2, kda: '3.2', 
    image: 'https://i.imgur.com/vQ77Pia.png',
    teamLogo: 'https://i.imgur.com/v8tT7sL.png',
    lastChampion: { name: 'Azir', image: 'https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/Azir.png' }
  },
  // ADC
  { 
    id: '7', name: 'Penta King', role: Role.ADC, team: 'Titans', price: 26000, points: 28.5, avgPoints: 22.1, kda: '5.5', 
    image: 'https://i.imgur.com/GisLhB0.png',
    teamLogo: 'https://i.imgur.com/v8tT7sL.png',
    lastChampion: { name: 'Kai\'Sa', image: 'https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/Kaisa.png' }
  },
  { 
    id: '8', name: 'Titans Adc', role: Role.ADC, team: 'Vikings', price: 21000, points: 18.2, avgPoints: 19.5, kda: '4.1', 
    image: 'https://i.imgur.com/vQ77Pia.png',
    teamLogo: 'https://i.imgur.com/ubXmpdn.png',
    lastChampion: { name: 'Ezreal', image: 'https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/Ezreal.png' }
  },
  // SUP
  { 
    id: '9', name: 'Ward Master', role: Role.SUP, team: 'Dragons', price: 12000, points: 11.2, avgPoints: 10.5, kda: '8.2', 
    image: 'https://i.imgur.com/vQ77Pia.png',
    teamLogo: 'https://i.imgur.com/v8tT7sL.png',
    lastChampion: { name: 'Thresh', image: 'https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/Thresh.png' }
  },
  { 
    id: '10', name: 'Engage Lord', role: Role.SUP, team: 'Kings', price: 14000, points: 13.5, avgPoints: 12.8, kda: '5.1', 
    image: 'https://i.imgur.com/GisLhB0.png',
    teamLogo: 'https://i.imgur.com/ubXmpdn.png',
    lastChampion: { name: 'Leona', image: 'https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/Leona.png' }
  },
];

export const MOCK_RANKING: RankingEntry[] = [
  { rank: 1, userName: 'Faker Br', teamName: 'T1 da Shopee', points: 1250.5, trend: 'up' },
  { rank: 2, userName: 'Gummy Bear', teamName: 'Ursinhos Atômicos', points: 1240.2, trend: 'stable' },
  { rank: 3, userName: 'SlayerX', teamName: 'Exterminadores', points: 1190.8, trend: 'down' },
  { rank: 4, userName: 'LoL Lover', teamName: 'Love and War', points: 1150.0, trend: 'up' },
  { rank: 5, userName: 'Kings Fan', teamName: 'Realeza LoL', points: 1120.4, trend: 'down' },
];
export const INITIAL_BUDGET_DISPLAY = 100.0;
