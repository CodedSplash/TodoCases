import { ProjectActivitiesInterface } from "../ts/interfaces"

class ProjectActivities extends HTMLElement implements ProjectActivitiesInterface {
    shadow: ShadowRoot
    constructor() {
        super()
        this.shadow = this.attachShadow({mode: 'open'})
    }

    public render(): void {
        const style = `
            <style>
                .container {
                    position: relative;
                }
            
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
                
                .context-menu {
                    display: none;
                    position: absolute;
                    left: -100%;
                    background-color: #fff;
                    -webkit-box-shadow: 0 0 10px 0px rgba(34, 60, 80, 0.2);
                    -moz-box-shadow: 0 0 10px 0px rgba(34, 60, 80, 0.2);
                    box-shadow: 0 0 10px 0px rgba(34, 60, 80, 0.2);
                    padding: 6px 8px;
                    border-radius: 5px;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }
                
                .context-menu.open {
                    display: block;
                }
                
                .context-menu__item {
                    width: 100%;
                    text-align: left;
                    padding: 9px 5px;
                    background-color: transparent;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    font-weight: 700;
                }
                
                .context-menu__item:hover {
                    background-color: rgba(47,79,79,0.25);
                }
            </style>
        `

        this.shadow.innerHTML = `
            ${style}
            <div class="container">
                <button class="context-menu-button">
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 128 512"><style>svg{fill:#000000}</style><path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z"/></svg>
                </button>
                <div class="context-menu">
                    <div class="context-menu__body">
                        <button class="context-menu__item" id="modify">Изменить</button>
                        <button class="context-menu__item">Дублировать</button>
                        <button class="context-menu__item">Удалить</button>
                    </div>
                </div>
            </div>
        `
    }

    public openCloseMenu(): void {
        const contextMenu = this.shadow.querySelector('.context-menu') as HTMLDivElement
        contextMenu.classList.toggle('open')
    }

    public modify(): void {
        const modifyProjectElement = document.createElement('modify-project')
        const idProject: string = this.getAttribute('id-project')!
        modifyProjectElement.setAttribute('id-project', idProject)
        document.body.append(modifyProjectElement)
        this.openCloseMenu()
    }

    public connectedCallback():void {
        this.render()
        this.shadow.querySelector('button.context-menu-button')!.addEventListener('click', this.openCloseMenu.bind(this))
        this.shadow.querySelector('button#modify')!.addEventListener('click', this.modify.bind(this))
    }

    public disconnectedCallback(): void {
        this.shadow.querySelector('.context-menu-button')!.removeEventListener('click', this.openCloseMenu)
        this.shadow.querySelector('button#modify')!.removeEventListener('click', this.modify)
    }
}

customElements.define('project-activities', ProjectActivities)