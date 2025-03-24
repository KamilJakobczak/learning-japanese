import { QuestionsData } from './Questions';
import { QuestionData } from './Game';
import Question from './Question';

class GameRenderer {
	$appContainer: HTMLElement;
	$questionsData: QuestionsData;
	$gameContainer: HTMLElement;
	$questionCounter: HTMLElement | null;
	$getScore: () => number;
	$onQuestionAnswered: (result: boolean) => void;
	$getCurrentQuestion: () => number;
	constructor(
		container: HTMLElement,
		questionsData: QuestionsData,
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
		if (this.$getCurrentQuestion() >= this.$questionsData.questions.length) {
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
		if (!this.$questionsData || this.$questionsData.questions.length === 0) {
			console.error('No questions available.');
		}
		if (this.$questionCounter) {
			this.$questionCounter.textContent = `Question ${
				this.$getCurrentQuestion() + 1
			} of ${this.$questionsData.questions.length}`;
		}

		const questionCounter = document.createElement('h3');
		questionCounter.setAttribute('role', 'status');
		questionCounter.classList.add('game__questionCounter');
		questionCounter.textContent = `Question ${
			this.$getCurrentQuestion() + 1
		} of ${this.$questionsData.questions.length}`;
		this.$gameContainer.appendChild(questionCounter);
		return questionCounter;
	}

	createQuestion() {
		const questionData: QuestionData = {
			question: this.$questionsData.questions[this.$getCurrentQuestion()],
			correctAnswer:
				this.$questionsData.correctAnswers[this.$getCurrentQuestion()],
			incorrectAnswers:
				this.$questionsData.incorrectAnswers[this.$getCurrentQuestion()],
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
			(this.$getScore() / this.$questionsData.questions.length) *
			100
		).toFixed(2)}%!`;
		const resultText = document.createElement('p');
		resultContainer.appendChild(resultText);
		resultText.textContent = `You scored ${this.$getScore()} points out of ${
			this.$questionsData.questions.length
		} possible!`;
	}
}

export default GameRenderer;
