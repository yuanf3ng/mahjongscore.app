export interface Player {
  id: string;
  name: string;
  createdAt: string;
}

export interface GameRecord {
  id: string;
  date: string;
  players: string[];
  scores: number[];
  winnerId: string;
}

export interface PlayerStats {
  playerId: string;
  gamesPlayed: number;
  wins: number;
  totalScore: number;
  averageScore: number;
  winRate: number;
}