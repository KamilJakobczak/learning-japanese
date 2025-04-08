import PreGameForm from './PreGameForm';
import { Sets } from '../data/db'; // Import the Sets type from the database module
import Game from './Game';
import Player from './Player';
import { DIFFICULTY, SYLLABARY } from './enums/enums';

class GameWindow {
	$sets: Sets;
	$currentPlayer: Player | null = null;
	$game: Game | null;
	$container: HTMLElement | null;

	constructor(sets: Sets) {
		this.$container = null;
		this.$sets = sets;
		this.$currentPlayer = Player.loadFromLocalStorage(); // Load the player from local storage
		this.$game = null;
	}
	setCurrentPlayer(player: Player) {
		this.$currentPlayer = player;
		player.saveToLocalStorage(); // Save the player to local storage
	}
	setGame(game: Game) {
		this.$game = game;
	}

	render() {
		if (this.$game) {
			this.renderGame(this.$game);
		} else {
			if (!this.$container) {
				// Create the game window if it doesn't exist
				this.$container = this.createGameWindow();
			} else {
				// Rerender case
				while (this.$container.children.length > 1) {
					this.$container.lastChild?.remove();
				}
			}
			this.renderPreGameForm(this.$container);
		}
	}
	renderPreGameForm(container: HTMLElement) {
		// Create an instance of the PreGameForm class and render the form

		const pregameForm = new PreGameForm({
			parent: container,
			sets: this.$sets,
			onPregameFormSubmit: this.onPregameFormSubmit.bind(this),
			isPlayer: this.$currentPlayer ? true : false,
		});
		pregameForm.render();
	}
	createGameWindow() {
		// Create and append the main wrapper div
		const wrapper = document.createElement('div');
		wrapper.id = 'wrapper';
		document.body.appendChild(wrapper);

		// Create and append the hiragana game container
		const hiraganaGame = document.createElement('div');
		hiraganaGame.id = 'hiraganaGame';
		wrapper.appendChild(hiraganaGame);

		// Create and append the game title
		const hiraganaGameTitle = document.createElement('h1');
		hiraganaGameTitle.textContent = `${
			this.$currentPlayer?.getName() || ''
		}'s Learning Japanese`; // Update the game title to include the player's name
		hiraganaGame.appendChild(hiraganaGameTitle);
		return hiraganaGame;
	}
	renderGame(game: Game) {
		const gameTitle = document.querySelector('h1');
		if (gameTitle) {
			gameTitle.textContent = `${this.$currentPlayer?.getName()}'s Learning japanese`;
		}
		game.render();
	}
	onPregameFormSubmit(
		username: string,
		difficulty: DIFFICULTY,
		syllabary: SYLLABARY,
		chapters: string[]
	) {
		if (!this.$currentPlayer) {
			const player = new Player(username);
			this.setCurrentPlayer(player);
		}
		const game = new Game(
			this.$currentPlayer,
			difficulty,
			syllabary,
			chapters,
			this.$container,
			this.$sets,
			this.onPlayAgain.bind(this)
		);
		this.setGame(game);
		this.render();
	}
	onPlayAgain() {
		this.$game = null; // Reset the game instance
		this.render(); // Re-render the game window to show the pre-game form again
	}
}

export default GameWindow;
