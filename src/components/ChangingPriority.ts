import {ChangingPriorityInterface, ProjectInterface, TasksInterface} from "../ts/interfaces"

class ChangingPriority extends HTMLElement implements ChangingPriorityInterface {
    shadow: ShadowRoot
    constructor() {
        super()
        this.shadow = this.attachShadow({mode: 'open'})
    }

    public render(): void {
        const idProject: number = parseInt(this.getAttribute('project-id') as string)
        const idTask: number = parseInt(this.getAttribute('task-id') as string)
        const projects: ProjectInterface[] = JSON.parse(localStorage.getItem('projects') as string)
        const project: ProjectInterface = projects.find((project: ProjectInterface) => project.id === idProject)!
        const tasks: TasksInterface[] = project.tasks
        const task: TasksInterface = tasks.find((task: TasksInterface) => task.id === idTask)!

        const style = `
            <style>
                .priority-buttons {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                button {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border: 2px solid transparent;
                    background-color: transparent;
                    cursor: pointer;
                    padding: 10px;
                    border-radius: 4px;
                }
                
                button.current {
                    border: 2px solid #007dff;
                }
                
                .priority-buttons:hover button.current {
                    border: 2px solid transparent;
                }
                
                button:hover {
                    border: 2px solid #007dff !important;
                }
                
            </style>
        `

        this.shadow.innerHTML = `
            ${style}
            <div class="priority-buttons">
                <button class="priority-buttons__button ${task.priority === 'Приоритет 1' ? 'current' : ''}" id="priority1">
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512" style="fill: #e32636;"><path d="M64 32C64 14.3 49.7 0 32 0S0 14.3 0 32V64 368 480c0 17.7 14.3 32 32 32s32-14.3 32-32V352l64.3-16.1c41.1-10.3 84.6-5.5 122.5 13.4c44.2 22.1 95.5 24.8 141.7 7.4l34.7-13c12.5-4.7 20.8-16.6 20.8-30V66.1c0-23-24.2-38-44.8-27.7l-9.6 4.8c-46.3 23.2-100.8 23.2-147.1 0c-35.1-17.6-75.4-22-113.5-12.5L64 48V32z"/></svg>
                </button>
                <button class="priority-buttons__button ${task.priority === 'Приоритет 2' ? 'current' : ''}" id="priority2">
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512" style="fill: #ff9900;"><path d="M64 32C64 14.3 49.7 0 32 0S0 14.3 0 32V64 368 480c0 17.7 14.3 32 32 32s32-14.3 32-32V352l64.3-16.1c41.1-10.3 84.6-5.5 122.5 13.4c44.2 22.1 95.5 24.8 141.7 7.4l34.7-13c12.5-4.7 20.8-16.6 20.8-30V66.1c0-23-24.2-38-44.8-27.7l-9.6 4.8c-46.3 23.2-100.8 23.2-147.1 0c-35.1-17.6-75.4-22-113.5-12.5L64 48V32z"/></svg>
                </button>
                <button class="priority-buttons__button ${task.priority === 'Приоритет 3' ? 'current' : ''}" id="priority3">
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512" style="fill: #007dff;"><path d="M64 32C64 14.3 49.7 0 32 0S0 14.3 0 32V64 368 480c0 17.7 14.3 32 32 32s32-14.3 32-32V352l64.3-16.1c41.1-10.3 84.6-5.5 122.5 13.4c44.2 22.1 95.5 24.8 141.7 7.4l34.7-13c12.5-4.7 20.8-16.6 20.8-30V66.1c0-23-24.2-38-44.8-27.7l-9.6 4.8c-46.3 23.2-100.8 23.2-147.1 0c-35.1-17.6-75.4-22-113.5-12.5L64 48V32z"/></svg>
                </button>
                <button class="priority-buttons__button ${task.priority === 'Приоритет 4' ? 'current' : ''}" id="priority4">
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512" style="fill: #a9a9a9;"><path d="M64 32C64 14.3 49.7 0 32 0S0 14.3 0 32V64 368 480c0 17.7 14.3 32 32 32s32-14.3 32-32V352l64.3-16.1c41.1-10.3 84.6-5.5 122.5 13.4c44.2 22.1 95.5 24.8 141.7 7.4l34.7-13c12.5-4.7 20.8-16.6 20.8-30V66.1c0-23-24.2-38-44.8-27.7l-9.6 4.8c-46.3 23.2-100.8 23.2-147.1 0c-35.1-17.6-75.4-22-113.5-12.5L64 48V32z"/></svg>
                </button>
            </div>
        `
    }

    public changePriority(): void {

    }

    public connectedCallback(): void {
        this.render()
    }
}

customElements.define('changing-priority', ChangingPriority)