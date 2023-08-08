import {ModifyProjectPopup, ProjectInterface, ProjectMenuInterface, Settings} from "../ts/interfaces"

class ModifyProject extends HTMLElement implements ModifyProjectPopup {
    shadow: ShadowRoot
    constructor() {
        super()
        this.shadow = this.attachShadow({mode: 'open'})
    }

    public render(): void {
        const idProject: number = parseInt(this.getAttribute('id-project') as string)
        const projects: ProjectInterface[] = JSON.parse(localStorage.getItem('projects') as string)
        const project: ProjectInterface = projects.find((project: ProjectInterface) => project.id === idProject)!
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
        background-color: ${theme === 'black' ? '#282828' : '#fff'};
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        row-gap: 14px;
        min-width: 500px;
        max-height: 600px;
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
      }
      
      .popup__input input[type=text]:focus {
        border: 2px solid rgba(0, 0, 0, 0.5);
        outline: none;
      }
      
      .popup__input input[type=color] {
        background-color: ${theme === 'black' ? '#282828' : '#fff'};
        border: 1px solid ${theme === 'black' ? '#fff' : '#000'};
      }
      
      #name {
        padding: 5px;
        color: ${theme === 'black' ? '#fff' : '#000'};
        border: 1px solid ${theme === 'black' ? '#fff' : '#000'};
        background-color: ${theme === 'black' ? '#282828' : '#fff'};
      }
      
      #color {
        cursor: pointer;
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
        background-color: ${theme === 'blue' ? '#2967e2' : '#ff004d'};
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
        background-color: ${theme === 'blue' ? 'rgba(41,103,226,0.7)' : 'rgba(255,0,77,0.7)'};
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
    <div class="popup"">
      <div class="popup__body">
        <h2 class="popup__title">Изменить</h2>
        <hr>
        <div class="popup__content">
          <div class="popup__input">
              <label for="name">Имя</label>
              <input type="text" name="name" id="name" value="${project.title}" />
          </div>
          <div class="popup__input">
            <label for="color">Цвет</label>
            <input type="color" value="${project.color}" name="color" id="color" />
          </div>
        </div>
        <hr>
        <div class="popup__buttons">
            <button class="popup__cancel">Отмена</button>
            <button class="popup__save-btn">Сохранить</button>
        </div>
      </div>
    </div>
    `
    }

    public closePopup(): void {
        document.querySelector('modify-project')!.remove()
    }

    public saveModify(): void {
        const projects: ProjectInterface[] = JSON.parse(localStorage.getItem('projects') as string)
        const idProject: number = parseInt(this.getAttribute('id-project') as string)
        const projectMenu = document.querySelector('project-side-menu') as ProjectMenuInterface & HTMLElement
        const nameProject = this.shadow.querySelector('#name') as HTMLInputElement
        const colorProject = this.shadow.querySelector('#color') as HTMLInputElement
        const newProjects = projects.map((project: ProjectInterface, index: number) => {
            if (project.id === idProject) {
                const modifyProject: ProjectInterface = {
                    id: project.id,
                    title: nameProject.value,
                    color: colorProject.value,
                    tasks: project.tasks
                }
                return modifyProject
            } else {
                return project
            }
        })
        localStorage.setItem('projects', JSON.stringify(newProjects))
        projectMenu.projectRenderer()
        this.closePopup()
    }

    public connectedCallback(): void {
        this.render()
        this.shadow.querySelector('.popup__save-btn')!.addEventListener('click', this.saveModify.bind(this))
        this.shadow.querySelector('.popup__cancel')!.addEventListener('click', this.closePopup)
        this.shadow.querySelector('#name')!.addEventListener('input', (event) => {
            const addButton = this.shadow.querySelector('.popup__save-btn') as HTMLButtonElement
            const inputElement = event.target as HTMLInputElement
            addButton.disabled = !inputElement.value
        })
    }

    public disconnectedCallback():void {
        this.shadow.querySelector('.popup__save-btn')!.removeEventListener('click', this.saveModify)
        this.shadow.querySelector('.popup__cancel')!.removeEventListener('click', this.closePopup)
        this.shadow.querySelector('#name')!.removeEventListener('input', (event) => {
            const addButton = this.shadow.querySelector('.popup__save-btn') as HTMLButtonElement
            const inputElement = event.target as HTMLInputElement
            addButton.disabled = !inputElement.value
        })
    }
}

customElements.define('modify-project', ModifyProject)