import React, { useState, useEffect } from 'react';
import { Player, GameRecord } from '../types';
import PlayerSelector from './PlayerSelector';
import ScoreInput from './ScoreInput';
import DateSelector from './DateSelector';
import GameList from './GameList';
import { Toast } from './Toast';
import ShareButton from './ShareButton';

interface Props {
  players: Player[];
  games: GameRecord[];
  onSaveGame: (playerIds: string[], scores: number[], date: string, editGameId?: string) => void;
  onDeleteGame: (gameId: string) => void;
}

export default function GameForm({ players, games, onSaveGame, onDeleteGame }: Props) {
  const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);
  const [scores, setScores] = useState<number[]>([]);
  const [date, setDate] = useState<string>(new Date().toISOString());
  const [showToast, setShowToast] = useState(false);
  const [editingGame, setEditingGame] = useState<GameRecord | null>(null);
  const [lastSavedGame, setLastSavedGame] = useState<GameRecord | null>(null);

  useEffect(() => {
    if (editingGame) {
      setSelectedPlayers(editingGame.players);
      setScores(editingGame.scores);
      setDate(editingGame.date);
    }
  }, [editingGame]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedPlayers.length >= 3 && scores.length === selectedPlayers.length) {
      onSaveGame(selectedPlayers, scores, date, editingGame?.id);
      
      const gameData = {
        id: editingGame?.id || crypto.randomUUID(),
        date,
        players: selectedPlayers,
        scores,
        winnerId: selectedPlayers[scores.indexOf(Math.max(...scores))]
      };
      
      setLastSavedGame(gameData);
      setEditingGame(null);
      setSelectedPlayers([]);
      setScores([]);
      setDate(new Date().toISOString());
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  const handleEditGame = (game: GameRecord) => {
    setEditingGame(game);
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <DateSelector date={date} onChange={setDate} />
        
        <PlayerSelector
          players={players}
          selectedPlayers={selectedPlayers}
          onChange={setSelectedPlayers}
        />
        
        {selectedPlayers.length > 0 && (
          <ScoreInput
            players={players}
            selectedPlayers={selectedPlayers}
            scores={scores}
            onChange={setScores}
          />
        )}

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={selectedPlayers.length < 3 || scores.length !== selectedPlayers.length}
            className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-300"
          >
            {editingGame ? 'Update Game' : 'Save Game'}
          </button>
          
          {editingGame && (
            <button
              type="button"
              onClick={() => {
                setEditingGame(null);
                setSelectedPlayers([]);
                setScores([]);
                setDate(new Date().toISOString());
              }}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              Cancel Edit
            </button>
          )}
          
          {lastSavedGame && !editingGame && (
            <ShareButton
              game={lastSavedGame}
              players={players}
            />
          )}
        </div>
      </form>

      {showToast && (
        <Toast 
          message={editingGame ? "Game record updated successfully!" : "Game record saved successfully!"} 
          type="success" 
        />
      )}

      <GameList
        games={games}
        players={players}
        onEditGame={handleEditGame}
        onDeleteGame={onDeleteGame}
      />
    </div>
  );
}