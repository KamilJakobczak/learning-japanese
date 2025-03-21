import { QuestionData } from './Game';
import QuestionRenderer from './QuestionRenderer';
import { shuffleArray } from './utils/shuffleArray';

class Question {
	$container: HTMLElement;
	$correctAnswer: string;
	$incorrectAnswers: string[];
	$question: string;
	$onQuestionAnswered: (result: boolean) => void;
	constructor(
		container: HTMLElement,
		questionData: QuestionData,
		onQuestionAnswered: (result: boolean) => void
	) {
		this.$container = container;
		this.$question = questionData.question;
		this.$correctAnswer = questionData.correctAnswer;
		this.$incorrectAnswers = questionData.incorrectAnswers;
		this.$onQuestionAnswered = onQuestionAnswered;
	}
	render() {
		const renderer = new QuestionRenderer(
			this.$question,
			this.generateShuffledAnswers(),
			this.validateAnswer.bind(this),
			this.$container
		);
		renderer.render();
	}
	generateShuffledAnswers() {
		return shuffleArray([this.$correctAnswer, ...this.$incorrectAnswers]);
	}

	validateAnswer(answer: string) {
		if (answer === this.$correctAnswer) {
			console.log('GOOD ANSWER');
			this.$onQuestionAnswered(true);
		} else {
			console.log('WRONG ANSWER');
			this.$onQuestionAnswered(false);
		}
	}
}

export default Question;
