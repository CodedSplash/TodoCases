import { ContextMenu } from "../ts/interfaces";

class ProjectActivities extends HTMLElement implements ContextMenu {
    shadow: ShadowRoot
    constructor() {
        super()
        this.shadow = this.attachShadow({mode: 'open'})
    }

    public render(): void {
        const style = `
            <style>
                .context-menu-button {
                    border: none;
                    background-color: transparent;
                    padding: 10px 15px;
                    cursor: pointer;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                
                .context-menu-button:hover {
                    background-color: rgba(255,255,255,0.4);
                }
            </style>
        `

        this.shadow.innerHTML = `
            ${style}
            <button class="context-menu-button">
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 128 512"><style>svg{fill:#000000}</style><path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z"/></svg>
            </button>
        `
    }

    public connectedCallback():void {
        this.render()
    }
}

customElements.define('project-activities', ProjectActivities)