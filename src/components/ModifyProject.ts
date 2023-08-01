import { ModifyProjectPopup } from "../ts/interfaces"

class ModifyProject extends HTMLElement implements ModifyProjectPopup {
    shadow: ShadowRoot
    constructor() {
        super()
        this.shadow = this.attachShadow({mode: 'open'})
    }

    public connectedCallback(): void {

    }
}

customElements.define('modify-project', ModifyProject)