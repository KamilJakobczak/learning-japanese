import { createFormFieldset } from './createFormFieldset';

interface CreateInputs {
	form: HTMLFormElement;
	// fieldset?: HTMLFieldSetElement;
	className: string;
	type: 'radio' | 'checkbox' | 'text';
	name: string;
	required: boolean;
	elements: string[];
	labels?: string[];
}
export function createInputs(input: CreateInputs) {
	const { form, className, type, name, required, elements, labels } = input;

	// let fieldset: HTMLFieldSetElement;

	// if (!fieldset) {
	// 	fieldset = createFormFieldset(className, form, name);
	// } else {
	// 	fieldset = input.fieldset;
	// }
	const fieldset = createFormFieldset(className, form, name);

	elements.forEach((element, index) => {
		console.log(required);
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

	return fieldset;
}
