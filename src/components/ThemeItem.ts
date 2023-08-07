import {Settings, ThemeItemInterface} from "../ts/interfaces"

class ThemeItem extends HTMLElement implements ThemeItemInterface {
    shadow: ShadowRoot
    constructor() {
        super()
        this.shadow = this.attachShadow({mode: 'open'})
    }

    public render(): void {
        let color: string | undefined
        let textButton: string | undefined
        const theme: string = this.getAttribute('theme-name')!
        const checked: string = this.getAttribute('checked')!
        const isChecked: boolean = checked !== 'false'

        if (theme === 'dark') {
            color = '#444444'
            textButton = 'Чёрная тема'
        } else if (theme === 'blue') {
            color = '#003AFF'
            textButton = 'Синяя тема'
        } else if (theme === 'red') {
            color = '#FF0046'
            textButton = 'Красная тема'
        } else if (theme === 'white') {
            color = '#fff'
            textButton = 'Белая тема'
        }


        const style = `
            <style>
                button {
                    display: flex;
                    align-items: center;
                    column-gap: 8px;
                    width: 100%;
                    background-color: ${color};
                    border-radius: 10px;
                    padding: 20px;
                    font-weight: 700;
                    border: 1px solid #DEDEDE;
                    cursor: pointer;
                    color: ${color === '#fff' ? '#000' : '#fff'};
                    -webkit-box-shadow: 2px 2px 15px -8px rgba(34, 60, 80, 0.2);
                    -moz-box-shadow: 2px 2px 15px -8px rgba(34, 60, 80, 0.2);
                    box-shadow: 2px 2px 15px -8px rgba(34, 60, 80, 0.2);
                }
                
                button span {
                    display: block;
                }
                
                button input[type=radio] {
                    margin: 0;
                }
            </style>
        `

        this.shadow.innerHTML = `
            ${style}
            <button>
                <input type="radio" ${isChecked ? 'checked' : ''}>
                <span>${textButton}</span>
            </button>
        `
    }

    public white(): void {
        const bodyElement = document.body as HTMLElement
        bodyElement.classList.value = 'white'
        const settings: Settings = JSON.parse(localStorage.getItem('settings') as string)
        settings.theme = 'white'
        localStorage.setItem('settings', JSON.stringify(settings))


    }

    public black(): void {
        const bodyElement = document.body as HTMLElement
        bodyElement.classList.value = 'black'
        const settings: Settings = JSON.parse(localStorage.getItem('settings') as string)
        settings.theme = 'black'
        localStorage.setItem('settings', JSON.stringify(settings))
    }

    public blue(): void {
        const bodyElement = document.body as HTMLElement
        bodyElement.classList.value = 'blue'
        const settings: Settings = JSON.parse(localStorage.getItem('settings') as string)
        settings.theme = 'blue'
        localStorage.setItem('settings', JSON.stringify(settings))
    }

    public red(): void {
        const bodyElement = document.body as HTMLElement
        bodyElement.classList.value = 'red'
        const settings: Settings = JSON.parse(localStorage.getItem('settings') as string)
        settings.theme = 'red'
        localStorage.setItem('settings', JSON.stringify(settings))
    }

    public connectedCallback(): void {
        this.render()
        const theme: string = this.getAttribute('theme-name')!
        this.addEventListener('click', () => {
            if (theme === 'white') {
                this.white()
            } else if (theme === 'dark') {
                this.black()
            } else if (theme === 'blue') {
                this.blue()
            } else if (theme === 'red') {
                this.red()
            }
        })
    }

    public disconnectedCallback(): void {
        const theme: string = this.getAttribute('theme-name')!
        this.removeEventListener('click', () => {
            if (theme === 'white') {
                this.white()
            } else if (theme === 'black') {
                this.black()
            } else if (theme === 'blue') {
                this.blue()
            } else if (theme === 'red') {
                this.red()
            }
        })
    }
}

customElements.define('theme-item', ThemeItem)