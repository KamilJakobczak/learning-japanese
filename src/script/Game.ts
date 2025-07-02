import { Sets } from '../data/db';
import {
	Difficulty,
	Syllabary,
	GameState,
	AnswersDirection,
} from './enums/enums';
import GameRenderer from './GameRenderer';
import { Answers, GameTime, QuestionData } from './interfaces/interface';
import Player from './Player';
import Questions from './Questions';

const INITIAL_SCORE = 0;
const INITIAL_QUESTION = 0;

class Game {
	$gameRenderer: GameRenderer;
	$gameId: string;
	$player: Player;
	$difficulty: Difficulty;
	$chapters: string[];
	$syllabary: Syllabary;
	$score: number;
	$appContainer: HTMLElement;
	$sets: Sets;
	$questionsData: QuestionData[];
	$currentQuestion: number;
	$length: { start: number; end: number };
	$answeredCorrectly: Answers;
	$answeredWrong: Answers;
	constructor(
		player: Player,
		answersDirection: AnswersDirection,
		difficulty: Difficulty,
		syllabary: Syllabary,
		chapters: string[],
		container: HTMLElement,
		sets: Sets,
		onPlayAgain: () => void
	) {
		this.$player = player;
		this.$difficulty = difficulty;
		this.$syllabary = syllabary;
		this.$chapters = chapters;
		this.$gameId = this.createGameId();
		this.$appContainer = container;
		this.$sets = sets;
		this.$questionsData = new Questions(
			answersDirection,
			difficulty,
			syllabary,
			chapters,
			sets
		).createQuestions();
		this.$length = { start: 0, end: 0 };
		this.$score = INITIAL_SCORE;
		this.$currentQuestion = INITIAL_QUESTION;
		this.$gameRenderer = new GameRenderer(
			this.$appContainer,
			this.$questionsData,
			this.getCurrentQuestion.bind(this),
			this.getScore.bind(this),
			this.onQuestionAnswered.bind(this),
			this.getGameTime.bind(this),
			onPlayAgain
		);
		this.$answeredCorrectly = {
			toJapanese: {
				hiragana: [],
				katakana: [],
			},
			toRomaji: {
				hiragana: [],
				katakana: [],
			},
		};
		this.$answeredWrong = {
			toJapanese: {
				hiragana: [],
				katakana: [],
			},
			toRomaji: {
				hiragana: [],
				katakana: [],
			},
		};
	}

	render() {
		this.$gameRenderer.render();
		this.setGameTime(GameState.START);
	}
	getScore(): number {
		return (
			this.$answeredCorrectly.toJapanese.hiragana.length +
			this.$answeredCorrectly.toJapanese.katakana.length +
			this.$answeredCorrectly.toRomaji.hiragana.length +
			this.$answeredCorrectly.toRomaji.katakana.length
		);
	}
	getGameId(): string {
		return this.$gameId;
	}
	getCurrentQuestion(): number {
		return this.$currentQuestion;
	}
	setGameTime(gameState: GameState): void {
		switch (gameState) {
			case GameState.START:
				this.$length.start = Date.now();
				break;
			case GameState.END:
				this.$length.end = Date.now();
				break;
		}
	}

	incrementCurrentQuestion(): void {
		this.$currentQuestion++;
	}

	createGameId(): string {
		if (!this.$player) {
			throw new Error('Player not found');
		}
		return `${this.$player.getName()}-${this.$difficulty}-${
			this.$syllabary
		}-${this.$chapters.at(0)}-${this.$chapters.length}-${Date.now()}`;
	}
	getGameTime(): GameTime {
		if (this.$length.start === 0 || this.$length.end === 0) {
			throw new Error('Game time not set');
		}
		const time = this.$length.end - this.$length.start;

		const minutes = Math.floor(time / 1000 / 60);
		const seconds = Math.floor((time / 1000) % 60);
		const milliseconds = Math.floor((time % 1000) / 10);

		return { minutes, seconds, milliseconds };
	}

	isGameFinished(): boolean {
		return this.$currentQuestion >= this.$questionsData.length;
	}

	onQuestionAnswered(
		result: boolean,
		answer: string,
		answersDirection: AnswersDirection,
		syllabary: Syllabary
	) {
		if (result) {
			switch (answersDirection) {
				case AnswersDirection.TO_JAPANESE:
					switch (syllabary) {
						case Syllabary.HIRAGANA:
							this.$answeredCorrectly.toJapanese.hiragana.push(answer);
							break;
						case Syllabary.KATAKANA:
							this.$answeredCorrectly.toJapanese.katakana.push(answer);
							break;
					}
					break;
				case AnswersDirection.TO_ROMAJI:
					switch (syllabary) {
						case Syllabary.HIRAGANA:
							this.$answeredCorrectly.toRomaji.hiragana.push(answer);
							break;
						case Syllabary.KATAKANA:
							this.$answeredCorrectly.toRomaji.katakana.push(answer);
							break;
					}
					break;
				default:
					break;
			}
		} else {
			switch (answersDirection) {
				case AnswersDirection.TO_JAPANESE:
					switch (syllabary) {
						case Syllabary.HIRAGANA:
							this.$answeredWrong.toJapanese.hiragana.push(answer);
							break;
						case Syllabary.KATAKANA:
							this.$answeredWrong.toJapanese.katakana.push(answer);
							break;
					}
				case AnswersDirection.TO_ROMAJI:
					switch (syllabary) {
						case Syllabary.HIRAGANA:
							this.$answeredWrong.toRomaji.hiragana.push(answer);
							break;
						case Syllabary.KATAKANA:
							this.$answeredWrong.toRomaji.katakana.push(answer);
							break;
					}
				default:
					break;
			}
		}

		this.incrementCurrentQuestion();

		if (this.isGameFinished()) {
			this.setGameTime(GameState.END);

			const gameResults = {
				id: this.$gameId,
				time: this.getGameTime(),
				answersDirection,
				difficulty: this.$difficulty,
				questionsCount: this.$questionsData.length,
				correctAnswers: this.$answeredCorrectly,
				wrongAnswers: this.$answeredWrong,
			};
			console.log(gameResults);
			this.$player.addGameStatistics(gameResults);
			this.$gameRenderer.displayResults();
		} else {
			this.$gameRenderer.renderNextQuestion();
		}
	}
}
export default Game;
