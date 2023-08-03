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
                                <add-task-button></add-task-button>
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
        addButton.innerHTML = `<add-task-button></add-task-button>`
    }

    public connectedCallback(): void {
        this.render()
        this.taskRendering()
    }
}

customElements.define('todo-content', TodoContent)