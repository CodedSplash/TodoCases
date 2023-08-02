import { TodoContentInterface } from "../ts/interfaces"

class TodoContent extends HTMLElement implements TodoContentInterface {
    shadow: ShadowRoot
    constructor() {
        super()
        this.shadow = this.attachShadow({mode: 'open'})
    }

    public connectedCallback(): void {

    }
}

customElements.define('todo-content', TodoContent)