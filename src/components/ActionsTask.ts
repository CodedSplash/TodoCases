import {ActionsTaskInterface, ProjectInterface, TasksInterface} from "../ts/interfaces"

class ActionsTask extends HTMLElement implements ActionsTaskInterface {
    shadow: ShadowRoot
    constructor() {
        super()
        this.shadow = this.attachShadow({mode: 'open'})
    }

    public render(): void {
        const idProject: number = parseInt(this.getAttribute('project-id') as string)
        const idTask: number = parseInt(this.getAttribute('task-id') as string)

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
                    border-radius: 6px;
                }
                
                .context-menu-button:hover {
                    background-color: rgba(0,0,0,0.15);
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
                    z-index: 10;
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
                        <changing-priority project-id="${idProject}" task-id="${idTask}"></changing-priority>
                        <button class="context-menu__item" id="duplicate">Дублировать</button>
                        <button class="context-menu__item" id="delete">Удалить</button>
                    </div>
                </div>
            </div>
        `
    }

    public openContextMenu(): void {
        const contextMenu = this.shadow.querySelector('.context-menu') as HTMLDivElement
        contextMenu.classList.toggle('open')
    }

    public modify(): void {
        const idProject: string = this.getAttribute('project-id')!
        const idTask: string = this.getAttribute('task-id')!
        const modifyTask = document.createElement('modify-task') as HTMLElement
        modifyTask.setAttribute('project-id', idProject)
        modifyTask.setAttribute('task-id', idTask)
        document.body.append(modifyTask)
    }

    

    public connectedCallback(): void {
        this.render()
        const openButton = this.shadow.querySelector('.context-menu-button') as HTMLButtonElement
        openButton.addEventListener('click', this.openContextMenu.bind(this))
    }

    public disconnectedCallback(): void {
        const openButton = this.shadow.querySelector('.context-menu-button') as HTMLButtonElement
        openButton.removeEventListener('click', this.openContextMenu.bind(this))
    }
}

customElements.define('actions-task', ActionsTask)