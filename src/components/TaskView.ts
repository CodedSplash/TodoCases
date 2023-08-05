import {Popup, ProjectInterface, TasksInterface} from "../ts/interfaces"

class TaskView extends HTMLElement implements Popup {
    shadow: ShadowRoot
    constructor() {
        super()
        this.shadow = this.attachShadow({mode: 'open'})
    }

    public render(): void {
        const idProject: number = parseInt(this.getAttribute('project-id') as string)
        const idTask: number = parseInt(this.getAttribute('task-id') as string)
        let projects: ProjectInterface[] = JSON.parse(localStorage.getItem('projects') as string)
        let project: ProjectInterface = projects.find((project: ProjectInterface) => project.id === idProject)!
        let tasks: TasksInterface[] = project.tasks
        const task: TasksInterface = tasks.find((task: TasksInterface) => task.id === idTask)!

        const style = `
            <style>
                p {
                    padding: 0;
                    margin: 0;
                }
                
                h2 {
                    margin: 0;
                    padding: 0;
                }
            
                .popup {
                    background-color: rgba(0, 0, 0, .5);
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100vh;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    overflow-x: hidden;
                    overflow-y: auto;
                    z-index: 19;
                  }
                  .popup__body {
                    background-color: #fff;
                    border-radius: 10px;
                    display: flex;
                    flex-direction: column;
                    row-gap: 14px;
                    min-width: 500px;
                    min-height: 80px;
                    max-height: 600px;
                    max-width: 600px;
                    overflow-y: auto;
                    overflow-x: hidden;
                    -webkit-box-shadow: 0 5px 10px 2px rgba(34, 60, 80, 0.2);
                    -moz-box-shadow: 0 5px 10px 2px rgba(34, 60, 80, 0.2);
                    box-shadow: 0 5px 10px 2px rgba(34, 60, 80, 0.2);
                    padding: 15px 0;
                  }
                  
                  .popup__head {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 0 20px;
                  }
                  
                  .popup__title {
                    display: flex;
                    align-items: center;
                  }
                  
                  .popup__description {
                    word-wrap: break-word;
                  }
                  
                  .popup__name {
                    word-wrap: break-word;
                  }
                  
                  .popup__content {
                    display: flex;
                    flex-direction: column;
                    row-gap: 15px;
                    padding: 0 20px;
                    overflow-y: auto;
                    overflow-x: hidden;
                  }
                  
                  @media (max-width: 520px) {
                    .popup__body {
                        min-width: 290px;
                        max-width: 290px;
                    }
                  }
                  
                  .popup__button-close {
                    background-color: transparent;
                      cursor: pointer;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      outline: none;
                      border: none;
                      padding: 6px;
                      border-radius: 4px;
                      transition: .05s ease 0s;
                      z-index: 19;
                  }
                  
                  .popup__button-close:hover {
                    background-color: rgba(0, 0, 0, 0.15);
                  }
            </style>
        `

        console.log(task.description)

        this.shadow.innerHTML = `
            ${style}
            <div class="popup">
              <div class="popup__body">
                <div class="popup__head">
                    <p class="popup__title">
                        <span class="popup__title-color" style="background-color: ${project.color}; border-radius: 50%; width: 10px; height: 10px; display: block;"></span>
                        <span class="popup__title-text" style="padding: 0 0 0 10px; display: block;">${project.title}</span>
                    </p>
                    <button class="popup__button-close">
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><style>svg{fill:#000000}</style><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
                    </button>
                </div>
                <div class="popup__content">
                  <h2 class="popup__name">${task.title}</h2>
                  ${task.description === '' ? '' : `<p class="popup__description">${task.description}</p>`}
                </div>
              </div>
            </div>
        `
    }

    public closePopup(): void {
        const taskViewElement = document.querySelector('task-view') as HTMLElement
        taskViewElement.remove()
    }

    public connectedCallback(): void {
        this.render()
        this.shadow.querySelector('.popup__button-close')!.addEventListener('click', this.closePopup)
    }

    public disconnectedCallback(): void {
        this.shadow.querySelector('.popup__button-close')!.addEventListener('click', this.closePopup)
    }
}

customElements.define('task-view', TaskView)