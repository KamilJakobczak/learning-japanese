import PreGameForm from './PreGameForm';
import { Sets } from '../data/db'; // Import the Sets type from the database module
import Game from './Game';
import Player from './Player';

class GameWindow {
	$sets: Sets; // Declare a property to hold the sets data
	$currentPlayer: Player | null = null; // Declare a property to hold the current player
	$game: Game | null;

	constructor(sets: Sets) {
		this.$sets = sets; // Initialize the sets data
		this.$currentPlayer = null; // Initialize the current player
		this.$game = null;
	}
	setCurrentPlayer(player: Player) {
		this.$currentPlayer = player;
	}
	setGame(game: Game) {
		this.$game = game;
	}

	render() {
		if (!this.$currentPlayer) {
			const container = this.createGameWindow();
			this.renderPreGameForm(container);
		}

		if (this.$currentPlayer) {
			this.renderGame();
		}
	}
	renderPreGameForm(container: HTMLElement) {
		// Create an instance of the PreGameForm class and render the form
		const pregameForm = new PreGameForm({
			parent: container,
			sets: this.$sets,
			setCurrentPlayer: this.setCurrentPlayer.bind(this),
			setGame: this.setGame.bind(this),
			rerender: this.render.bind(this),
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
		hiraganaGameTitle.textContent = `${this.$currentPlayer?.getName() || ''} Hiragana Game`; // Update the game title to include the player's name
		hiraganaGame.appendChild(hiraganaGameTitle);
		return hiraganaGame;
	}
	renderGame() {
		const gameTitle = document.querySelector('h1');
		if (gameTitle) {
			gameTitle.textContent = `${this.$currentPlayer?.getName()}'s Hiragana Game`;
		}
		this.$game?.render();
	}
}

export default GameWindow;
