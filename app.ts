import './src/scss/main.scss';
import GameWindow from './src/script/GameWindow';
import Table from './src/script/Table';
import { sets } from './src/data/db';

const gameWindow = new GameWindow();
gameWindow.render();

const wrapper = document.querySelector('.wrapper');
const hiraganaTable = new Table(wrapper as HTMLElement, 'hiragana', sets);
hiraganaTable.render();

// const katakanaTable = new Table(wrapper as HTMLElement, 'katakana', sets);
// katakanaTable.render();
