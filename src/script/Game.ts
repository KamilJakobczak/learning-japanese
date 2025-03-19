import Player from './Player';

class Game {
	$player: Player;
	$difficulty: string;
	$chapters: string[];
	$score: number;
	constructor(player: Player, difficulty: string, chapters: string[]) {
		this.$player = player;
		this.$difficulty = difficulty;
		this.$chapters = chapters;
		// this.$score = 0;
	}
	render() {
		// const gameContainer = document.getElementById('hiraganaGame');
	}
	initialize() {}
}
export default Game;
