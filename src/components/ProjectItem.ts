import {ProjectInterface, ProjectItemInterface, Settings, TodoContentInterface} from "../ts/interfaces"

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
        const settings: Settings = JSON.parse(localStorage.getItem('settings') as string)
        const theme: string = settings.theme

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
                    color: ${theme === 'black' ? '#fff' : '#000'};
               }
               
               .project-side-menu__item button span {
                    pointer-events: none;
               }
                
               .project-side-menu__item:hover {
                    background-color: ${theme === 'black' ? 'rgba(255,255,255,0.2)' : 'rgba(47,79,79,0.25)'};
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
              <project-activities project-id="${project.id}"></project-activities>
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
        this.shadow.querySelector('button.project-side-menu__item-btn')!.addEventListener('click', this.openProject)
    }

    public disconnectedCallback(): void {
        this.shadow.querySelector('button.project-side-menu__item-btn')!.addEventListener('click', this.openProject)
    }
}

customElements.define('project-item', ProjectItem)