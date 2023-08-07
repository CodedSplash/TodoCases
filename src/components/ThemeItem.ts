import {ThemeItemInterface} from "../ts/interfaces"

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

    public closePopup(): void {
    }

    public white(): void {

    }

    public black(): void {

    }

    public blue(): void {

    }

    public red(): void {

    }

    public connectedCallback(): void {
        this.render()
    }
}

customElements.define('theme-item', ThemeItem)