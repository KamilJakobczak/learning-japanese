import { Sets } from '../data/db';
import { createInputs } from './utils/createInputs';
import { createButton } from './utils/createButton';
import {
	AnswersDirection,
	Difficulty,
	QuestionType,
	Syllabary,
} from './enums/enums';
import { createFormFieldset } from './utils/createFormFieldset';

interface PreGameFormProps {
	parent: HTMLElement;
	sets: Sets;
	onPregameFormSubmit: (
		username: string,
		questionsType: QuestionType,
		answersDirection: AnswersDirection,
		difficulty: Difficulty,
		syllabary: Syllabary,
		chapters: string[]
	) => void;
	isPlayer: boolean;
}

const CLASS_NAMES = {
	FORM: 'gameForm',
	USERNAME: 'gameForm__username',
	QUESTIONS_TYPE: 'gameForm__type',
	ANSWERS_DIRECTION: 'gameForm__answersDirection',
	DIFFICULTY: 'gameForm__difficulty',
	SYLLABARY: 'gameForm__syllabary',
	CHAPTERS: 'gameForm__chapters',
	BUTTON: 'gameForm__button',
};

class PreGameForm {
	$parent: HTMLElement;
	$sets: Sets;
	$questionsType: QuestionType[];
	$answersDirection: AnswersDirection[];
	$syllabaryLevels: Syllabary[];
	$difficultyLevels: Difficulty[];
	$form: HTMLFormElement | null;
	$selectedSyllabary: Syllabary;
	$onPregameFormSubmit: (
		username: string,
		questionsType: QuestionType,
		answersDirection: AnswersDirection,
		difficulty: Difficulty,
		syllabary: Syllabary,
		chapters: string[]
	) => void;
	$isPlayer: boolean;
	$chaptersContainer: HTMLFieldSetElement | null;
	constructor({
		parent,
		sets,
		onPregameFormSubmit,
		isPlayer,
	}: PreGameFormProps) {
		this.$questionsType = [
			QuestionType.CLOSED,
			QuestionType.OPEN,
			QuestionType.MIXED,
		];
		this.$answersDirection = [
			AnswersDirection.TO_JAPANESE,
			AnswersDirection.TO_ROMAJI,
			AnswersDirection.MIXED,
		];
		this.$difficultyLevels = [
			Difficulty.EASY,
			Difficulty.MEDIUM,
			Difficulty.HARD,
			Difficulty.EXTREME,
		];
		this.$syllabaryLevels = [
			Syllabary.HIRAGANA,
			Syllabary.KATAKANA,
			Syllabary.MIXED,
		];
		this.$sets = sets;
		this.$parent = parent;
		this.$form = null;
		this.$onPregameFormSubmit = onPregameFormSubmit;
		this.$isPlayer = isPlayer;
		this.$chaptersContainer = null;
	}

	render() {
		this.createForm();
	}
	unmount() {
		this.$form?.remove();
		this.$form = null;
	}

	createForm() {
		if (this.$form) {
			return;
		}
		// Create and append the game form
		const form = document.createElement('form');
		form.id = CLASS_NAMES.FORM;
		form.classList.add(CLASS_NAMES.FORM);
		this.$parent.appendChild(form);
		this.$form = form;
		// Create and append the username input section
		this.$isPlayer ? null : this.renderUsernameInput(form);

		// Create and append the question type selection section
		this.renderQuestionTypeSelection(form);
		// Create and append the answers direction selection section
		this.renderAnswersDirectionSelection(form);
		// Create and append the Difficulty selection section
		this.renderDifficultySelection(form);
		// Create and append the syllabary selection section
		this.renderSyllabarySelection(form);
		// Create and append the chapters selection section
		this.createChaptersContainer(form);

		// Create and append the start game button
		this.renderGameButton(form);
		// Add an event listener to the form to handle form submission
		form.addEventListener('submit', this.handleFormSubmit.bind(this));
	}
	// Method to create and append the username input section
	renderUsernameInput(parent: HTMLFormElement) {
		createInputs({
			form: parent,
			className: CLASS_NAMES.USERNAME,
			type: 'text',
			name: 'username',
			required: true,
			elements: ['username'],
			selectAll: false,
		});
	}
	// Method to create and append the question type selection section
	renderQuestionTypeSelection(parent: HTMLFormElement) {
		createInputs({
			form: parent,
			className: CLASS_NAMES.QUESTIONS_TYPE,
			type: 'radio',
			name: 'questionType',
			required: true,
			elements: this.$questionsType,
			selectAll: false,
		});
	}
	// Method to create and append the answers direction selection section
	renderAnswersDirectionSelection(parent: HTMLFormElement) {
		createInputs({
			form: parent,
			className: CLASS_NAMES.ANSWERS_DIRECTION,
			type: 'radio',
			name: 'answersDirection',
			required: true,
			elements: this.$answersDirection,
			selectAll: false,
		});
	}
	// Method to create and append the Difficulty selection section
	renderDifficultySelection(parent: HTMLFormElement) {
		createInputs({
			form: parent,
			className: CLASS_NAMES.DIFFICULTY,
			type: 'radio',
			name: 'difficulty',
			required: true,
			elements: this.$difficultyLevels,
			selectAll: false,
		});
	}

	renderSyllabarySelection(parent: HTMLFormElement) {
		const syllabary = createInputs({
			form: parent,
			className: CLASS_NAMES.SYLLABARY,
			type: 'radio',
			name: 'syllabary',
			required: true,
			elements: this.$syllabaryLevels,
			selectAll: false,
		});

		syllabary.addEventListener('change', (event: Event) => {
			const target = event.target as HTMLInputElement;

			this.$selectedSyllabary = target.value as Syllabary;
			this.renderChaptersSelection();
		});
	}
	createChaptersContainer(parent: HTMLFormElement) {
		const fieldset = createFormFieldset(
			CLASS_NAMES.CHAPTERS,
			parent,
			'chapters'
		);
		this.$chaptersContainer = fieldset;
	}
	// Method to create and append the chapters selection section
	renderChaptersSelection() {
		Array.from(this.$chaptersContainer?.children).forEach((child, index) => {
			if (index !== 0) {
				child.remove();
			}
		});

		// Get the chapters from the sets data
		const chapters = Object.keys(this.$sets);
		// Create an array of labels for the chapters
		const labels: string[] = [];
		let labelText: string[] = [];
		chapters.forEach(chapter => {
			labelText.length = 0;
			this.$sets[chapter].forEach(character => {
				switch (this.$selectedSyllabary) {
					case Syllabary.HIRAGANA:
						labelText.push(character.hiragana);
						break;
					case Syllabary.KATAKANA:
						labelText.push(character.katakana);
						break;
					case Syllabary.MIXED:
						labelText.push(character.hiragana);
						labelText.push(character.katakana);
						break;
				}
			});
			labels.push(`(${labelText.join(', ')})`);
		});

		// Create and append the chapters
		createInputs({
			form: this.$form,
			fieldset: this.$chaptersContainer,
			className: CLASS_NAMES.CHAPTERS,
			type: 'checkbox',
			name: 'chapters',
			required: false,
			elements: chapters,
			labels,
			selectAll: true,
		});
	}

	// Method to create and append the start game button
	renderGameButton(parent: HTMLElement) {
		createButton(parent, 'Start Game', 'submit');
	}

	// Method to handle form submission
	handleFormSubmit(event: Event) {
		event.preventDefault();
		// Get the form element from the event target
		const form = event.target as HTMLFormElement;
		// Extract form data using FormData API
		const formData = new FormData(form);
		const username = formData.get('username') as string;
		const questionsType = formData.get('questionType') as QuestionType;
		const answersDirection = formData.get(
			'answersDirection'
		) as AnswersDirection;
		console.log(questionsType, answersDirection);
		const difficulty = formData.get('difficulty') as Difficulty;
		const chapters = formData.getAll('chapters') as string[];
		const syllabary = formData.get('syllabary') as Syllabary;

		this.unmount(); // Remove the form from the DOM
		this.$onPregameFormSubmit(
			username,
			questionsType,
			answersDirection,
			difficulty,
			syllabary,
			chapters
		);
	}
}

export default PreGameForm;
