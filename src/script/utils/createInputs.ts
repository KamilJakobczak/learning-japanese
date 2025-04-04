import { createFormFieldset } from './createFormFieldset';

interface CreateInputs {
	form: HTMLFormElement;
	fieldset?: HTMLFieldSetElement;
	className: string;
	type: 'radio' | 'checkbox' | 'text';
	name: string;
	required: boolean;
	elements: string[];
	labels?: string[];
	selectAll: boolean;
}
export function createInputs(input: CreateInputs) {
	const {
		form,
		fieldset: inputFieldset,
		className,
		type,
		name,
		required,
		elements,
		labels,
		selectAll,
	} = input;

	let fieldset: HTMLFieldSetElement;

	if (!inputFieldset) {
		fieldset = createFormFieldset(className, form, name);
	} else {
		fieldset = inputFieldset;
	}

	elements.forEach((element, index) => {
		const wrapper = document.createElement('div');
		wrapper.classList.add(className + '_' + type);

		const input = document.createElement('input');
		input.type = type;
		input.id = element;
		input.name = name;
		input.value = element;
		input.required = !required ? false : true;
		const label = document.createElement('label');
		label.htmlFor = element;
		// label.textContent = labels ? labels[index] : null;
		label.appendChild(input);
		if (labels) {
			const textNode = document.createTextNode(labels[index]);
			label.appendChild(textNode);
		} else if (type === 'text') {
			input.value = '';
		} else {
			const textNode = document.createTextNode(element);
			label.appendChild(textNode);
		}

		wrapper.appendChild(label);
		fieldset.appendChild(wrapper);
	});

	if (selectAll) {
		const wrapper = document.createElement('div');
		wrapper.classList.add(className + '_' + type);
		wrapper.classList.add('selectAllWrapper');
		const input = document.createElement('input');
		input.type = 'checkbox';
		input.id = 'selectAll';
		input.name = 'selectAll';
		input.value = 'selectAll';
		input.required = false;
		const label = document.createElement('label');
		label.htmlFor = 'selectAll';
		const textNode = document.createTextNode('Select All');
		label.appendChild(input);
		label.appendChild(textNode);
		wrapper.appendChild(label);
		fieldset.appendChild(wrapper);

		wrapper.addEventListener('click', () => {
			const checkboxes = fieldset.querySelectorAll('input[type="checkbox"]');
			checkboxes.forEach((checkbox: HTMLInputElement) => {
				if (checkbox !== input) {
					checkbox.checked = input.checked;
				}
			});
		});
	}

	return fieldset;
}
