export interface Element {
  shadow: ShadowRoot
  render(): void
}

export interface ProjectMenuInterface extends Element {
  projectRenderer(): void
  projectTemplate(project: ProjectInterface): string
  openProject(event: Event): void
}

export interface TasksInterface {
  title: string,
  description: string,
  id: number,
  accomplished: boolean,
  priority: 'Приоритет 1' | 'Приоритет 2' | 'Приоритет 3' | 'Приоритет 4'
}

export interface ProjectInterface {
  id: number
  title: string
  color: string
  tasks: TasksInterface[]
}

interface Popup extends Element {
  closePopup(): void
}

export interface AddProjectPopup extends Popup {
  addProject():void
}

export interface ModifyProjectPopup extends Popup {
  saveModify():void
}

interface ContextMenu extends Element {
  openCloseMenu():void
}

export interface ProjectActivitiesInterface extends ContextMenu {
  modify(): void
  duplicate(): void
  delete(): void
}

export interface TodoContentInterface extends Element {
  taskRendering(): void
  renderAddTaskForm(): void
  renderAddTaskButton(): void
  renderTaskTemplate(): string
}

export interface AddTaskFormInterface extends Element {
  add(): void
  cancel(): void
}

export interface TodoItemInterface extends Element {
  openTaskView(): void
}