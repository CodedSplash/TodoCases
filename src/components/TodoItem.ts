import {ProjectInterface, TasksInterface, TodoItemInterface} from "../ts/interfaces"

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
                
                .todo-item__content:not(.todo-item__description) {
                    justify-content: center;
                }
                
                .todo-item__description {
                    font-size: 14px;
                }
                
                .todo-item__title,
                .todo-item__description {
                    overflow: hidden;
                    max-width: 740px;
                    text-overflow: ellipsis;
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
                    cursor: pointer;
                    width: 18px;
                    height: 18px;
                }
                
                .todo-item__checkbox:before {
                    content: '';
                    position: absolute;
                    top: -1px;
                    left: -1px;
                    width: 16px;
                    height: 16px;
                    border-radius: 4px;
                    border: 2px solid ${checkboxColor};
                    z-index: 8;
                }
                
                .todo-item__checkbox:checked:after {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 13px;
                    content: '🗸︎';
                    color: #fff;
                    font-weight: 700;
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 18px;
                    height: 18px;
                    border-radius: 2px;
                    background-color: ${checkboxColor};
                    z-index: 8;
                }
                
                .todo-item__container:has(input[type="checkbox"]:checked) .todo-item__content .todo-item__title,
                .todo-item__container:has(input[type="checkbox"]:checked) .todo-item__content .todo-item__description {
                  text-decoration: line-through;
                }
            </style>
        `
        this.shadow.innerHTML = `
            ${style}
            <div class="todo-item">
                <div class="todo-item__container">
                    <div class="todo-item__checkbox-conatiner">
                        <input type="checkbox" class="todo-item__checkbox" ${task.accomplished ? 'checked' : ''}>
                    </div>
                    <div class="todo-item__content">
                        <p class="todo-item__title">${task.title.trim()}</p>
                        ${task.description.trim() === '' ?'' : `<p class="todo-item__description">${task.description.trim()}</p>`}
                    </div>
                    <actions-task></actions-task>
                </div>
            </div>
        `
    }

    public openTaskView(): void {
        const popupView = document.createElement('task-view') as HTMLElement
        const idProject: string = this.getAttribute('project-id')!
        popupView.setAttribute('project-id', idProject)
        document.body.append(popupView)
    }

    public connectedCallback(): void {
        this.render()
        this.shadow.querySelector('.todo-item__content')!.addEventListener('click', this.openTaskView.bind(this))
    }

    public disconnectedCallback(): void {
        this.shadow.querySelector('.todo-item__content')!.addEventListener('click', this.openTaskView)
    }
}

customElements.define('todo-item', TodoItem)