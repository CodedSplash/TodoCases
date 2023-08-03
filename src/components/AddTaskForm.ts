import {AddTaskFormInterface} from "../ts/interfaces"

class AddTaskForm extends HTMLElement implements AddTaskFormInterface {
    shadow: ShadowRoot
    constructor() {
        super()
        this.shadow = this.attachShadow({mode: 'open'})
    }

    

    public connectedCallback(): void {

    }
}

customElements.define('add-task-form', AddTaskForm)