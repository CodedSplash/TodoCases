import {ThemeItemInterface} from "../ts/interfaces"

class ThemeItem extends HTMLElement implements ThemeItemInterface {
    shadow: ShadowRoot
    constructor() {
        super()
        this.shadow = this.attachShadow({mode: 'open'})
    }

    public connectedCallback(): void {

    }
}

customElements.define('theme-item', ThemeItem)