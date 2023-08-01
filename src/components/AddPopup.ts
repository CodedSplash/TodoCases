import {AddProjectPopup, addProjectPopup, ProjectInterface, ProjectMenuInterface} from "../ts/interfaces"

class AddPopup extends HTMLElement implements AddProjectPopup {
  shadow: ShadowRoot

  constructor() {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  public render(): void {
    const style = `
    <style>
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
        overflow: hidden;
      }
      .popup__body {
        background-color: #fff;
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
      
      .popup__add-btn {
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
      .popup__add-btn:disabled {
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

    const html = `
    ${style}
    <div class="popup"">
      <div class="popup__body">
        <h2 class="popup__title">Добавить проект</h2>
        <hr>
        <div class="popup__content">
          <div class="popup__input">
              <label for="name">Имя</label>
              <input type="text" name="name" id="name" />
          </div>
          <div class="popup__input">
            <label for="color">Цвет</label>
            <input type="color" value="#808080" name="color" id="color" />
          </div>
        </div>
        <hr>
        <div class="popup__buttons">
            <button class="popup__cancel">Отмена</button>
            <button class="popup__add-btn" disabled>Добавить</button>
        </div>
      </div>
    </div>
    `
    this.shadow.innerHTML = html
  }

  public closePopup(): void {
    document.querySelector('add-project-popup')!.remove()
  }

  public addProject():void {
    const nameProject = this.shadow.querySelector('#name') as HTMLInputElement
    const colorProject = this.shadow.querySelector('#color') as HTMLInputElement
    const projectMenu = document.querySelector('project-side-menu') as ProjectMenuInterface & HTMLElement
    const newProject: ProjectInterface = {
      id: new Date().getTime(),
      title: nameProject.value,
      color: colorProject.value,
      tasks: []
    }
    const projects: ProjectInterface[] = JSON.parse(localStorage.getItem('projects') as string) || []
    projects.push(newProject)
    localStorage.setItem('projects', JSON.stringify(projects))
    projectMenu.projectRenderer()
    this.closePopup()
  }

  public connectedCallback(): void {
    this.render()
    this.shadow.querySelector('.popup__cancel')!.addEventListener('click', this.closePopup)
    this.shadow.querySelector('.popup__add-btn')!.addEventListener('click', this.addProject.bind(this))
    this.shadow.querySelector('#name')!.addEventListener('input', (event) => {
      const addButton = this.shadow.querySelector('.popup__add-btn') as HTMLButtonElement
      const inputElement = event.target as HTMLInputElement
      addButton.disabled = !inputElement.value
    })
  }

  public disconnectedCallback():void {
    this.shadow.querySelector('.popup__cancel')!.removeEventListener('click', this.closePopup)
    this.shadow.querySelector('.popup__add-btn')!.addEventListener('click', this.addProject.bind(this))
    this.shadow.querySelector('#name')!.removeEventListener('input', (event) => {
      const addButton = this.shadow.querySelector('.popup__add-btn') as HTMLButtonElement
      const input = event.target as HTMLInputElement
      addButton.disabled = !input.value
    })
  }
}

customElements.define('add-project-popup', AddPopup)