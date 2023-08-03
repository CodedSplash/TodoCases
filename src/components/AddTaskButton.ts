import {Element, TodoContentInterface} from "../ts/interfaces"

class AddTaskButton extends HTMLElement implements Element {
    shadow: ShadowRoot
    constructor() {
        super()
        this.shadow = this.attachShadow({mode: 'open'})
    }

    public render(): void {
        const style = `
            <style>
                .add-task-button {
                    display: flex;
                    column-gap: 10px;
                    border: none;
                    background-color: transparent;
                    cursor: pointer;
                    padding: 10px;
                }
                
                .add-task-button span{
                    display: flex;
                    align-items: center;
                }
                
                .add-task-button:hover .plus svg {
                    fill: #fff;
                    z-index: 10;
                }
                
                .add-task-button:hover .plus {
                    position: relative;
                }
                
                .add-task-button:hover .plus:before {
                    content: '';
                    top: calc(16px - 18px);
                    left: calc(15px - 18px);
                    position: absolute;
                    width: 18px;
                    height: 18px;
                    background-color: #ff0000;
                    border-radius: 50%;
                }
                
                .add-task-button:hover .text {
                    color: #ff0000;
                }
            </style>
        `
        this.shadow.innerHTML = `
            ${style}
            <button class="add-task-button">
                <span class="plus">
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><style>svg{fill:#000000}</style><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg>
                </span>
                <span class="text">Добавить задачу</span>
            </button>
        `
    }

    public connectedCallback(): void {
        this.render()
        const addButton = this.shadow.querySelector('.add-task-button') as HTMLButtonElement
        const todoContent = document.querySelector('todo-content') as HTMLElement & TodoContentInterface
        addButton.addEventListener('click', todoContent.renderAddTaskForm.bind(todoContent))
    }
}

customElements.define('add-task-button', AddTaskButton)