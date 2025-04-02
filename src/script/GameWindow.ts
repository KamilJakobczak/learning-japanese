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
		this.$currentPlayer = null;
		this.$game = null;
	}
	setCurrentPlayer(player: Player) {
		this.$currentPlayer = player;
	}
	setGame(game: Game) {
		this.$game = game;
	}

	render() {
		if (this.$game) {
			this.renderGame(this.$game);
		} else {
			const container = this.createGameWindow();
			this.$container = container;
			this.renderPreGameForm(container);
		}
	}
	renderPreGameForm(container: HTMLElement) {
		// Create an instance of the PreGameForm class and render the form
		const pregameForm = new PreGameForm({
			parent: container,
			sets: this.$sets,
			onPregameFormSubmit: this.onPregameFormSubmit.bind(this),
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
		} Learning Japanese Game`; // Update the game title to include the player's name
		hiraganaGame.appendChild(hiraganaGameTitle);
		return hiraganaGame;
	}
	renderGame(game: Game) {
		const gameTitle = document.querySelector('h1');
		if (gameTitle) {
			gameTitle.textContent = `${this.$currentPlayer?.getName()}'s Hiragana Game`;
		}

		game.render();
	}
	onPregameFormSubmit(
		username: string,
		difficulty: DIFFICULTY,
		syllabary: SYLLABARY,
		chapters: string[]
	) {
		const player = new Player(username);
		this.setCurrentPlayer(player);
		const game = new Game(
			player,
			difficulty,
			syllabary,
			chapters,
			this.$container,
			this.$sets
		);
		this.setGame(game);
		this.render();
	}
}

export default GameWindow;
