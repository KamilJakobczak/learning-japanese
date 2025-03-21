class QuestionRenderer {
	$answers: string[];
	$container: HTMLElement;
	$question: string;
	$checkAnswer: (answer: string) => void;
	$questionContainer: HTMLElement | null;
	constructor(
		question: string,
		answers: string[],
		checkAnswer: (answer: string) => void,
		container: HTMLElement
	) {
		this.$question = question;
		this.$questionContainer = null;
		this.$answers = answers;
		this.$checkAnswer = checkAnswer;
		this.$container = container;
	}
	render() {
		if (!this.$questionContainer) {
			this.createQuestionContainer();
		}
		this.renderQuestion();
		this.renderAnswers();
		this.renderSubmitButton();
	}
	createQuestionContainer() {
		const questionForm = document.createElement('form');
		questionForm.classList.add('game__question');
		this.$container.appendChild(questionForm);
		const questionFieldset = document.createElement('fieldset');
		questionFieldset.classList.add('game__question-fieldset');
		questionFieldset.name = 'answer';
		questionForm.appendChild(questionFieldset);

		this.$questionContainer = questionFieldset;
		questionForm.addEventListener('submit', event => this.handleSubmit(event));
	}
	renderQuestion() {
		const question = document.createElement('h2');
		question.innerHTML = `What is the translation for: <span>${this.$question}</span>?`;

		this.$questionContainer.appendChild(question);
	}
	renderAnswers() {
		this.$answers.map((answer, index) => {
			const answerWrapper = document.createElement('div');
			answerWrapper.classList.add('game__answer');
			const radioInput = document.createElement('input');
			radioInput.type = 'radio';
			radioInput.id = `answer-${index}`;
			radioInput.name = 'answer';
			radioInput.value = answer;
			const label = document.createElement('label');
			label.htmlFor = `answer-${index}`;
			// label.textContent = answer;
			// label.innerHTML = radioInput.outerHTML + label.textContent;
			label.appendChild(radioInput);
			const textNode = document.createTextNode(answer);
			label.appendChild(textNode);
			answerWrapper.appendChild(label);
			this.$questionContainer.appendChild(answerWrapper);
		});
	}
	renderSubmitButton() {
		const submitButton = document.createElement('button');
		submitButton.type = 'submit';
		submitButton.textContent = 'Submit';
		this.$questionContainer.appendChild(submitButton);
	}

	handleSubmit(event: Event) {
		event.preventDefault();
		const form = event.target as HTMLFormElement;
		const formData = new FormData(form);
		const answer = formData.get('answer') as string;
		this.$checkAnswer(answer);
	}
}

export default QuestionRenderer;
