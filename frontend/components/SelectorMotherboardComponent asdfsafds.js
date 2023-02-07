import HardwareshopService from '../services/HardwareshopService.js';

export default class SelectorMotherboardComponent extends HTMLElement {
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
        <button>Elegir procesador</button>
    `;

    constructor() {
        super();
        this.#shadowRoot = this.attachShadow({ mode: 'open' });
    }


    async connectedCallback() {
        this.#shadowRoot.innerHTML = this.#template;
        this.#setupChooseMotherboardButton();
        await this.#retrieveAndRenderMotherboards();
    }
    

    #setupChooseMotherboardButton() {
        const nButton = this.#shadowRoot.querySelector('button');
        nButton.addEventListener('click', e => {
            const nRadioChecked = this.#shadowRoot.querySelector('input[type="radio"]:checked');
            if (!nRadioChecked) 
                return;

            const motherboardUuid = nRadioChecked.value;
            this.#dispatchMotherboardSelected(motherboardUuid);
        });
        
    }


    #dispatchMotherboardSelected(motherboard) {
        const event = new CustomEvent('motherboardselected', { detail: { motherboard } });
        this.dispatchEvent(event);
    }


    #getProcessorUuidFromUrl() {
        const params = new URLSearchParams(window.location.search);
        const processorUuid = params.get('processor');
        return processorUuid;
    }

    
    async #retrieveAndRenderMotherboards() {
        const token = window.sessionStorage.getItem('thermomix-token');
        const service = new HardwareshopService();
        const processorUuid = this.#getProcessorUuidFromUrl();
        const motherboards = await service.retrieveMotherboardsByProcessorUuid(processorUuid, token);

        for (const motherboard of motherboards) {
            const nDiv = this.#shadowRoot.querySelector('.radios-container');

            const nInput = document.createElement('input');
            nDiv.appendChild(nInput);
            nInput.setAttribute('type', 'radio');
            nInput.setAttribute('name', 'motherboard');
            nInput.setAttribute('value', motherboard.uuid);
            // nInput.setAttribute('id', `tRad${motherboard.platform}${motherboard.name}`);
            
            const nLabel = document.createElement('label');
            nDiv.appendChild(nLabel);
            nLabel.textContent = `Motherboard ${motherboard.longname}`;
            // nLabel.setAttribute('for', `tRad${motherboard.platform}${motherboard.name}`);
        }
    }
}


window.customElements.define('selector-motherboard', SelectorMotherboardComponent);