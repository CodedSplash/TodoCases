import {Element, Settings} from "../ts/interfaces";

class AddProject extends HTMLElement implements Element {
  shadow: ShadowRoot

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  public render(): void {
    const settings: Settings = JSON.parse(localStorage.getItem('settings') as string)
    const theme: string = settings.theme

    const style = `
      <style>
        button {
            display: flex;
            align-items: center;
            justify-content: center;
            border: none;
            background-color: transparent;
            cursor: pointer;
            padding: 8px;
            border-radius: 6px;
        }
        
        button svg {
            fill: ${theme === 'black' ? '#fff' : '#000'};
        }
        
        button:hover {
            background-color: ${theme === 'black' ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.4)'};
        }
      </style>
    `
    const html = `
${style}
<button>
  <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><style>svg{fill:#000000}</style><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg>
</button>
`
    this.shadow.innerHTML = html
  }

  public connectedCallback(): void {
    this.render()
    this.addEventListener('click', () => {
      const popup = document.createElement('add-project-popup')
      document.body.append(popup)
    })
  }

  public disconnectedCallback(): void {
    this.removeEventListener('click', () => {
      const popup = document.createElement('add-project-popup')
      document.body.append(popup)
    })
  }
}

customElements.define('add-project', AddProject)
