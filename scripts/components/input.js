// scripts/components/input.js

export function createInput(options) {
  const { type, id, name, placeholder, label, required, value } = options;

  // Start building the HTML string
  let inputHTML = `<div class="form-group">`;

  // Add label if provided
  if (label) {
    inputHTML += `<label for="${id}">${label}</label>`;
  }

  // Add the input element
  inputHTML += `<input type="${type}" id="${id}" name="${name}"`;

  if (placeholder) {
    inputHTML += ` placeholder="${placeholder}"`;
  }

  if (required) {
    inputHTML += ` required`;
  }

    if (value) {
        inputHTML += `value="${value}"`;
    }

  inputHTML += `>`; // Close the input tag
  inputHTML += `</div>`; // Close the form-group div

  return inputHTML;
}

// End of code