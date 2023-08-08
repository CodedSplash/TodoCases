import {
    ModifyTaskInterface,
    ProjectInterface,
    ProjectMenuInterface, Settings,
    TasksInterface,
    TodoContentInterface
} from "../ts/interfaces"

class ModifyTask extends HTMLElement implements ModifyTaskInterface {
    shadow: ShadowRoot
    constructor() {
        super()
        this.shadow = this.attachShadow({mode: 'open'})
    }

    public render(): void {
        const settings: Settings = JSON.parse(localStorage.getItem('settings') as string)
        const theme: string = settings.theme

        const style = `
            <style>
                .popup {
                    background-color: rgba(0, 0, 0, .5);
                    position: fixed;
                    top: 0;
                    left: 0;
                    z-index: 19;
                    width: 100%;
                    height: 100vh;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    overflow: hidden;
                  }
                  .popup__body {
                    background-color: ${theme === 'black' ? '#202020' : '#fff'};
                    border-radius: 10px;
                    display: flex;
                    flex-direction: column;
                    row-gap: 14px;
                    min-width: 500px;
                    max-height: 600px;
                    max-width: 600px;
                    overflow-y: auto;
                    overflow-x: hidden;
                    -webkit-box-shadow: 0 5px 10px 2px rgba(34, 60, 80, 0.2);
                    -moz-box-shadow: 0 5px 10px 2px rgba(34, 60, 80, 0.2);
                    box-shadow: 0 5px 10px 2px rgba(34, 60, 80, 0.2);
                    padding: 15px 0;
                  }
                  
                  .popup__content {
                    display: flex;
                    flex-direction: column;
                    row-gap: 20px;
                    padding: 0 20px;
                  }
                  
                  .popup__input {
                    display: flex;
                    flex-direction: column;
                    row-gap: 10px;
                  }
                  
                  .popup__input label {
                    font-weight: 700;
                    color: ${theme === 'black' ? '#fff' : '#000'};
                  }
                  
                  .popup__input input {
                    font-size: 18px;
                    border-radius: 4px;
                    outline: none;
                  }
                  
                  .popup__input input:focus {
                    border: 2px solid rgba(0, 0, 0, 0.5);
                    outline: none;
                  }
                  
                  #name {
                    padding: 5px;
                    color: ${theme === 'black' ? '#fff' : '#000'};
                    border: 1px solid ${theme === 'black' ? '#fff' : '#000'};
                    background-color: ${theme === 'black' ? '#202020' : '#fff'};
                  }
                  
                  #description {
                    padding: 5px;
                  }
                  
                  .popup__textarea {
                    display: flex;
                    flex-direction: column;
                    row-gap: 10px;
                  }
                  
                  .popup__textarea textarea {
                    font-size: 18px;
                    border-radius: 4px;
                    outline: none;
                    resize: none;
                    color: ${theme === 'black' ? '#fff' : '#000'};
                    border: 1px solid ${theme === 'black' ? '#fff' : '#000'};
                    background-color: ${theme === 'black' ? '#202020' : '#fff'};
                  }
                  
                  .popup__input textarea:focus {
                    border: 2px solid rgba(0, 0, 0, 0.5);
                    outline: none;
                  }
                  
                  .popup__textarea label {
                    font-weight: 700;
                    color: ${theme === 'black' ? '#fff' : '#000'};
                  }
                  
                  .popup__priority {
                    display: flex;
                    flex-direction: column;
                    row-gap: 10px;
                  }
                  
                  .popup__priority select {
                    align-self: start;
                  }
                  
                  .popup__priority label {
                    font-weight: 700;
                    color: ${theme === 'black' ? '#fff' : '#000'};
                  }
                  
                  .popup__buttons {
                    display: flex;
                    justify-content: end;
                    align-items: center;
                    column-gap: 10px;
                    padding: 0 20px;
                  }
                  
                  hr {
                    width: 100%;
                    padding: 0;
                    margin: 0;
                    border-color: rgba(211, 211, 211, 0.4);
                  }
                  
                  .popup__title {
                    margin: 0;
                    padding: 0 20px;
                    color: ${theme === 'black' ? '#fff' : '#000'};
                  }
                  
                  .popup__cancel {
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
                  
                  .popup__save-btn {
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
                  .popup__save-btn:disabled {
                    background-color: rgba(255,0,77,0.7);
                    cursor: default;
                  }
                  
                  @media (max-width: 520px) {
                    .popup__body {
                        min-width: 290px;
                        max-width: 290px;
                    }
                    
                    .popup__input input {
                      font-size: 12px;
                    }
                  }
            </style>
        `

        this.shadow.innerHTML = `
            ${style}
            <div class="popup">
              <div class="popup__body">
                <h2 class="popup__title">Изменить</h2>
                <hr>
                <div class="popup__content">
                  <div class="popup__input">
                      <label for="name">Название задачи</label>
                      <input type="text" name="name" id="name" />
                  </div>
                  <div class="popup__textarea">
                      <label for="description">Описание задачи</label>
                      <textarea name="description" id="description" rows="6"></textarea>
                  </div>
                  <div class="popup__priority">
                      <label for="priority">Приоритет задачи</label>
                      <select name="priority" id="priority">
                        <option value="Приоритет 1">Приоритет 1</option>
                        <option value="Приоритет 2">Приоритет 2</option>
                        <option value="Приоритет 3">Приоритет 3</option>
                        <option value="Приоритет 4" selected>Приоритет 4</option>
                      </select>
                  </div>
                </div>
                <hr>
                <div class="popup__buttons">
                    <button class="popup__cancel">Отмена</button>
                    <button class="popup__save-btn" disabled>Сохранить</button>
                </div>
              </div>
            </div>
        `
    }

    public closePopup(): void {
        const modifyElement = document.querySelector('modify-task') as HTMLElement
        modifyElement.remove()
    }

    public modifyTask(): void {
        type priority = 'Приоритет 1' | 'Приоритет 2' | 'Приоритет 3' | 'Приоритет 4'
        const idProject: number = parseInt(this.getAttribute('project-id') as string)
        const idTask: number = parseInt(this.getAttribute('task-id') as string)
        const projects: ProjectInterface[] = JSON.parse(localStorage.getItem('projects') as string)
        const project: ProjectInterface = projects.find((project: ProjectInterface) => project.id === idProject)!
        const tasks: TasksInterface[] = project.tasks
        const indexProject: number = projects.indexOf(project)
        const nameTask = this.shadow.querySelector('#name') as HTMLInputElement
        const descriptionTask = this.shadow.querySelector('#description') as HTMLTextAreaElement
        const priorityTaskElement = this.shadow.querySelector('#priority') as HTMLSelectElement
        const priorityTaskValue = priorityTaskElement.value as priority
        const todoContent = document.querySelector('todo-content') as HTMLElement & TodoContentInterface
        project.tasks = tasks.map((task: TasksInterface) => {
            if (task.id === idTask) {
                const modifyTask: TasksInterface = {
                    id: task.id,
                    title: nameTask.value,
                    description: descriptionTask.value,
                    accomplished: task.accomplished,
                    priority: priorityTaskValue
                }
                return modifyTask
            } else {
                return task
            }
        })
        projects.splice(indexProject, 1, project)
        localStorage.setItem('projects', JSON.stringify(projects))
        todoContent.taskRendering()
        this.closePopup()
    }

    public connectedCallback(): void {
        this.render()
        const cancelButton = this.shadow.querySelector('.popup__cancel') as HTMLButtonElement
        cancelButton.addEventListener('click', this.closePopup)
        const saveButton = this.shadow.querySelector('.popup__save-btn') as HTMLButtonElement
        saveButton.addEventListener('click', this.modifyTask.bind(this))
        this.shadow.querySelector('#name')!.addEventListener('input', (event) => {
            const addButton = this.shadow.querySelector('.popup__save-btn') as HTMLButtonElement
            const inputElement = event.target as HTMLInputElement
            addButton.disabled = !inputElement.value
        })
    }

    public disconnectedCallback(): void {
        const cancelButton = this.shadow.querySelector('.popup__cancel') as HTMLButtonElement
        cancelButton.addEventListener('click', this.closePopup)
        const saveButton = this.shadow.querySelector('.popup__save-btn') as HTMLButtonElement
        saveButton.addEventListener('click', this.modifyTask.bind(this))
        this.shadow.querySelector('#name')!.removeEventListener('input', (event) => {
            const addButton = this.shadow.querySelector('.popup__save-btn') as HTMLButtonElement
            const inputElement = event.target as HTMLInputElement
            addButton.disabled = !inputElement.value
        })
    }
}

customElements.define('modify-task', ModifyTask)