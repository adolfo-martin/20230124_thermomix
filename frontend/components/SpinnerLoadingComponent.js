export default class SpinnerLoadingComponent extends HTMLElement {

    #shadowRoot;
    #template = `
        <style>
            :host {
                width: 100vw;
                height: 100vh;
                position: absolute;
                top: 0;
                left: 0;
                background-color: #032954aa;                
                display: grid;
                place-content: center;
            }

            img {
                width: 100px;
            }
        </style>
        <img src="./assets/spinner_loading.gif">
    `;


    constructor() {
        super();
        this.#shadowRoot = this.attachShadow({ mode: 'open' });
    }


    connectedCallback() {
        this.#shadowRoot.innerHTML = this.#template;
    }
}


window.customElements.define('spinner-loading', SpinnerLoadingComponent);