import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Player, GameRecord } from '../../types';
import { prepareChartData } from '../../utils/statistics';

interface Props {
  players: Player[];
  games: GameRecord[];
}

export default function ScoreHistory({ players, games }: Props) {
  const activePlayers = players.filter(player => {
    const totalScore = games.reduce((sum, game) => {
      const index = game.players.indexOf(player.id);
      return sum + (index >= 0 ? game.scores[index] : 0);
    }, 0);
    return totalScore !== 0;
  });

  const chartData = prepareChartData(games, activePlayers);

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Score History</h3>
      <div className="w-full overflow-x-auto">
        <BarChart width={800} height={400} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          {activePlayers.map((player, index) => (
            <Bar
              key={player.id}
              dataKey={player.name}
              fill={`hsl(${index * 360 / activePlayers.length}, 70%, 50%)`}
            />
          ))}
        </BarChart>
      </div>
    </div>
  );
}