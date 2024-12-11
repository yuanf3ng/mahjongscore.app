import React from 'react';
import { Share2 } from 'lucide-react';
import { Player, GameRecord } from '../types';

interface Props {
  game: GameRecord;
  players: Player[];
}

export default function ShareButton({ game, players }: Props) {
  const handleShare = async () => {
    const gameDate = new Date(game.date).toLocaleDateString();
    const playerScores = game.players.map((playerId, index) => {
      const player = players.find(p => p.id === playerId);
      return `${player?.name}: ${game.scores[index]}`;
    }).join('\n');
    
    const shareText = `Mahjong Game Results (${gameDate})\n\n${playerScores}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Mahjong Game Results',
          text: shareText,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback to clipboard
      try {
        await navigator.clipboard.writeText(shareText);
        // Show toast notification
        const event = new CustomEvent('showToast', {
          detail: {
            message: 'Game results copied to clipboard!',
            type: 'success'
          }
        });
        window.dispatchEvent(event);
      } catch (error) {
        console.error('Error copying to clipboard:', error);
      }
    }
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-2 px-3 py-1.5 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
    >
      <Share2 size={16} />
      Share
    </button>
  );
}