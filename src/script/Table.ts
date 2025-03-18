import { Sets } from '../data/db';

class Table {
	$container;
	$header;
	$data;
	constructor(container: HTMLElement, header: string, data: Sets) {
		this.$container = container;
		this.$header = header;
		this.$data = data;
	}
	render() {
		const rows = Object.keys(this.$data[Object.keys(this.$data)[0]]).length;
		const columns = Object.keys(this.$data).length;
		const table = document.createElement('div');
		table.classList.add('table');
		this.$container.appendChild(table);
		const tableHeader = document.createElement('div');
		tableHeader.classList.add('table-header');
		tableHeader.innerHTML = `<h2>${this.$header}</h2>`;
		table.appendChild(tableHeader);
		const tableBody = document.createElement('div');
		tableBody.classList.add('table-body');
		tableBody.style.display = 'grid';
		tableBody.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
		tableBody.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
		table.appendChild(tableBody);

		for (const key in this.$data) {
			this.$data[key].forEach((character, index) => {
				const cell = document.createElement('div');
				const japanese = document.createElement('span');
				const romaji = document.createElement('span');
				cell.appendChild(japanese);
				cell.appendChild(romaji);
				cell.classList.add('table-cell');
				cell.style.gridArea = `${index + 1} / ${parseInt(key)} / ${index + 2} / ${parseInt(key) + 1}`;
				japanese.innerHTML = character[this.$header as keyof typeof character];
				romaji.innerHTML = character.romaji;
				tableBody.appendChild(cell);
			});
		}
	}
}

export default Table;
