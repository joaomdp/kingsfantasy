
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

const getTeamLogoPath = (teamName: string) => `${BASE_URL}/times/${normalizeName(teamName)}-logo.png`;
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
  // GEN GG (Campeã)
  { id: 'gen-ayel', name: 'Ayel', role: Role.TOP, team: 'GEN GG', price: 24.0, points: 18.5, avgPoints: 17.2, kda: '3.8', image: getLocalImagePath('Ayel'), teamLogo: LOGOS.GENGG },
  { id: 'gen-samkz', name: 'Samkz', role: Role.JNG, team: 'GEN GG', price: 22.5, points: 15.4, avgPoints: 14.8, kda: '3.2', image: getLocalImagePath('Samkz'), teamLogo: LOGOS.GENGG },
  { id: 'gen-grevthar', name: 'Grevthar', role: Role.MID, team: 'GEN GG', price: 26.0, points: 22.1, avgPoints: 20.5, kda: '4.5', image: getLocalImagePath('Grevthar'), teamLogo: LOGOS.GENGG },
  { id: 'gen-kojima', name: 'Kojima', role: Role.ADC, team: 'GEN GG', price: 21.0, points: 16.8, avgPoints: 15.5, kda: '3.9', image: getLocalImagePath('Kojima'), teamLogo: LOGOS.GENGG },
  { id: 'gen-esa', name: 'esA', role: Role.SUP, team: 'GEN GG', price: 30.0, points: 28.5, avgPoints: 26.2, kda: '6.5', image: getLocalImagePath('esA'), teamLogo: LOGOS.GENGG },

  // KARMINE COSPE
  { id: 'kar-yang', name: 'Yang', role: Role.TOP, team: 'KARMINE COSPE', price: 21.0, points: 15.5, avgPoints: 16.2, kda: '3.1', image: getLocalImagePath('Yang'), teamLogo: LOGOS.KARMINE },
  { id: 'kar-shini', name: 'Shini', role: Role.JNG, team: 'KARMINE COSPE', price: 28.0, points: 22.4, avgPoints: 21.0, kda: '4.2', image: getLocalImagePath('Shini'), teamLogo: LOGOS.KARMINE },
  { id: 'kar-envy', name: 'Envy', role: Role.MID, team: 'KARMINE COSPE', price: 25.0, points: 19.8, avgPoints: 20.2, kda: '3.8', image: getLocalImagePath('Envy'), teamLogo: LOGOS.KARMINE },
  { id: 'kar-juliera', name: 'Juliera', role: Role.ADC, team: 'KARMINE COSPE', price: 20.0, points: 14.2, avgPoints: 15.1, kda: '2.9', image: getLocalImagePath('Juliera'), teamLogo: LOGOS.KARMINE },
  { id: 'kar-momochi', name: 'Momochi', role: Role.SUP, team: 'KARMINE COSPE', price: 19.0, points: 12.5, avgPoints: 13.8, kda: '3.0', image: getLocalImagePath('Momochi'), teamLogo: LOGOS.KARMINE },

  // ÉanDG
  { id: 'ean-zynts', name: 'Zynts', role: Role.TOP, team: 'ÉanDG', price: 20.5, points: 14.8, avgPoints: 15.5, kda: '3.0', image: getLocalImagePath('Zynts'), teamLogo: LOGOS.EANDG },
  { id: 'ean-randal', name: 'Randal', role: Role.JNG, team: 'ÉanDG', price: 21.0, points: 15.2, avgPoints: 16.0, kda: '3.1', image: getLocalImagePath('Randal'), teamLogo: LOGOS.EANDG },
  { id: 'ean-qats', name: 'Qats', role: Role.MID, team: 'ÉanDG', price: 23.0, points: 18.5, avgPoints: 19.2, kda: '3.6', image: getLocalImagePath('Qats'), teamLogo: LOGOS.EANDG },
  { id: 'ean-brtt', name: 'brTT', role: Role.ADC, team: 'ÉanDG', price: 35.0, points: 34.2, avgPoints: 31.5, kda: '6.2', image: getLocalImagePath('brTT'), teamLogo: LOGOS.EANDG },
  { id: 'ean-telas', name: 'Telas', role: Role.SUP, team: 'ÉanDG', price: 22.0, points: 17.5, avgPoints: 18.2, kda: '4.0', image: getLocalImagePath('Telas'), teamLogo: LOGOS.EANDG },

  // FONATIC
  { id: 'fon-zekas', name: 'ZekaS', role: Role.TOP, team: 'FONATIC', price: 19.5, points: 14.2, avgPoints: 13.8, kda: '2.5', image: getLocalImagePath('ZekaS'), teamLogo: LOGOS.FONATIC },
  { id: 'fon-drakehero', name: 'Drakehero', role: Role.JNG, team: 'FONATIC', price: 21.5, points: 16.8, avgPoints: 15.5, kda: '3.2', image: getLocalImagePath('Drakehero'), teamLogo: LOGOS.FONATIC },
  { id: 'fon-yoda', name: 'YoDa', role: Role.MID, team: 'FONATIC', price: 32.0, points: 30.5, avgPoints: 28.5, kda: '5.8', image: getLocalImagePath('YoDa'), teamLogo: LOGOS.FONATIC },
  { id: 'fon-duduhh', name: 'Duduhh', role: Role.ADC, team: 'FONATIC', price: 22.0, points: 19.4, avgPoints: 18.2, kda: '3.9', image: getLocalImagePath('Duduhh'), teamLogo: LOGOS.FONATIC },
  { id: 'fon-konseki', name: 'Konseki', role: Role.SUP, team: 'FONATIC', price: 18.5, points: 13.2, avgPoints: 14.1, kda: '3.1', image: getLocalImagePath('Konseki'), teamLogo: LOGOS.FONATIC },

  // Vôs Grandes
  { id: 'vos-kiari', name: 'Kiari', role: Role.TOP, team: 'Vôs Grandes', price: 23.0, points: 17.5, avgPoints: 18.2, kda: '3.5', image: getLocalImagePath('Kiari'), teamLogo: LOGOS.VOS },
  { id: 'vos-stiner', name: 'Stiner', role: Role.JNG, team: 'Vôs Grandes', price: 24.0, points: 19.8, avgPoints: 18.8, kda: '3.4', image: getLocalImagePath('Stiner'), teamLogo: LOGOS.VOS },
  { id: 'vos-leleko', name: 'Leleko', role: Role.MID, team: 'Vôs Grandes', price: 21.5, points: 15.4, avgPoints: 16.5, kda: '3.1', image: getLocalImagePath('Leleko'), teamLogo: LOGOS.VOS },
  { id: 'vos-absolut', name: 'Absolut', role: Role.ADC, team: 'Vôs Grandes', price: 31.0, points: 29.2, avgPoints: 27.5, kda: '5.5', image: getLocalImagePath('Absolut'), teamLogo: LOGOS.VOS },
  { id: 'vos-reaper', name: 'Reaper', role: Role.SUP, team: 'Vôs Grandes', price: 19.5, points: 14.8, avgPoints: 15.2, kda: '3.2', image: getLocalImagePath('Reaper'), teamLogo: LOGOS.VOS },

  // G12 ESPORTS
  { id: 'g12-hidan', name: 'Hidan', role: Role.TOP, team: 'G12 ESPORTS', price: 20.0, points: 16.5, avgPoints: 15.8, kda: '2.9', image: getLocalImagePath('Hidan'), teamLogo: LOGOS.G12 },
  { id: 'g12-minerva', name: 'Minerva', role: Role.JNG, team: 'G12 ESPORTS', price: 33.0, points: 31.2, avgPoints: 28.8, kda: '5.2', image: getLocalImagePath('Minerva'), teamLogo: LOGOS.G12 },
  { id: 'g12-toucouille', name: 'Toucouille', role: Role.MID, team: 'G12 ESPORTS', price: 26.5, points: 23.4, avgPoints: 22.5, kda: '4.0', image: getLocalImagePath('Toucouille'), teamLogo: LOGOS.G12 },
  { id: 'g12-netuno', name: 'Netuno', role: Role.ADC, team: 'G12 ESPORTS', price: 25.0, points: 21.5, avgPoints: 20.4, kda: '3.7', image: getLocalImagePath('Netuno'), teamLogo: LOGOS.G12 },
  { id: 'g12-bulecha', name: 'Bulecha', role: Role.SUP, team: 'G12 ESPORTS', price: 18.0, points: 11.5, avgPoints: 12.8, kda: '2.8', image: getLocalImagePath('Bulecha'), teamLogo: LOGOS.G12 },

  // paiNtriotas
  { id: 'pt-xyno', name: 'Xyno', role: Role.TOP, team: 'paiNtriotas', price: 21.5, points: 16.2, avgPoints: 15.4, kda: '3.0', image: getLocalImagePath('Xyno'), teamLogo: LOGOS.PAINTRIOTS },
  { id: 'pt-accez', name: 'Accez', role: Role.JNG, team: 'paiNtriotas', price: 22.0, points: 15.8, avgPoints: 16.2, kda: '3.1', image: getLocalImagePath('Accez'), teamLogo: LOGOS.PAINTRIOTS },
  { id: 'pt-kami', name: 'Kami', role: Role.MID, team: 'paiNtriotas', price: 34.0, points: 33.5, avgPoints: 31.0, kda: '6.5', image: getLocalImagePath('Kami'), teamLogo: LOGOS.PAINTRIOTS },
  { id: 'pt-micao', name: 'micaO', role: Role.ADC, team: 'paiNtriotas', price: 27.0, points: 24.2, avgPoints: 22.5, kda: '5.0', image: getLocalImagePath('micaO'), teamLogo: LOGOS.PAINTRIOTS },
  { id: 'pt-guigs', name: 'Guigs', role: Role.SUP, team: 'paiNtriotas', price: 20.0, points: 14.5, avgPoints: 15.2, kda: '3.3', image: getLocalImagePath('Guigs'), teamLogo: LOGOS.PAINTRIOTS },

  // 100Vices
  { id: '100-pijack', name: 'Pijack', role: Role.TOP, team: '100Vices', price: 19.5, points: 13.2, avgPoints: 14.5, kda: '2.8', image: getLocalImagePath('Pijack'), teamLogo: LOGOS.VICES },
  { id: '100-sarolu', name: 'Sarolu', role: Role.JNG, team: '100Vices', price: 21.0, points: 15.6, avgPoints: 16.2, kda: '3.0', image: getLocalImagePath('Sarolu'), teamLogo: LOGOS.VICES },
  { id: '100-takeshi', name: 'Takeshi', role: Role.MID, team: '100Vices', price: 31.0, points: 29.5, avgPoints: 27.2, kda: '5.5', image: getLocalImagePath('Takeshi'), teamLogo: LOGOS.VICES },
  { id: '100-celo', name: 'Celo', role: Role.ADC, team: '100Vices', price: 22.5, points: 18.4, avgPoints: 19.0, kda: '3.5', image: getLocalImagePath('Celo'), teamLogo: LOGOS.VICES },
  { id: '100-cavalo', name: 'Cavalo', role: Role.SUP, team: '100Vices', price: 18.0, points: 11.2, avgPoints: 13.5, kda: '2.9', image: getLocalImagePath('Cavalo'), teamLogo: LOGOS.VICES },

  // Oreiudos Esports
  { id: 'ore-makes', name: 'Makes', role: Role.TOP, team: 'Oreiudos Esports', price: 23.5, points: 18.8, avgPoints: 17.5, kda: '3.6', image: getLocalImagePath('Makes'), teamLogo: LOGOS.OREIUDOS },
  { id: 'ore-aegis', name: 'Aegis', role: Role.JNG, team: 'Oreiudos Esports', price: 25.0, points: 20.4, avgPoints: 19.8, kda: '3.8', image: getLocalImagePath('Aegis'), teamLogo: LOGOS.OREIUDOS },
  { id: 'ore-brucer', name: 'Brucer', role: Role.MID, team: 'Oreiudos Esports', price: 26.0, points: 20.1, avgPoints: 19.5, kda: '3.9', image: getLocalImagePath('Brucer'), teamLogo: LOGOS.OREIUDOS },
  { id: 'ore-gru', name: 'Gru', role: Role.ADC, team: 'Oreiudos Esports', price: 21.0, points: 15.6, avgPoints: 16.8, kda: '3.2', image: getLocalImagePath('Gru'), teamLogo: LOGOS.OREIUDOS },
  { id: 'ore-shoiti', name: 'Shoiti', role: Role.SUP, team: 'Oreiudos Esports', price: 20.0, points: 14.2, avgPoints: 15.5, kda: '3.1', image: getLocalImagePath('Shoiti'), teamLogo: LOGOS.OREIUDOS },

  // Tepei Assassins
  { id: 'tpa-tay', name: 'Tay', role: Role.TOP, team: 'Tepei Assassins', price: 29.0, points: 24.8, avgPoints: 23.5, kda: '3.6', image: getLocalImagePath('Tay'), teamLogo: LOGOS.TPA },
  { id: 'tpa-dizin', name: 'Dizin', role: Role.JNG, team: 'Tepei Assassins', price: 20.0, points: 14.5, avgPoints: 15.2, kda: '3.0', image: getLocalImagePath('Dizin'), teamLogo: LOGOS.TPA },
  { id: 'tpa-kina', name: 'Kina', role: Role.MID, team: 'Tepei Assassins', price: 22.0, points: 16.8, avgPoints: 17.5, kda: '3.2', image: getLocalImagePath('Kina'), teamLogo: LOGOS.TPA },
  { id: 'tpa-beenie', name: 'Beenie', role: Role.ADC, team: 'Tepei Assassins', price: 21.0, points: 15.2, avgPoints: 16.0, kda: '3.1', image: getLocalImagePath('Beenie'), teamLogo: LOGOS.TPA },
  { id: 'tpa-scamber', name: 'Scamber', role: Role.SUP, team: 'Tepei Assassins', price: 19.5, points: 13.4, avgPoints: 14.8, kda: '3.0', image: getLocalImagePath('Scamber'), teamLogo: LOGOS.TPA },
];

export const MOCK_RANKING: RankingEntry[] = [
  { rank: 1, userName: 'Faker Br', teamName: 'T1 da Shopee', points: 1250.5, trend: 'up' },
  { rank: 2, userName: 'Gummy Bear', teamName: 'Ursinhos Atômicos', points: 1240.2, trend: 'stable' },
  { rank: 3, userName: 'SlayerX', teamName: 'Exterminadores', points: 1190.8, trend: 'down' },
  { rank: 4, userName: 'HAKKAI', teamName: 'GOATEAM', points: 897.58, trend: 'up' },
];

export const INITIAL_BUDGET_DISPLAY = 100.0;
