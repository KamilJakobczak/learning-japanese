import { Sets } from '../data/db'; // Import the Sets type from the database module
import Game from './Game';
import Player from './Player';
import Question from './Question';

class GameWindow {
	$sets: Sets; // Declare a property to hold the sets data
	$currentPlayer: Player | null = null; // Declare a property to hold the current player
	constructor(sets: Sets) {
		this.$sets = sets; // Initialize the sets data
		this.$currentPlayer = null; // Initialize the current player
	}

	render() {
		if (!this.$currentPlayer) {
			this.createGameWindow();
		}
		if (this.$currentPlayer) {
			const gameContainer = document.getElementById('hiraganaGame');

			const gameForm = document.getElementById('gameForm');
			gameForm?.remove();
			const gameTitle = document.querySelector('h1');
			gameTitle.textContent = `${this.$currentPlayer.getName()}'s Hiragana Game`;
		}
	}
	createGameWindow() {
		// Create and append the main wrapper div
		const wrapper = document.createElement('div');
		wrapper.classList.add('wrapper');
		document.body.appendChild(wrapper);

		// Create and append the hiragana game container
		const hiraganaGame = document.createElement('div');
		hiraganaGame.id = 'hiraganaGame';
		wrapper.appendChild(hiraganaGame);

		// Create and append the game title
		const hiraganaGameTitle = document.createElement('h1');
		hiraganaGameTitle.textContent = `${this.$currentPlayer ? this.$currentPlayer : ''}` + 'Hiragana Game';
		hiraganaGame.appendChild(hiraganaGameTitle);

		this.createPregameForm(hiraganaGame);
	}
	createPregameForm(parent: HTMLElement) {
		// Create and append the game form
		const form = document.createElement('form');
		form.id = 'gameForm';
		form.classList.add('gameForm');
		parent.appendChild(form);
		// Create and append the username input section
		this.createUsernameInput(form);

		// Create and append the difficulty selection section
		this.createDifficultySelection(form);

		// Create and append the chapters selection section
		this.createChaptersSelection(form);

		// Create and append the start game button
		this.createGameButton(form);
		// Add an event listener to the form to handle form submission
		form.addEventListener('submit', this.handleFormSubmit.bind(this));
	}
	// Method to create and append the username input section
	createUsernameInput(parent: HTMLElement) {
		const usernameWrapper = document.createElement('fieldset');
		usernameWrapper.classList.add('gameForm__username');
		parent.appendChild(usernameWrapper);

		const usernameLabel = document.createElement('label');
		usernameLabel.htmlFor = 'username';
		usernameLabel.textContent = 'Username: ';
		usernameWrapper.appendChild(usernameLabel);

		const usernameInput = document.createElement('input');
		usernameInput.id = 'username';
		usernameInput.name = 'username';
		usernameInput.type = 'text';
		usernameInput.required = true;
		usernameWrapper.appendChild(usernameInput);
	}
	// Method to create and append the difficulty selection section
	createDifficultySelection(parent: HTMLElement) {
		// Create and append the difficulty selection fieldset
		const difficultyWrapper = document.createElement('fieldset');
		difficultyWrapper.classList.add('gameForm__difficulty');
		parent.appendChild(difficultyWrapper);

		// Create and append the difficulty label
		const difficultyLabel = document.createElement('label');
		difficultyLabel.htmlFor = 'difficulty';
		difficultyLabel.textContent = 'Difficulty: ';
		difficultyWrapper.appendChild(difficultyLabel);

		// Create and append the difficulty radio buttons wrapper
		const difficultyRadioWrapper = document.createElement('div');
		difficultyRadioWrapper.classList.add('gameForm__difficulty_radioWrapper');
		difficultyWrapper.appendChild(difficultyRadioWrapper);

		// Define the difficulty levels
		const difficultyLevels = ['easy', 'medium', 'hard', 'extreme'];
		difficultyLevels.forEach(level => {
			// Create and append each difficulty radio button and label
			const radio = document.createElement('input');
			radio.type = 'radio';
			radio.name = 'difficulty';
			radio.value = level;
			radio.id = level;
			radio.required = true;

			const label = document.createElement('label');
			label.htmlFor = level;
			label.textContent = level;

			difficultyRadioWrapper.appendChild(radio);
			difficultyRadioWrapper.appendChild(label);
		});
	}
	// Method to create and append the chapters selection section
	createChaptersSelection(parent: HTMLElement) {
		// Create and append the chapters selection fieldset
		const rangeWrapper = document.createElement('fieldset');
		rangeWrapper.classList.add('gameForm__range');
		parent.appendChild(rangeWrapper);

		// Create and append the chapters label
		const chaptersLabel = document.createElement('label');
		chaptersLabel.textContent = 'Chapters: ';
		rangeWrapper.appendChild(chaptersLabel);

		// Create and append the chapters radio buttons wrapper
		const chaptersRadioWrapper = document.createElement('div');
		chaptersRadioWrapper.classList.add('gameForm__range_radioWrapper');
		rangeWrapper.appendChild(chaptersRadioWrapper);

		// Get the chapters from the sets data
		const chapters = Object.keys(this.$sets);

		chapters.forEach(chapter => {
			// Create and append each chapter checkbox and label
			const radio = document.createElement('input');
			radio.type = 'checkbox';
			radio.name = 'chapter';
			radio.value = chapter;
			radio.id = chapter;
			radio.required = false;

			const label = document.createElement('label');
			label.htmlFor = chapter;
			let labelText: string[] = [];
			this.$sets[chapter].forEach(character => {
				labelText.push(character.hiragana);
			});
			label.textContent = `${chapter} (${labelText.join(', ')})`; // Display the hiragana characters for each chapter

			const chapterEl = document.createElement('div');
			chapterEl.appendChild(radio);
			chapterEl.appendChild(label);
			chaptersRadioWrapper.appendChild(chapterEl);
		});
	}
	createGameButton(parent: HTMLElement) {
		const button = document.createElement('button');
		button.type = 'submit';
		button.textContent = 'Start Game';
		parent.appendChild(button);
	}
	handleFormSubmit(event: Event) {
		event.preventDefault();
		console.log(event);
		const form = event.target as HTMLFormElement;
		const formData = new FormData(form);
		const username = formData.get('username') as string;
		const difficulty = formData.get('difficulty') as string;
		const chapters = formData.getAll('chapter') as string[];
		console.log(username, difficulty, chapters);
		const player = new Player(username);
		this.$currentPlayer = player;
		const question = new Question(difficulty, chapters, document.getElementById('hiraganaGame') as HTMLElement, this.$sets);
		question.createQuestion();
		// const game = new Game(player, difficulty, chapters);
		// game.initialize();
		// this.render();
	}
}

export default GameWindow;
