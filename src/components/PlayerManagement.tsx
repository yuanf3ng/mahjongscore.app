import React, { useState } from 'react';
import { UserPlus, Edit, Trash2, Save, X } from 'lucide-react';
import { Player } from '../types';

interface Props {
  players: Player[];
  onAddPlayer: (name: string) => void;
  onEditPlayer: (id: string, name: string) => void;
  onDeletePlayer: (id: string) => void;
}

export default function PlayerManagement({ players, onAddPlayer, onEditPlayer, onDeletePlayer }: Props) {
  const [newPlayerName, setNewPlayerName] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPlayerName.trim()) {
      onAddPlayer(newPlayerName.trim());
      setNewPlayerName('');
    }
  };

  const handleEdit = (player: Player) => {
    setEditingId(player.id);
    setEditName(player.name);
  };

  const handleSaveEdit = (id: string) => {
    if (editName.trim()) {
      onEditPlayer(id, editName.trim());
      setEditingId(null);
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={newPlayerName}
          onChange={(e) => setNewPlayerName(e.target.value)}
          placeholder="New player name"
          className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2"
        >
          <UserPlus size={20} />
          Add Player
        </button>
      </form>

      <div className="grid gap-2">
        {players.map((player) => (
          <div
            key={player.id}
            className="flex items-center justify-between p-3 bg-white rounded-lg shadow"
          >
            {editingId === player.id ? (
              <div className="flex-1 flex items-center gap-2">
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="flex-1 px-3 py-1 border rounded-lg"
                />
                <button
                  onClick={() => handleSaveEdit(player.id)}
                  className="p-1 text-green-600 hover:text-green-700"
                >
                  <Save size={20} />
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className="p-1 text-red-600 hover:text-red-700"
                >
                  <X size={20} />
                </button>
              </div>
            ) : (
              <>
                <span className="text-lg">{player.name}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEdit(player)}
                    className="p-1 text-blue-600 hover:text-blue-700"
                  >
                    <Edit size={20} />
                  </button>
                  <button
                    onClick={() => onDeletePlayer(player.id)}
                    className="p-1 text-red-600 hover:text-red-700"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}