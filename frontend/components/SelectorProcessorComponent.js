import HardwareshopService from '../services/HardwareshopService.js';

export default class SelectorProcessorComponent extends HTMLElement {
    #shadowRoot;
    #template = `
        <style>
            table, tr, th, td {
                border: solid 3px darkblue;
                border-collapse: collapse;
            }

            button {
                margin-top: 1rem;
                font-size: inherit;
            }

            tr[data-selected="selected"] {
                background-color: lightblue;
            }
        </style>

        <table></table>
        <button>Elegir procesador</button>
    `;
    #oldSelectedProcessor;
    #newSelectedProcessor;
    #selectedSocket;


    constructor() {
        super();
        this.#shadowRoot = this.attachShadow({ mode: 'open' });
    }


    async connectedCallback() {
        this.#shadowRoot.innerHTML = this.#template;
        this.#setupChooseProcessorButton();
        await this.#retrieveAndRenderProcessors();
    }
    

    #setupChooseProcessorButton() {
        const nButton = this.#shadowRoot.querySelector('button');
        nButton.addEventListener('click', e => {
            if (!this.#selectedSocket) 
                return;

            this.#dispatchProcessorSelected(this.#newSelectedProcessor, this.#selectedSocket);
        });
        
    }


    #dispatchProcessorSelected(processor, socket) {
        const event = new CustomEvent('processorselected', { detail: { processor, socket } });
        this.dispatchEvent(event);
    }


    #getSocketUuidFromUrl() {
        const params = new URLSearchParams(window.location.search);
        const socketUuid = params.get('socket');
        return socketUuid;
    }

    
    async #retrieveAndRenderProcessors() {
        try {
            const token = window.sessionStorage.getItem('thermomix-token');
            const service = new HardwareshopService();
            const socketUuid = this.#getSocketUuidFromUrl();
            const processors = await service.retrieveProcessorsBySocketUuid(socketUuid, token);
    
            for (const processorUuid of processors) {
                const processor = await service.retrieveProcessorByUuid(processorUuid, token);
        
                const nTable = this.#shadowRoot.querySelector('table');
    
                const nTr = document.createElement('tr');
                nTable.appendChild(nTr);
                nTr.setAttribute('data-processor', processor.uuid);
                nTr.setAttribute('data-socket', processor.socket_uuid);

                const nTdLongname = document.createElement('td');
                nTr.appendChild(nTdLongname);
                nTdLongname.textContent = processor.longname;
                nTdLongname.setAttribute('data-processor', processor.uuid);
                nTdLongname.setAttribute('data-socket', processor.socket_uuid);
                nTdLongname.addEventListener('click', this.#setNewSelectedProcessor.bind(this));

                const nTdPrice = document.createElement('td');
                nTr.appendChild(nTdPrice);
                nTdPrice.textContent = processor.price;
                nTdPrice.setAttribute('data-processor', processor.uuid);
                nTdPrice.setAttribute('data-socket', processor.socket_uuid);
                nTdPrice.addEventListener('click', this.#setNewSelectedProcessor.bind(this));
            }
        } catch (error) {
        }
    }


    #setNewSelectedProcessor(e) {
        this.#oldSelectedProcessor = this.#newSelectedProcessor;
        this.#newSelectedProcessor = e.target.dataset.processor;
        this.#selectedSocket = e.target.dataset.socket;
        console.log(e.target.dataset.processor);

        if (this.#oldSelectedProcessor) {
            const nTr = this.#shadowRoot.querySelector(`tr[data-processor="${this.#oldSelectedProcessor}"]`);
            nTr.removeAttribute('data-selected');
        }

        console.log(`tr["data-processor="${this.#newSelectedProcessor}"]`);
        const nTr = this.#shadowRoot.querySelector(`tr[data-processor="${this.#newSelectedProcessor}"]`);
        nTr.setAttribute('data-selected', "selected");
    }
}


window.customElements.define('selector-processor', SelectorProcessorComponent);