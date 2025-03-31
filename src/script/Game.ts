import { Sets } from '../data/db';
import { DIFFICULTY, SYLLABARY } from './enums/enums';
import GameRenderer from './GameRenderer';
import Player from './Player';
import Questions, { QuestionData } from './Questions';

const INITIAL_SCORE = 0;
const INITIAL_QUESTION = 0;

class Game {
	$gameRenderer: GameRenderer;
	$gameId: string;
	$player: Player;
	$difficulty: string;
	$chapters: string[];
	$syllabary: SYLLABARY;
	$score: number;
	$appContainer: HTMLElement;
	$sets: Sets;
	$questionsData: QuestionData[];
	$currentQuestion: number;

	constructor(
		player: Player,
		difficulty: DIFFICULTY,
		syllabary: SYLLABARY,
		chapters: string[],
		container: HTMLElement,
		sets: Sets
	) {
		this.$player = player;
		this.$difficulty = difficulty;
		this.$syllabary = syllabary;
		this.$chapters = chapters;
		this.$gameId = this.createGameId();
		this.$appContainer = container;
		this.$sets = sets;
		this.$questionsData = new Questions(
			difficulty,
			syllabary,
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
		return this.$currentQuestion >= this.$questionsData.length;
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
