import AuthenticationService from '../services/AuthenticationService.js';

export default class AuthenticationFormComponent extends HTMLElement {

    #attachShadow;

    #template = `
        <style>
            :host {
                display: inline-grid;
                grid-template-columns: auto auto;
                gap: 0.5rem;
            }

            header, button {
                grid-column: 1 / span 2;
            }

            button {
                margin: auto;
            }
        </style>

        <header>Autenticación de usuarios</header>

        <label>Usuario:</label>
        <input type="text" class="username" value="sonia.silverado">

        <label>Contraseña:</label>
        <input type="text" class="password" value="s">

        <button>Autenticar</button>
    `;


    constructor() {
        super();
        this.#attachShadow = this.attachShadow({ mode: 'open' });
    }
    

    connectedCallback() {
        this.#attachShadow.innerHTML = this.#template;
        this.#setupAuthenticateButton();
    }


    #setupAuthenticateButton() {
        const nButton = this.#attachShadow.querySelector('button');
        nButton.addEventListener('click', this.#authenticateUsernameAndPassword.bind(this));
    }


    async #authenticateUsernameAndPassword() {
        this.#dispatchStartAuthentication();

        try {
            const username = this.#attachShadow.querySelector('.username').value;
            const password = this.#attachShadow.querySelector('.password').value;
    
            const service = new AuthenticationService();
            const token = await service.validateUsernameAndPassword(username, password);
            this.#dispatchSuccessfulAuthentication(token);
        } catch (error) {
            this.#dispatchWrongAuthentication(error.message);
        }
    }


    #dispatchStartAuthentication() {
        const event = new CustomEvent('startauthentication');
        this.dispatchEvent(event);
    }


    #dispatchSuccessfulAuthentication(token) {
        const event = new CustomEvent('successfulauthentication', { detail: { token }});
        this.dispatchEvent(event);
    }


    #dispatchWrongAuthentication(message) {
        const event = new CustomEvent('wrongauthentication', { detail: { message } });
        this.dispatchEvent(event);
    }
}


window.customElements.define('authentication-form', AuthenticationFormComponent);