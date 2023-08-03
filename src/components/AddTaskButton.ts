import {Element} from "../ts/interfaces"

class AddTaskButton extends HTMLButtonElement implements Element {
    shadow: ShadowRoot
    constructor() {
        super()
        this.shadow = this.attachShadow({mode: 'open'})
    }

    public connectedCallback(): void {

    }
}

customElements.define('add-task-button', AddTaskButton, { extends: 'button' })