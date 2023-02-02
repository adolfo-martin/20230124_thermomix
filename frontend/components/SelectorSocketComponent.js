import HardwareshopService from '../services/HardwareshopService.js';

export default class SelectorSocketComponent extends HTMLElement {
    #shadowRoot;
    #template = `
        <style>
            .radios-container {
                display: grid;
                grid-template-columns: auto auto;
                gap: 0.5rem;
            }
            
            button {
                margin-top: 1rem;
                font-size: inherit;
            }
        </style>

        <div class="radios-container"></div>
        <button>Seleccionar socket</button>
    `;

    constructor() {
        super();
        this.#shadowRoot = this.attachShadow({ mode: 'open' });
    }


    async connectedCallback() {
        this.#shadowRoot.innerHTML = this.#template;
        this.#setupChooseProcessorButton();
        await this.#retrieveAndRenderSockets();
    }
    

    #setupChooseProcessorButton() {
        const nButton = this.#shadowRoot.querySelector('button');
        nButton.addEventListener('click', e => {
            const nRadioChecked = this.#shadowRoot.querySelector('input[type="radio"]:checked');
            if (!nRadioChecked) 
                return;

            const socketUuid = nRadioChecked.value;
            this.#dispatchSocketSelected(socketUuid);
        });
        
    }


    #dispatchSocketSelected(socket) {
        const event = new CustomEvent('socketselected', { detail: { socket } });
        this.dispatchEvent(event);
    }

    
    async #retrieveAndRenderSockets() {
        const token = window.sessionStorage.getItem('hardwareshop-token');
        const service = new HardwareshopService();
        const sockets = await service.retrieveSockets(token);

        for (const socket of sockets) {
            const nDiv = this.#shadowRoot.querySelector('.radios-container');

            const nInput = document.createElement('input');
            nDiv.appendChild(nInput);
            nInput.setAttribute('type', 'radio');
            nInput.setAttribute('name', 'socket');
            nInput.setAttribute('value', socket.uuid);
            nInput.setAttribute('id', `tRad${socket.platform}${socket.name}`);
            
            const nLabel = document.createElement('label');
            nDiv.appendChild(nLabel);
            nLabel.textContent = `Socket ${socket.name} para la plataforma ${socket.platform}`;
            nLabel.setAttribute('for', `tRad${socket.platform}${socket.name}`);
        }
    }
}


window.customElements.define('selector-socket', SelectorSocketComponent);