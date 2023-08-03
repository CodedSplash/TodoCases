import {AddTaskFormInterface, ProjectInterface, TasksInterface, TodoContentInterface} from "../ts/interfaces"

class AddTaskForm extends HTMLElement implements AddTaskFormInterface {
    shadow: ShadowRoot
    constructor() {
        super()
        this.shadow = this.attachShadow({mode: 'open'})
    }

    public render(): void {
        const style = `
            <style>
                .add-task-form {
                    border: 1px solid #c0c0c0;
                    border-radius: 10px;
                }
                
                .add-task-form__content {
                    display: flex;
                    flex-direction: column;
                    row-gap: 8px;
                    padding: 8px 8px 0 8px;
                }
                
                .add-task-form__content select {
                    align-self: start;
                }
                
                .add-task-form__content input {
                    border: none;
                }
                
                .add-task-form__content input:focus {
                    outline: none;
                }
                
                #name {
                    font-size: 14px;
                    font-weight: 700;
                }
                
                #description {
                    font-size: 12px;
                }
                
                .add-task-form__buttons {
                    display: flex;
                    align-items: center;
                    justify-content: end;
                    column-gap: 10px;
                    padding: 0 8px 8px 8px;
                }
                
                .add-task-form__cancel {
                    background-color: #2F4F4FFF;
                    border-radius: 4px;
                    border: none;
                    padding: 10px;
                    color: #fff;
                    font-weight: 700;
                    cursor: pointer;
                    -webkit-box-shadow: 0 0 4px 0 rgba(34, 60, 80, 0.2);
                    -moz-box-shadow: 0 0 4px 0 rgba(34, 60, 80, 0.2);
                    box-shadow: 0 0 4px 0 rgba(34, 60, 80, 0.2);
                }
                
                .add-task-form__add {
                    background-color: #ff004d;
                    border-radius: 4px;
                    border: none;
                    padding: 10px;
                    color: #fff;
                    font-weight: 700;
                    cursor: pointer;
                    -webkit-box-shadow: 0 0 4px 0 rgba(34, 60, 80, 0.2);
                    -moz-box-shadow: 0 0 4px 0 rgba(34, 60, 80, 0.2);
                    box-shadow: 0 0 4px 0 rgba(34, 60, 80, 0.2);
                }
                
                .add-task-form__add:disabled {
                    background-color: rgba(255,0,77,0.7);
                    cursor: default;
                  }
                
                hr {
                    border: 1px solid #c0c0c0;
                }
            </style>
        `
        this.shadow.innerHTML = `
            ${style}
            <div class="add-task-form">
                <div class="add-task-form__conteiner">
                    <div class="add-task-form__content">
                        <input type="text" id="name" placeholder="Название задачи">
                        <input type="text" id="description" placeholder="Описание">
                        <select name="priority" id="priority">
                            <option value="Приоритет 1">Приоритет 1</option>
                            <option value="Приоритет 2">Приоритет 2</option>
                            <option value="Приоритет 3">Приоритет 3</option>
                            <option value="Приоритет 4" selected>Приоритет 4</option>
                        </select>
                    </div>
                    <hr>
                    <div class="add-task-form__buttons">
                        <button class="add-task-form__cancel">Отмена</button>
                        <button class="add-task-form__add">Добавить задачу</button>
                    </div>
                </div>
            </div>
        `
    }

    public add(): void {
        type priorityTask =  'Приоритет 1' | 'Приоритет 2' | 'Приоритет 3' | 'Приоритет 4'
        const idProject: number = parseInt(this.getAttribute('project-id') as string)
        const nameTask = this.shadow.querySelector('#name') as HTMLInputElement
        const descriptionTask = this.shadow.querySelector('#description') as HTMLInputElement
        const selectElement = this.shadow.querySelector('#priority') as HTMLSelectElement
        const projects: ProjectInterface[] = JSON.parse(localStorage.getItem('projects') as string)
        let priorityTask: priorityTask
        if (selectElement.value === 'Приоритет 1' ||
            selectElement.value === 'Приоритет 2' ||
            selectElement.value === 'Приоритет 3' ||
            selectElement.value === 'Приоритет 4')
        {
            priorityTask = selectElement.value
        } else {
            priorityTask = 'Приоритет 4'
        }
        const newTask: TasksInterface = {
            title: nameTask.value,
            description: descriptionTask.value,
            id: new Date().getTime(),
            accomplished: false,
            priority: priorityTask
        }
        const newProjects: ProjectInterface[] = projects.map((project: ProjectInterface) => {
            if (project.id === idProject) {
                project.tasks.push(newTask)
            }
            return project
        })
        localStorage.setItem('projects', JSON.stringify(newProjects))
        nameTask.value = ''
        descriptionTask.value = ''
        selectElement.value = 'Приоритет 4'
    }

    public cancel(): void {
        const todoContentElement = document.querySelector('todo-content') as HTMLElement & TodoContentInterface
        todoContentElement.renderAddTaskButton()
    }

    public connectedCallback(): void {
        this.render()
        const cancelButton = this.shadow.querySelector('.add-task-form__cancel') as HTMLButtonElement
        const addButton = this.shadow.querySelector('.add-task-form__add') as HTMLButtonElement
        cancelButton.addEventListener('click', this.cancel)
        addButton.addEventListener('click', this.add.bind(this))
        this.shadow.querySelector('#name')!.addEventListener('input', (event) => {
            const addButton = this.shadow.querySelector('.add-task-form__add') as HTMLButtonElement
            const inputElement = event.target as HTMLInputElement
            addButton.disabled = !inputElement.value
        })
    }

    public disconnectedCallback(): void {
        const cancelButton = this.shadow.querySelector('.add-task-form__cancel') as HTMLButtonElement
        const addButton = this.shadow.querySelector('.add-task-form__add') as HTMLButtonElement
        cancelButton.addEventListener('click', this.cancel)
        addButton.addEventListener('click', this.add.bind(this))
        this.shadow.querySelector('#name')!.addEventListener('input', (event) => {
            const addButton = this.shadow.querySelector('.add-task-form__add') as HTMLButtonElement
            const inputElement = event.target as HTMLInputElement
            addButton.disabled = !inputElement.value
        })
    }
}

customElements.define('add-task-form', AddTaskForm)