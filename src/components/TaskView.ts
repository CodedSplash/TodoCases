import {Popup} from "../ts/interfaces"

class TaskView extends HTMLElement implements Popup {
    shadow: ShadowRoot
    constructor() {
        super()
        this.shadow = this.attachShadow({mode: 'open'})
    }

    public connectedCallback(): void {

    }
}

customElements.define('task-view', TaskView)