import React from 'react';
import Leaderboard from './statistics/Leaderboard';
import ScoreHistory from './statistics/ScoreHistory';
import { Player, GameRecord } from '../types';

interface Props {
  players: Player[];
  games: GameRecord[];
}

export default function Statistics({ players, games }: Props) {
  return (
    <div className="space-y-8">
      <Leaderboard players={players} games={games} />
      <ScoreHistory players={players} games={games} />
    </div>
  );
}