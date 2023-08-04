import {ProjectInterface, ProjectMenuInterface, TodoContentInterface} from '../ts/interfaces'

export class ProjectMenu extends HTMLElement implements ProjectMenuInterface {
  shadow: ShadowRoot

  constructor() {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  public render(): void {
    const style = `
      <style>
      .project-side-menu {
        position: fixed;
        left: 0;
        top: 48px;
        max-width: 280px;
        width: 100%;
        padding: 20px 15px;
        height: calc(100vh - 48px);
        background-color: #fafafa;
        transform: translateX(-100%);
        transition: transform 0.3s ease 0s;
      }
      
      @media (max-width: 480px) {
        .project-side-menu {
            max-width: calc(100% - 30px);
        }
      }
      
      .project-side-menu.open {
        transform: translateX(0);
      }
      
      .project-side-menu__title {
        font-weight: 700;
        cursor: default;
      }
      
       .project-side-menu__add {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 5px;
          border-radius: 6px;
       }
       
       .project-side-menu__add:hover {
            background-color: rgba(47,79,79,0.25);
       }
        
       .project-side-menu__item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            border-radius: 6px;
       }
       
       .project-side-menu__item button {
            width: 100%;
            text-align: left;
            padding: 9px 5px;
            background-color: transparent;
            border: none;
            cursor: pointer;
            font-weight: 700;
       }
        
       .project-side-menu__item:hover {
            background-color: rgba(47,79,79,0.25);
       }
       
       .project-side-menu__item-btn {
            display: flex;
            align-items: center;
       }
      </style>
    `
    this.shadow.innerHTML = `
${style}
<div class="project-side-menu open">
  <div class="project-side-menu__body">
    <div class="project-side-menu__add">
      <span class="project-side-menu__title">Проекты</span>
      <add-project></add-project>
    </div>
    <div class="project-side-menu__container project-container">
      
    </div>
  </div>   
</div>
`
  }

  public projectRenderer(): void {
    const projects: ProjectInterface[] = JSON.parse(localStorage.getItem('projects') as string)
    const html = projects && projects.length ? projects.map(data => this.projectTemplate(data)).join('') : 'Проектов нет.'
    const containerProjects = this.shadow.querySelector('.project-container') as HTMLDivElement
    containerProjects.innerHTML = html
  }

  public projectTemplate(project: ProjectInterface): string {
    return `
<div class="project-side-menu__item">
  <button project-id="${project.id}" class="project-side-menu__item-btn">
    <span style="background-color: ${project.color}; border-radius: 50%; width: 10px; height: 10px; display: block;"></span>
    <span style="padding: 0 0 0 10px; display: block;">${project.title}</span>
  </button>
  <project-activities id-project="${project.id}"></project-activities>
</div>
`
  }

  public openProject(event: Event): void {
    const target = event.target as EventTarget & HTMLElement
    const idProject: string = target.getAttribute('project-id')!
    const todoContentElement = document.querySelector('todo-content') as TodoContentInterface & HTMLElement
    todoContentElement.setAttribute('project-id', idProject)
    todoContentElement.render()
    todoContentElement.taskRendering()
  }

  public connectedCallback(): void {
    this.render()
    this.projectRenderer()
    const projectButton = this.shadow.querySelectorAll('.project-side-menu__item-btn')
    if (projectButton.length) {
      projectButton.forEach((button: Element) => button.addEventListener('click', this.openProject))
    }
    if (window.innerWidth < 900) {
        this.setAttribute('open', 'false')
    }
  }

  public disconnectedCallback(): void {
    const projectButton = this.shadow.querySelectorAll('.project-side-menu__item-btn')
    if (projectButton.length) {
      projectButton.forEach((button: Element) => button.removeEventListener('click', this.openProject))
    }
  }

  static get observedAttributes(): string[] {
    return ['open'];
  }

  attributeChangedCallback(name: string, oldValue: string , newValue: string): void {
    if (name === 'open') {
      const element = this.shadow.querySelector('.project-side-menu') as HTMLElement
      if (newValue === 'true') {
        element.classList.add('open')
      } else if (newValue === 'false') {
        element.classList.remove('open')
      }
    }
  }

}

customElements.define('project-side-menu', ProjectMenu)
