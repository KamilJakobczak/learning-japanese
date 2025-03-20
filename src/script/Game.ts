import { Sets } from '../data/db';
import GameRenderer from './GameRenderer';
import Player from './Player';
import Questions, { QuestionsData } from './Questions';

export interface QuestionData {
	question: string;
	correctAnswer: string;
	incorrectAnswers: string[];
}

class Game {
	$gameId: string;
	$player: Player;
	$difficulty: string;
	$chapters: string[];
	$score: number;
	$appContainer: HTMLElement;
	$sets: Sets;
	$questionsData: QuestionsData;
	$currentQuestion: number;

	constructor(
		player: Player,
		difficulty: string,
		chapters: string[],
		container: HTMLElement,
		sets: Sets
	) {
		this.$player = player;
		this.$difficulty = difficulty;
		this.$chapters = chapters;
		this.$gameId = this.createGameId();
		this.$appContainer = container;
		this.$sets = sets;
		this.$questionsData = this.createQuestionsData();
		this.$score = 0;
		this.$currentQuestion = 0;
	}
	setScore() {
		this.$score++;
	}
	getScore() {
		return this.$score;
	}
	getGameId() {
		return this.$gameId;
	}
	getCurrentQuestion() {
		return this.$currentQuestion;
	}
	setCurrentQuestion() {
		console.log(this.$currentQuestion);
		this.$currentQuestion += 1;
	}

	render() {
		const gameRenderer = new GameRenderer(
			this.$appContainer,
			this.$questionsData,
			this.$currentQuestion,
			this.setCurrentQuestion.bind(this),
			this.setScore.bind(this),
			this.render.bind(this),
			this.getScore.bind(this)
		);
		gameRenderer.render();
		console.log(this.getCurrentQuestion());
	}
	createQuestionsData() {
		const questions = new Questions(this.$difficulty, this.$chapters, this.$sets);
		return questions.createQuestions();
	}
	createGameId() {
		return `${this.$player.getName()}-${this.$difficulty}-${this.$chapters.join(
			'-'
		)}-${Date.now()}`;
	}
}
export default Game;
