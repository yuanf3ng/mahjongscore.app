import React from 'react';
import { Player } from '../types';

interface Props {
  players: Player[];
  selectedPlayers: string[];
  onChange: (selected: string[]) => void;
}

export default function PlayerSelector({ players, selectedPlayers, onChange }: Props) {
  const handleTogglePlayer = (playerId: string) => {
    if (selectedPlayers.includes(playerId)) {
      onChange(selectedPlayers.filter(id => id !== playerId));
    } else if (selectedPlayers.length < 6) {
      onChange([...selectedPlayers, playerId]);
    }
  };

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold">Select Players (3-6)</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {players.map((player) => (
          <button
            key={player.id}
            type="button"
            onClick={() => handleTogglePlayer(player.id)}
            className={`p-2 rounded-lg border ${
              selectedPlayers.includes(player.id)
                ? 'bg-blue-500 text-white border-blue-600'
                : 'bg-white border-gray-300 hover:border-blue-500'
            }`}
          >
            {player.name}
          </button>
        ))}
      </div>
    </div>
  );
}