import { Sets } from '../data/db'; // Import the Sets type from the database module

class GameWindow {
	$sets: Sets; // Declare a property to hold the sets data

	constructor(sets: Sets) {
		this.$sets = sets; // Initialize the sets data
	}

	render() {
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
		hiraganaGameTitle.textContent = 'Hiragana Game';
		hiraganaGame.appendChild(hiraganaGameTitle);

		// Create and append the username input section
		this.createUsernameInput(hiraganaGame);

		// Create and append the difficulty selection section
		this.createDifficultySelection(hiraganaGame);

		// Create and append the chapters selection section
		this.createChaptersSelection(hiraganaGame);
	}

	createUsernameInput(parent: HTMLElement) {
		const usernameWrapper = document.createElement('div');
		usernameWrapper.classList.add('hiraganaGame__username');
		parent.appendChild(usernameWrapper);

		const usernameLabel = document.createElement('label');
		usernameLabel.htmlFor = 'username';
		usernameLabel.textContent = 'Username: ';
		usernameWrapper.appendChild(usernameLabel);

		const usernameInput = document.createElement('input');
		usernameInput.id = 'username';
		usernameInput.type = 'text';
		usernameInput.required = true;
		usernameWrapper.appendChild(usernameInput);
	}

	createDifficultySelection(parent: HTMLElement) {
		const difficultyWrapper = document.createElement('div');
		difficultyWrapper.classList.add('hiraganaGame__difficulty');
		parent.appendChild(difficultyWrapper);

		const difficultyLabel = document.createElement('label');
		difficultyLabel.htmlFor = 'difficulty';
		difficultyLabel.textContent = 'Difficulty: ';
		difficultyWrapper.appendChild(difficultyLabel);

		const difficultyRadioWrapper = document.createElement('div');
		difficultyRadioWrapper.classList.add('hiraganaGame__difficulty_radioWrapper');
		difficultyWrapper.appendChild(difficultyRadioWrapper);

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

	createChaptersSelection(parent: HTMLElement) {
		const rangeWrapper = document.createElement('div');
		rangeWrapper.classList.add('hiraganaGame__range');
		parent.appendChild(rangeWrapper);

		const chaptersLabel = document.createElement('label');
		chaptersLabel.textContent = 'Chapters: ';
		rangeWrapper.appendChild(chaptersLabel);

		const chaptersRadioWrapper = document.createElement('div');
		chaptersRadioWrapper.classList.add('hiraganaGame__range_radioWrapper');
		rangeWrapper.appendChild(chaptersRadioWrapper);

		const chapters = Object.keys(this.$sets);

		chapters.forEach(chapter => {
			// Create and append each chapter radio button and label
			const radio = document.createElement('input');
			radio.type = 'checkbox';
			radio.name = 'chapter';
			radio.value = chapter;
			radio.id = chapter;
			radio.required = true;

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
}

export default GameWindow;
