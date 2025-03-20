import { QuestionsData } from './Questions';
import { QuestionData } from './Game';
import Question from './Question';

class GameRenderer {
	$appContainer: HTMLElement;
	$questionsData: QuestionsData;
	$currentQuestion: number;
	$gameContainer: HTMLElement;
	$questionCounter: HTMLElement;
	$setCurrentQuestion: () => void;
	$setScore: () => void;
	$rerender: () => void;
	$getScore: () => number;
	constructor(
		container: HTMLElement,
		questionsData: QuestionsData,
		currentQuestion: number,
		setCurrentQuestion: () => void,
		setScore: () => void,
		rerender: () => void,
		getScore: () => number
	) {
		this.$currentQuestion = currentQuestion;
		this.$questionsData = questionsData;
		this.$appContainer = container;
		this.$questionsData = questionsData;
		this.$gameContainer = this.createGameContainer();
		this.$questionCounter = this.createQuestionCounter();
		this.$setCurrentQuestion = setCurrentQuestion;
		this.$setScore = setScore;
		this.$rerender = rerender;
		this.$getScore = getScore;
	}

	render() {
		if (this.$currentQuestion >= this.$questionsData.questions.length) {
			this.displayResults();
			return;
		} else {
			// this.updateQuestionCounter();
			this.createQuestion();
		}
	}
	unmount() {
		this.$gameContainer.remove();
	}
	createGameContainer() {
		const gameContainer = document.createElement('div');
		gameContainer.classList.add('gameContainer');
		this.$appContainer.appendChild(gameContainer);
		return gameContainer;
	}
	createQuestionCounter() {
		if (this.$currentQuestion >= this.$questionsData.questions.length) {
			return;
		}
		const questionCounter = document.createElement('h3');
		questionCounter.classList.add('game__questionCounter');
		questionCounter.textContent = `Question ${this.$currentQuestion + 1} of ${
			this.$questionsData.questions.length
		}`;
		this.$gameContainer.appendChild(questionCounter);
		return questionCounter;
	}

	createQuestion() {
		const questionData: QuestionData = {
			question: this.$questionsData.questions[this.$currentQuestion],
			correctAnswer: this.$questionsData.correctAnswers[this.$currentQuestion],
			incorrectAnswers: this.$questionsData.incorrectAnswers[this.$currentQuestion],
		};

		const question = new Question(
			this.$gameContainer,
			questionData,
			this.$setCurrentQuestion,
			this.$setScore,
			this.$rerender,
			this.unmount.bind(this)
		);
		question.render();
	}
	displayResults() {
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
