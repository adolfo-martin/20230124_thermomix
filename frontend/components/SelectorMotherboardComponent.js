import HardwareshopService from '../services/HardwareshopService.js';

export default class SelectorMotherboardComponent extends HTMLElement {
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

        <table>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Chipset</th>
                    <th>Memorias</th>
                    <th>M2</th>
                    <th>PCI</th>
                    <th>Precio</th>
                </tr>
            </thead>
            <tbody><tbody>
        </table>

        <button>Elegir placa base</button>
    `;
    #oldSelectedMotherboard;
    #newSelectedMotherboard;


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
            if (!this.#newSelectedMotherboard) 
                return;

            this.#dispatchMotherboardSelected(this.#newSelectedMotherboard);
        });
        
    }


    #dispatchMotherboardSelected(motherboard) {
        const event = new CustomEvent('motherboardselected', { detail: { motherboard } });
        this.dispatchEvent(event);
    }


    #getSocketUuidFromUrl() {
        const params = new URLSearchParams(window.location.search);
        const socketUuid = params.get('socket');
        return socketUuid;
    }

    
    async #retrieveAndRenderMotherboards() {
        try {
            const token = window.sessionStorage.getItem('hardwareshop-token');
            const service = new HardwareshopService();
            const socketUuid = this.#getSocketUuidFromUrl();
            const motherboards = await service.retrieveMotherboardsBySocketUuid(socketUuid, token);
    
            for (const motherboardUuid of motherboards) {
                const motherboard = await service.retrieveMotherboardByUuid(motherboardUuid, token);
        
                const nTable = this.#shadowRoot.querySelector('table>tbody');
    
                const nTr = document.createElement('tr');
                nTable.appendChild(nTr);
                nTr.setAttribute('data-motherboard', motherboard.uuid);

                const nTdName = document.createElement('td');
                nTr.appendChild(nTdName);
                nTdName.textContent = motherboard.name;
                nTdName.setAttribute('data-motherboard', motherboard.uuid);
                nTdName.addEventListener('click', this.#setNewSelectedMotherboard.bind(this));

                const nTdChipset = document.createElement('td');
                nTr.appendChild(nTdChipset);
                nTdChipset.textContent = motherboard.chipset;
                nTdChipset.setAttribute('data-motherboard', motherboard.uuid);
                nTdChipset.addEventListener('click', this.#setNewSelectedMotherboard.bind(this));

                const nTdMemorySlots = document.createElement('td');
                nTr.appendChild(nTdMemorySlots);
                nTdMemorySlots.textContent = motherboard.memory_slots;
                nTdMemorySlots.setAttribute('data-motherboard', motherboard.uuid);
                nTdMemorySlots.addEventListener('click', this.#setNewSelectedMotherboard.bind(this));
                
                const nTdM2Slots = document.createElement('td');
                nTr.appendChild(nTdM2Slots);
                nTdM2Slots.textContent = motherboard.m2_slots;
                nTdM2Slots.setAttribute('data-motherboard', motherboard.uuid);
                nTdM2Slots.addEventListener('click', this.#setNewSelectedMotherboard.bind(this));

                const nTdPciSlots = document.createElement('td');
                nTr.appendChild(nTdPciSlots);
                nTdPciSlots.textContent = motherboard.pci_slots;
                nTdPciSlots.setAttribute('data-motherboard', motherboard.uuid);
                nTdPciSlots.addEventListener('click', this.#setNewSelectedMotherboard.bind(this));

                const nTdPrice = document.createElement('td');
                nTr.appendChild(nTdPrice);
                nTdPrice.textContent = motherboard.price;
                nTdPrice.setAttribute('data-motherboard', motherboard.uuid);
                nTdPrice.addEventListener('click', this.#setNewSelectedMotherboard.bind(this));
            }
        } catch (error) {
        }
    }


    #setNewSelectedMotherboard(e) {
        this.#oldSelectedMotherboard = this.#newSelectedMotherboard;
        this.#newSelectedMotherboard = e.target.dataset.motherboard;
        console.log(e.target.dataset.motherboard);

        if (this.#oldSelectedMotherboard) {
            const nTr = this.#shadowRoot.querySelector(`tr[data-motherboard="${this.#oldSelectedMotherboard}"]`);
            nTr.removeAttribute('data-selected');
        }

        console.log(`tr["data-motherboard="${this.#newSelectedMotherboard}"]`);
        const nTr = this.#shadowRoot.querySelector(`tr[data-motherboard="${this.#newSelectedMotherboard}"]`);
        nTr.setAttribute('data-selected', "selected");
    }
}


window.customElements.define('selector-motherboard', SelectorMotherboardComponent);