// scripts/components/input.js

export function createInput(options) {
  const { type, id, name, placeholder, label, required, value, options: selectOptions } = options;

  let inputHTML = `<div class="form-group">`;

  if (label) {
    inputHTML += `<label for="${id}">${label}</label>`;
  }

    if (type === 'select') { // Handle select element
        inputHTML += `<select id="${id}" name="${name}"`;
        if (required) {
          inputHTML += ` required`;
        }
        inputHTML += `>`;

        if (selectOptions) { // Check if options exist
          selectOptions.forEach(option => {
            // Add selected attribute if value matches
            const selected = option.value === value ? 'selected' : '';
            inputHTML += `<option value="${option.value}" ${selected}>${option.text}</option>`;
        });
        }
        inputHTML += `</select>`;

    } else {
        // Handle other input types
        inputHTML += `<input type="${type}" id="${id}" name="${name}"`;

      if (placeholder) {
        inputHTML += ` placeholder="${placeholder}"`;
      }

      if (required) {
        inputHTML += ` required`;
      }

        if (value) {
            inputHTML += ` value="${value}"`;
        }

      inputHTML += `>`;
    }

  inputHTML += `</div>`;

  return inputHTML;
}
//v5
// End of code