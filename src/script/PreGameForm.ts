import { Sets } from '../data/db';
import { createInputs } from './utils/createInputs';
import { createButton } from './utils/createButton';
import { DIFFICULTY, SYLLABARY } from './enums/enums';
import { createFormFieldset } from './utils/createFormFieldset';

interface PreGameFormProps {
	parent: HTMLElement;
	sets: Sets;
	onPregameFormSubmit: (
		username: string,
		difficulty: DIFFICULTY,
		syllabary: SYLLABARY,
		chapters: string[]
	) => void;
	isPlayer: boolean;
}

const CLASS_NAMES = {
	FORM: 'gameForm',
	USERNAME: 'gameForm__username',
	DIFFICULTY: 'gameForm__difficulty',
	CHAPTERS: 'gameForm__chapters',
	BUTTON: 'gameForm__button',
	SYLLABARY: 'gameForm__syllabary',
};

class PreGameForm {
	$parent: HTMLElement;
	$sets: Sets;
	$syllabaryLevels: SYLLABARY[];
	$difficultyLevels: DIFFICULTY[];
	$form: HTMLFormElement | null;
	$selectedSyllabary: SYLLABARY;
	$onPregameFormSubmit: (
		username: string,
		difficulty: DIFFICULTY,
		syllabary: SYLLABARY,
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
		this.$difficultyLevels = [
			DIFFICULTY.EASY,
			DIFFICULTY.MEDIUM,
			DIFFICULTY.HARD,
			DIFFICULTY.EXTREME,
		];
		this.$syllabaryLevels = [
			SYLLABARY.HIRAGANA,
			SYLLABARY.KATAKANA,
			SYLLABARY.MIXED,
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
		this.$isPlayer ? null : this.createUsernameInput(form);

		// Create and append the difficulty selection section
		this.createDifficultySelection(form);

		this.createSyllabarySelection(form);

		// Create and append the chapters selection section
		this.createChaptersContainer(form);

		// Create and append the start game button
		this.createGameButton(form);
		// Add an event listener to the form to handle form submission
		form.addEventListener('submit', this.handleFormSubmit.bind(this));
	}
	// Method to create and append the username input section
	createUsernameInput(parent: HTMLFormElement) {
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
	// Method to create and append the difficulty selection section
	createDifficultySelection(parent: HTMLFormElement) {
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

	createSyllabarySelection(parent: HTMLFormElement) {
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

			this.$selectedSyllabary = target.value as SYLLABARY;
			this.createChaptersSelection();
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
	createChaptersSelection() {
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
					case SYLLABARY.HIRAGANA:
						labelText.push(character.hiragana);
						break;
					case SYLLABARY.KATAKANA:
						labelText.push(character.katakana);
						break;
					case SYLLABARY.MIXED:
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
	createGameButton(parent: HTMLElement) {
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
		const difficulty = formData.get('difficulty') as DIFFICULTY;
		const chapters = formData.getAll('chapters') as string[];
		const syllabary = formData.get('syllabary') as SYLLABARY;

		this.unmount(); // Remove the form from the DOM
		this.$onPregameFormSubmit(username, difficulty, syllabary, chapters);
	}
}

export default PreGameForm;
