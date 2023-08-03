import {TodoItemInterface} from "../ts/interfaces"

class TodoItem extends HTMLElement implements TodoItemInterface {
    shadow: ShadowRoot
    constructor() {
        super()
        this.shadow = this.attachShadow({mode: 'open'})
    }

    public connectedCallback(): void {

    }
}

customElements.define('todo-item', TodoItem)