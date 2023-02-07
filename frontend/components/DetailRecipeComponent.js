import ThermomixService from '../services/ThermomixService.js';

export default class DetailRecipeComponent extends HTMLElement {
    #shadowRoot;
    #template = `
        <style>
            :host {
                display: inline-grid;
                place-items: center;
            }

            p {
                background-color: var(--light-color);
                color: var(--dark-color;)
                display: inline;
                width: 80%;
                padding: 1rem;
            }
        </style>
        <p></p>
    `;


    constructor() {
        super();
        this.#shadowRoot = this.attachShadow({ mode: 'open' });
    }


    async connectedCallback() {
        this.#shadowRoot.innerHTML = this.#template;
        await this.#retrieveAndRenderRecipe();
    }


    #getDishIdFromUrl() {
        const params = new URLSearchParams(window.location.search);
        const dishId = params.get('dish');
        return dishId;
    }


    async #retrieveAndRenderRecipe() {
        try {
            const token = window.sessionStorage.getItem('thermomix-token');
            const service = new ThermomixService();
            const dishId = this.#getDishIdFromUrl();
            const recipe = await service.retrieveRecipeById(dishId, token);

            const nParagraph = this.#shadowRoot.querySelector('p');
            nParagraph.textContent = recipe.recipe;
        } catch (error) {
        }
    }
}


window.customElements.define('detail-recipe', DetailRecipeComponent);