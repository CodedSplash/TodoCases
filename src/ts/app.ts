// Opening the side menu

const sideMenuButton = document.querySelector('.header__button-menu') as HTMLButtonElement
sideMenuButton.addEventListener('click', () => {
    const projectSideMenu = document.querySelector('project-side-menu') as HTMLElement
    const valueAttribute = projectSideMenu.getAttribute('open')
    if (valueAttribute === 'true') {
        projectSideMenu.setAttribute('open', 'false')
    } else if (valueAttribute === 'false') {
        projectSideMenu.setAttribute('open', 'true')
    } else if (window.innerWidth < 900 && valueAttribute === null) {
        projectSideMenu.setAttribute('open', 'true')
    } else if (valueAttribute === null) {
        projectSideMenu.setAttribute('open', 'false')
    }
})

// Opening Theme Settings

const settingsThemeButton = document.querySelector('.header__button-settings') as HTMLButtonElement

settingsThemeButton.addEventListener('click', () => {
    const settingsThemeElement = document.createElement('theme-settings') as HTMLElement
    document.body.append(settingsThemeElement)
})