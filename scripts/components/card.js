// scripts/components/card.js

export function createCard(title, content) {
    return `
        <div class="card">
            <h3>${title}</h3>
            ${content}
        </div>
    `;
}

// End of code