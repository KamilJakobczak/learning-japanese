import { QuestionsData } from './Questions';
import { QuestionData } from './Game';
import Question from './Question';

class GameRenderer {
	$appContainer: HTMLElement;
	$questionsData: QuestionsData;
	$currentQuestion: number;
	$gameContainer: HTMLElement;
	$questionCounter: HTMLElement;
	constructor(container: HTMLElement, questionsData: QuestionsData, currentQuestion: number) {
		this.$currentQuestion = currentQuestion;
		this.$questionsData = questionsData;
		this.$appContainer = container;
		this.$questionsData = questionsData;
		this.$gameContainer = this.createGameContainer();
		this.$questionCounter = this.createQuestionCounter();
	}

	render() {
		this.updateQuestionCounter();
		this.createQuestion();
	}
	createGameContainer() {
		const gameContainer = document.createElement('div');
		gameContainer.classList.add('gameContainer');
		this.$appContainer.appendChild(gameContainer);
		return gameContainer;
	}
	createQuestionCounter() {
		const questionCounter = document.createElement('h3');
		questionCounter.classList.add('game__questionCounter');
		questionCounter.textContent = `Question ${this.$currentQuestion + 1} of ${this.$questionsData.questions.length}`;
		this.$gameContainer.appendChild(questionCounter);
		return questionCounter;
	}
	updateQuestionCounter() {
		if (this.$questionCounter) {
			this.$questionCounter.textContent = `Question ${this.$currentQuestion + 1} of ${this.$questionsData.questions.length}`;
		}
	}
	createQuestion() {
		const questionData: QuestionData = {
			question: this.$questionsData.questions[this.$currentQuestion],
			correctAnswer: this.$questionsData.correctAnswers[this.$currentQuestion],
			incorrectAnswers: this.$questionsData.incorrectAnswers[this.$currentQuestion],
		};

		const question = new Question(this.$gameContainer, questionData);
		question.render();
	}
}

export default GameRenderer;
