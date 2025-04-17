import { AnswersDirection, Syllabary } from './enums/enums';
import { QuestionData } from './interfaces/interface';
import QuestionRenderer from './QuestionRenderer';
import { shuffleArray } from './utils/shuffleArray';

class Question {
	$container: HTMLElement;

	$answersDirection: AnswersDirection;
	$correctAnswer: string;
	$distractors: string[];
	$question: string;
	$syllabary: Syllabary;
	$onQuestionAnswered: (
		result: boolean,
		answer: string,

		answersDirection: AnswersDirection,
		syllabary: Syllabary
	) => void;
	constructor(
		container: HTMLElement,
		questionData: QuestionData,
		onQuestionAnswered: (result: boolean) => void
	) {
		console.log(questionData);
		this.$container = container;
		this.$question = questionData.question;

		this.$answersDirection = questionData.answersDirection;
		this.$correctAnswer = questionData.correctAnswer;
		this.$syllabary = questionData.syllabary;
		this.$distractors = questionData.distractors;
		this.$onQuestionAnswered = onQuestionAnswered;
	}
	render() {
		const renderer = new QuestionRenderer(
			this.$question,
			this.$answersDirection,
			this.generateShuffledAnswers(),
			this.validateAnswer.bind(this),
			this.$container
		);
		renderer.render();
	}
	generateShuffledAnswers() {
		return shuffleArray([this.$correctAnswer, ...this.$distractors]);
	}

	validateAnswer(answer: string) {
		if (answer === this.$correctAnswer) {
			console.log('GOOD ANSWER');
			this.$onQuestionAnswered(
				true,
				answer,
				this.$answersDirection,
				this.$syllabary
			);
		} else {
			console.log('WRONG ANSWER');
			this.$onQuestionAnswered(
				false,
				answer,
				this.$answersDirection,
				this.$syllabary
			);
		}
	}
}

export default Question;
