import React from 'react';
import { Share2 } from 'lucide-react';
import { Player, GameRecord } from '../../types';
import { calculatePlayerStats } from '../../utils/statistics';

interface Props {
  players: Player[];
  games: GameRecord[];
}

export default function ShareStatistics({ players, games }: Props) {
  const handleShare = async () => {
    const stats = calculatePlayerStats(players, games)
      .filter(stat => stat.totalScore !== 0)
      .sort((a, b) => b.totalScore - a.totalScore);

    const statsText = stats.map(stat => 
      `${stat.name}:\n` +
      `Games: ${stat.gamesPlayed} | ` +
      `Wins: ${stat.wins} | ` +
      `Losses: ${stat.losses} | ` +
      `Win Rate: ${stat.winRate.toFixed(1)}% | ` +
      `Total Score: ${stat.totalScore}`
    ).join('\n\n');

    const shareText = `Mahjong Statistics\n\n${statsText}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Mahjong Statistics',
          text: shareText,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareText);
        const event = new CustomEvent('showToast', {
          detail: {
            message: 'Statistics copied to clipboard!',
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
      className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
    >
      <Share2 size={20} />
      Share Statistics
    </button>
  );
}