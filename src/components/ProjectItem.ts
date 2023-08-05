import {ProjectInterface, ProjectItemInterface} from "../ts/interfaces"

class ProjectItem extends HTMLElement implements ProjectItemInterface {
    shadow: ShadowRoot
    constructor() {
        super()
        this.shadow = this.attachShadow({mode: 'open'})
    }

    public render(): void {
        const idProject: number = parseInt(this.getAttribute('project-id') as string)
        const projects: ProjectInterface[] = JSON.parse(localStorage.getItem('projects') as string)
        const project: ProjectInterface = projects.find((project: ProjectInterface) => project.id === idProject)!

        const style = `
            <style>
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

    }

    public connectedCallback(): void {
        this.render()
    }
}

customElements.define('project-item', ProjectItem)