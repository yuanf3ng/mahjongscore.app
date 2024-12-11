import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { Player, GameRecord } from '../types';

interface Props {
  games: GameRecord[];
  players: Player[];
  onEditGame: (game: GameRecord) => void;
  onDeleteGame: (gameId: string) => void;
}

interface GroupedGames {
  [date: string]: GameRecord[];
}

export default function GameList({ games, players, onEditGame, onDeleteGame }: Props) {
  // Group games by date
  const groupedGames = games.reduce((groups: GroupedGames, game) => {
    const date = new Date(game.date).toLocaleDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(game);
    return groups;
  }, {});

  // Sort dates in descending order
  const sortedDates = Object.keys(groupedGames).sort((a, b) => 
    new Date(b).getTime() - new Date(a).getTime()
  );

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Previous Games</h3>
      {sortedDates.map(date => (
        <div key={date} className="space-y-3">
          <h4 className="font-medium text-gray-700 border-b pb-2">{date}</h4>
          <div className="grid gap-3">
            {groupedGames[date].map(game => (
              <div key={game.id} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-end items-start mb-2">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onEditGame(game)}
                      className="p-1 text-blue-600 hover:text-blue-700 rounded-full hover:bg-blue-100"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => onDeleteGame(game.id)}
                      className="p-1 text-red-600 hover:text-red-700 rounded-full hover:bg-red-100"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
                <div className="grid gap-2">
                  {game.players.map((playerId, index) => {
                    const player = players.find(p => p.id === playerId);
                    return (
                      <div key={playerId} className="flex justify-between">
                        <span>{player?.name}</span>
                        <span className={`font-medium ${
                          game.scores[index] > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {game.scores[index]}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}