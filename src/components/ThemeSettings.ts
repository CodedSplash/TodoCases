import {ThemeSettingsInterface} from "../ts/interfaces"

class ThemeSettings extends HTMLElement implements ThemeSettingsInterface {
    shadow: ShadowRoot
    constructor() {
        super()
        this.shadow = this.attachShadow({mode: 'open'})
    }

    public connectedCallback(): void {

    }
}

customElements.define('theme-settings', ThemeSettings)