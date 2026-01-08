
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

const getTeamLogoPath = (teamName: string) => `${normalizeName(teamName)}-logo.png`;
const getLocalImagePath = (playerName: string) => `${normalizeName(playerName)}.webp`;

export const MOCK_PLAYERS: Player[] = [
  { id: 'gen-ayel', name: 'Ayel', role: Role.TOP, team: 'GEN GG', price: 24.0, points: 18.5, avgPoints: 17.2, kda: '3.8', image: getLocalImagePath('Ayel'), teamLogo: getTeamLogoPath('GEN GG') },
  { id: 'gen-samkz', name: 'Samkz', role: Role.JNG, team: 'GEN GG', price: 22.5, points: 15.4, avgPoints: 14.8, kda: '3.2', image: getLocalImagePath('Samkz'), teamLogo: getTeamLogoPath('GEN GG') },
  { id: 'gen-grevthar', name: 'Grevthar', role: Role.MID, team: 'GEN GG', price: 26.0, points: 22.1, avgPoints: 20.5, kda: '4.5', image: getLocalImagePath('Grevthar'), teamLogo: getTeamLogoPath('GEN GG') },
  { id: 'gen-kojima', name: 'Kojima', role: Role.ADC, team: 'GEN GG', price: 21.0, points: 16.8, avgPoints: 15.5, kda: '3.9', image: getLocalImagePath('Kojima'), teamLogo: getTeamLogoPath('GEN GG') },
  { id: 'gen-esa', name: 'esA', role: Role.SUP, team: 'GEN GG', price: 30.0, points: 28.5, avgPoints: 26.2, kda: '6.5', image: getLocalImagePath('esA'), teamLogo: getTeamLogoPath('GEN GG') },
  { id: 'kar-yang', name: 'Yang', role: Role.TOP, team: 'KARMINE COSPE', price: 21.0, points: 15.5, avgPoints: 16.2, kda: '3.1', image: getLocalImagePath('Yang'), teamLogo: getTeamLogoPath('KARMINE COSPE') },
  { id: 'kar-shini', name: 'Shini', role: Role.JNG, team: 'KARMINE COSPE', price: 28.0, points: 22.4, avgPoints: 21.0, kda: '4.2', image: getLocalImagePath('Shini'), teamLogo: getTeamLogoPath('KARMINE COSPE') },
  { id: 'kar-envy', name: 'Envy', role: Role.MID, team: 'KARMINE COSPE', price: 25.0, points: 19.8, avgPoints: 20.2, kda: '3.8', image: getLocalImagePath('Envy'), teamLogo: getTeamLogoPath('KARMINE COSPE') },
  { id: 'kar-juliera', name: 'Juliera', role: Role.ADC, team: 'KARMINE COSPE', price: 20.0, points: 14.2, avgPoints: 15.1, kda: '2.9', image: getLocalImagePath('Juliera'), teamLogo: getTeamLogoPath('KARMINE COSPE') },
  { id: 'kar-momochi', name: 'Momochi', role: Role.SUP, team: 'KARMINE COSPE', price: 19.0, points: 12.5, avgPoints: 13.8, kda: '3.0', image: getLocalImagePath('Momochi'), teamLogo: getTeamLogoPath('KARMINE COSPE') },
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

export const CHAMPION_ROLES_MAP: Record<string, Role[]> = {
  "Aatrox": [Role.TOP], "Ahri": [Role.MID], "Akali": [Role.TOP, Role.MID], "Akshan": [Role.MID, Role.ADC],
  "Alistar": [Role.SUP], "Amumu": [Role.JNG, Role.SUP], "Anivia": [Role.MID], "Annie": [Role.MID, Role.SUP],
  "Aphelios": [Role.ADC], "Ashe": [Role.ADC, Role.SUP], "AurelionSol": [Role.MID], "Azir": [Role.MID],
  "Bard": [Role.SUP], "Belveth": [Role.JNG], "Blitzcrank": [Role.SUP], "Brand": [Role.JNG, Role.MID, Role.SUP],
  "Braum": [Role.SUP], "Briar": [Role.JNG], "Caitlyn": [Role.ADC], "Camille": [Role.TOP],
  "Cassiopeia": [Role.MID], "Chogath": [Role.TOP, Role.MID], "Corki": [Role.ADC, Role.MID], "Darius": [Role.TOP],
  "Diana": [Role.JNG, Role.MID], "DrMundo": [Role.TOP], "Draven": [Role.ADC], "Ekko": [Role.JNG, Role.MID],
  "Elise": [Role.JNG], "Evelynn": [Role.JNG], "Ezreal": [Role.ADC], "Fiddlesticks": [Role.JNG],
  "Fiora": [Role.TOP], "Fizz": [Role.MID], "Galio": [Role.MID, Role.SUP], "Gangplank": [Role.TOP, Role.MID],
  "Garen": [Role.TOP], "Gnar": [Role.TOP], "Gragas": [Role.TOP, Role.JNG, Role.MID], "Graves": [Role.JNG],
  "Gwen": [Role.TOP, Role.JNG], "Hecarim": [Role.JNG], "Heimerdinger": [Role.TOP, Role.MID, Role.SUP], "Hwei": [Role.MID, Role.SUP],
  "Illaoi": [Role.TOP], "Irelia": [Role.TOP, Role.MID], "Ivern": [Role.JNG], "Janna": [Role.SUP],
  "JarvanIV": [Role.JNG], "Jax": [Role.TOP, Role.JNG], "Jayce": [Role.TOP, Role.MID], "Jhin": [Role.ADC],
  "Jinx": [Role.ADC], "Kaisa": [Role.ADC], "Kalista": [Role.ADC], "Karma": [Role.MID, Role.SUP],
  "Karthus": [Role.JNG, Role.MID], "Kassadin": [Role.MID], "Katarina": [Role.MID], "Kayle": [Role.TOP, Role.MID],
  "Kayn": [Role.JNG], "Kennen": [Role.TOP], "Khazix": [Role.JNG], "Kindred": [Role.JNG],
  "Kled": [Role.TOP], "KogMaw": [Role.ADC], "Leblanc": [Role.MID], "LeeSin": [Role.JNG],
  "Leona": [Role.SUP], "Lillia": [Role.JNG], "Lissandra": [Role.MID], "Lucian": [Role.ADC, Role.MID],
  "Lulu": [Role.SUP], "Lux": [Role.MID, Role.SUP], "Malphite": [Role.TOP, Role.SUP], "Malzahar": [Role.MID],
  "Maokai": [Role.TOP, Role.JNG, Role.SUP], "MasterYi": [Role.JNG], "Milio": [Role.SUP], "MissFortune": [Role.ADC],
  "Mordekaiser": [Role.TOP, Role.JNG], "Morgana": [Role.JNG, Role.SUP], "Naafiri": [Role.MID], "Nami": [Role.SUP],
  "Nasus": [Role.TOP], "Nautilus": [Role.SUP, Role.JNG], "Neeko": [Role.MID, Role.SUP], "Nidalee": [Role.JNG],
  "Nilah": [Role.ADC], "Nocturne": [Role.JNG], "Nunu": [Role.JNG], "Olaf": [Role.TOP, Role.JNG],
  "Orianna": [Role.MID], "Ornn": [Role.TOP], "Pantheon": [Role.TOP, Role.MID, Role.SUP], "Poppy": [Role.TOP, Role.JNG, Role.SUP],
  "Pyke": [Role.SUP], "Qiyana": [Role.JNG, Role.MID], "Quinn": [Role.TOP], "Rakan": [Role.SUP],
  "Rammus": [Role.JNG], "RekSai": [Role.JNG], "Rell": [Role.SUP, Role.JNG], "Renata": [Role.SUP],
  "Renekton": [Role.TOP], "Rengar": [Role.JNG, Role.TOP], "Riven": [Role.TOP], "Rumble": [Role.TOP, Role.MID],
  "Ryze": [Role.MID, Role.TOP], "Samira": [Role.ADC], "Sejuani": [Role.JNG, Role.TOP], "Senna": [Role.SUP, Role.ADC],
  "Seraphine": [Role.SUP, Role.MID], "Sett": [Role.TOP, Role.SUP], "Shaco": [Role.JNG, Role.SUP], "Shen": [Role.TOP, Role.SUP],
  "Shyvana": [Role.JNG], "Singed": [Role.TOP], "Sion": [Role.TOP], "Sivir": [Role.ADC],
  "Skarner": [Role.JNG, Role.TOP], "Smolder": [Role.ADC, Role.MID], "Sona": [Role.SUP], "Soraka": [Role.SUP],
  "Swain": [Role.MID, Role.SUP], "Sylas": [Role.MID, Role.JNG], "Syndra": [Role.MID], "TahmKench": [Role.SUP, Role.TOP],
  "Taliyah": [Role.JNG, Role.MID], "Talon": [Role.JNG, Role.MID], "Taric": [Role.SUP], "Teemo": [Role.TOP, Role.SUP],
  "Thresh": [Role.SUP], "Tristana": [Role.ADC, Role.MID], "Trundle": [Role.TOP, Role.JNG], "Tryndamere": [Role.TOP],
  "TwistedFate": [Role.MID, Role.ADC], "Twitch": [Role.ADC, Role.JNG], "Udyr": [Role.JNG, Role.TOP], "Urgot": [Role.TOP],
  "Varus": [Role.ADC, Role.MID], "Vayne": [Role.ADC, Role.TOP], "Veigar": [Role.MID], "Velkoz": [Role.MID, Role.SUP],
  "Vex": [Role.MID], "Vi": [Role.JNG], "Viego": [Role.JNG], "Viktor": [Role.MID], "Vladimir": [Role.MID, Role.TOP],
  "Volibear": [Role.TOP, Role.JNG], "Warwick": [Role.JNG, Role.TOP], "MonkeyKing": [Role.JNG, Role.TOP], "Xayah": [Role.ADC],
  "Xerath": [Role.MID, Role.SUP], "XinZhao": [Role.JNG], "Yasuo": [Role.MID, Role.TOP], "Yone": [Role.MID, Role.TOP],
  "Yorick": [Role.TOP], "Yuumi": [Role.SUP], "Zac": [Role.JNG, Role.TOP], "Zed": [Role.MID, Role.JNG],
  "Zeri": [Role.ADC], "Ziggs": [Role.ADC, Role.MID], "Zilean": [Role.MID, Role.SUP], "Zoe": [Role.MID], "Zyra": [Role.SUP, Role.JNG]
};

export const CHAMPIONS_LIST = Object.keys(CHAMPION_ROLES_MAP);
export const INITIAL_BUDGET_DISPLAY = 100.0;
