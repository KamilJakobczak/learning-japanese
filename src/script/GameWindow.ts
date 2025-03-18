class GameWindow {
	constructor() {}

	render() {
		const wrapper = document.createElement('div');
		wrapper.classList.add('wrapper');
		document.body.appendChild(wrapper);
		const hiraganaGame = document.createElement('div');
		hiraganaGame.id = 'hiraganaGame';
		wrapper.appendChild(hiraganaGame);
	}
}

export default GameWindow;
