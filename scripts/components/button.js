// scripts/components/button.js

export function createButton(options) {
  const { type, text, className, onClick, id } = options; // Add id

  // Build the button HTML
  let buttonHTML = `<button type="${type}" class="${className}"`;

    if (id) {
        buttonHTML += ` id="${id}"`; // Add the id attribute
    }
  buttonHTML += `>${text}</button>`;

  return buttonHTML;
}

// End of code