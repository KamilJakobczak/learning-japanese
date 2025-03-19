import { Sets } from '../data/db';
import Player from './Player';
import Question from './Question';
import Questions from './Questions';

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
	$questionsData: any;
	$currentQuestion: number;
	$gameContainer: HTMLElement | null;
	constructor(player: Player, difficulty: string, chapters: string[], container: HTMLElement, sets: Sets) {
		this.$player = player;
		this.$difficulty = difficulty;
		this.$chapters = chapters;
		this.$gameId = this.createGameId();
		this.$appContainer = container;
		this.$sets = sets;
		this.$questionsData = this.createQuestionsData();
		this.$score = 0;
		this.$currentQuestion = 0;
		this.$gameContainer = null;
	}
	render() {
		const gameContainer = document.createElement('div');
		gameContainer.classList.add('gameContainer');
		this.$appContainer.appendChild(gameContainer);
		this.$gameContainer = gameContainer;
		this.displayQuestion();
	}
	createQuestionsData() {
		const questions = new Questions(this.$difficulty, this.$chapters, this.$sets);
		console.log(questions.createQuestions());
		return questions.createQuestions();
	}
	createGameId() {
		return `${this.$player.getName()}-${this.$difficulty}-${this.$chapters.join('-')}-${Date.now()}`;
	}
	displayQuestion() {
		const questionData: QuestionData = {
			question: this.$questionsData.questions[this.$currentQuestion],
			correctAnswer: this.$questionsData.correctAnswers[this.$currentQuestion],
			incorrectAnswers: this.$questionsData.incorrectAnswers[this.$currentQuestion],
		};

		console.log(this.$gameContainer);
		const question = new Question(this.$gameContainer, questionData);
		question.render();
	}
}
export default Game;
