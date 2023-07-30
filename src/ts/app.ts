// Opening the side menu

const sideMenuButton = document.querySelector('.header__button-menu') as HTMLButtonElement
sideMenuButton.addEventListener('click', () => {
    const projectSideMenu = document.querySelector('project-side-menu') as HTMLElement
    const valueAttribute = projectSideMenu.getAttribute('open')
    if (valueAttribute === 'true') {
        projectSideMenu.setAttribute('open', 'false')
    } else if (valueAttribute === 'false') {
        projectSideMenu.setAttribute('open', 'true')
    } else if (valueAttribute === null) {
        projectSideMenu.setAttribute('open', 'false')
    }
})