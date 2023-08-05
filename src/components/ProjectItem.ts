import {ProjectItemInterface} from "../ts/interfaces"

class ProjectItem extends HTMLElement implements ProjectItemInterface {
    shadow: ShadowRoot
    constructor() {
        super()
        this.shadow = this.attachShadow({mode: 'open'})
    }

    public connectedCallback(): void {

    }
}

customElements.define('project-item', ProjectItem)