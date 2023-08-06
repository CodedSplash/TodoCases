import {ChangingPriorityInterface} from "../ts/interfaces"

class ChangingPriority extends HTMLElement implements ChangingPriorityInterface {
    shadow: ShadowRoot
    constructor() {
        super()
        this.shadow = this.attachShadow({mode: 'open'})
    }

    public connectedCollback(): void {

    }
}

customElements.define('changing-priority', ChangingPriority)