export function createFormFieldset(
	fieldsetClass: string,
	form: HTMLFormElement,
	labelText?: string
) {
	const fieldset = document.createElement('fieldset');
	fieldset.classList.add(fieldsetClass);

	const label = document.createElement('label');
	label.htmlFor = labelText;
	label.textContent = `${labelText}: `;
	fieldset.appendChild(label);

	form.appendChild(fieldset);
	return fieldset;
}
