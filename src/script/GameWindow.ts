import { Sets } from '../data/db'; // Import the Sets type from the database module
import Game from './Game';
import Player from './Player';

class GameWindow {
	$sets: Sets; // Declare a property to hold the sets data
	$currentPlayer: Player | null = null; // Declare a property to hold the current player
	$game: Game | null;
	$container: HTMLElement | null;
	constructor(sets: Sets) {
		this.$sets = sets; // Initialize the sets data
		this.$currentPlayer = null; // Initialize the current player
		this.$game = null;
		this.$container = null;
	}

	render() {
		if (!this.$currentPlayer) {
			this.createGameWindow();
		}
		if (this.$currentPlayer) {
			const gameForm = document.getElementById('gameForm');
			gameForm?.remove();
			const gameTitle = document.querySelector('h1');
			gameTitle.textContent = `${this.$currentPlayer.getName()}'s Hiragana Game`;
			this.$game?.render();
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
		this.$container = hiraganaGame;
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
	// Method to create and append the start game button
	createGameButton(parent: HTMLElement) {
		// Create a button element
		const button = document.createElement('button');
		button.type = 'submit'; // Set the button type to 'submit' to trigger form submission
		button.textContent = 'Start Game'; // Set the button text
		parent.appendChild(button); // Append the button to the parent element
	}

	// Method to handle form submission
	handleFormSubmit(event: Event) {
		event.preventDefault(); // Prevent the default form submission behavior

		// Get the form element from the event target
		const form = event.target as HTMLFormElement;

		// Extract form data using FormData API
		const formData = new FormData(form);
		const username = formData.get('username') as string; // Get the username from the form
		const difficulty = formData.get('difficulty') as string; // Get the selected difficulty level
		const chapters = formData.getAll('chapter') as string[]; // Get all selected chapters

		// Create a new Player instance with the provided username
		const player = new Player(username);
		this.$currentPlayer = player; // Set the current player

		// Create a new Game instance with the current player, difficulty, and chapters
		const game = new Game(this.$currentPlayer, difficulty, chapters, this.$container, this.$sets);
		this.$game = game; // Set the current game instance

		this.render(); // Render the game window
	}
}

export default GameWindow;
