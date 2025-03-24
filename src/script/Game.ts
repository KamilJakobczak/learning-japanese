import { Sets } from '../data/db';
import GameRenderer from './GameRenderer';
import Player from './Player';
import Questions, { QuestionsData } from './Questions';

export interface QuestionData {
	question: string;
	correctAnswer: string;
	incorrectAnswers: string[];
}
const INITIAL_SCORE = 0;
const INITIAL_QUESTION = 0;

class Game {
	$gameRenderer: GameRenderer;
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
		this.$questionsData = new Questions(
			difficulty,
			chapters,
			sets
		).createQuestions();
		this.$score = INITIAL_SCORE;
		this.$currentQuestion = INITIAL_QUESTION;
		this.$gameRenderer = new GameRenderer(
			this.$appContainer,
			this.$questionsData,
			this.getCurrentQuestion.bind(this),
			this.getScore.bind(this),
			this.onQuestionAnswered.bind(this)
		);
		console.log(player, difficulty, chapters, container, sets);
	}

	getScore(): number {
		return this.$score;
	}
	getGameId(): string {
		return this.$gameId;
	}
	getCurrentQuestion(): number {
		return this.$currentQuestion;
	}
	render() {
		this.$gameRenderer.render();
	}

	incrementCurrentQuestion(): void {
		this.$currentQuestion++;
	}
	incrementScore(): void {
		this.$score++;
	}

	createGameId(): string {
		if (!this.$player) {
			throw new Error('Player not found');
		}
		return `${this.$player.getName()}-${
			this.$difficulty
		}-${this.$chapters.join('-')}-${Date.now()}`;
	}

	isGameFinished(): boolean {
		return this.$currentQuestion >= this.$questionsData.questions.length;
	}

	onQuestionAnswered(result: boolean) {
		if (result) {
			this.incrementScore();
		}
		this.incrementCurrentQuestion();

		if (this.isGameFinished()) {
			this.$gameRenderer.displayResults();
		} else {
			this.$gameRenderer.renderNextQuestion();
		}
	}
}
export default Game;
