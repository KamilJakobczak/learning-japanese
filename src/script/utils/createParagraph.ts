export function createParagraph(text: string, parent: HTMLElement) {
	const paragraph = document.createElement('p');
	paragraph.textContent = text;
	parent.appendChild(paragraph);
	return paragraph;
}
