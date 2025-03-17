import { set1 } from './src/data/db';
import './src/scss/main.scss';

const wrapper = document.querySelector(
	'.wrapper'
) as HTMLElement;

const testH1 = document.createElement('h1');
testH1.textContent = 'Hello World!';
wrapper.appendChild(testH1);

console.log(set1);
