import {ProjectInterface, TasksInterface, TodoContentInterface} from "../ts/interfaces"

class TodoContent extends HTMLElement implements TodoContentInterface {
    shadow: ShadowRoot
    constructor() {
        super()
        this.shadow = this.attachShadow({mode: 'open'})
    }

    public render(): void {
        const idProject: number = parseInt(this.getAttribute('project-id') as string)
        let projects: ProjectInterface[] | undefined
        let project: ProjectInterface | undefined
        if (idProject) {
            projects = JSON.parse(localStorage.getItem('projects') as string)
            project = projects!.find((project: ProjectInterface) => project.id === idProject)!
        }

        const style = `
            <style>
                .todo-content__container {
                    max-width: 800px;
                    height: 100vh;
                    margin: 0 auto;
                    padding: 0 15px;
                }
                
                @media (max-width: 1200px) {
                    .todo-content__container {
                        max-width: 700px;
                    }
                }
                
                @media (max-width: 1000px) {
                    .todo-content__container {
                        max-width: 600px;
                    }
                }
                
                @media (max-width: 620px) {
                    .todo-content__container {
                        max-width: 480px;
                    }
                }
                
                @media (max-width: 490px) {
                    .todo-content__container {
                        max-width: 320px;
                    }
                }
                
                .todo-content__head {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 20px 0;
                }
                
                .todo-content__title {
                    padding: 0;
                    margin: 0;
                }
                
                .todo-content__body-add-button {
                    display: flex;
                    column-gap: 10px;
                    border: none;
                    background-color: transparent;
                    cursor: pointer;
                    padding: 10px;
                }
                
                .todo-content__body-add-button span{
                    display: flex;
                    align-items: center;
                }
                
                .todo-content__body-add-button:hover .plus svg {
                    fill: #fff;
                    z-index: 10;
                }
                
                .todo-content__body-add-button:hover .plus {
                    position: relative;
                }
                
                .todo-content__body-add-button:hover .plus:before {
                    content: '';
                    top: calc(16px - 18px);
                    left: calc(15px - 18px);
                    position: absolute;
                    width: 18px;
                    height: 18px;
                    background-color: #ff0000;
                    border-radius: 50%;
                }
                
                .todo-content__body-add-button:hover .text {
                    color: #ff0000;
                }
            </style>
        `
        this.shadow.innerHTML = `
            ${style}
            <div class="todo-content">
                <div class="todo-content__container">
                    ${idProject ? `
                        <div class="todo-content__head">
                        <h2 class="todo-content__title">${project!.title}</h2>
                        <project-activities></project-activities>
                        </div>
                        <div class="todo-content__body">
                            <div class="todo-content__body-content"></div>
                            <div class="todo-content__body-button-container">
                                <button class="todo-content__body-add-button">
                                    <span class="plus">
                                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><style>svg{fill:#000000}</style><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg>
                                    </span>
                                    <span class="text">Добавить задачу</span>
                                </button>
                            </div>
                        </div>
                    ` : ''}
                </div>
            </div>
        `
    }

    public taskRendering(): void {
        const todoContainer = this.shadow.querySelector('.todo-content__body-content') as HTMLDivElement
        const idProject: number = parseInt(this.getAttribute('project-id') as string)
        let projects: ProjectInterface[] | undefined
        let project: ProjectInterface | undefined
        let tasks: TasksInterface[] | undefined
        if (idProject) {
            projects = JSON.parse(localStorage.getItem('projects') as string)
            project = projects!.find((project: ProjectInterface) => project.id === idProject)!
            tasks = project.tasks
            todoContainer.innerHTML = tasks!.map(() => this.renderTaskTemplate).join('')
        }
    }

    public renderTaskTemplate(): string {
        const idProject: string = this.getAttribute('project-id')!
        return `
            <todo-item project-id="${idProject}"></todo-item>
        `
    }

    public renderAddTaskForm(): void {
        const addButton = this.shadow.querySelector('.todo-content__body-button-container') as HTMLDivElement
        const idProject: string = this.getAttribute('project-id')!
        addButton.innerHTML = `<add-task-form project-id="${idProject}"></add-task-form>`
    }

    public renderAddTaskButton(): void {
        const addButton = this.shadow.querySelector('.todo-content__body-button-container') as HTMLDivElement
        addButton.innerHTML = `
            <button class="todo-content__body-add-button">
                <span class="plus">
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><style>svg{fill:#000000}</style><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg>
                </span>
                <span class="text">Добавить задачу</span>
            </button>
        `
    }

    public connectedCallback(): void {
        this.render()
        this.taskRendering()
    }
}

customElements.define('todo-content', TodoContent)