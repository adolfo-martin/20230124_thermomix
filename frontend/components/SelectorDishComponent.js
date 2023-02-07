import ThermomixService from '../services/ThermomixService.js';

export default class SelectorDishComponent extends HTMLElement {
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

            th {
                background-color: var(--dark-color);
                color: var(--light-color);
            }
        </style>

        <table>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Foto</th>
                </tr>
            </thead>
            <tbody><tbody>
        </table>

        <button>Seleccionar plato</button>
    `;
    #oldSelectedDish;
    #newSelectedDish;


    constructor() {
        super();
        this.#shadowRoot = this.attachShadow({ mode: 'open' });
    }


    async connectedCallback() {
        this.#shadowRoot.innerHTML = this.#template;
        this.#setupChooseDishButton();
        await this.#retrieveAndRenderDishes();
    }


    #setupChooseDishButton() {
        const nButton = this.#shadowRoot.querySelector('button');
        nButton.addEventListener('click', e => {
            if (!this.#newSelectedDish)
                return;

            this.#dispatchDishSelected(this.#newSelectedDish);
        });

    }


    #dispatchDishSelected(dish) {
        const event = new CustomEvent('dishselected', { detail: { dish } });
        this.dispatchEvent(event);
    }


    #getBookIdFromUrl() {
        const params = new URLSearchParams(window.location.search);
        const bookId = params.get('book');
        return bookId;
    }


    async #retrieveAndRenderDishes() {
        try {
            const token = window.sessionStorage.getItem('thermomix-token');
            const service = new ThermomixService();
            const bookId = this.#getBookIdFromUrl();
            const dishes = await service.retrieveDishesByBookId(bookId, token);

            for (const dishId of dishes) {
                const dish = await service.retrieveDishById(dishId, token);

                const nTable = this.#shadowRoot.querySelector('table>tbody');

                const nTr = document.createElement('tr');
                nTable.appendChild(nTr);
                nTr.setAttribute('data-dish', dish.id);

                const nTdName = document.createElement('td');
                nTr.appendChild(nTdName);
                nTdName.textContent = dish.name;
                nTdName.setAttribute('data-dish', dish.id);
                nTdName.addEventListener('click', this.#setNewSelectedDish.bind(this));

                const nTdPhoto = document.createElement('td');
                nTr.appendChild(nTdPhoto);
                nTdPhoto.textContent = dish.photo;
                nTdPhoto.setAttribute('data-dish', dish.id);
                nTdPhoto.addEventListener('click', this.#setNewSelectedDish.bind(this));
            }
        } catch (error) {
        }
    }


    #setNewSelectedDish(e) {
        this.#oldSelectedDish = this.#newSelectedDish;
        this.#newSelectedDish = e.target.dataset.dish;
        console.log(e.target.dataset.dish);

        if (this.#oldSelectedDish) {
            const nTr = this.#shadowRoot.querySelector(`tr[data-dish="${this.#oldSelectedDish}"]`);
            nTr.removeAttribute('data-selected');
        }

        console.log(`tr["data-dish="${this.#newSelectedDish}"]`);
        const nTr = this.#shadowRoot.querySelector(`tr[data-dish="${this.#newSelectedDish}"]`);
        nTr.setAttribute('data-selected', "selected");
    }
}


window.customElements.define('selector-dish', SelectorDishComponent);