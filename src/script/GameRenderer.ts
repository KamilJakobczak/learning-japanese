import Question from './Question';

import { createParagraph } from './utils/createParagraph';
import Timer from './Timer';
import { GameTime, QuestionData } from './interfaces/interface';

class GameRenderer {
	$appContainer: HTMLElement;
	$questionsData: QuestionData[];
	$gameContainer: HTMLElement;
	$questionCounter: HTMLElement | null;
	$getScore: () => number;
	$onQuestionAnswered: (result: boolean) => void;
	$getCurrentQuestion: () => number;
	$getGameTime: () => GameTime;
	$onPlayAgain: () => void;
	constructor(
		container: HTMLElement,
		questionsData: QuestionData[],
		getCurrentQuestion: () => number,
		getScore: () => number,
		onQuestionAnswered: (result: boolean) => void,
		getGameTime: () => GameTime,
		onPlayAgain: () => void
	) {
		this.$questionsData = questionsData;
		this.$appContainer = container;
		this.$getCurrentQuestion = getCurrentQuestion;
		this.$getScore = getScore;
		this.$onQuestionAnswered = onQuestionAnswered;
		this.$getGameTime = getGameTime;
		this.$onPlayAgain = onPlayAgain;
		this.$gameContainer = this.createGameContainer();
		this.$questionCounter = this.renderQuestionCounter();
	}
	// Render the game or display results if all questions are answered
	render() {
		if (this.$getCurrentQuestion() >= this.$questionsData.length) {
			this.displayResults();
			return;
		} else {
			this.$gameContainer.replaceChildren();
			this.renderQuestionCounter();
			this.createQuestion();
		}
	}
	// Create and append the main game container to the app container
	createGameContainer() {
		const gameContainer = document.createElement('div');
		gameContainer.classList.add('gameContainer');
		this.$appContainer.appendChild(gameContainer);
		return gameContainer;
	}
	renderTimer() {
		const timerWrapper = document.createElement('div');
		timerWrapper.classList.add('game__timer');
		const timer = new Timer();
		timer.start();
	}
	// Render the question counter to display the current question number
	renderQuestionCounter(): null | HTMLElement {
		if (!this.$questionsData || this.$questionsData.length === 0) {
			console.error('No questions available.');
		}
		if (this.$questionCounter) {
			this.$questionCounter.textContent = `Question ${
				this.$getCurrentQuestion() + 1
			} of ${this.$questionsData.length}`;
		}

		const questionCounter = document.createElement('h3');
		questionCounter.setAttribute('role', 'status');
		questionCounter.classList.add('game__questionCounter');
		questionCounter.textContent = `Question ${
			this.$getCurrentQuestion() + 1
		} of ${this.$questionsData.length}`;
		this.$gameContainer.appendChild(questionCounter);
		return questionCounter;
	}
	// Create and render a new question using the current question data
	createQuestion() {
		const index = this.$getCurrentQuestion();
		const questionData: QuestionData = {
			syllabary: this.$questionsData[index].syllabary,
			question: this.$questionsData[index].question,
			answersDirection: this.$questionsData[index].answersDirection,
			correctAnswer: this.$questionsData[index].correctAnswer,
			distractors: this.$questionsData[index].distractors,
		};

		const question = new Question(
			this.$gameContainer,
			questionData,
			this.$onQuestionAnswered
		);
		question.render();
		this.renderTimer();
	}

	renderNextQuestion() {
		// Render the next question by re-rendering the game
		this.render();
	}
	// Calculate the average time spent per question
	calculateTimeSpent(): number {
		const questions = this.$questionsData.length;
		const timeSpent = this.$getGameTime();
		const totalTime =
			timeSpent.minutes * 60 +
			timeSpent.seconds +
			timeSpent.milliseconds / 1000;
		const timePerQuestion = totalTime / questions;
		return timePerQuestion;
	}
	// Display the final results, including score and time statistics
	displayResults() {
		this.$gameContainer.replaceChildren();

		const resultContainer = document.createElement('div');
		resultContainer.classList.add('game__result');

		const result = document.createElement('h3');
		resultContainer.appendChild(result);
		this.$gameContainer.appendChild(resultContainer);
		result.textContent = `${(
			(this.$getScore() / this.$questionsData.length) *
			100
		).toFixed(2)}%!`;

		createParagraph(
			`You scored ${this.$getScore()} points out of ${
				this.$questionsData.length
			} possible!`,
			resultContainer
		);

		const gameTime = this.$getGameTime();
		createParagraph(
			`It took you ${gameTime.minutes} minutes, ${gameTime.seconds} seconds and ${gameTime.milliseconds} milliseconds to finish the game.`,
			resultContainer
		);

		const timePerQuestion = this.calculateTimeSpent();
		createParagraph(
			`You spent ${timePerQuestion.toFixed(2)} seconds per question.`,
			resultContainer
		);

		const restartButton = document.createElement('button');
		restartButton.textContent = 'Play again!';
		restartButton.classList.add('game__restartButton');
		restartButton.addEventListener('click', () => {
			this.$onPlayAgain();
		});
		resultContainer.appendChild(restartButton);
	}
}

export default GameRenderer;
