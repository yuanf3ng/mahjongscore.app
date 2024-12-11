import { Player, GameRecord, PlayerStats } from '../types';

export function calculatePlayerStats(players: Player[], games: GameRecord[]): PlayerStats[] {
  return players.map(player => {
    const playerGames = games.filter(game => game.players.includes(player.id));
    const wins = playerGames.filter(game => {
      const index = game.players.indexOf(player.id);
      return game.scores[index] > 0;
    }).length;
    const totalScore = playerGames.reduce((sum, game) => {
      const index = game.players.indexOf(player.id);
      return sum + game.scores[index];
    }, 0);

    return {
      playerId: player.id,
      name: player.name,
      gamesPlayed: playerGames.length,
      wins,
      losses: playerGames.length - wins,
      winRate: playerGames.length ? (wins / playerGames.length) * 100 : 0,
      totalScore,
    };
  });
}

export function prepareChartData(games: GameRecord[], players: Player[]) {
  // Sort games by date
  const sortedGames = [...games].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  // Group games by date
  const groupedGames = sortedGames.reduce((acc, game) => {
    const date = new Date(game.date).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = {};
      players.forEach(player => {
        acc[date][player.name] = 0;
      });
    }

    game.players.forEach((playerId, index) => {
      const player = players.find(p => p.id === playerId);
      if (player) {
        acc[date][player.name] += game.scores[index];
      }
    });

    return acc;
  }, {} as Record<string, Record<string, number>>);

  // Convert grouped data to chart format
  return Object.entries(groupedGames).map(([date, scores]) => ({
    date,
    ...scores,
  }));
}