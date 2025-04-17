import { AnswersDirection } from './enums/enums';
import { createButton } from './utils/createButton';
import { createInputs } from './utils/createInputs';

const CLASS_NAMES = {
	QUESTION: 'game__question',
	QUESTION_FIELDSET: 'game__question-fieldset',
	ANSWER: 'game__answer',
};
class QuestionRenderer {
	$answers: string[];
	$container: HTMLElement;
	$question: string;
	$answersDirection: AnswersDirection;
	$checkAnswer: (answer: string) => void;
	$form: HTMLFormElement | null;
	constructor(
		question: string,
		answersDirection: AnswersDirection,
		answers: string[],
		checkAnswer: (answer: string) => void,
		container: HTMLElement
	) {
		this.$container = container;
		this.$question = question;
		this.$answersDirection = answersDirection;
		this.$answers = answers;
		this.$checkAnswer = checkAnswer;
		this.$form = null;
	}

	render() {
		if (!this.$form) {
			this.createForm();
		}
		this.renderQuestion();
		this.renderAnswers();
		this.renderSubmitButton();
	}
	createForm() {
		const questionForm = document.createElement('form');
		questionForm.classList.add(CLASS_NAMES.QUESTION);
		this.$form = questionForm;
		this.$container.appendChild(questionForm);

		questionForm.addEventListener('submit', event =>
			this.handleSubmit(event)
		);
	}
	renderQuestion() {
		if (!this.$form) {
			console.error('Question container not found');
			return;
		}
		const question = document.createElement('h2');
		question.innerHTML = `What is the translation for: <span>${this.$question}</span>?`;
		this.$form.appendChild(question);
	}

	renderAnswers() {
		createInputs({
			form: this.$form,
			className: CLASS_NAMES.ANSWER,
			type: 'radio',
			name: 'answer',
			required: true,
			elements: this.$answers,
			selectAll: false,
		});
	}

	renderSubmitButton() {
		createButton(this.$form, 'submit', 'submit');
	}

	handleSubmit(event: Event) {
		event.preventDefault();
		const form = event.target as HTMLFormElement;
		const formData = new FormData(form);
		const answer = formData.get('answer') as string;

		if (!answer) {
			alert('Please select an answer!');
			return;
		}
		this.$checkAnswer(answer);
	}
}

export default QuestionRenderer;
