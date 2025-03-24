export function createButton(
	parent: HTMLElement,
	text: string,
	type: 'submit'
) {
	const button = document.createElement('button');
	button.type = type;
	button.textContent = text;
	parent.appendChild(button);
	return button;
}
