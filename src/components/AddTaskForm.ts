import {AddTaskFormInterface} from "../ts/interfaces"

class AddTaskForm extends HTMLElement implements AddTaskFormInterface {
    shadow: ShadowRoot
    constructor() {
        super()
        this.shadow = this.attachShadow({mode: 'open'})
    }

    public render(): void {
        const style = `
            <style>
                
            </style>
        `
        this.shadow.innerHTML = `
            ${style}
            <div class="add-task-form">
                <div class="add-task-form__conteiner">
                    <div class="add-task-form__content">
                        <input type="text" id="name" placeholder="Название задачи">
                        <input type="text" id="description" placeholder="Описание">
                        <select name="priority" id="priority">
                            <option value="Приоритет 1">Приоритет 1</option>
                            <option value="Приоритет 2">Приоритет 2</option>
                            <option value="Приоритет 3">Приоритет 3</option>
                            <option value="Приоритет 4" selected>Приоритет 4</option>
                        </select>
                    </div>
                    <hr>
                    <div class="add-task-form__buttons">
                        <button class="add-task-form__cancel">Отмена</button>
                        <button class="add-task-form__add">Добавить задачу</button>
                    </div>
                </div>
            </div>
        `
    }

    public connectedCallback(): void {
        this.render()
    }
}

customElements.define('add-task-form', AddTaskForm)