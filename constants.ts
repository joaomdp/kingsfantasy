
import { Player, Role, RankingEntry } from './types';

export const INITIAL_BUDGET = 100.0;

/**
 * IMPORTANTE: 
 * Se o seu repositório no GitHub estiver PRIVADO, as imagens NÃO vão carregar.
 * Você precisa mudar a visibilidade para PÚBLICO nas configurações do seu GitHub.
 */
const REPO_USER = "joaomdp";
const REPO_NAME = "kingsfantasy";
const BRANCH = "main"; 

// Link Raw do GitHub
const BASE_URL = `https://raw.githubusercontent.com/${REPO_USER}/${REPO_NAME}/${BRANCH}`;

const normalizeName = (name: string) => {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") 
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '') 
    .replace(/[()]/g, '');
};

const getTeamLogoPath = (teamName: string) => `${BASE_URL}/times/${normalizeName(teamName)}.png`;
const getLocalImagePath = (playerName: string) => `${BASE_URL}/players/${normalizeName(playerName)}.webp`;

const LOGOS = {
  GENGG: getTeamLogoPath('GEN GG'),
  KARMINE: getTeamLogoPath('KARMINE COSPE'),
  FONATIC: getTeamLogoPath('FONATIC'),
  G12: getTeamLogoPath('G12 ESPORTS'),
  EANDG: getTeamLogoPath('ÉanDG (NGG)'),
  VOS: getTeamLogoPath('Vôs Grandes'),
  PAINTRIOTS: getTeamLogoPath('paiNtriotas'),
  VICES: getTeamLogoPath('100Vices'),
  OREIUDOS: getTeamLogoPath('Oreiudos Esports'),
  TPA: getTeamLogoPath('Tepei Assassins (TPA)')
};

export const MOCK_PLAYERS: Player[] = [
  { id: 'gen-ayel', name: 'Ayel', role: Role.TOP, team: 'GEN GG', price: 24.0, points: 18.5, avgPoints: 17.2, kda: '3.8', image: getLocalImagePath('Ayel'), teamLogo: LOGOS.GENGG },
  { id: 'gen-samkz', name: 'Samkz', role: Role.JNG, team: 'GEN GG', price: 22.5, points: 15.4, avgPoints: 14.8, kda: '3.2', image: getLocalImagePath('Samkz'), teamLogo: LOGOS.GENGG },
  { id: 'gen-grevthar', name: 'Grevthar', role: Role.MID, team: 'GEN GG', price: 26.0, points: 22.1, avgPoints: 20.5, kda: '4.5', image: getLocalImagePath('Grevthar'), teamLogo: LOGOS.GENGG },
  { id: 'gen-kojima', name: 'Kojima', role: Role.ADC, team: 'GEN GG', price: 21.0, points: 16.8, avgPoints: 15.5, kda: '3.9', image: getLocalImagePath('Kojima'), teamLogo: LOGOS.GENGG },
  { id: 'gen-esa', name: 'esA', role: Role.SUP, team: 'GEN GG', price: 30.0, points: 28.5, avgPoints: 26.2, kda: '6.5', image: getLocalImagePath('esA'), teamLogo: LOGOS.GENGG },
  { id: 'fon-yoda', name: 'YoDa', role: Role.MID, team: 'FONATIC', price: 32.0, points: 30.5, avgPoints: 28.5, kda: '5.8', image: getLocalImagePath('YoDa'), teamLogo: LOGOS.FONATIC },
  { id: 'ean-brtt', name: 'brTT', role: Role.ADC, team: 'ÉanDG (NGG)', price: 35.0, points: 34.2, avgPoints: 31.5, kda: '6.2', image: getLocalImagePath('brTT'), teamLogo: LOGOS.EANDG },
  { id: 'pt-kami', name: 'Kami', role: Role.MID, team: 'paiNtriotas', price: 34.0, points: 33.5, avgPoints: 31.0, kda: '6.5', image: getLocalImagePath('Kami'), teamLogo: LOGOS.PAINTRIOTS },
  { id: 'pt-micao', name: 'micaO', role: Role.ADC, team: 'paiNtriotas', price: 27.0, points: 24.2, avgPoints: 22.5, kda: '5.0', image: getLocalImagePath('micaO'), teamLogo: LOGOS.PAINTRIOTS },
  { id: '100-takeshi', name: 'Takeshi', role: Role.MID, team: '100Vices', price: 31.0, points: 29.5, avgPoints: 27.2, kda: '5.5', image: getLocalImagePath('Takeshi'), teamLogo: LOGOS.VICES },

  ...([
    { name: 'Yang', role: Role.TOP, team: 'KARMINE COSPE', price: 21.0 },
    { name: 'Shini', role: Role.JNG, team: 'KARMINE COSPE', price: 28.0 },
    { name: 'ZekaS', role: Role.TOP, team: 'FONATIC', price: 19.5 },
    { name: 'Minerva', role: Role.JNG, team: 'G12 ESPORTS', price: 27.5 },
    { name: 'Hidan', role: Role.TOP, team: 'G12 ESPORTS', price: 20.0 },
    { name: 'Tay', role: Role.TOP, team: 'Tepei Assassins (TPA)', price: 29.0 },
    { name: 'Envy', role: Role.MID, team: 'KARMINE COSPE', price: 25.0 },
    { name: 'Toucouille', role: Role.MID, team: 'G12 ESPORTS', price: 26.5 },
    { name: 'Netuno', role: Role.ADC, team: 'G12 ESPORTS', price: 25.0 },
    { name: 'Absolut', role: Role.ADC, team: 'Vôs Grandes', price: 28.0 },
    { name: 'Brucer', role: Role.MID, team: 'Oreiudos Esports', price: 26.0 }
  ].map(p => ({
    id: `auto-${p.name.toLowerCase()}`,
    name: p.name,
    role: p.role,
    team: p.team,
    price: p.price,
    points: 15 + Math.random() * 10,
    avgPoints: 14 + Math.random() * 5,
    kda: (3 + Math.random() * 2).toFixed(1),
    image: getLocalImagePath(p.name),
    teamLogo: getTeamLogoPath(p.team)
  })))
];

export const MOCK_RANKING: RankingEntry[] = [
  { rank: 1, userName: 'Faker Br', teamName: 'T1 da Shopee', points: 1250.5, trend: 'up' },
  { rank: 2, userName: 'Gummy Bear', teamName: 'Ursinhos Atômicos', points: 1240.2, trend: 'stable' },
  { rank: 3, userName: 'SlayerX', teamName: 'Exterminadores', points: 1190.8, trend: 'down' },
  { rank: 4, userName: 'HAKKAI', teamName: 'GOATEAM', points: 897.58, trend: 'up' },
];

export const INITIAL_BUDGET_DISPLAY = 100.0;
