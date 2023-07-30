import { ProjectInterface, ProjectMenuInterface } from '../ts/interfaces'

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
        max-width: 280px;
        width: 100%;
        padding: 20px 15px;
        height: 100vh;
        background-color: #fafafa;
      }
      
      .project-side-menu__title {
        font-weight: 700;
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
<div class="project-side-menu">
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
    const projects = JSON.parse(localStorage.getItem('projects') as string) as ProjectInterface[]
    const html = projects ? projects.map(data => this.projectTemplate(data)).join('') : 'Проектов нет.'
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
  <project-activities></project-activities>
</div>
`
  }

  public connectedCallback(): void {
    this.render()
    this.projectRenderer()
  }

}

customElements.define('project-side-menu', ProjectMenu)
