export interface Element {
  shadow: ShadowRoot
  render(): void
}

export interface ProjectMenuInterface extends Element {
  projectRenderer(): void
  projectTemplate(project: ProjectInterface): string
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

export interface addProjectPopup extends Popup {
  addProject():void
}

interface ContextMenu extends Element {
  openCloseMenu():void
}

export interface ProjectActivitiesInterface extends ContextMenu {
  modify(): void
  duplicate(): void
  delete(): void
}