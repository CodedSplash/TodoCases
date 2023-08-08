import {ActionsTaskInterface, ProjectInterface, Settings, TasksInterface, TodoContentInterface} from "../ts/interfaces"

class ActionsTask extends HTMLElement implements ActionsTaskInterface {
    shadow: ShadowRoot
    constructor() {
        super()
        this.shadow = this.attachShadow({mode: 'open'})
    }

    public render(): void {
        const idProject: number = parseInt(this.getAttribute('project-id') as string)
        const idTask: number = parseInt(this.getAttribute('task-id') as string)
        const settings: Settings = JSON.parse(localStorage.getItem('settings') as string)
        const theme: string = settings.theme

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
                
                .context-menu-button svg {
                    fill: ${theme === 'black' ? '#fff' : '#000'};
                }
                
                .context-menu-button:hover {
                    background-color: ${theme === 'black' ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)'};
                }
                
                .context-menu {
                    display: none;
                    position: absolute;
                    left: -100%;
                    background-color: ${theme === 'black' ? '#202020' : '#fff'};
                    -webkit-box-shadow: 0 0 10px 0 rgba(34, 60, 80, 0.2);
                    -moz-box-shadow: 0 0 10px 0 rgba(34, 60, 80, 0.2);
                    box-shadow: 0 0 10px 0 rgba(34, 60, 80, 0.2);
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
                    color: ${theme === 'black' ? '#fff' : '#000'};
                }
                
                .context-menu__item:hover {
                    background-color: ${theme === 'black' ? 'rgba(255,255,255,0.2)' : 'rgba(47,79,79,0.25)'};
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
        this.openContextMenu()
    }

    public duplicate(): void {
        const idProject: number = parseInt(this.getAttribute('project-id') as string)
        const idTask: number = parseInt(this.getAttribute('task-id') as string)
        const projects: ProjectInterface[] = JSON.parse(localStorage.getItem('projects') as string)
        const project: ProjectInterface = projects.find((project: ProjectInterface) => project.id === idProject)!
        const indexProject: number = projects.indexOf(project)
        const tasks: TasksInterface[] = project.tasks
        const task: TasksInterface = tasks.find((task: TasksInterface) => task.id === idTask)!
        const indexTask: number = tasks.indexOf(task)
        const todoContent = document.querySelector('todo-content') as HTMLElement & TodoContentInterface
        const newTask: TasksInterface = {
            title: task.title,
            id: new Date().getTime(),
            description: task.description,
            accomplished: task.accomplished,
            priority: task.priority!
        }
        tasks.splice(indexTask + 1, 0, newTask)
        project.tasks = tasks
        projects.splice(indexProject, 1, project)
        localStorage.setItem('projects', JSON.stringify(projects))
        todoContent.taskRendering()
        this.openContextMenu()
    }

    public delete(): void {
        const idProject: number = parseInt(this.getAttribute('project-id') as string)
        const idTask: number = parseInt(this.getAttribute('task-id') as string)
        const projects: ProjectInterface[] = JSON.parse(localStorage.getItem('projects') as string)
        const project: ProjectInterface = projects.find((project: ProjectInterface) => project.id === idProject)!
        const indexProject: number = projects.indexOf(project)
        const tasks: TasksInterface[] = project.tasks
        const task: TasksInterface = tasks.find((task: TasksInterface) => task.id === idTask)!
        const indexTask: number = tasks.indexOf(task)
        const todoContent = document.querySelector('todo-content') as HTMLElement & TodoContentInterface
        tasks.splice(indexTask, 1)
        projects.splice(indexProject, 1, project)
        localStorage.setItem('projects', JSON.stringify(projects))
        todoContent.taskRendering()
        this.openContextMenu()
    }

    public connectedCallback(): void {
        this.render()
        const openButton = this.shadow.querySelector('.context-menu-button') as HTMLButtonElement
        openButton.addEventListener('click', this.openContextMenu.bind(this))
        const modifyButton = this.shadow.querySelector('#modify') as HTMLButtonElement
        modifyButton.addEventListener('click', this.modify.bind(this))
        const duplicateButton = this.shadow.querySelector('#duplicate') as HTMLButtonElement
        duplicateButton.addEventListener('click', this.duplicate.bind(this))
        const deleteButton = this.shadow.querySelector('#delete') as HTMLButtonElement
        deleteButton.addEventListener('click', this.delete.bind(this))
    }

    public disconnectedCallback(): void {
        const openButton = this.shadow.querySelector('.context-menu-button') as HTMLButtonElement
        openButton.removeEventListener('click', this.openContextMenu.bind(this))
        const modifyButton = this.shadow.querySelector('#modify') as HTMLButtonElement
        modifyButton.removeEventListener('click', this.modify.bind(this))
        const duplicateButton = this.shadow.querySelector('#duplicate') as HTMLButtonElement
        duplicateButton.removeEventListener('click', this.duplicate.bind(this))
        const deleteButton = this.shadow.querySelector('#delete') as HTMLButtonElement
        deleteButton.addEventListener('click', this.delete.bind(this))
    }
}

customElements.define('actions-task', ActionsTask)