import './src/scss/main.scss';
import GameWindow from './src/script/GameWindow';
import Table from './src/script/Table';
import { sets } from './src/data/db';

const gameWindow = new GameWindow(sets);
gameWindow.render();

const container = document.getElementById('wrapper');
const hiraganaTable = new Table(container as HTMLElement, 'hiragana', sets);
hiraganaTable.render();

const katakanaTable = new Table(container as HTMLElement, 'katakana', sets);
katakanaTable.render();
