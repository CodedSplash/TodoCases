import {ProjectInterface, ProjectMenuInterface, Settings} from '../ts/interfaces'

export class ProjectMenu extends HTMLElement implements ProjectMenuInterface {
  shadow: ShadowRoot

  constructor() {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  public render(): void {
    const settings: Settings = JSON.parse(localStorage.getItem('settings') as string)
    const theme: string = settings?.theme || 'white'

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
        background-color: ${theme === 'black' ? '#282828' : '#fafafa'};
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
        color: ${theme === 'black' ? 'hsla(0,0%,100%,0.56)' : '#000'};
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
            background-color: ${theme === 'black' ? 'rgba(255,255,255,0.2)' : 'rgba(47,79,79,0.25)'};
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
        <project-item project-id="${project.id}"></project-item>
    `
  }

  public connectedCallback(): void {
    this.render()
    this.projectRenderer()
    if (window.innerWidth < 900) {
        this.setAttribute('open', 'false')
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
