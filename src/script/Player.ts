import { GameTime } from './Game';

interface GameResults {
	id: string;
	time: GameTime;
	questionsCount: number;
	correctAnswers: string[];
	wrongAnswers: string[];
}

class Player {
	$name: string;
	$answers: { correct: number; wrong: number } = { correct: 0, wrong: 0 };
	$score: number = 0;
	$games: Map<number, GameResults>;
	constructor(name: string) {
		this.$name = name;
		this.$answers = { correct: 0, wrong: 0 };
		this.$score = this.calculateScore();
		this.$games = new Map<number, GameResults>();
	}
	getName() {
		return this.$name;
	}
	// setAnswers(isCorrect: boolean) {
	// 	if (isCorrect) {
	// 		this.$answers.correct++;
	// 	} else {
	// 		this.$answers.wrong++;
	// 	}
	// 	this.calculateScore();
	// 	console.log(
	// 		`Correct: ${this.$answers.correct}, Wrong: ${this.$answers.wrong}`
	// 	);
	// }

	addGameStatistics(gameResults: GameResults) {
		if (gameResults.id.indexOf(this.$name) === -1) {
			throw new Error('Game ID does not match player name');
		}
		console.log(this.$games.size);
		this.$games.set(this.$games.size, gameResults);
		console.log(this.$games);
	}
	calculateScore() {
		this.$score = this.$answers.correct;
		return this.$score;
	}
}

export default Player;
