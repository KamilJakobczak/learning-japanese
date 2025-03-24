import { Sets } from '../data/db';
import Player from './Player';
import { createInputs } from './utils/createInputs';
import { createButton } from './utils/createButton';

interface PreGameFormProps {
	parent: HTMLElement;
	sets: Sets;
	onPregameFormSubmit: (
		username: string,
		difficulty: string,
		chapters: string[]
	) => void;
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
	$syllabaryLevels: ['hiragana', 'katakana', 'mixed'];
	$difficultyLevels = ['easy', 'medium', 'hard', 'extreme'];
	$form: HTMLFormElement | null;
	$onPregameFormSubmit: (
		username: string,
		difficulty: string,
		chapters: string[]
	) => void;
	constructor({ parent, sets, onPregameFormSubmit }: PreGameFormProps) {
		this.$difficultyLevels = ['easy', 'medium', 'hard', 'extreme'];
		this.$syllabaryLevels = ['hiragana', 'katakana', 'mixed'];
		this.$sets = sets;
		this.$parent = parent;
		this.$form = null;
		this.$onPregameFormSubmit = onPregameFormSubmit;
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
		this.createUsernameInput(form);

		// Create and append the difficulty selection section
		this.createDifficultySelection(form);

		this.createSyllabarySelection(form);

		// Create and append the chapters selection section
		this.createChaptersSelection(form);

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
		});
	}

	createSyllabarySelection(parent: HTMLFormElement) {
		createInputs({
			form: parent,
			className: CLASS_NAMES.SYLLABARY,
			type: 'radio',
			name: 'syllabary',
			required: true,
			elements: this.$syllabaryLevels,
		});
	}

	// Method to create and append the chapters selection section
	createChaptersSelection(parent: HTMLFormElement) {
		// Get the chapters from the sets data
		const chapters = Object.keys(this.$sets);
		// Create an array of labels for the chapters
		const labels: string[] = [];
		let labelText: string[] = [];
		chapters.forEach(chapter => {
			labelText.length = 0;
			this.$sets[chapter].forEach(character => {
				labelText.push(character.hiragana);
			});
			labels.push(`${chapter} (${labelText.join(', ')})`);
		});
		// Create and append the chapters
		createInputs({
			form: parent,
			className: CLASS_NAMES.CHAPTERS,
			type: 'checkbox',
			name: 'chapter',
			required: false,
			elements: chapters,
			labels,
		});
	}

	// Method to create and append the start game button
	createGameButton(parent: HTMLElement) {
		createButton(parent, 'Start Game', 'submit');
	}

	// Method to handle form submission
	handleFormSubmit(event: Event) {
		event.preventDefault(); // Prevent the default form submission behavior

		// Get the form element from the event target
		const form = event.target as HTMLFormElement;

		// Extract form data using FormData API
		const formData = new FormData(form);
		const username = formData.get('username') as string; // Get the username
		const difficulty = formData.get('difficulty') as string; // Get the selected difficulty level
		const chapters = formData.getAll('chapter') as string[]; // Get all selected chapters

		this.unmount(); // Unmount the form
		this.$onPregameFormSubmit(username, difficulty, chapters); // Call the onPregameFormSubmit callback
	}
}

export default PreGameForm;
