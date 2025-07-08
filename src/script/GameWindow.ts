import PreGameForm from './PreGameForm';
import { Sets } from '../data/db'; // Import the Sets type from the database module
import Game from './Game';
import Player from './Player';
import { AnswersDirection, Difficulty, Syllabary } from './enums/enums';
import StatsRenderer from './StatsRenderer';

class GameWindow {
	$sets: Sets;
	$currentPlayer: Player | null = null;
	$game: Game | null;
	$container: HTMLElement | null;
	$playerStats: StatsRenderer | null = null;
	constructor(sets: Sets) {
		this.$container = null;
		this.$sets = sets;
		this.$currentPlayer = Player.loadFromLocalStorage(); // Load the player from local storage
		this.$game = null;
		this.$playerStats = null;
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
			this.$playerStats && this.$playerStats.unmount();
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
			if (this.$currentPlayer) {
				console.log('Im HERE');
				this.renderPlayerStats(); // Render player stats if available
			}
		}
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
		hiraganaGameTitle.textContent = this.$currentPlayer
			? `${this.$currentPlayer.getName()}'s Learning Japanese`
			: 'Learning Japanese'; // Update the game title to include the player's name
		hiraganaGame.appendChild(hiraganaGameTitle);
		return hiraganaGame;
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

	renderGame(game: Game) {
		const gameTitle = document.querySelector('h1');
		if (gameTitle) {
			gameTitle.textContent = `${this.$currentPlayer?.getName()}'s learning japanese`;
		}
		game.render();
	}
	renderPlayerStats() {
		console.log(this.$currentPlayer);
		const playerStats = this.$currentPlayer.$playerStats;
		console.log(playerStats);
		const statsRenderer = new StatsRenderer(
			this.$currentPlayer.$name,
			this.$container,
			playerStats.getStats()
		);
		this.$playerStats = statsRenderer; // Save the stats renderer instance
		statsRenderer.render();
	}
	onPregameFormSubmit(
		username: string,
		answersDirection: AnswersDirection,
		difficulty: Difficulty,
		syllabary: Syllabary,
		chapters: string[]
	) {
		if (!this.$currentPlayer) {
			const player = new Player(username);
			this.setCurrentPlayer(player);
		}
		const game = new Game(
			this.$currentPlayer,
			answersDirection,
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
