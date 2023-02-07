export default class HeaderAuthenticationComponent extends HTMLElement {

    #shadowRoot;
    #template = `
        <style>
            :host {
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }

            header {
                flex-grow: 1;
                text-align: center;
            }

            #tSpnFullname, button {
                font-size: 0.5em;
            }
        </style>
        <header>Thermomix</header>
        <span id="tSpnFullname"></span>
        <button>Salir</button>
    `;


    constructor() {
        super();
        this.#shadowRoot = this.attachShadow({ mode: 'open' });
    }


    async connectedCallback() {
        this.#shadowRoot.innerHTML = this.#template;
        this.#getTokenAndShowUserFullname();
        this.#setupCloseButton();
    }


    #getToken() {
        return window.sessionStorage.getItem('thermomix-token');
    }


    #getTokenAndShowUserFullname() {
        const token = this.#getToken();
        if (!token) return;

        try {
            const fullname = extractFullnameFromToken(token);
            const nSpan = this.#shadowRoot.querySelector('#tSpnFullname');
            nSpan.textContent = fullname;
        } catch (error) {
            alert(`El usuario no ha sido autenticado. ${error.message}`);
            window.location = './authentication.htm'
        }

        function extractFullnameFromToken(token) {
            const decodedToken = decodeToken(token);
    
            if (!decodedToken.firstname || !decodedToken.lastname) {
                throw new Error('Token has not full name.')
            }
    
            return `${decodedToken.firstname} ${decodedToken.lastname}`;
        }
    
        function decodeToken(token) {
            const parseJwt = token => {
                try {
                    return JSON.parse(atob(token.split('.')[1]));
                } catch (error) {
                    throw new Error(`Problem decoding token "${token}": ${error.message}.`);
                }
            }
            const tokenDecodificado = parseJwt(token);
            return tokenDecodificado;
        }

    }


    #setupCloseButton() {
        const token = this.#getToken();
        const nButton = this.#shadowRoot.querySelector('button');

        if (token) {
            nButton.addEventListener('click', e => {
                const token = window.sessionStorage.removeItem('thermomix-token');
                window.location = './authentication.html';
            })
        } else {
            this.#shadowRoot.removeChild(nButton);
        }
    }
}


window.customElements.define('header-authentication', HeaderAuthenticationComponent)