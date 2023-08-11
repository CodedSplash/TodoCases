import {ProjectInterface, Settings, TasksInterface, TodoItemInterface} from "../ts/interfaces"

class TodoItem extends HTMLElement implements TodoItemInterface {
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
        let checkboxColor: string  = '#a9a9a9'
        const settings: Settings = JSON.parse(localStorage.getItem('settings') as string)
        const theme: string = settings.theme

        if (task.priority === 'Приоритет 1') {
            checkboxColor = '#e32636'
        } else if (task.priority === 'Приоритет 2') {
            checkboxColor = '#ff9900'
        } else if (task.priority === 'Приоритет 3') {
            checkboxColor = '#007dff'
        }

        const style = `
            <style>
                p {
                    padding: 0;
                    margin: 0;
                }
                
                .todo-item__content {
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                    cursor: pointer;
                }
                
                .todo-item__content:not(.todo-item__description) .todo-item__title {
                    font-size: 18px;
                }
                
                .todo-item__description {
                    font-size: 14px;
                }
                
                .todo-item__title,
                .todo-item__description {
                    overflow: hidden;
                    max-width: 740px;
                    text-overflow: ellipsis;
                    color: ${theme === 'black' ? '#fff' : '#000'};
                }
                
                @media (max-width: 1200px) {
                    .todo-item__title,
                    .todo-item__description {
                        max-width: 640px;
                    }
                }
                
                @media (max-width: 1000px) {
                    .todo-item__title,
                    .todo-item__description {
                        max-width: 540px;
                    }
                }
                
                @media (max-width: 620px) {
                    .todo-item__title,
                    .todo-item__description {
                        max-width: 420px;
                    }
                }
                
                @media (max-width: 490px) {
                    .todo-item__title,
                    .todo-item__description {
                        max-width: 260px;
                    }
                }
                
                .todo-item__title {
                    font-size: 16px;
                }
                
                .todo-item__title:not(:last-child) {
                    padding-bottom: 6px;
                }
            
                .todo-item__container {
                    display: flex;
                    padding-bottom: 10px;
                    padding-top: 8px;
                    border-bottom: 1px solid rgba(169,169,169,0.5);
                }
                
                .todo-item__checkbox-conatiner {
                    margin-right: 6px;
                }
                
                .todo-item__checkbox {
                    position: relative;
                    width: 18px;
                    height: 18px;
                    border-radius: 4px;
                    border: 2px solid ${checkboxColor};
                    cursor: pointer;
                    background-color: ${theme === 'black' ? '#202020' : '#fff'};
                }
                
                .todo-item__checkbox.checked:before {
                    display: flex;
                    -webkit-box-align: center;
                    -ms-flex-align: center;
                    align-items: center;
                    -webkit-box-pack: center;
                    -ms-flex-pack: center;
                    justify-content: center;
                    font-size: 16px;
                    position: absolute;
                    top: 0;
                    left: 0;
                    content: '✓︎';
                    color: #fff;
                    font-weight: 700;
                    width: 18px;
                    height: 18px;
                    border-radius: 2px;
                    background-color: ${checkboxColor};
                    z-index: 8;
                    pointer-events: none;
                }
                
                .todo-item__container:has(.todo-item__checkbox.checked) .todo-item__content .todo-item__title,
                .todo-item__container:has(.todo-item__checkbox.checked) .todo-item__content .todo-item__description {
                  text-decoration: line-through;
                }
            </style>
        `
        this.shadow.innerHTML = `
            ${style}
            <div class="todo-item">
                <div class="todo-item__container">
                    <div class="todo-item__checkbox-conatiner">
                        <div class="todo-item__checkbox ${task.accomplished ? 'checked' : ''}"></div>
                    </div>
                    <div class="todo-item__content">
                        <p class="todo-item__title">${task.title.trim()}</p>
                        ${task.description.trim() === '' ? '' : `<p class="todo-item__description">${task.description.trim()}</p>`}
                    </div>
                    <actions-task project-id="${idProject}" task-id="${idTask}"></actions-task>
                </div>
            </div>
        `
    }

    public openTaskView(): void {
        const popupView = document.createElement('task-view') as HTMLElement
        const idProject: string = this.getAttribute('project-id')!
        const idTask: string = this.getAttribute('task-id')!
        popupView.setAttribute('project-id', idProject)
        popupView.setAttribute('task-id', idTask)
        document.body.append(popupView)
    }

    public setAccomplished(): void {
        const idProject: number = parseInt(this.getAttribute('project-id') as string)
        const idTask: number = parseInt(this.getAttribute('task-id') as string)
        const projects: ProjectInterface[] = JSON.parse(localStorage.getItem('projects') as string)
        const project: ProjectInterface = projects.find((project: ProjectInterface) => project.id === idProject)!
        const tasks: TasksInterface[] = project.tasks
        const task: TasksInterface = tasks.find((task: TasksInterface) => task.id === idTask)!
        const indexTask: number = tasks.indexOf(task)
        const indexProject: number = projects.indexOf(project)
        task.accomplished = !task.accomplished
        tasks.splice(indexTask, 1, task)
        project.tasks = tasks
        projects.splice(indexProject, 1, project)
        localStorage.setItem('projects', JSON.stringify(projects))
    }

    public connectedCallback(): void {
        this.render()
        this.shadow.querySelector('.todo-item__content')!.addEventListener('click', this.openTaskView.bind(this))
        this.shadow.querySelector('.todo-item__checkbox')!.addEventListener('click', this.setAccomplished.bind(this))
        const checkbox = this.shadow.querySelector('.todo-item__checkbox') as HTMLInputElement
        checkbox.addEventListener('click', () => checkbox.classList.toggle('checked'))
    }

    public disconnectedCallback(): void {
        this.shadow.querySelector('.todo-item__content')!.removeEventListener('click', this.openTaskView)
        this.shadow.querySelector('.todo-item__checkbox')!.removeEventListener('click', this.setAccomplished)
        const checkbox = this.shadow.querySelector('.todo-item__checkbox') as HTMLInputElement
        checkbox.addEventListener('click', () => checkbox.classList.toggle('checked'))
    }
}

customElements.define('todo-item', TodoItem)