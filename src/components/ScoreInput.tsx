import React from 'react';
import { Player } from '../types';

interface Props {
  players: Player[];
  selectedPlayers: string[];
  scores: number[];
  onChange: (scores: number[]) => void;
}

export default function ScoreInput({ players, selectedPlayers, scores, onChange }: Props) {
  const handleScoreChange = (index: number, value: string) => {
    const newScores = [...scores];
    newScores[index] = Number(value) || 0;
    onChange(newScores);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Enter Scores</h3>
      <div className="grid gap-3">
        {selectedPlayers.map((playerId, index) => {
          const player = players.find(p => p.id === playerId);
          return (
            <div key={playerId} className="flex items-center gap-3">
              <span className="w-32 font-medium">{player?.name}</span>
              <input
                type="number"
                value={scores[index] || ''}
                onChange={(e) => handleScoreChange(index, e.target.value)}
                className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter score"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}