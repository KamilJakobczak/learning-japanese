import { GameResults } from './interfaces/interface';
import PlayerStats from './PlayerStats';

class Player {
	$name: string;
	$answers: { correct: number; wrong: number } = { correct: 0, wrong: 0 };
	$score: number = 0;
	$games: Map<number, GameResults>;
	$playerStats: PlayerStats | null = null;
	constructor(name: string) {
		this.$name = name;
		this.$answers = { correct: 0, wrong: 0 };
		this.$score = this.calculateScore();
		this.$games = new Map<number, GameResults>();
		this.$playerStats = null;
	}

	static loadFromLocalStorage(): Player | null {
		const playerData = localStorage.getItem('playerData');
		if (!playerData) {
			return null;
		}

		const { name, games } = JSON.parse(playerData);

		const player = new Player(name);

		const gamesMap = new Map<number, GameResults>(games);
		player.$games = gamesMap;
		const playerStats = new PlayerStats(gamesMap, name);
		player.$playerStats = playerStats;

		return player;
	}

	getName() {
		return this.$name;
	}
	saveToLocalStorage() {
		const playerData = {
			name: this.$name,
			games: Array.from(this.$games.entries()),
		};
		localStorage.setItem('playerData', JSON.stringify(playerData));
	}

	addGameStatistics(gameResults: GameResults) {
		if (gameResults.id.indexOf(this.$name) === -1) {
			throw new Error('Game ID does not match player name');
		}
		this.$games.set(this.$games.size, gameResults);
		if (!this.$playerStats) {
			const playerStats = new PlayerStats(this.$games, this.$name);
			this.$playerStats = playerStats;
		}
		this.saveToLocalStorage();
	}
	calculateScore() {
		this.$score = this.$answers.correct;
		return this.$score;
	}
}

export default Player;
