import {ModifyTaskInterface} from "../ts/interfaces"

class ModifyTask extends HTMLElement implements ModifyTaskInterface {
    shadow: ShadowRoot
    constructor() {
        super()
        this.shadow = this.attachShadow({mode: 'open'})
    }

    public connectedCallback(): void {

    }
}

customElements.define('modify-task', ModifyTask)