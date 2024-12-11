import { Player, GameRecord } from '../types';

const PLAYERS_KEY = 'mahjong-players';
const GAMES_KEY = 'mahjong-games';

export const getStoredPlayers = (): Player[] => {
  const stored = localStorage.getItem(PLAYERS_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const setStoredPlayers = (players: Player[]) => {
  localStorage.setItem(PLAYERS_KEY, JSON.stringify(players));
};

export const getStoredGames = (): GameRecord[] => {
  const stored = localStorage.getItem(GAMES_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const setStoredGames = (games: GameRecord[]) => {
  localStorage.setItem(GAMES_KEY, JSON.stringify(games));
};

export const exportData = () => {
  const data = {
    players: getStoredPlayers(),
    games: getStoredGames(),
  };
  const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `mahjong-backup-${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
};

export const importData = async (file: File) => {
  const text = await file.text();
  const data = JSON.parse(text);
  setStoredPlayers(data.players);
  setStoredGames(data.games);
};