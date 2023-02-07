import ThermomixService from '../services/ThermomixService.js';

export default class SelectorBookComponent extends HTMLElement {
    #shadowRoot;
    #template = `
        <style>
            :host {
                background-color: var(--light-color);
                padding: 1rem !important;
                display: flex;
                flex-direction: column;
            }

            .radios-container {
                display: grid;
                grid-template-columns: auto auto;
                gap: 0.5rem;
            }
            
            button {
                font-size: inherit;
                margin-left, margin-right: auto !important;
                margin-top: 1rem !important;
                align-self: center;
            }
        </style>

        <div class="radios-container"></div>
        <button>Seleccionar libro</button>
    `;

    constructor() {
        super();
        this.#shadowRoot = this.attachShadow({ mode: 'open' });
    }


    async connectedCallback() {
        this.#shadowRoot.innerHTML = this.#template;
        this.#setupChooseProcessorButton();
        await this.#retrieveAndRenderBooks();
    }
    

    #setupChooseProcessorButton() {
        const nButton = this.#shadowRoot.querySelector('button');
        nButton.addEventListener('click', e => {
            const nRadioChecked = this.#shadowRoot.querySelector('input[type="radio"]:checked');
            if (!nRadioChecked) 
                return;

            const bookUuid = nRadioChecked.value;
            this.#dispatchBookSelected(bookUuid);
        });
        
    }


    #dispatchBookSelected(book) {
        const event = new CustomEvent('bookselected', { detail: { book } });
        this.dispatchEvent(event);
    }

    
    async #retrieveAndRenderBooks() {
        const token = window.sessionStorage.getItem('thermomix-token');
        const service = new ThermomixService();
        const books = await service.retrieveBooks(token);

        for (const book of books) {
            const nDiv = this.#shadowRoot.querySelector('.radios-container');

            const nInput = document.createElement('input');
            nDiv.appendChild(nInput);
            nInput.setAttribute('type', 'radio');
            nInput.setAttribute('name', 'book');
            nInput.setAttribute('value', book.id);
            nInput.setAttribute('id', `tRad${book.platform}${book.name}`);
            
            const nLabel = document.createElement('label');
            nDiv.appendChild(nLabel);
            nLabel.textContent = `${book.name}`;
            nLabel.setAttribute('for', `tRad${book.platform}${book.name}`);
        }
    }
}


window.customElements.define('selector-book', SelectorBookComponent);