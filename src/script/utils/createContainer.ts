export const createContainer = (
	className: string,
	parent: HTMLElement,
	titleTag: 'h2' | 'h3' | 'h4',
	titleText: string
): HTMLDivElement => {
	const container = document.createElement('div');
	container.classList.add(className);
	parent.appendChild(container);
	const title = document.createElement(titleTag);
	title.classList.add(`${className}-title`);
	title.innerText = titleText;
	container.appendChild(title);
	return container;
};
