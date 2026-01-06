
import { Player, Role, RankingEntry } from './types';

export const INITIAL_BUDGET = 100.0;

/**
 * Utilitário para formatar nomes para os caminhos de arquivo no Storage
 */
const normalizeName = (name: string) => {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") 
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '') 
    .replace(/[()]/g, '');
};

// Agora usamos apenas os nomes dos arquivos. O DataService cuidará de montar a URL pública.
const getTeamLogoPath = (teamName: string) => `${normalizeName(teamName)}-logo.png`;
const getLocalImagePath = (playerName: string) => `${normalizeName(playerName)}.webp`;

export const MOCK_PLAYERS: Player[] = [
  // GEN GG
  { id: 'gen-ayel', name: 'Ayel', role: Role.TOP, team: 'GEN GG', price: 24.0, points: 18.5, avgPoints: 17.2, kda: '3.8', image: getLocalImagePath('Ayel'), teamLogo: getTeamLogoPath('GEN GG') },
  { id: 'gen-samkz', name: 'Samkz', role: Role.JNG, team: 'GEN GG', price: 22.5, points: 15.4, avgPoints: 14.8, kda: '3.2', image: getLocalImagePath('Samkz'), teamLogo: getTeamLogoPath('GEN GG') },
  { id: 'gen-grevthar', name: 'Grevthar', role: Role.MID, team: 'GEN GG', price: 26.0, points: 22.1, avgPoints: 20.5, kda: '4.5', image: getLocalImagePath('Grevthar'), teamLogo: getTeamLogoPath('GEN GG') },
  { id: 'gen-kojima', name: 'Kojima', role: Role.ADC, team: 'GEN GG', price: 21.0, points: 16.8, avgPoints: 15.5, kda: '3.9', image: getLocalImagePath('Kojima'), teamLogo: getTeamLogoPath('GEN GG') },
  { id: 'gen-esa', name: 'esA', role: Role.SUP, team: 'GEN GG', price: 30.0, points: 28.5, avgPoints: 26.2, kda: '6.5', image: getLocalImagePath('esA'), teamLogo: getTeamLogoPath('GEN GG') },

  // KARMINE COSPE
  { id: 'kar-yang', name: 'Yang', role: Role.TOP, team: 'KARMINE COSPE', price: 21.0, points: 15.5, avgPoints: 16.2, kda: '3.1', image: getLocalImagePath('Yang'), teamLogo: getTeamLogoPath('KARMINE COSPE') },
  { id: 'kar-shini', name: 'Shini', role: Role.JNG, team: 'KARMINE COSPE', price: 28.0, points: 22.4, avgPoints: 21.0, kda: '4.2', image: getLocalImagePath('Shini'), teamLogo: getTeamLogoPath('KARMINE COSPE') },
  { id: 'kar-envy', name: 'Envy', role: Role.MID, team: 'KARMINE COSPE', price: 25.0, points: 19.8, avgPoints: 20.2, kda: '3.8', image: getLocalImagePath('Envy'), teamLogo: getTeamLogoPath('KARMINE COSPE') },
  { id: 'kar-juliera', name: 'Juliera', role: Role.ADC, team: 'KARMINE COSPE', price: 20.0, points: 14.2, avgPoints: 15.1, kda: '2.9', image: getLocalImagePath('Juliera'), teamLogo: getTeamLogoPath('KARMINE COSPE') },
  { id: 'kar-momochi', name: 'Momochi', role: Role.SUP, team: 'KARMINE COSPE', price: 19.0, points: 12.5, avgPoints: 13.8, kda: '3.0', image: getLocalImagePath('Momochi'), teamLogo: getTeamLogoPath('KARMINE COSPE') },

  // ÉanDG
  { id: 'ean-zynts', name: 'Zynts', role: Role.TOP, team: 'ÉanDG', price: 20.5, points: 14.8, avgPoints: 15.5, kda: '3.0', image: getLocalImagePath('Zynts'), teamLogo: getTeamLogoPath('ÉanDG') },
  { id: 'ean-randal', name: 'Randal', role: Role.JNG, team: 'ÉanDG', price: 21.0, points: 15.2, avgPoints: 16.0, kda: '3.1', image: getLocalImagePath('Randal'), teamLogo: getTeamLogoPath('ÉanDG') },
  { id: 'ean-qats', name: 'Qats', role: Role.MID, team: 'ÉanDG', price: 23.0, points: 18.5, avgPoints: 19.2, kda: '3.6', image: getLocalImagePath('Qats'), teamLogo: getTeamLogoPath('ÉanDG') },
  { id: 'ean-brtt', name: 'brTT', role: Role.ADC, team: 'ÉanDG', price: 35.0, points: 34.2, avgPoints: 31.5, kda: '6.2', image: getLocalImagePath('brTT'), teamLogo: getTeamLogoPath('ÉanDG') },
  { id: 'ean-telas', name: 'Telas', role: Role.SUP, team: 'ÉanDG', price: 22.0, points: 17.5, avgPoints: 18.2, kda: '4.0', image: getLocalImagePath('Telas'), teamLogo: getTeamLogoPath('ÉanDG') }
];

export const MOCK_RANKING: RankingEntry[] = [
  { rank: 1, userName: 'Faker Br', teamName: 'T1 da Shopee', points: 1250.5, trend: 'up' },
  { rank: 2, userName: 'Gummy Bear', teamName: 'Ursinhos Atômicos', points: 1240.2, trend: 'stable' },
  { rank: 3, userName: 'SlayerX', teamName: 'Exterminadores', points: 1190.8, trend: 'down' },
  { rank: 4, userName: 'HAKKAI', teamName: 'GOATEAM', points: 897.58, trend: 'up' },
];

export const INITIAL_BUDGET_DISPLAY = 100.0;
