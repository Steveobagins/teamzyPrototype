// scripts/views/home.js

function renderHomePage(router) {
    const appContainer = document.getElementById('app');
    appContainer.innerHTML = `
        <section class="card">
            <h2>Welcome to Teamzy!</h2>
            <p>Your one-stop solution for team collaboration.</p>
            <a href="/login" class="button" data-navigo>Login</a>
            <a href="/register" class="button button-secondary" data-navigo>Register</a>
        </section>
    `;
}

export { renderHomePage };