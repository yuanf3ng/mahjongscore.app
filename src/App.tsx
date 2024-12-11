import React, { useState, useEffect } from 'react';
import { Trophy, Users, BarChart2, Save, Upload } from 'lucide-react';
import { Player, GameRecord } from './types';
import PlayerManagement from './components/PlayerManagement';
import GameForm from './components/GameForm';
import Statistics from './components/Statistics';
import { Toast } from './components/Toast';
import { getStoredPlayers, setStoredPlayers, getStoredGames, setStoredGames, exportData, importData } from './utils/storage';

function App() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [games, setGames] = useState<GameRecord[]>([]);
  const [activeTab, setActiveTab] = useState<'players' | 'game' | 'stats'>('players');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'warning' } | null>(null);

  useEffect(() => {
    setPlayers(getStoredPlayers());
    setGames(getStoredGames());

    const handleToast = (event: CustomEvent<{ message: string; type: 'success' | 'error' | 'warning' }>) => {
      setToast(event.detail);
      setTimeout(() => setToast(null), 3000);
    };

    window.addEventListener('showToast', handleToast as EventListener);
    return () => window.removeEventListener('showToast', handleToast as EventListener);
  }, []);

  const handleAddPlayer = (name: string) => {
    const newPlayer: Player = {
      id: crypto.randomUUID(),
      name,
      createdAt: new Date().toISOString(),
    };
    const updatedPlayers = [...players, newPlayer];
    setPlayers(updatedPlayers);
    setStoredPlayers(updatedPlayers);
  };

  const handleEditPlayer = (id: string, name: string) => {
    const updatedPlayers = players.map(p =>
      p.id === id ? { ...p, name } : p
    );
    setPlayers(updatedPlayers);
    setStoredPlayers(updatedPlayers);
  };

  const handleDeletePlayer = (id: string) => {
    const updatedPlayers = players.filter(p => p.id !== id);
    setPlayers(updatedPlayers);
    setStoredPlayers(updatedPlayers);
  };

  const handleSaveGame = (playerIds: string[], scores: number[], date: string, editGameId?: string) => {
    const winnerIndex = scores.indexOf(Math.max(...scores));
    const newGame: GameRecord = {
      id: editGameId || crypto.randomUUID(),
      date,
      players: playerIds,
      scores,
      winnerId: playerIds[winnerIndex],
    };

    const updatedGames = editGameId
      ? games.map(game => game.id === editGameId ? newGame : game)
      : [...games, newGame];

    setGames(updatedGames);
    setStoredGames(updatedGames);
  };

  const handleDeleteGame = (gameId: string) => {
    const updatedGames = games.filter(game => game.id !== gameId);
    setGames(updatedGames);
    setStoredGames(updatedGames);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      importData(file).then(() => {
        setPlayers(getStoredPlayers());
        setGames(getStoredGames());
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Mahjong Score Tracker</h1>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setActiveTab('players')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                activeTab === 'players' ? 'bg-blue-500 text-white' : 'bg-white'
              }`}
            >
              <Users size={20} />
              Players
            </button>
            <button
              onClick={() => setActiveTab('game')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                activeTab === 'game' ? 'bg-blue-500 text-white' : 'bg-white'
              }`}
            >
              <Trophy size={20} />
              New Game
            </button>
            <button
              onClick={() => setActiveTab('stats')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                activeTab === 'stats' ? 'bg-blue-500 text-white' : 'bg-white'
              }`}
            >
              <BarChart2 size={20} />
              Statistics
            </button>
            <div className="flex-1" />
            <button
              onClick={exportData}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              <Save size={20} />
              Export Data
            </button>
            <label className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 cursor-pointer">
              <Upload size={20} />
              Import Data
              <input
                type="file"
                accept=".json"
                onChange={handleImport}
                className="hidden"
              />
            </label>
          </div>
        </header>

        <main className="bg-white rounded-lg shadow-lg p-6">
          {activeTab === 'players' && (
            <PlayerManagement
              players={players}
              onAddPlayer={handleAddPlayer}
              onEditPlayer={handleEditPlayer}
              onDeletePlayer={handleDeletePlayer}
            />
          )}
          {activeTab === 'game' && (
            <GameForm
              players={players}
              games={games}
              onSaveGame={handleSaveGame}
              onDeleteGame={handleDeleteGame}
            />
          )}
          {activeTab === 'stats' && (
            <Statistics
              players={players}
              games={games}
            />
          )}
        </main>
      </div>
      {toast && (
        <Toast 
          message={toast.message}
          type={toast.type}
        />
      )}
    </div>
  );
}

export default App;