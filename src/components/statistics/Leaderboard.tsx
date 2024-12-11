import React from 'react';
import { Player, GameRecord } from '../../types';
import { calculatePlayerStats } from '../../utils/statistics';
import ShareStatistics from './ShareStatistics';

interface Props {
  players: Player[];
  games: GameRecord[];
}

export default function Leaderboard({ players, games }: Props) {
  const stats = calculatePlayerStats(players, games)
    .filter(stat => stat.totalScore !== 0)
    .sort((a, b) => b.totalScore - a.totalScore);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Leaderboard</h3>
        <ShareStatistics players={players} games={games} />
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-lg shadow">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-2 text-left">Player</th>
              <th className="px-4 py-2 text-left">Games</th>
              <th className="px-4 py-2 text-left">Wins</th>
              <th className="px-4 py-2 text-left">Losses</th>
              <th className="px-4 py-2 text-left">Win Rate</th>
              <th className="px-4 py-2 text-left">Total Score</th>
            </tr>
          </thead>
          <tbody>
            {stats.map((stat) => (
              <tr key={stat.playerId} className="border-t">
                <td className="px-4 py-2">{stat.name}</td>
                <td className="px-4 py-2">{stat.gamesPlayed}</td>
                <td className="px-4 py-2">{stat.wins}</td>
                <td className="px-4 py-2">{stat.losses}</td>
                <td className="px-4 py-2">{stat.winRate.toFixed(1)}%</td>
                <td className="px-4 py-2">{stat.totalScore}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}