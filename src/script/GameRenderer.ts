import { QuestionData } from './Questions';
import Question from './Question';

class GameRenderer {
	$appContainer: HTMLElement;
	$questionsData: QuestionData[];
	$gameContainer: HTMLElement;
	$questionCounter: HTMLElement | null;
	$getScore: () => number;
	$onQuestionAnswered: (result: boolean) => void;
	$getCurrentQuestion: () => number;
	constructor(
		container: HTMLElement,
		questionsData: QuestionData[],
		getCurrentQuestion: () => number,
		getScore: () => number,
		onQuestionAnswered: (result: boolean) => void
	) {
		this.$questionsData = questionsData;
		this.$appContainer = container;
		this.$questionsData = questionsData;
		this.$getCurrentQuestion = getCurrentQuestion;
		this.$getScore = getScore;
		this.$onQuestionAnswered = onQuestionAnswered;
		this.$gameContainer = this.createGameContainer();
		this.$questionCounter = this.renderQuestionCounter();
	}

	render() {
		if (this.$getCurrentQuestion() >= this.$questionsData.length) {
			this.displayResults();
			return;
		} else {
			this.$gameContainer.innerHTML = '';
			this.renderQuestionCounter();
			this.createQuestion();
		}
	}
	// unmount() {
	// 	this.$gameContainer.remove();
	// }
	createGameContainer() {
		const gameContainer = document.createElement('div');
		gameContainer.classList.add('gameContainer');
		this.$appContainer.appendChild(gameContainer);
		return gameContainer;
	}
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

	createQuestion() {
		const questionData: QuestionData = {
			question: this.$questionsData[this.$getCurrentQuestion()].question,
			correctAnswer:
				this.$questionsData[this.$getCurrentQuestion()].correctAnswer,
			incorrectAnswers:
				this.$questionsData[this.$getCurrentQuestion()].incorrectAnswers,
		};

		const question = new Question(
			this.$gameContainer,
			questionData,
			this.$onQuestionAnswered
		);
		question.render();
	}
	renderNextQuestion() {
		this.render();
	}
	displayResults() {
		this.$gameContainer.innerHTML = '';

		const resultContainer = document.createElement('div');
		resultContainer.classList.add('game__result');

		const result = document.createElement('h3');
		resultContainer.appendChild(result);
		this.$gameContainer.appendChild(resultContainer);
		result.innerHTML = `${(
			(this.$getScore() / this.$questionsData.length) *
			100
		).toFixed(2)}%!`;
		const resultText = document.createElement('p');
		resultContainer.appendChild(resultText);
		resultText.textContent = `You scored ${this.$getScore()} points out of ${
			this.$questionsData.length
		} possible!`;
	}
}

export default GameRenderer;
