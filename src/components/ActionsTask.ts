import {ActionsTaskInterface} from "../ts/interfaces"

class ActionsTask extends HTMLElement implements ActionsTaskInterface {
    shadow: ShadowRoot
    constructor() {
        super()
        this.shadow = this.attachShadow({mode: 'open'})
    }

    public connectedCallback(): void {

    }
}

customElements.define('actions-task', ActionsTask)